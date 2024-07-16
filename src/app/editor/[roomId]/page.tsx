type EditorProps = {
  params: {
    roomId: string[];
  };
};

const EditorPage = ({}: EditorProps) => (
  <div className="h-full w-full grid place-items-center">Select a file</div>
);

export default EditorPage;
