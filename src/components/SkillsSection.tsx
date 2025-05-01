"use client";
import { motion } from "framer-motion";
import { Command, Globe, Layout, Database, Server, Code2 } from "lucide-react";

const SkillsSection = () => {
  const skills = [
    {
      icon: <Layout className="h-8 w-8" />,
      name: "Frontend Development",
      level: 90,
      color: "from-purple-600 to-pink-600",
      tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Bootstrap"],
    },
    {
      icon: <Command className="h-8 w-8" />,
      name: "UI/UX Design",
      level: 55,
      color: "from-blue-600 to-cyan-600",
      tools: ["Figma", "Responsive Design"],
    },
    {
      icon: <Globe className="h-8 w-8" />,
      name: "Web Technologies",
      level: 88,
      color: "from-green-600 to-teal-600",
      tools: ["HTML5", "CSS3", "JavaScript", "REST APIs"],
    },
    {
      icon: <Database className="h-8 w-8" />,
      name: "Database",
      level: 75,
      color: "from-orange-600 to-red-600",
      tools: ["MongoDB", "Mongoose", "Firebase"],
    },
    {
      icon: <Server className="h-8 w-8" />,
      name: "Backend Integration",
      level: 80,
      color: "from-yellow-600 to-orange-600",
      tools: ["Node.js", "Express", "API Design", "Authentication"],
    },
    {
      icon: <Code2 className="h-8 w-8" />,
      name: "Version Control",
      level: 85,
      color: "from-indigo-600 to-purple-600",
      tools: ["Git", "GitHub", "GitLab"],
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Professional Skills
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Specialized in frontend development with expertise in modern web
            technologies and frameworks
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              variants={item}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`p-3 rounded-lg bg-gradient-to-r ${skill.color} text-white`}
                >
                  {skill.icon}
                </div>
                <h3 className="text-xl font-semibold">{skill.name}</h3>
              </div>

              <div className="mb-4">
                <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className={`h-full bg-gradient-to-r ${skill.color}`}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {skill.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-full"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
