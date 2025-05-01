"use client";
import { motion } from "framer-motion";
import { Download, Code, Laptop, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import BannerImg from "../assets/images/shazzad.png";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";

const HeroSection = () => {
  const technologies = [
    "React",
    "Next.js",
    "Tailwind CSS",
    "TypeScript",
    "JavaScript",
  ];

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-4"
            >
              <span className="px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-200 text-sm font-medium">
                Welcome to my portfolio
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Hey, I'm{" "}
              <TypeAnimation
                sequence={["Shazzad Hossen", 5000, "Frontend Developer", 3000]}
                wrapper="span"
                speed={20}
                repeat={Infinity}
                className="bg-gradient-to-r from-violet-600 to-indigo-600 text-transparent bg-clip-text"
              />
            </h1>

            <div className="flex items-center gap-2 mb-6">
              <Code className="h-5 w-5 text-violet-600" />
              <p className="text-xl text-gray-700 dark:text-gray-300 font-medium">
                Frontend Developer
              </p>
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
              Passionate about crafting exceptional web experiences with modern
              technologies. Specializing in building responsive, performant, and
              user-friendly applications.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {technologies.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="px-3 py-1 rounded-full bg-white dark:bg-gray-800 shadow-sm text-sm font-medium"
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="https://drive.google.com/file/d/1dPUv0WnDlkiHhClBkok1-9I-ujyTCasx/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="bg-violet-600 hover:bg-violet-700">
                  <Download className="mr-2 h-4 w-4" /> Download Resume
                </Button>
              </Link>

              <div className="flex gap-4">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href="https://github.com/Shazzadhossensunny"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-shadow"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href="https://www.linkedin.com/in/shazzadhossensunny"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-shadow"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </motion.a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="w-full h-[500px] rounded-3xl overflow-hidden relative shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-indigo-500/20 backdrop-blur-sm"></div>
              <Image
                src={BannerImg}
                fill
                alt="Shazzad Hossen"
                className="w-full h-full object-cover"
              />
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -bottom-20 -right-20 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl"
              />
              <motion.div
                animate={{
                  rotate: [360, 0],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -top-20 -left-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
