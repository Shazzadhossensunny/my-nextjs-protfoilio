"use client";
import { motion } from "framer-motion";
import {
  BookOpen,
  Briefcase,
  Calendar,
  Award,
  MapPin,
  GraduationCap,
} from "lucide-react";

const EducationExperienceSection = () => {
  const experiences = [
    {
      icon: <Briefcase className="h-8 w-8" />,
      title: "NEXTGEN INNOVATION LTD.",
      position: "UI/UX Developer",
      period: "Nov 2021 - Apr 2024",
      description:
        "Created visually appealing, user-friendly, and responsive websites utilizing modern frontend technologies and design principles.",
      color: "from-purple-600 to-pink-600",
      location: "Banani, Dhaka, Bangladesh",
    },
  ];

  const education = [
    {
      icon: <GraduationCap className="h-8 w-8" />,
      institution: "National University",
      degree: "Bachelor of Business Study",
      //   period: "2004 - 2008",
      description:
        "Focused on business fundamentals with electives in information technology.",
      color: "from-blue-600 to-cyan-600",
      location: "Dhaka, Bangladesh",
    },
  ];

  const certifications = [
    {
      icon: <Award className="h-8 w-8" />,
      title: "Next Level Web Development",
      issuer: "Programming Hero",
      year: "2025",
      color: "from-green-600 to-teal-600",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Complete Web Development Course With Jhankar Mahbub",
      issuer: "Programming Hero",
      year: "2024",
      color: "from-orange-600 to-red-600",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Web Design & Development",
      issuer: "Sikhbe Sobai",
      year: "2020",
      color: "from-yellow-600 to-orange-600",
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
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Professional Experience
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Building practical experience through professional roles in the tech
            industry
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-24"
        >
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.title + index}
              variants={item}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow mb-8"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-shrink-0">
                  <div
                    className={`p-4 rounded-lg bg-gradient-to-r ${experience.color} text-white`}
                  >
                    {experience.icon}
                  </div>
                </div>

                <div className="flex-grow">
                  <h3 className="text-xl font-bold">{experience.title}</h3>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mt-2 text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      <span>{experience.position}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{experience.period}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{experience.location}</span>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-700 dark:text-gray-300">
                    {experience.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Education</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Academic qualifications and formal education background
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-24"
        >
          {education.map((edu, index) => (
            <motion.div
              key={edu.institution + index}
              variants={item}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow mb-8"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-shrink-0">
                  <div
                    className={`p-4 rounded-lg bg-gradient-to-r ${edu.color} text-white`}
                  >
                    {edu.icon}
                  </div>
                </div>

                <div className="flex-grow">
                  <h3 className="text-xl font-bold">{edu.institution}</h3>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mt-2 text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      <span>{edu.degree}</span>
                    </div>
                    {/* <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{edu.period}</span>
                    </div> */}
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{edu.location}</span>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-700 dark:text-gray-300">
                    {edu.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Certifications
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Professional certifications and specialized training
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title + index}
              variants={item}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`p-3 rounded-lg bg-gradient-to-r ${cert.color} text-white`}
                >
                  {cert.icon}
                </div>
                <h3 className="text-xl font-semibold">{cert.title}</h3>
              </div>

              <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  <span>{cert.issuer}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{cert.year}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default EducationExperienceSection;
