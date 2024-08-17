import api from "../api";

const bannersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBanners: builder.query({
      query: () => "banners",
      providesTags: ["Banners"],
    }),
    getBannerById: builder.query({
      query: (id) => `banners/${id}`,
      providesTags: ["Banners"],
    }),
    getBannersByTarget: builder.query({
      query: (target) => `banners?target=${target}`,
      providesTags: ["Banners"],
    }),
    createBanner: builder.mutation({
      query: (banner) => ({
        url: "banners",
        method: "POST",
        body: { banner },
      }),
      invalidatesTags: ["Banners"],
    }),
    updateBannerById: builder.mutation({
      query: ({ bannerId, banner }) => ({
        url: `banners/${bannerId}`,
        method: "PUT",
        body: { banner },
      }),
      invalidatesTags: ["Banners"],
    }),
    deleteBannerById: builder.mutation({
      query: (bannerId) => ({
        url: `banners/${bannerId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Banners"],
    }),
  }),
});

export const {
  useGetBannersQuery,
  useGetBannerByIdQuery,
  useGetBannersByTargetQuery,
  useCreateBannerMutation,
  useUpdateBannerByIdMutation,
  useDeleteBannerByIdMutation,
} = bannersApi;
