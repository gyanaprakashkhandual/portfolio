import BlogsPage from "./pages/Main.page";

export const metadata = {
  title: "Blogs - Gyan's",
  description:
    "In-depth guides for open-source packages. Drop-in documentation with working examples.",
};

export default function Page() {
  return (
    <div>
      <BlogsPage />
    </div>
  );
}
