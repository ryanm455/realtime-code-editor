"use client";

import { cn } from "@/lib/utils";
import { memo, Suspense, MouseEventHandler } from "react";
import paneList, { Pane, PaneType } from "./panes";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { parseAsStringEnum, useQueryState } from "nuqs";

type NavItemProps = {
  pane: Pane;
  onClick?: MouseEventHandler<HTMLLIElement>;
  isSelected?: boolean;
};

type NavDrawerProps = {
  roomId: number;
};

const NavItem = ({ pane, onClick, isSelected }: NavItemProps) => (
  <li onClick={onClick}>
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={cn(
            "py-2 px-4 my-2 flex justify-center rounded hover:cursor-pointer",
            { "bg-gray-300": isSelected }
          )}
        >
          <pane.icon className="w-8 h-8" />
        </div>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>{pane.type}</p>
      </TooltipContent>
    </Tooltip>
  </li>
);

const NavDrawer = ({ roomId }: NavDrawerProps) => {
  const [selectedPane, setSelectedPane] = useQueryState<PaneType>(
    "pane",
    parseAsStringEnum<PaneType>(Object.values(PaneType)).withDefault(
      PaneType.File
    )
  );

  const currentPane =
    selectedPane !== PaneType.None
      ? paneList.find((pane) => pane.type === selectedPane)
      : null;

  return (
    <aside className="flex border-r border-gray-200 h-full">
      <TooltipProvider>
        <ul className="min-w-20 m-0 p-4 bg-gray-100">
          {paneList.map((pane) => (
            <NavItem
              key={pane.type}
              pane={pane}
              isSelected={currentPane?.type === pane.type}
              onClick={() =>
                setSelectedPane(
                  pane.type === currentPane?.type ? PaneType.None : pane.type
                )
              }
            />
          ))}
        </ul>
      </TooltipProvider>
      {currentPane && (
        <Suspense fallback={<currentPane.skeleton className="min-w-[300px]" />}>
          <currentPane.component className="min-w-[300px]" roomId={roomId} />
        </Suspense>
      )}
    </aside>
  );
};

export default memo(NavDrawer);
