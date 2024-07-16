import { FileEditorsSubscription, GetFileEditorsQuery } from "@/gql/graphql";
import { gql, useSuspenseQuery } from "@apollo/client";
import UserAvatar, { UserAvatarSkeleton } from "./UserAvatar";
import { useEffect } from "react";

type Props = {
  fileId: number;
};

const GET_FILE_EDITORS = gql`
  query GetFileEditors($fileId: ID!) {
    file(id: $fileId) {
      editors {
        id
        name
      }
    }
  }
`;

const FILE_EDITORS_SUBSCRIPTION = gql`
  subscription FileEditors($fileId: ID!) {
    fileEditor(fileId: $fileId) {
      mutationType
      editor {
        id
        name
      }
    }
  }
`;

const FileEditors = ({ fileId }: Props) => {
  const { data, subscribeToMore } = useSuspenseQuery<GetFileEditorsQuery>(
    GET_FILE_EDITORS,
    {
      variables: { fileId },
      fetchPolicy: "cache-and-network",
    }
  );

  useEffect(() => {
    const unsubscribe = subscribeToMore<FileEditorsSubscription>({
      document: FILE_EDITORS_SUBSCRIPTION,
      variables: { fileId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        if (subscriptionData.data.fileEditor.mutationType === "CREATED") {
          return {
            file: {
              ...prev.file,
              editors: [
                ...prev.file.editors,
                subscriptionData.data.fileEditor.editor,
              ],
            },
          };
        } else {
          return {
            file: {
              ...prev.file,
              editors: prev.file.editors.filter(
                (editor) =>
                  editor.id !== subscriptionData.data.fileEditor.editor.id
              ),
            },
          };
        }
      },
    });

    return unsubscribe;
  }, [fileId, subscribeToMore]);

  return (
    <div className="flex gap-2">
      {data.file.editors.map((editor) => (
        <UserAvatar
          username={editor.name}
          key={editor.id}
          className="h-6 w-6"
        />
      ))}
    </div>
  );
};

export const FileEditorsSkeleton = () => (
  <div className="flex gap-2">
    {Array.from({ length: 5 }).map((_, i) => (
      <UserAvatarSkeleton key={i} />
    ))}
  </div>
);

export default FileEditors;
