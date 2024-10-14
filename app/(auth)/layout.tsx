interface LayoutProps {
  children: React.ReactNode;
}

function layout({ children }: LayoutProps) {
  return (
    <div className="flex justify-center items-center h-screen">{children}</div>
  );
}
export default layout;
