import api from "../api";

const bannersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBanners: builder.query({
      query: () => "banners",
    }),
    getBannerById: builder.query({
      query: (id) => `banners/${id}`,
    }),
    getBannersByTarget: builder.query({
      query: (target) => `banners?target=${target}`,
    }),
    createBanner: builder.mutation({
      query: (banner) => ({
        url: "banners",
        method: "POST",
        body: { banner },
      }),
    }),
    updateBannerById: builder.mutation({
      query: ({ bannerId, banner }) => ({
        url: `banners/${bannerId}`,
        method: "PUT",
        body: { banner },
      }),
    }),
    deleteBannerById: builder.mutation({
      query: (bannerId) => ({
        url: `banners/${bannerId}`,
        method: "DELETE",
      }),
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
