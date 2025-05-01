import { format } from "date-fns";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Calendar, Clock } from "lucide-react";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";
import { Components } from "react-markdown";
import { TBlog } from "@/types/blog.type";

interface BlogDetailProps {
  blog: TBlog;
}

const BlogDetails: React.FC<BlogDetailProps> = ({ blog }) => {
  // Format date safely
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown date";
    return format(new Date(dateString), "MMMM d, yyyy");
  };

  // Handle escaped backticks in code blocks
  const prepareContent = (content: string) => {
    return content.replace(/\\`\\`\\`/g, "```");
  };

  // Define properly typed components for ReactMarkdown
  const components: Components = {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mt-6 mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold mt-5 mb-2">{children}</h3>
    ),
    ul: ({ children }) => <ul className="list-disc pl-6 my-4">{children}</ul>,
    ol: ({ children }) => (
      <ol className="list-decimal pl-6 my-4">{children}</ol>
    ),
    li: ({ children }) => <li className="my-1">{children}</li>,
    p: ({ children }) => <p className="my-4">{children}</p>,
    code: ({ node, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || "");
      // @ts-ignore - inline exists in props but TypeScript doesn't recognize it
      if (!props.inline && match) {
        return (
          <div className="my-6 rounded-md overflow-hidden">
            <SyntaxHighlighter
              style={vscDarkPlus}
              language={match[1]}
              PreTag="div"
              customStyle={{
                borderRadius: "0.375rem",
                padding: "1rem",
                margin: "0",
              }}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          </div>
        );
      }
      return (
        <code
          className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded font-mono text-sm"
          {...props}
        >
          {children}
        </code>
      );
    },
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-200 dark:border-gray-700 pl-4 italic my-6">
        {children}
      </blockquote>
    ),
  };
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Blog Title & Info */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">{blog.title}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {blog.excerpt}
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(blog.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{blog.readTime} min read</span>
            </div>
            <div className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
              {blog.category}
            </div>
          </div>
        </div>

        {/* Blog Image */}
        <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          />
        </div>

        {/* Blog Content with Markdown Rendering */}
        <article className="prose prose-lg dark:prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
            {blog.content ? prepareContent(blog.content) : ""}
          </ReactMarkdown>
        </article>

        {/* Footer Metadata */}
        <div className="border-t pt-6 mt-8 text-sm text-gray-500 dark:text-gray-400 space-y-2">
          <p>Last updated: {formatDate(blog.updatedAt)}</p>
          <p>Published: {formatDate(blog.createdAt)}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
