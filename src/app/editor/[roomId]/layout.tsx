import Menu from "@/components/Menu";
import { Suspense } from "react";
import NavDrawer from "@/components/NavDrawer";

type LayoutProps = {
  children: React.ReactNode;
  params: {
    roomId: string;
  };
};

export const dynamic = "force-dynamic";

const EditorLayout = ({
  children,
  params: { roomId },
}: Readonly<LayoutProps>) => (
  <div className="h-[calc(100vh-36px)]">
    <Menu roomId={roomId} />
    <div className="flex h-full">
      <NavDrawer roomId={Number(roomId)} />
      {children}
    </div>
  </div>
);

export default EditorLayout;
