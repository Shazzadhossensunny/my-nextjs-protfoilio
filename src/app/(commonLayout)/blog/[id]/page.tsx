import BlogDetails from "@/components/BlogDetails";
import { getBlogById } from "@/utils/actions/sendMessageUser";
import { Metadata } from "next";

export default async function BlogPage({ params }: { params: any }) {
  const { id } = await params;
  const blogData = await getBlogById(id);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      {<BlogDetails blog={blogData.data} />}
    </main>
  );
}
