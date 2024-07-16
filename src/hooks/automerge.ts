import { useRef, useCallback, useEffect } from "react";
import type * as Automerge from "@automerge/automerge";
import { loadDoc } from "@/lib/doc-utils";

let AutomergeRef: typeof Automerge | null = null;

type Config<T> = {
  onInit?: (doc: Automerge.Doc<T>) => void;
};

export const useAutomerge = <T extends object>(
  initialContent?: string | null,
  config: Config<T> = {}
) => {
  const docRef = useRef<Automerge.Doc<T> | null>(null);

  const initAutomerge = useCallback(async () => {
    if (!AutomergeRef) AutomergeRef = await import("@automerge/automerge");

    docRef.current = initialContent
      ? loadDoc(AutomergeRef, initialContent)
      : AutomergeRef!.init<T>();

    config.onInit?.(docRef.current!);
  }, [initialContent, config.onInit]);

  const updateDoc = useCallback((updateFunc: (doc: T) => void) => {
    if (!AutomergeRef || !docRef.current)
      throw new Error("Automerge not initialized");
    docRef.current = AutomergeRef.change(docRef.current, updateFunc);
  }, []);

  const applyChanges = useCallback((changes: Automerge.Change[]) => {
    if (!AutomergeRef || !docRef.current)
      throw new Error("Automerge not initialized");
    docRef.current = AutomergeRef.applyChanges(docRef.current, changes).pop()!;
    return docRef.current;
  }, []);

  const getDoc = useCallback(() => docRef.current, []);

  const getChanges = useCallback((prevDoc: Automerge.Doc<T>) => {
    if (!AutomergeRef || !docRef.current)
      throw new Error("Automerge not initialized");
    return AutomergeRef.getChanges(prevDoc, docRef.current);
  }, []);

  useEffect(() => {
    initAutomerge();
  }, []);

  return { updateDoc, applyChanges, getDoc, getChanges };
};

export default useAutomerge;
