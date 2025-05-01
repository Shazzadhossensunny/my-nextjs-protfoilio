"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useCreateBlogMutation } from "@/redux/features/blogs/blogApi";
import { TResponse } from "@/types/global.type";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import LoadingPage from "../loading";

export default function BlogForm() {
  const [createBlog, { isLoading }] = useCreateBlogMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const blogData = {
      ...data,
      readTime: Number(data.readTime),
    };
    try {
      const res = (await createBlog(blogData)) as TResponse<FieldValues>;
      if (res.error) {
        toast.error(res?.data?.error.message);
      } else {
        toast.success("Blog create successfully");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
    reset();
  };
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingPage />
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Blog Information</CardTitle>
          <CardDescription>Enter the details of your blog post</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                {...register("title", { required: "Title is required" })}
                placeholder="Enter blog title"
              />
              {errors.title && (
                <p className="text-sm text-red-500">
                  {errors.title.message as string}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Date</Label>
              <Input
                type="date"
                {...register("date", { required: "Date is required" })}
              />
              {errors.date && (
                <p className="text-sm text-red-500">
                  {errors.date.message as string}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Input
                {...register("category", { required: "Category is required" })}
                placeholder="Enter category"
              />
              {errors.category && (
                <p className="text-sm text-red-500">
                  {errors.category.message as string}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Read Time (minutes)</Label>
              <Input
                type="number"
                {...register("readTime", { required: "Read time is required" })}
                placeholder="Enter read time"
              />
              {errors.readTime && (
                <p className="text-sm text-red-500">
                  {errors.readTime.message as string}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Image URL</Label>
              <Input
                {...register("image", { required: "Image URL is required" })}
                placeholder="Enter image URL"
              />
              {errors.image && (
                <p className="text-sm text-red-500">
                  {errors.image.message as string}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Slug</Label>
              <Input
                {...register("slug", { required: "Slug is required" })}
                placeholder="Enter slug"
              />
              {errors.slug && (
                <p className="text-sm text-red-500">
                  {errors.slug.message as string}
                </p>
              )}
            </div>

            <div className="col-span-2 space-y-2">
              <Label>Excerpt</Label>
              <Textarea
                {...register("excerpt", { required: "Excerpt is required" })}
                placeholder="Enter a short excerpt"
                rows={3}
              />
              {errors.excerpt && (
                <p className="text-sm text-red-500">
                  {errors.excerpt.message as string}
                </p>
              )}
            </div>

            <div className="col-span-2 space-y-2">
              <Label>Content</Label>
              <Textarea
                {...register("content")}
                placeholder="Write your blog content"
                rows={8}
                className="min-h-[200px]"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading} className="px-6">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
}
