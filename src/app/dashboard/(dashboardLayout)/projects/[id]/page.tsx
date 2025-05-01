"use client";
import { useGetSingleProjectQuery } from "@/redux/features/projects/projectApi";
import { format } from "date-fns";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Calendar, Github, ExternalLink, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import LoadingPage from "../loading";

export default function SingleProjectPage() {
  const params = useParams();
  const id = params.id;
  const { data: projectData, isLoading } = useGetSingleProjectQuery(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingPage />
      </div>
    );
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown date";
    return format(new Date(dateString), "MMMM d, yyyy");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Project Title & Links */}
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold">{projectData?.data.title}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
              {projectData?.data.description}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <a
                href={projectData?.data.links.github.frontend}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github className="h-4 w-4" />
                Frontend
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a
                href={projectData?.data.links.github.backend}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github className="h-4 w-4" />
                Backend
              </a>
            </Button>
            <Button asChild>
              <a
                href={projectData?.data.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </a>
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Created: {formatDate(projectData?.data.createdAt)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            <span>{projectData?.data.technologies.length} Technologies</span>
          </div>
        </div>
      </div>

      {/* Main Project Image */}
      <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
        <Image
          src={projectData?.data.image}
          alt={projectData?.data.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
        />
      </div>

      {/* Project Overview */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
        <p>{projectData?.data.overview}</p>
      </div>

      {/* Technologies */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Technologies Used</h2>
        <div className="flex flex-wrap gap-2">
          {projectData?.data.technologies.map((tech: string) => (
            <span
              key={tech}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Core Features */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Core Features</h2>
        <ul className="grid grid-cols-2 gap-4">
          {projectData?.data.coreFeatures.map((feature: string) => (
            <li
              key={feature}
              className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
            >
              <div className="h-2 w-2 bg-blue-500 rounded-full" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Project Gallery */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Project Gallery</h2>
        <div className="grid grid-cols-2 gap-4">
          {projectData?.data.gallery.map((image: string, index: number) => (
            <div
              key={index}
              className="relative h-48 rounded-lg overflow-hidden"
            >
              <Image
                src={image}
                alt={`Project image ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer Metadata */}
      <div className="border-t pt-6 mt-8 text-sm text-gray-500 dark:text-gray-400 space-y-2">
        <p>Last updated: {formatDate(projectData?.data.updatedAt)}</p>
        <p>Created: {formatDate(projectData?.data.createdAt)}</p>
      </div>
    </div>
  );
}
