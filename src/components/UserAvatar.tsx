import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";

const UserAvatar = ({
  username,
  online,
  className,
}: {
  username: string;
  online?: boolean;
  className?: string;
}) => (
  <div className={cn("relative w-8 h-8", className)}>
    <Avatar className="w-full h-full">
      <AvatarFallback>
        {username
          .split(" ")
          .map((u) => u[0].toUpperCase())
          .join("")}
      </AvatarFallback>
    </Avatar>
    {online != undefined && (
      <div
        className={cn(`absolute bottom-0 right-0 w-3 h-3 rounded-full`, {
          "bg-green-400": online,
          "bg-gray-400": !online,
        })}
      />
    )}
  </div>
);

export const UserAvatarSkeleton = ({ className }: { className?: string }) => (
  <Skeleton className={cn("w-8 h-8 rounded-full", className)} />
);

export default UserAvatar;
