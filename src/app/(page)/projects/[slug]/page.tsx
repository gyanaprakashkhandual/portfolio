import ProjectDetailPage from '../pages/Project.detail.page';

export const metadata = {
  title: "Project Details",
  description:
    "Dive into the details of my projects, from web apps to open source contributions. Each project includes a live demo and source code. See the tech stack and tags for each one.",
}

function page() {
  return (
    <div>
      <ProjectDetailPage/>
    </div>
  )
}

export default page