/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Document = {
  __typename?: 'Document';
  content?: Maybe<Scalars['String']['output']>;
  editors: Array<User>;
  id: Scalars['ID']['output'];
  language: Scalars['String']['output'];
  lastModifiedBy: User;
  node: Node;
};

export type Mutation = {
  __typename?: 'Mutation';
  createNode: Node;
  createRoom: Room;
  deleteNode: Node;
  deleteRoom: Room;
  joinRoom: Room;
  leaveRoom: Room;
  login: User;
  logout: User;
  setRoomLocked: Room;
  updateFile: Scalars['String']['output'];
  updateNode: Node;
  updateUser: User;
};


export type MutationCreateNodeArgs = {
  name: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['ID']['input']>;
  roomId: Scalars['ID']['input'];
  type: NodeType;
};


export type MutationCreateRoomArgs = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};


export type MutationDeleteNodeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteRoomArgs = {
  id: Scalars['ID']['input'];
};


export type MutationJoinRoomArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLeaveRoomArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  name: Scalars['String']['input'];
};


export type MutationSetRoomLockedArgs = {
  locked: Scalars['Boolean']['input'];
  roomId: Scalars['ID']['input'];
};


export type MutationUpdateFileArgs = {
  changes: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};


export type MutationUpdateNodeArgs = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  name: Scalars['String']['input'];
};

export type Node = {
  __typename?: 'Node';
  children: Array<Node>;
  file?: Maybe<Document>;
  fileId?: Maybe<Scalars['ID']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  parent: Node;
  parentId?: Maybe<Scalars['ID']['output']>;
  room: Room;
  roomId: Scalars['ID']['output'];
  type: NodeType;
};

export enum NodeType {
  File = 'FILE',
  Folder = 'FOLDER'
}

export type Query = {
  __typename?: 'Query';
  file: Document;
  me?: Maybe<User>;
  node: Node;
  room: Room;
};


export type QueryFileArgs = {
  id: Scalars['ID']['input'];
};


export type QueryNodeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRoomArgs = {
  id: Scalars['ID']['input'];
};

export type Room = {
  __typename?: 'Room';
  creator: User;
  creatorId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  isCreator: Scalars['Boolean']['output'];
  locked: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  nodes: Array<Node>;
  users: Array<User>;
};

export type Subscription = {
  __typename?: 'Subscription';
  fileChange: Scalars['String']['output'];
  fileEditor: SubscriptionFileEditorEvent;
  node: SubscriptionNodeEvent;
};


export type SubscriptionFileChangeArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionFileEditorArgs = {
  fileId: Scalars['ID']['input'];
};


export type SubscriptionNodeArgs = {
  roomId: Scalars['ID']['input'];
};

export type SubscriptionEvent = {
  mutationType: Scalars['String']['output'];
};

export type SubscriptionFileEditorEvent = SubscriptionEvent & {
  __typename?: 'SubscriptionFileEditorEvent';
  editor: User;
  fileId: Scalars['ID']['output'];
  mutationType: Scalars['String']['output'];
};

export type SubscriptionNodeEvent = SubscriptionEvent & {
  __typename?: 'SubscriptionNodeEvent';
  mutationType: Scalars['String']['output'];
  node: Node;
};

export type User = {
  __typename?: 'User';
  createdRooms: Array<Room>;
  editingFiles: Array<Document>;
  id: Scalars['ID']['output'];
  joinedRooms: Array<Room>;
  name: Scalars['String']['output'];
  online: Scalars['Boolean']['output'];
};

export type LoginMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'User', id: string, name: string } };

export type CreateRoomMutationVariables = Exact<{
  name: Scalars['String']['input'];
  id: Scalars['ID']['input'];
}>;


export type CreateRoomMutation = { __typename?: 'Mutation', createRoom: { __typename?: 'Room', id: string, name: string } };

export type JoinRoomMutationVariables = Exact<{
  roomId: Scalars['ID']['input'];
}>;


export type JoinRoomMutation = { __typename?: 'Mutation', joinRoom: { __typename?: 'Room', id: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'User', id: string } };

export type GetUserAvatarQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserAvatarQuery = { __typename?: 'Query', me?: { __typename?: 'User', name: string, online: boolean } | null };

export type UpdateProfileMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, name: string } };

export type GetFileEditorsQueryVariables = Exact<{
  fileId: Scalars['ID']['input'];
}>;


export type GetFileEditorsQuery = { __typename?: 'Query', file: { __typename?: 'Document', editors: Array<{ __typename?: 'User', id: string, name: string }> } };

export type FileEditorsSubscriptionVariables = Exact<{
  fileId: Scalars['ID']['input'];
}>;


export type FileEditorsSubscription = { __typename?: 'Subscription', fileEditor: { __typename?: 'SubscriptionFileEditorEvent', mutationType: string, editor: { __typename?: 'User', id: string, name: string } } };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', me?: { __typename?: 'User', name: string } | null };

export type GetRoomQueryVariables = Exact<{
  roomId: Scalars['ID']['input'];
}>;


export type GetRoomQuery = { __typename?: 'Query', room: { __typename?: 'Room', id: string, locked: boolean, isCreator: boolean } };

export type SetRoomLockedMutationVariables = Exact<{
  roomId: Scalars['ID']['input'];
  locked: Scalars['Boolean']['input'];
}>;


export type SetRoomLockedMutation = { __typename?: 'Mutation', setRoomLocked: { __typename?: 'Room', id: string, locked: boolean } };

export type DeleteRoomMutationVariables = Exact<{
  roomId: Scalars['ID']['input'];
}>;


export type DeleteRoomMutation = { __typename?: 'Mutation', deleteRoom: { __typename?: 'Room', id: string } };

export type GetUsersQueryVariables = Exact<{
  roomId: Scalars['ID']['input'];
}>;


export type GetUsersQuery = { __typename?: 'Query', room: { __typename?: 'Room', id: string, users: Array<{ __typename?: 'User', id: string, name: string, online: boolean }> } };

export type GetFileContentQueryVariables = Exact<{
  fileId: Scalars['ID']['input'];
}>;


export type GetFileContentQuery = { __typename?: 'Query', file: { __typename?: 'Document', language: string, content?: string | null } };

export type UpdateFileContentMutationVariables = Exact<{
  fileId: Scalars['ID']['input'];
  changes: Scalars['String']['input'];
}>;


export type UpdateFileContentMutation = { __typename?: 'Mutation', updateFile: string };

export type FileContentSubscriptionVariables = Exact<{
  fileId: Scalars['ID']['input'];
}>;


export type FileContentSubscription = { __typename?: 'Subscription', fileChange: string };

export type NodeFragment = { __typename?: 'Node', id: string, name: string, type: NodeType, parentId?: string | null, fileId?: string | null } & { ' $fragmentName'?: 'NodeFragment' };

export type CreateFileMutationVariables = Exact<{
  roomId: Scalars['ID']['input'];
  parentId?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
}>;


export type CreateFileMutation = { __typename?: 'Mutation', createNode: { __typename?: 'Node', id: string, name: string } };

export type CreateFolderMutationVariables = Exact<{
  roomId: Scalars['ID']['input'];
  parentId?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
}>;


export type CreateFolderMutation = { __typename?: 'Mutation', createNode: { __typename?: 'Node', id: string, name: string } };

export type DeleteFileMutationVariables = Exact<{
  nodeId: Scalars['ID']['input'];
}>;


export type DeleteFileMutation = { __typename?: 'Mutation', deleteNode: { __typename?: 'Node', id: string } };

export type RenameFileMutationVariables = Exact<{
  nodeId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
}>;


export type RenameFileMutation = { __typename?: 'Mutation', updateNode: { __typename?: 'Node', id: string, name: string } };

export type GetFilesQueryVariables = Exact<{
  roomId: Scalars['ID']['input'];
}>;


export type GetFilesQuery = { __typename?: 'Query', room: { __typename?: 'Room', id: string, name: string, nodes: Array<(
      { __typename?: 'Node', children: Array<(
        { __typename?: 'Node', children: Array<(
          { __typename?: 'Node', children: Array<(
            { __typename?: 'Node' }
            & { ' $fragmentRefs'?: { 'NodeFragment': NodeFragment } }
          )> }
          & { ' $fragmentRefs'?: { 'NodeFragment': NodeFragment } }
        )> }
        & { ' $fragmentRefs'?: { 'NodeFragment': NodeFragment } }
      )> }
      & { ' $fragmentRefs'?: { 'NodeFragment': NodeFragment } }
    )> } };

export type FileModifiedSubscriptionVariables = Exact<{
  roomId: Scalars['ID']['input'];
}>;


export type FileModifiedSubscription = { __typename?: 'Subscription', node: { __typename?: 'SubscriptionNodeEvent', mutationType: string, node: (
      { __typename?: 'Node' }
      & { ' $fragmentRefs'?: { 'NodeFragment': NodeFragment } }
    ) } };

export type RoomItemFragment = { __typename?: 'Room', id: string, name: string, isCreator: boolean, creator: { __typename?: 'User', name: string } } & { ' $fragmentName'?: 'RoomItemFragment' };

export type GetJoinedRoomsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetJoinedRoomsQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, joinedRooms: Array<(
      { __typename?: 'Room' }
      & { ' $fragmentRefs'?: { 'RoomItemFragment': RoomItemFragment } }
    )> } | null };

export type LeaveRoomMutationVariables = Exact<{
  roomId: Scalars['ID']['input'];
}>;


export type LeaveRoomMutation = { __typename?: 'Mutation', leaveRoom: { __typename?: 'Room', id: string } };

export const NodeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Node"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Node"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"fileId"}}]}}]} as unknown as DocumentNode<NodeFragment, unknown>;
export const RoomItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RoomItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Room"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isCreator"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<RoomItemFragment, unknown>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const CreateRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateRoom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRoom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateRoomMutation, CreateRoomMutationVariables>;
export const JoinRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"JoinRoom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"joinRoom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<JoinRoomMutation, JoinRoomMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const GetUserAvatarDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserAvatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"online"}}]}}]}}]} as unknown as DocumentNode<GetUserAvatarQuery, GetUserAvatarQueryVariables>;
export const UpdateProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const GetFileEditorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFileEditors"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fileId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"file"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fileId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetFileEditorsQuery, GetFileEditorsQueryVariables>;
export const FileEditorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"FileEditors"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fileId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fileEditor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fileId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fileId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mutationType"}},{"kind":"Field","name":{"kind":"Name","value":"editor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<FileEditorsSubscription, FileEditorsSubscriptionVariables>;
export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
export const GetRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRoom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"room"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"locked"}},{"kind":"Field","name":{"kind":"Name","value":"isCreator"}}]}}]}}]} as unknown as DocumentNode<GetRoomQuery, GetRoomQueryVariables>;
export const SetRoomLockedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetRoomLocked"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locked"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setRoomLocked"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}},{"kind":"Argument","name":{"kind":"Name","value":"locked"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locked"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"locked"}}]}}]}}]} as unknown as DocumentNode<SetRoomLockedMutation, SetRoomLockedMutationVariables>;
export const DeleteRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteRoom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteRoom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteRoomMutation, DeleteRoomMutationVariables>;
export const GetUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"room"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"online"}}]}}]}}]}}]} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>;
export const GetFileContentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFileContent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fileId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"file"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fileId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]} as unknown as DocumentNode<GetFileContentQuery, GetFileContentQueryVariables>;
export const UpdateFileContentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateFileContent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fileId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"changes"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fileId"}}},{"kind":"Argument","name":{"kind":"Name","value":"changes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"changes"}}}]}]}}]} as unknown as DocumentNode<UpdateFileContentMutation, UpdateFileContentMutationVariables>;
export const FileContentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"FileContent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fileId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fileChange"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fileId"}}}]}]}}]} as unknown as DocumentNode<FileContentSubscription, FileContentSubscriptionVariables>;
export const CreateFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"parentId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createNode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}},{"kind":"Argument","name":{"kind":"Name","value":"parentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"parentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"EnumValue","value":"FILE"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateFileMutation, CreateFileMutationVariables>;
export const CreateFolderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFolder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"parentId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createNode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}},{"kind":"Argument","name":{"kind":"Name","value":"parentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"parentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"EnumValue","value":"FOLDER"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateFolderMutation, CreateFolderMutationVariables>;
export const DeleteFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nodeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteNode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nodeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteFileMutation, DeleteFileMutationVariables>;
export const RenameFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RenameFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nodeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateNode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nodeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<RenameFileMutation, RenameFileMutationVariables>;
export const GetFilesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFiles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"room"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Node"}},{"kind":"Field","name":{"kind":"Name","value":"children"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Node"}},{"kind":"Field","name":{"kind":"Name","value":"children"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Node"}},{"kind":"Field","name":{"kind":"Name","value":"children"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Node"}}]}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Node"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Node"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"fileId"}}]}}]} as unknown as DocumentNode<GetFilesQuery, GetFilesQueryVariables>;
export const FileModifiedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"FileModified"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mutationType"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Node"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Node"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Node"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"fileId"}}]}}]} as unknown as DocumentNode<FileModifiedSubscription, FileModifiedSubscriptionVariables>;
export const GetJoinedRoomsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetJoinedRooms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"joinedRooms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RoomItem"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RoomItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Room"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isCreator"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetJoinedRoomsQuery, GetJoinedRoomsQueryVariables>;
export const LeaveRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LeaveRoom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leaveRoom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<LeaveRoomMutation, LeaveRoomMutationVariables>;