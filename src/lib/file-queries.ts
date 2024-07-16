import { client } from "@/graphql/client";
import {
  CREATE_FILE_MUTATION,
  CREATE_FOLDER_MUTATION,
  DELETE_FILE_MUTATION,
  RENAME_FILE_MUTATION,
} from "./mutations";
import { toast } from "@/lib/toast";

export const createFile = async (
  roomId: number | string,
  parentId?: string
) => {
  const fileName = prompt("Enter file name");
  if (fileName) {
    await client.mutate({
      mutation: CREATE_FILE_MUTATION,
      variables: {
        roomId,
        parentId,
        name: fileName,
      },
    });
    await toast("File created");
  }
};

export const createFolder = async (
  roomId: number | string,
  parentId?: string
) => {
  const folderName = prompt("Enter folder name");
  if (folderName) {
    await client.mutate({
      mutation: CREATE_FOLDER_MUTATION,
      variables: { roomId, parentId, name: folderName },
    });
    await toast("Folder created");
  }
};

export const deleteFile = async (nodeId: string) => {
  const confirmDelete = confirm("Are you sure you want to delete this file?");
  if (confirmDelete) {
    await client.mutate({
      mutation: DELETE_FILE_MUTATION,
      variables: { nodeId },
    });
    await toast("File deleted");
  }
};

export const renameFile = async (nodeId: string) => {
  const fileName = prompt("Enter new name");
  if (fileName) {
    await client.mutate({
      mutation: RENAME_FILE_MUTATION,
      variables: { nodeId, name: fileName },
    });
    await toast("File renamed");
  }
};
