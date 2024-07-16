export const dynamic = "force-dynamic"; // didn't work when not placed in a layout for "/"

const IndexLayout = ({ children }: Readonly<{ children: React.ReactNode }>) =>
  children;

export default IndexLayout;
