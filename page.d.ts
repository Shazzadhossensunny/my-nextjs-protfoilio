import { Metadata } from "next";

declare module "next" {
  interface PageProps {
    params?: any;
    searchParams?: any;
  }
}
