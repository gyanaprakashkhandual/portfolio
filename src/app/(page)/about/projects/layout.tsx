import ProjectSidebar from "../src/components/sidebars/Project.sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <ProjectSidebar />
      {children}
    </div>
  );
}
