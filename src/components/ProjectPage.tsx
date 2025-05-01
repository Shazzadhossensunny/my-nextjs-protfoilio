"use client";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ProjectsProps } from "@/types/project.type";
import LoadingPage from "@/app/loading";
import Link from "next/link";

const ProjectsPage: React.FC<ProjectsProps> = ({ projects, isLoading }) => {
  // const router = useRouter();

  // const handleProjectClick = (projectId: string) => {
  //   router.push(`/projects/${projectId}`);
  // };
  // const handleButtonClick = (e: React.MouseEvent, link?: string) => {
  //   e.stopPropagation();
  //   if (link) {
  //     window.open(link, "_blank");
  //   }
  // };
  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <LoadingPage />
      </div>
    );
  }
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            My Projects
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A collection of my work showcasing my skills in web development
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.data.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <Link href={`/projects/${project._id}`}>
                <div className="relative h-48 w-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </Link>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm"
                    >
                      {tech.trim()}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Link href={`/projects/${project._id}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </Link>
                  {project.links.live && (
                    <Button
                      variant="outline"
                      className="px-3"
                      onClick={() => window.open(project.links.live, "_blank")}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
};

export default ProjectsPage;
