import { cn } from "@/lib/utils";

type Props = {
  title: string;
  className?: string;
  children?: React.ReactNode;
};

const PaneHeader = ({ title, children, className }: Props) => {
  if (children) {
    return (
      <div className={cn("flex items-center justify-between", className)}>
        <div className="font-semibold">{title}</div>
        <div className="flex gap-2">{children}</div>
      </div>
    );
  }

  return <div className={cn("font-semibold", className)}>{title}</div>;
};

export default PaneHeader;
