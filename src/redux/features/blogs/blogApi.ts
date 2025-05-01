import { baseApi } from "@/redux/api/baseApi";
import { TBlog } from "@/types/blog.type";
import { TQueryParam, TResponseRedux } from "@/types/global.type";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlog: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `/blog`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Blog"],

      transformResponse: (response: TResponseRedux<TBlog[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getSingleBlog: builder.query({
      query: (idOrSlug) => ({
        url: `/blog/${idOrSlug}`,
        method: "GET",
      }),
      providesTags: ["Blog"],
    }),
    createBlog: builder.mutation({
      query: (data) => ({
        url: `/blog`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Blog"],
    }),
    updateBlog: builder.mutation({
      query: (payload) => ({
        url: `/blog/${payload.id}`,
        method: "PATCH",
        body: payload.data,
      }),
      invalidatesTags: ["Blog"],
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blog"],
    }),
  }),
});

export const {
  useCreateBlogMutation,
  useGetAllBlogQuery,
  useGetSingleBlogQuery,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
