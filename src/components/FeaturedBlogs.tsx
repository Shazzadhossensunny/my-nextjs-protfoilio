"use client";
import { motion } from "framer-motion";
import { Calendar, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BlogsProps } from "@/types/blog.type";
import Image from "next/image";

const FeaturedBlogs: React.FC<BlogsProps> = ({ blogs, isLoading }) => {
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
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Latest from the Blog</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Stay updated with our latest insights and tutorials on web
            development and design.
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {blogs?.data?.slice(0, 3).map((blog) => (
            <motion.article
              key={blog._id}
              variants={item}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <Link href={`/blog/${blog._id}`} className="block">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-purple-600 text-white text-sm rounded-full">
                      {blog.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(blog.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {blog.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold mb-3 hover:text-purple-600 transition-colors">
                    {blog.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                    {blog.excerpt}
                  </p>

                  <div className="flex items-center text-purple-600 dark:text-purple-400">
                    Read More <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/blog">
            <Button
              size="lg"
              variant="outline"
              className="bg-white dark:bg-gray-800"
            >
              View All Posts <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedBlogs;
