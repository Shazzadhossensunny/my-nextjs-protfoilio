import { baseApi } from "@/redux/api/baseApi";

import { TQueryParam, TResponseRedux } from "@/types/global.type";
import { Project } from "@/types/project.type";

const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProject: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `/project`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Project"],

      transformResponse: (response: TResponseRedux<Project[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getSingleProject: builder.query({
      query: (id) => ({
        url: `/project/${id}`,
        method: "GET",
      }),
      providesTags: ["Project"],
    }),
    createProject: builder.mutation({
      query: (data) => ({
        url: `/project`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Project"],
    }),
    updateProject: builder.mutation({
      query: (payload) => ({
        url: `/project/${payload.id}`,
        method: "PATCH",
        body: payload.data,
      }),
      invalidatesTags: ["Project"],
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/project/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Project"],
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useGetAllProjectQuery,
  useGetSingleProjectQuery,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectApi;
