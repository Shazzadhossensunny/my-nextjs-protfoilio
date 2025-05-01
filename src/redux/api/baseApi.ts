import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://protfolio-server-rose-sigma.vercel.app/api",
  credentials: "include",
});
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery,
  endpoints: () => ({}),
  tagTypes: ["Blog", "Project", "Message"],
});
