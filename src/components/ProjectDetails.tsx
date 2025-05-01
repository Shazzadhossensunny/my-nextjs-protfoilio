"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Project } from "@/types/project.type";

interface ProjectDetailProps {
  project: Project;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project }) => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
      {/* Hero Section */}
      <motion.div
        className="relative h-[40vh] md:h-[60vh] w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-12">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
              {...fadeIn}
            >
              {project.title}
            </motion.h1>
            <motion.p
              className="text-lg text-gray-200 max-w-3xl"
              {...fadeIn}
              transition={{ delay: 0.2 }}
            >
              {project.description}
            </motion.p>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <motion.div
            className="lg:col-span-2"
            {...fadeIn}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-8">
              <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {project.overview}
              </p>
            </div>

            {/* Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-8">
                <h2 className="text-2xl font-bold mb-6">Project Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.gallery.map((image, index) => (
                    <motion.div
                      key={index}
                      className="relative h-48 md:h-64 rounded-lg overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 * index }}
                    >
                      <Image
                        src={image}
                        alt={`Gallery image ${index + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Core Features */}
            {project.coreFeatures && project.coreFeatures.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold mb-6">Core Features</h2>
                <div className="grid gap-4">
                  {project.coreFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <ChevronRight className="h-5 w-5 text-purple-500 mt-1 flex-shrink-0" />
                      <p className="text-gray-600 dark:text-gray-300">
                        {feature}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="lg:col-span-1"
            {...fadeIn}
            transition={{ delay: 0.4 }}
          >
            {/* Project Links */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-8">
              <h3 className="text-xl font-bold mb-4">Project Links</h3>
              <div className="space-y-3">
                {project.links.live && (
                  <Button
                    variant="outline"
                    className="w-full justify-between"
                    onClick={() => window.open(project.links.live, "_blank")}
                  >
                    Live Demo
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                )}
                {project.links.github.frontend && (
                  <Button
                    variant="outline"
                    className="w-full justify-between"
                    onClick={() =>
                      window.open(project.links.github.frontend, "_blank")
                    }
                  >
                    Frontend Code
                    <Github className="h-4 w-4 ml-2" />
                  </Button>
                )}
                {project.links.github.backend && (
                  <Button
                    variant="outline"
                    className="w-full justify-between"
                    onClick={() =>
                      window.open(project.links.github.backend, "_blank")
                    }
                  >
                    Backend Code
                    <Github className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>

            {/* Technologies */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <motion.span
                    key={index}
                    className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    {tech.trim()}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
