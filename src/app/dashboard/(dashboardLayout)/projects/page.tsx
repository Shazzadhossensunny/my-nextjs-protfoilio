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
  MoreVertical,
  Pencil,
  Trash2,
  Eye,
  Github,
  ExternalLink,
} from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import { Project } from "@/types/project.type";
import {
  useDeleteProjectMutation,
  useGetAllProjectQuery,
  useUpdateProjectMutation,
} from "@/redux/features/projects/projectApi";
import { TResponse } from "@/types/global.type";

const ProjectListPage = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const { data: projectsData, isLoading } = useGetAllProjectQuery(undefined);
  const [updateProject] = useUpdateProjectMutation();
  const [deleteProject] = useDeleteProjectMutation();

  const form = useForm<Project>({
    defaultValues: {
      title: "",
      description: "",
      overview: "",
      image: "",
      gallery: [],
      coreFeatures: [],
      technologies: [],
      links: {
        github: {
          frontend: "",
          backend: "",
        },
        live: "",
      },
    },
  });

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    form.reset({
      title: project.title,
      description: project.description,
      overview: project.overview,
      image: project.image,
      gallery: project.gallery,
      coreFeatures: project.coreFeatures,
      technologies: project.technologies,
      links: project.links,
    });
    setIsEditModalOpen(true);
  };

  const handleUpdate: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updating project...");
    try {
      const res = await updateProject({
        id: selectedProject?._id,
        data: {
          title: data.title,
          description: data.description,
          overview: data.overview,
          image: data.image,
          gallery: data.gallery,
          coreFeatures: data.coreFeatures,
          technologies: data.technologies,
          links: data.links,
        },
      }).unwrap();
      if (res.error) {
        toast.error(res?.error?.data.message, { id: toastId });
      } else {
        toast.success("Project updated successfully", { id: toastId });
        setIsEditModalOpen(false);
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId });
    }
  };

  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Deleting project...");
    try {
      const res = (await deleteProject(id)) as TResponse<Project>;
      if (res.error) {
        toast.error(res?.error?.data.message, { id: toastId });
      } else {
        toast.success("Project deleted successfully", { id: toastId });
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
        <h1 className="text-3xl font-bold">All Projects</h1>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Technologies</TableHead>
              <TableHead>Links</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Replace with your actual data mapping */}
            {projectsData?.data?.map((project) => (
              <TableRow key={project._id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{project.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {project.description}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {project?.technologies?.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Link
                      href={project.links.live as string}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </Link>
                  </div>
                </TableCell>
                <TableCell>
                  {format(new Date(project?.createdAt), "MMM d, yyyy")}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <Link href={`/dashboard/projects/${project?._id}`}>
                        <DropdownMenuItem className="cursor-pointer">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => handleEdit(project)}
                      >
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer text-red-600 dark:text-red-400"
                        onClick={() => handleDelete(project._id)}
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

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-screen overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleUpdate)}
              className="space-y-6"
            >
              <div className="grid grid-cols-2 gap-4">
                {/* Title */}
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

                {/* Main Image */}
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Main Image URL</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Overview */}
                <FormField
                  control={form.control}
                  name="overview"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Overview</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* GitHub & Live Links */}
                <FormField
                  control={form.control}
                  name="links.github.frontend"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Frontend GitHub URL</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="links.github.backend"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Backend GitHub URL</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="links.live"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Live Demo URL</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Gallery Images (Multiple) */}
                {form.watch("gallery")?.map((_, index) => (
                  <FormField
                    key={index}
                    control={form.control}
                    name={`gallery.${index}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gallery Image {index + 1}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}

                {/* Core Features (Dynamic List) */}
                {form.watch("coreFeatures")?.map((_, index) => (
                  <FormField
                    key={index}
                    control={form.control}
                    name={`coreFeatures.${index}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Core Feature {index + 1}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}

                {/* Technologies (Dynamic List) */}
                {form.watch("technologies")?.map((_, index) => (
                  <FormField
                    key={index}
                    control={form.control}
                    name={`technologies.${index}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Technology {index + 1}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>

              {/* Buttons */}
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

export default ProjectListPage;
