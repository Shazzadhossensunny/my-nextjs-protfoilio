import BlogPage from "@/components/BlogsPage";
import { getAllBlogs } from "@/utils/actions/sendMessageUser";

const AllBlogsPage = async () => {
  const blogs = await getAllBlogs();
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <BlogPage blogs={blogs} isLoading={false} />;
    </main>
  );
};

export default AllBlogsPage;
