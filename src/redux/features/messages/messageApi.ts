import { baseApi } from "@/redux/api/baseApi";

import { TMessage, TQueryParam, TResponseRedux } from "@/types/global.type";

const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllMessage: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `/message`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Message"],
      transformResponse: (response: TResponseRedux<TMessage[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getSingleMessage: builder.query({
      query: (id) => ({
        url: `/message/${id}`,
        method: "GET",
      }),
      providesTags: ["Message"],
    }),
    markReadMessage: builder.mutation({
      query: (id) => ({
        url: `/message/${id}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["Message"],
    }),
    deleteMessage: builder.mutation({
      query: (id) => ({
        url: `/message/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Message"],
    }),
  }),
});

export const {
  useGetAllMessageQuery,
  useGetSingleMessageQuery,
  useMarkReadMessageMutation,
  useDeleteMessageMutation,
} = messageApi;
