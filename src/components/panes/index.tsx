import { FileIcon } from "@radix-ui/react-icons";
import { CogIcon, UserIcon } from "lucide-react";
import FilePane, { FilesPaneSkeleton } from "./File";
import UserPane, { UserPaneSkeleton } from "./User";
import SettingsPane, { SettingsPaneSkeleton } from "./Settings";
import {
  ForwardRefExoticComponent,
  MemoExoticComponent,
  SVGProps,
} from "react";

export enum PaneType {
  File = "file",
  User = "user",
  Setting = "setting",
  None = "none",
}

export type PaneProps = {
  className?: string;
  roomId: number;
};

type PaneComponent = (props: PaneProps) => JSX.Element;

export type Pane = {
  type: PaneType;
  component: PaneComponent | MemoExoticComponent<PaneComponent>;
  skeleton: (props: { className?: string }) => JSX.Element;
  icon: ForwardRefExoticComponent<SVGProps<SVGSVGElement>>;
};

const paneList: Pane[] = [
  {
    type: PaneType.File,
    component: FilePane,
    icon: FileIcon as any,
    skeleton: FilesPaneSkeleton,
  },
  {
    type: PaneType.User,
    component: UserPane,
    icon: UserIcon,
    skeleton: UserPaneSkeleton,
  },
  {
    type: PaneType.Setting,
    component: SettingsPane,
    icon: CogIcon,
    skeleton: SettingsPaneSkeleton,
  },
];

export default paneList;
