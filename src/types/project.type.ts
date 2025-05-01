export interface ProjectLinks {
  github: {
    frontend?: string;
    backend?: string;
  };
  live?: string;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  overview?: string;
  image: string;
  gallery?: string[];
  coreFeatures?: string[];
  technologies: string[];
  links: ProjectLinks;
  createdAt: string;
  updatedAt: string;
}
//multipole project
export interface ProjectsResponses {
  success?: boolean;
  data: Project[];
}

// Response for single project
export interface ProjectResponse {
  success?: boolean;
  data: Project;
}

export interface ProjectsProps {
  projects: ProjectsResponses;
  isLoading: boolean;
}
