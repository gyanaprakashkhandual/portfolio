import ProjectsPage from "./pages/Projects.page";

export const metadata = {
  title: "Projects",
  description:
    "Explore my projects, from web apps to open source contributions. Each project includes a live demo and source code. See the tech stack and tags for each one.",
};

export default function Projects() {
  return (
    <div>
      <ProjectsPage />
    </div>
  );
}
