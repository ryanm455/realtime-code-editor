import gql from "graphql-tag";

export const NODE_FRAGMENT = gql`
  fragment Node on Node {
    id
    name
    type
    parentId
    fileId
  }
`;

export const CREATE_FILE_MUTATION = gql`
  mutation CreateFile($roomId: ID!, $parentId: ID, $name: String!) {
    createNode(roomId: $roomId, parentId: $parentId, name: $name, type: FILE) {
      id
      name
    }
  }
`;

export const CREATE_FOLDER_MUTATION = gql`
  mutation CreateFolder($roomId: ID!, $parentId: ID, $name: String!) {
    createNode(
      roomId: $roomId
      parentId: $parentId
      name: $name
      type: FOLDER
    ) {
      id
      name
    }
  }
`;

export const DELETE_FILE_MUTATION = gql`
  mutation DeleteFile($nodeId: ID!) {
    deleteNode(id: $nodeId) {
      id
    }
  }
`;

export const RENAME_FILE_MUTATION = gql`
  mutation RenameFile($nodeId: ID!, $name: String!) {
    updateNode(id: $nodeId, name: $name) {
      id
      name
    }
  }
`;

export const GET_FILES_QUERY = gql`
  ${NODE_FRAGMENT}

  query GetFiles($roomId: ID!) {
    room(id: $roomId) {
      id
      name
      nodes {
        ...Node
        children {
          ...Node
          children {
            ...Node
            children {
              ...Node
            }
          }
        }
      }
    }
  }
`;

export const FILE_MODIFIED_SUBSCRIPTION = gql`
  ${NODE_FRAGMENT}

  subscription FileModified($roomId: ID!) {
    node(roomId: $roomId) {
      mutationType
      node {
        ...Node
      }
    }
  }
`;

export const GET_JOINED_ROOMS = gql`
  fragment RoomItem on Room {
    id
    name
    isCreator
    creator {
      name
    }
  }

  query GetJoinedRooms {
    me {
      id
      joinedRooms {
        ...RoomItem
      }
    }
  }
`;

export const LEAVE_ROOM_MUTATION = gql`
  mutation LeaveRoom($roomId: ID!) {
    leaveRoom(id: $roomId) {
      id
    }
  }
`;

export const DELETE_ROOM_MUTATION = gql`
  mutation DeleteRoom($roomId: ID!) {
    deleteRoom(id: $roomId) {
      id
    }
  }
`;

export const GET_USER_QUERY = gql`
  query GetUser {
    me {
      name
    }
  }
`;
