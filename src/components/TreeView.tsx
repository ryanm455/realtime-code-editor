import React, {
  memo,
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef,
  MemoExoticComponent,
  useReducer,
  useMemo,
} from "react";
import { FileIcon, FolderIcon, FolderOpenIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ContextMenu, ContextMenuTrigger } from "./ui/context-menu";
import useExpanded from "@/hooks/expanded";

type TreeViewItemType = "FILE" | "FOLDER";

export interface TreeViewItem<T> {
  type: TreeViewItemType;
  id: string;
  name: string;
  children: T[];
}

export interface TreeViewRef {
  collapseAll: () => void;
  expandAll: () => void;
}

type ItemContextType<T> = (props: { node: T }) => JSX.Element;

interface TreeViewProps<T extends TreeViewItem<T>> {
  elements: T[];
  isNodeSelected?: (node: T) => boolean;
  onNodeClick?: (item: T) => void;
  contextMenuContent?: (
    type?: TreeViewItemType,
    nodeId?: string
  ) => JSX.Element;
  itemContext?: MemoExoticComponent<ItemContextType<T>> | ItemContextType<T>;
}

const TreeView = <T extends TreeViewItem<T>>(
  {
    elements,
    onNodeClick,
    isNodeSelected,
    contextMenuContent,
    itemContext: ItemContext,
  }: TreeViewProps<T>,
  ref: React.ForwardedRef<TreeViewRef>
) => {
  const getIds = useCallback(
    (node: T): string[] => [node.id, ...(node.children?.flatMap(getIds) ?? [])],
    []
  );

  const allIds = useMemo(() => elements.flatMap(getIds), [elements, getIds]);

  const { expanded, expandAll, collapseAll, toggleExpanded, isExpanded } =
    useExpanded(allIds);

  useImperativeHandle(ref, () => ({ collapseAll, expandAll }), [
    collapseAll,
    expandAll,
  ]);

  const renderNode = useCallback(
    (node: T): JSX.Element => {
      const Icon =
        node.type === "FOLDER"
          ? isExpanded(node.id)
            ? FolderOpenIcon
            : FolderIcon
          : FileIcon;

      return (
        <li key={node.id}>
          <ContextMenu>
            <ContextMenuTrigger>
              <span
                onClick={
                  node.type === "FOLDER"
                    ? () => toggleExpanded(node.id)
                    : () => onNodeClick?.(node)
                }
                className={cn(
                  "cursor-pointer flex items-center gap-2 p-1 rounded hover:bg-gray-100",
                  {
                    "bg-gray-100": isNodeSelected?.(node),
                  }
                )}
              >
                <Icon />
                {node.name}
                {node.type === "FILE" && ItemContext && (
                  <div className="ml-auto">
                    <ItemContext node={node} />
                  </div>
                )}
              </span>
            </ContextMenuTrigger>
            {contextMenuContent?.(node.type, node.id)}
          </ContextMenu>
          {node.children?.length > 0 && isExpanded(node.id) && (
            <ul className="ml-4 pl-1 border-l border-gray-400">
              {node.children.map(renderNode)}
            </ul>
          )}
        </li>
      );
    },
    [
      expanded,
      isExpanded,
      onNodeClick,
      isNodeSelected,
      toggleExpanded,
      contextMenuContent,
      ItemContext,
    ]
  );

  return (
    <div className="flex flex-col h-full gap-2">
      <ul>{elements.map(renderNode)}</ul>
      <ContextMenu>
        <ContextMenuTrigger className="flex-1 min-h-[200px]" />
        {contextMenuContent?.()}
      </ContextMenu>
    </div>
  );
};

export default memo(forwardRef(TreeView)) as <T extends TreeViewItem<T>>(
  props: TreeViewProps<T> & { ref?: React.Ref<TreeViewRef> }
) => JSX.Element;
