import ProjectDetail from "@/components/ProjectDetails";
import { getProjectById } from "@/utils/actions/sendMessageUser";

export default async function ProjectPage({ params }: any) {
  const { id } = await params;
  const projectData = await getProjectById(id);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <ProjectDetail project={projectData.data} />
    </main>
  );
}
