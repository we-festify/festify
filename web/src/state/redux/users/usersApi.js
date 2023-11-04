import api from "../api";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "/users",
    }),
  }),
});

export const { useGetAllUsersQuery } = userApi;
