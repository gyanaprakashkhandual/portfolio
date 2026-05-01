import Sidebar from "../blogs/components/Blog.sidebar";

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex overflow-hidden"
      style={{ height: "calc(100vh - 56px)" }}
    >
      <Sidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
