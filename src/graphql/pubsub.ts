import { Node, User } from "@prisma/client";
import { PubSub } from "graphql-subscriptions";

export const pubsub = new PubSub();

export interface PubSubEvent {
  mutationType: MutationType;
}

export interface PubSubNodeEvent extends PubSubEvent {
  node: Node;
}

export interface PubSubFileEditorEvent extends PubSubEvent {
  fileId: number;
  editor: User;
}

export interface PubSubFileChangeEvent {
  id: number;
  changes: string;
}

export enum MutationType {
  CREATED = "CREATED",
  UPDATED = "UPDATED",
  DELETED = "DELETED",
}
