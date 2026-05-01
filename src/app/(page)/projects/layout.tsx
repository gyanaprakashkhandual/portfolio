import ProjectsSidebar from "./components/Project.sidebar";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex overflow-hidden"
      style={{ height: "calc(100vh - 56px)" }}>
        <ProjectsSidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
