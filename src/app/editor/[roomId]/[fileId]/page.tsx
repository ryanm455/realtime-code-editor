import { Suspense } from "react";
import Editor from "@/components/Editor";
import { Skeleton } from "@/components/ui/skeleton";

type EditorProps = {
  params: {
    roomId: string;
    fileId: string;
  };
};

const EditorPage = ({ params: { fileId } }: EditorProps) => (
  <Suspense fallback={<Skeleton className="h-full w-full m-2" />}>
    <Editor fileId={fileId} className="pt-2 h-full" />
  </Suspense>
);

export default EditorPage;
