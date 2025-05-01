export type TBlog = {
  _id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: number;
  category: string;
  image: string;
  slug: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

//multipole blogs
export interface BlogsResponses {
  success?: boolean;
  data: TBlog[];
}

// Response for single blog
export interface BlogResponse {
  success?: boolean;
  data: TBlog;
}

export interface BlogsProps {
  blogs: BlogsResponses;
  isLoading: boolean;
}
