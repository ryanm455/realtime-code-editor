"use client";

import { useFileContent, useSaveContent } from "@/hooks/editor";
import dynamic from "next/dynamic";
import { Skeleton } from "./ui/skeleton";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  loading: () => <Skeleton className="h-full w-full m-2" />,
});

type EditorProps = {
  fileId: string;
  className?: string;
};

const Editor = ({ className, fileId }: EditorProps) => {
  const { content, handleContentChange, language, getChanges } =
    useFileContent(fileId);
  const { setHasSentMutation } = useSaveContent(fileId, getChanges);

  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      handleContentChange(value);
      setHasSentMutation(false);
    }
  };

  return (
    <MonacoEditor
      className={className}
      height="100%"
      defaultLanguage={language}
      value={content}
      onChange={handleEditorChange}
    />
  );
};

export default Editor;
