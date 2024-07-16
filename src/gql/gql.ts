/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation Login($name: String!) {\n    login(name: $name) {\n      id\n      name\n    }\n  }\n": types.LoginDocument,
    "\n  mutation CreateRoom($name: String!, $id: ID!) {\n    createRoom(name: $name, id: $id) {\n      id\n      name\n    }\n  }\n": types.CreateRoomDocument,
    "\n  mutation JoinRoom($roomId: ID!) {\n    joinRoom(id: $roomId) {\n      id\n    }\n  }\n": types.JoinRoomDocument,
    "\n  mutation Logout {\n    logout {\n      id\n    }\n  }\n": types.LogoutDocument,
    "\n  query GetUserAvatar {\n    me {\n      name\n      online\n    }\n  }\n": types.GetUserAvatarDocument,
    "\n  mutation UpdateProfile($name: String!) {\n    updateUser(name: $name) {\n      id\n      name\n    }\n  }\n": types.UpdateProfileDocument,
    "\n  query GetFileEditors($fileId: ID!) {\n    file(id: $fileId) {\n      editors {\n        id\n        name\n      }\n    }\n  }\n": types.GetFileEditorsDocument,
    "\n  subscription FileEditors($fileId: ID!) {\n    fileEditor(fileId: $fileId) {\n      mutationType\n      editor {\n        id\n        name\n      }\n    }\n  }\n": types.FileEditorsDocument,
    "\n  query GetUser {\n    me {\n      name\n    }\n  }\n": types.GetUserDocument,
    "\n  query GetRoom($roomId: ID!) {\n    room(id: $roomId) {\n      id\n      locked\n      isCreator\n    }\n  }\n": types.GetRoomDocument,
    "\n  mutation SetRoomLocked($roomId: ID!, $locked: Boolean!) {\n    setRoomLocked(roomId: $roomId, locked: $locked) {\n      id\n      locked\n    }\n  }\n": types.SetRoomLockedDocument,
    "\n  mutation DeleteRoom($roomId: ID!) {\n    deleteRoom(id: $roomId) {\n      id\n    }\n  }\n": types.DeleteRoomDocument,
    "\n  query GetUsers($roomId: ID!) {\n    room(id: $roomId) {\n      id\n      users {\n        id\n        name\n        online\n      }\n    }\n  }\n": types.GetUsersDocument,
    "\n  query GetFileContent($fileId: ID!) {\n    file(id: $fileId) {\n      language\n      content\n    }\n  }\n": types.GetFileContentDocument,
    "\n  mutation UpdateFileContent($fileId: ID!, $changes: String!) {\n    updateFile(id: $fileId, changes: $changes)\n  }\n": types.UpdateFileContentDocument,
    "\n  subscription FileContent($fileId: ID!) {\n    fileChange(id: $fileId)\n  }\n": types.FileContentDocument,
    "\n  fragment Node on Node {\n    id\n    name\n    type\n    parentId\n    fileId\n  }\n": types.NodeFragmentDoc,
    "\n  mutation CreateFile($roomId: ID!, $parentId: ID, $name: String!) {\n    createNode(roomId: $roomId, parentId: $parentId, name: $name, type: FILE) {\n      id\n      name\n    }\n  }\n": types.CreateFileDocument,
    "\n  mutation CreateFolder($roomId: ID!, $parentId: ID, $name: String!) {\n    createNode(\n      roomId: $roomId\n      parentId: $parentId\n      name: $name\n      type: FOLDER\n    ) {\n      id\n      name\n    }\n  }\n": types.CreateFolderDocument,
    "\n  mutation DeleteFile($nodeId: ID!) {\n    deleteNode(id: $nodeId) {\n      id\n    }\n  }\n": types.DeleteFileDocument,
    "\n  mutation RenameFile($nodeId: ID!, $name: String!) {\n    updateNode(id: $nodeId, name: $name) {\n      id\n      name\n    }\n  }\n": types.RenameFileDocument,
    "\n  \n\n  query GetFiles($roomId: ID!) {\n    room(id: $roomId) {\n      id\n      name\n      nodes {\n        ...Node\n        children {\n          ...Node\n          children {\n            ...Node\n            children {\n              ...Node\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetFilesDocument,
    "\n  \n\n  subscription FileModified($roomId: ID!) {\n    node(roomId: $roomId) {\n      mutationType\n      node {\n        ...Node\n      }\n    }\n  }\n": types.FileModifiedDocument,
    "\n  fragment RoomItem on Room {\n    id\n    name\n    isCreator\n    creator {\n      name\n    }\n  }\n\n  query GetJoinedRooms {\n    me {\n      id\n      joinedRooms {\n        ...RoomItem\n      }\n    }\n  }\n": types.RoomItemFragmentDoc,
    "\n  mutation LeaveRoom($roomId: ID!) {\n    leaveRoom(id: $roomId) {\n      id\n    }\n  }\n": types.LeaveRoomDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($name: String!) {\n    login(name: $name) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation Login($name: String!) {\n    login(name: $name) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateRoom($name: String!, $id: ID!) {\n    createRoom(name: $name, id: $id) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation CreateRoom($name: String!, $id: ID!) {\n    createRoom(name: $name, id: $id) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation JoinRoom($roomId: ID!) {\n    joinRoom(id: $roomId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation JoinRoom($roomId: ID!) {\n    joinRoom(id: $roomId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Logout {\n    logout {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation Logout {\n    logout {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUserAvatar {\n    me {\n      name\n      online\n    }\n  }\n"): (typeof documents)["\n  query GetUserAvatar {\n    me {\n      name\n      online\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateProfile($name: String!) {\n    updateUser(name: $name) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateProfile($name: String!) {\n    updateUser(name: $name) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetFileEditors($fileId: ID!) {\n    file(id: $fileId) {\n      editors {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetFileEditors($fileId: ID!) {\n    file(id: $fileId) {\n      editors {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription FileEditors($fileId: ID!) {\n    fileEditor(fileId: $fileId) {\n      mutationType\n      editor {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription FileEditors($fileId: ID!) {\n    fileEditor(fileId: $fileId) {\n      mutationType\n      editor {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUser {\n    me {\n      name\n    }\n  }\n"): (typeof documents)["\n  query GetUser {\n    me {\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetRoom($roomId: ID!) {\n    room(id: $roomId) {\n      id\n      locked\n      isCreator\n    }\n  }\n"): (typeof documents)["\n  query GetRoom($roomId: ID!) {\n    room(id: $roomId) {\n      id\n      locked\n      isCreator\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SetRoomLocked($roomId: ID!, $locked: Boolean!) {\n    setRoomLocked(roomId: $roomId, locked: $locked) {\n      id\n      locked\n    }\n  }\n"): (typeof documents)["\n  mutation SetRoomLocked($roomId: ID!, $locked: Boolean!) {\n    setRoomLocked(roomId: $roomId, locked: $locked) {\n      id\n      locked\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteRoom($roomId: ID!) {\n    deleteRoom(id: $roomId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteRoom($roomId: ID!) {\n    deleteRoom(id: $roomId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUsers($roomId: ID!) {\n    room(id: $roomId) {\n      id\n      users {\n        id\n        name\n        online\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetUsers($roomId: ID!) {\n    room(id: $roomId) {\n      id\n      users {\n        id\n        name\n        online\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetFileContent($fileId: ID!) {\n    file(id: $fileId) {\n      language\n      content\n    }\n  }\n"): (typeof documents)["\n  query GetFileContent($fileId: ID!) {\n    file(id: $fileId) {\n      language\n      content\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateFileContent($fileId: ID!, $changes: String!) {\n    updateFile(id: $fileId, changes: $changes)\n  }\n"): (typeof documents)["\n  mutation UpdateFileContent($fileId: ID!, $changes: String!) {\n    updateFile(id: $fileId, changes: $changes)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription FileContent($fileId: ID!) {\n    fileChange(id: $fileId)\n  }\n"): (typeof documents)["\n  subscription FileContent($fileId: ID!) {\n    fileChange(id: $fileId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Node on Node {\n    id\n    name\n    type\n    parentId\n    fileId\n  }\n"): (typeof documents)["\n  fragment Node on Node {\n    id\n    name\n    type\n    parentId\n    fileId\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateFile($roomId: ID!, $parentId: ID, $name: String!) {\n    createNode(roomId: $roomId, parentId: $parentId, name: $name, type: FILE) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation CreateFile($roomId: ID!, $parentId: ID, $name: String!) {\n    createNode(roomId: $roomId, parentId: $parentId, name: $name, type: FILE) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateFolder($roomId: ID!, $parentId: ID, $name: String!) {\n    createNode(\n      roomId: $roomId\n      parentId: $parentId\n      name: $name\n      type: FOLDER\n    ) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation CreateFolder($roomId: ID!, $parentId: ID, $name: String!) {\n    createNode(\n      roomId: $roomId\n      parentId: $parentId\n      name: $name\n      type: FOLDER\n    ) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteFile($nodeId: ID!) {\n    deleteNode(id: $nodeId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteFile($nodeId: ID!) {\n    deleteNode(id: $nodeId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RenameFile($nodeId: ID!, $name: String!) {\n    updateNode(id: $nodeId, name: $name) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation RenameFile($nodeId: ID!, $name: String!) {\n    updateNode(id: $nodeId, name: $name) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  \n\n  query GetFiles($roomId: ID!) {\n    room(id: $roomId) {\n      id\n      name\n      nodes {\n        ...Node\n        children {\n          ...Node\n          children {\n            ...Node\n            children {\n              ...Node\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  \n\n  query GetFiles($roomId: ID!) {\n    room(id: $roomId) {\n      id\n      name\n      nodes {\n        ...Node\n        children {\n          ...Node\n          children {\n            ...Node\n            children {\n              ...Node\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  \n\n  subscription FileModified($roomId: ID!) {\n    node(roomId: $roomId) {\n      mutationType\n      node {\n        ...Node\n      }\n    }\n  }\n"): (typeof documents)["\n  \n\n  subscription FileModified($roomId: ID!) {\n    node(roomId: $roomId) {\n      mutationType\n      node {\n        ...Node\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment RoomItem on Room {\n    id\n    name\n    isCreator\n    creator {\n      name\n    }\n  }\n\n  query GetJoinedRooms {\n    me {\n      id\n      joinedRooms {\n        ...RoomItem\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment RoomItem on Room {\n    id\n    name\n    isCreator\n    creator {\n      name\n    }\n  }\n\n  query GetJoinedRooms {\n    me {\n      id\n      joinedRooms {\n        ...RoomItem\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LeaveRoom($roomId: ID!) {\n    leaveRoom(id: $roomId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation LeaveRoom($roomId: ID!) {\n    leaveRoom(id: $roomId) {\n      id\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;