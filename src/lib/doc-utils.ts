import type { Doc, Change } from "@automerge/automerge";
import type * as Am from "@automerge/automerge";

// Convert a Uint8Array to a Base64 string
export const uint8ArrayToBase64 = (arr: Uint8Array): string =>
  Buffer.from(arr).toString("base64");

// Convert a Base64 string to a Uint8Array
export const base64ToUint8Array = (base64: string) =>
  Uint8Array.from(Buffer.from(base64, "base64"));

// Save the Automerge document to a Base64 string
export const saveDoc = <T>(Automerge: typeof Am, doc: Doc<T>) => {
  const uint8Array = Automerge.save(doc);
  return uint8ArrayToBase64(uint8Array);
};

// Load the Automerge document from a Base64 string
export const loadDoc = <T>(Automerge: typeof Am, base64: string): Doc<T> => {
  const uint8Array = base64ToUint8Array(base64);
  return Automerge.load(uint8Array);
};

// Convert changes to Base64
export const changesToBase64 = (changes: Change[]): string[] =>
  changes.map(uint8ArrayToBase64);

// Convert Base64 to changes
export const base64ToChanges = (base64Changes: string[]) =>
  base64Changes.map(base64ToUint8Array);
