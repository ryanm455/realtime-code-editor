"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  className?: string;
};

const links = [
  { href: "/profile", label: "General" },
  { href: "/profile/rooms", label: "Joined Rooms" },
  { href: "/profile/logout", label: "Logout" },
];

const ProfileDrawer = ({ className }: Props) => {
  const pathname = usePathname();
  return (
    <aside
      className={cn(
        className,
        "flex flex-row items-center sm:flex-col gap-10 sm:gap-6 sm:items-baseline sm:min-w-[150px]"
      )}
    >
      <h1 className="text-xl sm:text-3xl font-semibold">Profile</h1>
      <nav className="flex flex-row items-center sm:items-baseline sm:flex-col gap-4 text-sm text-muted-foreground">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={cn({
              "font-semibold text-primary": pathname === l.href,
            })}
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default ProfileDrawer;
