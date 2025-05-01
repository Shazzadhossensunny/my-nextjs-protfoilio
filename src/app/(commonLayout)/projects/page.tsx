import ProjectsPage from "@/components/ProjectPage";
import { getAllProjects } from "@/utils/actions/sendMessageUser";

const AllProjectsPage = async () => {
  const projects = await getAllProjects();
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <ProjectsPage projects={projects} isLoading={false} />;
    </main>
  );
};

export default AllProjectsPage;
