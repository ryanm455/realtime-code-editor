import { memo, Suspense, useCallback, useEffect, useRef } from "react";
import TreeView, { TreeViewRef } from "../TreeView";
import { useParams, useRouter } from "next/navigation";
import { PaneProps } from ".";
import {
  FileModifiedSubscription,
  GetFilesQuery,
  NodeFragment,
} from "@/gql/graphql";
import { useSuspenseQuery } from "@apollo/client";
import { ContextMenuContent, ContextMenuItem } from "../ui/context-menu";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import FileEditors, { FileEditorsSkeleton } from "../FileEditors";
import PaneHeader from "./Header";
import { Skeleton } from "../ui/skeleton";
import {
  createFile,
  createFolder,
  deleteFile,
  renameFile,
} from "@/lib/file-queries";
import { GET_FILES_QUERY, FILE_MODIFIED_SUBSCRIPTION } from "@/lib/mutations";

const typeMap = {
  FILE: "file",
  FOLDER: "folder",
};

const NodeItemContext = memo(({ node }: { node: NodeFragment }) => (
  <Suspense fallback={<FileEditorsSkeleton />}>
    <FileEditors fileId={Number(node.fileId!)} />
  </Suspense>
));

NodeItemContext.displayName = "NodeItemContext";

const FilePane = memo(({ className, roomId }: PaneProps) => {
  const router = useRouter();
  const treeViewRef = useRef<TreeViewRef>(null);
  const params = useParams<{ fileId?: string }>();
  const { data, subscribeToMore } = useSuspenseQuery<GetFilesQuery>(
    GET_FILES_QUERY,
    {
      variables: { roomId },
      fetchPolicy: "cache-and-network",
    }
  );

  const handleNodeClick = useCallback(
    (node: NodeFragment) => {
      if (node.type === "FILE") {
        router.push(`/editor/${roomId}/${node.fileId!}`);
      }
    },
    [router, roomId]
  );

  const renderContextMenu = useCallback(
    (type?: "FILE" | "FOLDER", nodeId?: string) => (
      <ContextMenuContent>
        <ContextMenuItem onClick={() => createFile(roomId, nodeId)}>
          Create file
        </ContextMenuItem>
        <ContextMenuItem onClick={() => createFolder(roomId, nodeId)}>
          Create folder
        </ContextMenuItem>
        {nodeId && type && (
          <>
            <ContextMenuItem onClick={() => deleteFile(nodeId)}>
              Delete {typeMap[type]}
            </ContextMenuItem>
            <ContextMenuItem onClick={() => renameFile(nodeId)}>
              Rename {typeMap[type]}
            </ContextMenuItem>
          </>
        )}
      </ContextMenuContent>
    ),
    [createFile, createFolder, deleteFile, renameFile, roomId]
  );

  useEffect(() => {
    const unsubscribe = subscribeToMore<FileModifiedSubscription>({
      document: FILE_MODIFIED_SUBSCRIPTION,
      variables: { roomId },
      // @ts-ignore
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const { mutationType, node } = subscriptionData.data.node;

        switch (mutationType) {
          case "CREATED":
            return {
              room: {
                ...prev.room,
                nodes: [...prev.room.nodes, node],
              },
            };
          case "UPDATED":
            return {
              room: {
                ...prev.room,
                // @ts-ignore
                nodes: prev.room.nodes.map((n: NodeFragment) => n.id === node.id ? node : n),
              },
            };
          case "DELETED":
            return {
              room: {
                ...prev.room,
                // @ts-ignore
                nodes: prev.room.nodes.filter((n: NodeFragment) => n.id !== node.id),
              },
            };
        }
      },
    });

    return unsubscribe;
  }, [roomId, subscribeToMore]);

  const isNodeSelected = useCallback(
    (node: NodeFragment) => node.fileId === params.fileId,
    [params.fileId]
  );

  return (
    <div className={cn("p-4", className)}>
      <PaneHeader title={data.room.name} className="pb-1">
        <>
          <Button
            size="sm"
            onClick={() => treeViewRef.current?.collapseAll()}
            variant="ghost"
          >
            Collapse All
          </Button>
          <Button
            size="sm"
            onClick={() => treeViewRef.current?.expandAll()}
            variant="ghost"
          >
            Expand All
          </Button>
        </>
      </PaneHeader>
      <TreeView
        ref={treeViewRef}
        elements={(
          data.room.nodes as unknown as (NodeFragment & { children: any[] })[]
        ).filter((n) => !n.parentId)}
        isNodeSelected={isNodeSelected}
        onNodeClick={handleNodeClick}
        contextMenuContent={renderContextMenu}
        itemContext={NodeItemContext}
      />
    </div>
  );
});

export const FilesPaneSkeleton = ({ className }: { className?: string }) => (
  <div className={cn("p-4", className)}>
    <PaneHeader title="Files" className="pb-1">
      <Button size="sm" variant="ghost">
        Collapse All
      </Button>
      <Button size="sm" variant="ghost">
        Expand All
      </Button>
    </PaneHeader>
    {Array.from({ length: 5 }).map((_, i) => (
      <Skeleton key={i} className="w-full h-6 mt-2" />
    ))}
  </div>
);

FilePane.displayName = "FilePane";

export default FilePane;
