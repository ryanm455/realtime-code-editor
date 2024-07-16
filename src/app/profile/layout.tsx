import Menu from "@/components/Menu";
import ProfileDrawer from "@/components/ProfileDrawer";

type LayoutProps = {
  children: React.ReactNode;
};

const ProfileLayout = ({ children }: Readonly<LayoutProps>) => (
  <div className="h-[calc(100vh-36px)] bg-gray-100">
    <Menu />
    <div className="flex h-full max-w-6xl mx-auto container py-3 px-6 mt-4 flex-col sm:flex-row">
      <ProfileDrawer className="mb-5 sm:mb-0" />
      {children}
    </div>
  </div>
);

export const dynamic = "force-dynamic"

export default ProfileLayout;
