import { gql, useSubscription, useSuspenseQuery } from "@apollo/client";
import { useCallback, useRef, useState } from "react";
import { useInterval } from "usehooks-ts";
import useAutomerge from "./automerge";
import { FileContentSubscription, GetFileContentQuery } from "@/gql/graphql";
import { client } from "@/graphql/client";
import { base64ToChanges, changesToBase64 } from "@/lib/doc-utils";
import type { Doc } from "@automerge/automerge";

const GET_FILE_CONTENT_QUERY = gql`
  query GetFileContent($fileId: ID!) {
    file(id: $fileId) {
      language
      content
    }
  }
`;

const UPDATE_FILE_CONTENT_MUTATION = gql`
  mutation UpdateFileContent($fileId: ID!, $changes: String!) {
    updateFile(id: $fileId, changes: $changes)
  }
`;

const FILE_CONTENT_SUBSCRIPTION = gql`
  subscription FileContent($fileId: ID!) {
    fileChange(id: $fileId)
  }
`;

const useFileContent = (fileId: string) => {
  const { data } = useSuspenseQuery<GetFileContentQuery>(
    GET_FILE_CONTENT_QUERY,
    {
      variables: { fileId },
      fetchPolicy: "cache-and-network",
    }
  );

  const [content, setContent] = useState("");
  const lastCalledDocRef = useRef<Doc<{ text: string }> | null>(null);

  const { updateDoc, applyChanges, getDoc, getChanges } = useAutomerge<{
    text: string;
  }>(data.file.content, {
    onInit: (doc) => {
      setContent(doc.text);
      lastCalledDocRef.current = doc;
    },
  });

  useSubscription<FileContentSubscription>(FILE_CONTENT_SUBSCRIPTION, {
    variables: { fileId },
    onData: ({ data: { data } }) => {
      if (data?.fileChange) {
        const changes = base64ToChanges(JSON.parse(data.fileChange));
        applyChanges(changes);
        setContent(getDoc()?.text || "");
      }
    },
  });

  const handleContentChange = useCallback(
    (newContent: string) => {
      updateDoc((doc) => (doc.text = newContent));
      setContent(newContent);
    },
    [updateDoc]
  );

  const _getChanges = useCallback(() => {
    const doc = getDoc();
    if (!doc || !lastCalledDocRef.current)
      throw new Error("Document not initialized");
    const changes = getChanges(lastCalledDocRef.current);
    lastCalledDocRef.current = doc;
    return changes;
  }, [getDoc, getChanges]);

  return {
    content,
    handleContentChange,
    language: data?.file.language,
    getChanges: _getChanges,
  };
};

const useSaveContent = (fileId: string, getChanges: () => Uint8Array[]) => {
  const [hasSentMutation, setHasSentMutation] = useState(false);

  useInterval(async () => {
    if (!hasSentMutation) {
      const changes = getChanges();
      if (changes.length > 0) {
        await client.mutate({
          mutation: UPDATE_FILE_CONTENT_MUTATION,
          variables: {
            fileId,
            changes: JSON.stringify(changesToBase64(changes)),
          },
        });
      }
    }
  }, 5000);

  return { setHasSentMutation };
};

export { useFileContent, useSaveContent };
