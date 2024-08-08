import api from "../api";

const featureFlagsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFeatureFlags: builder.query({
      query: () => "/features",
      providesTags: ["Features"],
    }),
    toggleFeatureFlag: builder.mutation({
      query: (name) => ({
        url: `/features/${name}/toggle`,
        method: "POST",
      }),
      invalidatesTags: ["Features"],
    }),
    getFeatureFlag: builder.query({
      query: (name) => `/features/${name}`,
      providesTags: ["Features"],
    }),
  }),
});

export const {
  useGetFeatureFlagsQuery,
  useToggleFeatureFlagMutation,
  useGetFeatureFlagQuery,
} = featureFlagsApi;
