import { prisma } from "@/prisma/client";
import type { Doc, Change } from "@automerge/automerge";
// @ts-ignore due to i cannot have bundler option in tsconfig due to error with pothos/prisma codegen with ts v5
import * as Automerge from "@automerge/automerge/slim";
import cron from "node-cron";
// @ts-ignore
import { automergeWasmBase64 } from "@automerge/automerge/automerge.wasm.base64.js";
import { loadDoc, saveDoc } from "./doc-utils";
import { Document } from "@prisma/client";

await Automerge.initializeBase64Wasm(automergeWasmBase64);

type CachedDocumentParams = {
  fileId: number;
  serializedDoc?: string;
};

class CachedDocument {
  public fileId: number;
  private sharedDoc: Doc<{ text: string }>;
  private lastChangeMadeAt: number;

  constructor({ fileId, serializedDoc }: CachedDocumentParams) {
    this.fileId = fileId;
    this.sharedDoc = serializedDoc
      ? loadDoc(Automerge, serializedDoc)
      : Automerge.from({ text: "" });
    this.lastChangeMadeAt = Date.now();
  }

  public applyChanges(changes: Change[]): void {
    this.sharedDoc = Automerge.applyChanges(this.sharedDoc, changes)[0];
    this.lastChangeMadeAt = Date.now();
  }

  public getCurrentState(): string {
    return saveDoc(Automerge, this.sharedDoc);
  }

  public getTextContent(): string {
    return this.sharedDoc.text;
  }

  public async writeChanges(): Promise<void> {
    try {
      const serializedDoc = this.getCurrentState();
      await prisma.document.update({
        where: { id: this.fileId },
        data: { content: serializedDoc },
      });
    } catch (error) {
      console.error(`Failed to write changes for file ${this.fileId}:`, error);
    }
  }

  public expired(): boolean {
    return Date.now() - this.lastChangeMadeAt > 1000 * 60 * 5; // 5 minutes
  }
}

class DocumentManager {
  private cache: Map<number, CachedDocument> = new Map();

  constructor() {
    console.log("Created DocumentManager");
  }

  public async getDocument(file: number | Document): Promise<CachedDocument> {
    const fileId = typeof file === "number" ? file : Number(file.id);

    if (!this.cache.has(fileId)) {
      const fetchedFile =
        typeof file === "number"
          ? await prisma.document.findUniqueOrThrow({
              where: { id: fileId },
              select: { content: true },
            })
          : file;

      const cachedDoc = new CachedDocument({
        fileId,
        serializedDoc: fetchedFile.content || undefined,
      });

      this.cache.set(fileId, cachedDoc);
    }

    return this.cache.get(fileId)!;
  }

  public getExpiredDocuments(): CachedDocument[] {
    return Array.from(this.cache.values()).filter((doc) => doc.expired());
  }

  public async unCacheDocument(fileId: number): Promise<void> {
    const cachedDoc = this.cache.get(fileId);
    if (cachedDoc) {
      await cachedDoc.writeChanges();
      this.cache.delete(fileId);
    }
  }
}

// Schedule a cron job to uncache expired documents every minute
cron.schedule("* * * * *", async () => {
  const expiredDocuments = documentManager.getExpiredDocuments();
  console.log(`${expiredDocuments.length} expired documents`);

  for (const doc of expiredDocuments) {
    await documentManager.unCacheDocument(doc.fileId);
  }
});

const documentManager = new DocumentManager();

export default documentManager;