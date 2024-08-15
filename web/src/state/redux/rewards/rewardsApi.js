import api from "../api";

const rewardsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyRewards: builder.query({
      query: () => "rewards/me",
      providesTags: ["Rewards"],
    }),
    getReward: builder.query({
      query: (id) => `rewards/${id}`,
      providesTags: ["Rewards"],
    }),
  }),
});

export const { useGetMyRewardsQuery, useGetRewardQuery } = rewardsApi;
