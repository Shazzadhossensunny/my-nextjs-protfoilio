"use client";

import { useState } from "react";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";
import { X, Plus, Loader2 } from "lucide-react";
import { useCreateProjectMutation } from "@/redux/features/projects/projectApi";
import { toast } from "react-hot-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
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
import LoadingPage from "../loading";
import { Project } from "@/types/project.type";

export default function ProjectForm() {
  const [createProject, { isLoading }] = useCreateProjectMutation();
  const methods = useForm<Project>({
    defaultValues: {
      title: "",
      description: "",
      overview: "",
      image: "",
      gallery: [],
      coreFeatures: [],
      technologies: [],
      links: {
        live: "",
        github: {
          frontend: "",
          backend: "",
        },
      },
    },
  });

  const { handleSubmit, register, reset, setValue, watch, getValues } = methods;

  const [newFeature, setNewFeature] = useState("");
  const [newTechnology, setNewTechnology] = useState("");
  const [newGalleryUrl, setNewGalleryUrl] = useState("");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await createProject(data).unwrap();
      toast.success("Project created successfully");
      reset();
    } catch (error) {
      toast.error("Failed to create project");
    }
  };

  const addToArray = (field: keyof Project, value: string) => {
    const currentValues = getValues(field);
    const updatedValues = Array.isArray(currentValues)
      ? [...currentValues, value]
      : [value];
    setValue(field, updatedValues);

    if (field === "gallery") setNewGalleryUrl("");
    if (field === "coreFeatures") setNewFeature("");
    if (field === "technologies") setNewTechnology("");
  };

  const removeFromArray = (field: keyof Project, index: number) => {
    const currentValues = getValues(field);
    if (Array.isArray(currentValues)) {
      setValue(
        field,
        currentValues.filter((_, i) => i !== index)
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingPage />
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Enter the main details of your project
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormItem>
              <FormLabel>Project Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter project title"
                  {...register("title")}
                />
              </FormControl>
            </FormItem>

            <FormItem>
              <FormLabel>Short Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Brief description of your project"
                  {...register("description")}
                />
              </FormControl>
            </FormItem>

            <FormItem>
              <FormLabel>Detailed Overview</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Detailed overview of your project"
                  className="min-h-[150px]"
                  {...register("overview")}
                />
              </FormControl>
            </FormItem>

            <FormItem>
              <FormLabel>Core Features</FormLabel>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter a feature"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                  />
                  <Button
                    type="button"
                    onClick={() =>
                      newFeature && addToArray("coreFeatures", newFeature)
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {watch("coreFeatures")?.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="flex-1 truncate">{item}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromArray("coreFeatures", index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </FormItem>

            <FormItem>
              <FormLabel>Technologies</FormLabel>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter a technology"
                    value={newTechnology}
                    onChange={(e) => setNewTechnology(e.target.value)}
                  />
                  <Button
                    type="button"
                    onClick={() =>
                      newTechnology && addToArray("technologies", newTechnology)
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {watch("technologies").map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="flex-1 truncate">{item}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromArray("technologies", index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </FormItem>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Media</CardTitle>
            <CardDescription>Add images for your project</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormItem>
              <FormLabel>Main Image URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter main image URL"
                  {...register("image")}
                />
              </FormControl>
            </FormItem>

            <FormItem>
              <FormLabel>Gallery Images</FormLabel>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter gallery image URL"
                    value={newGalleryUrl}
                    onChange={(e) => setNewGalleryUrl(e.target.value)}
                  />
                  <Button
                    type="button"
                    onClick={() =>
                      newGalleryUrl && addToArray("gallery", newGalleryUrl)
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {watch("gallery")?.map((url, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="flex-1 truncate">{url}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromArray("gallery", index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </FormItem>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Links</CardTitle>
            <CardDescription>Add links to your project</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormItem>
              <FormLabel>Live Project URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter live project URL"
                  {...register("links.live")}
                />
              </FormControl>
            </FormItem>

            <FormItem>
              <FormLabel>Frontend Repository URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter frontend repository URL"
                  {...register("links.github.frontend")}
                />
              </FormControl>
            </FormItem>

            <FormItem>
              <FormLabel>Backend Repository URL (Optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter backend repository URL"
                  {...register("links.github.backend")}
                />
              </FormControl>
            </FormItem>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Creating Project..." : "Create Project"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
