"use client";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { format } from "date-fns";
import {
  useDeleteBlogMutation,
  useGetAllBlogQuery,
  useUpdateBlogMutation,
} from "@/redux/features/blogs/blogApi";
import { TBlog } from "@/types/blog.type";
import { MoreVertical, Pencil, Trash2, Eye } from "lucide-react";
import toast from "react-hot-toast";
import { TResponse } from "@/types/global.type";
import Link from "next/link";

const BlogListPage = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<TBlog | null>(null);
  const { data: blogData, isLoading } = useGetAllBlogQuery(undefined);
  const [updateBlog] = useUpdateBlogMutation();
  const [deleteBlog] = useDeleteBlogMutation();

  const form = useForm<TBlog>({
    defaultValues: {
      title: "",
      date: new Date().toISOString().split("T")[0],
      category: "",
      readTime: 5,
      image: "",
      excerpt: "",
      content: "",
    },
  });

  const handleEdit = (blog: TBlog) => {
    setSelectedBlog(blog);
    form.reset({
      title: blog.title,
      date: new Date(blog.date).toISOString().split("T")[0],
      category: blog.category,
      readTime: blog.readTime,
      image: blog.image,
      excerpt: blog.excerpt,
      content: blog.content,
    });
    setIsEditModalOpen(true);
  };

  const handleUpdate: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updating blog...");

    try {
      const res = await updateBlog({
        id: selectedBlog?._id,
        data: {
          title: data.title,
          date: data.date,
          category: data.category,
          readTime: data.readTime,
          image: data.image,
          excerpt: data.excerpt,
          content: data.content,
        },
      }).unwrap();

      if (res.error) {
        toast.error(res?.error?.data.message, { id: toastId });
      } else {
        toast.success("Blog updated successfully", { id: toastId });
        setIsEditModalOpen(false);
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId });
    }
  };

  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Delete blog...");
    try {
      const res = (await deleteBlog(id)) as TResponse<TBlog>;
      if (res.error) {
        toast.error(res?.error?.data.message, { id: toastId });
      } else {
        toast.success("Blog delete successfully", { id: toastId });
        setIsEditModalOpen(false);
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId });
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">All Blogs</h1>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogData?.data?.map((blog) => (
              <TableRow key={blog._id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{blog.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {blog.excerpt}
                    </p>
                  </div>
                </TableCell>
                <TableCell>{blog.category}</TableCell>
                <TableCell>
                  {format(new Date(blog.createdAt), "MMM d, yyyy")}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <Link href={`/dashboard/blogs/${blog?._id}`}>
                        <DropdownMenuItem className="cursor-pointer">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => handleEdit(blog)}
                      >
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer text-red-600 dark:text-red-400"
                        onClick={() => handleDelete(blog._id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* update blog */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-screen overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Blog Post</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleUpdate)}
              className="space-y-6"
            >
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="excerpt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Excerpt</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="readTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Read Time (minutes)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea {...field} className="min-h-[200px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogListPage;
