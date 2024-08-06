import api from "../api";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: ({ limit = 10, page = 1, search = "" } = {}) =>
        encodeURI(`/users?limit=${limit}&page=${page}&search=${search}`),
      providesTags: ["Users"],
    }),
    getUserById: builder.query({
      query: (userId) => `/users/${userId}`,
      providesTags: ["Users"],
    }),
    createUser: builder.mutation({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: {
          user,
        },
      }),
      invalidatesTags: ["Users"],
    }),
    updateUser: builder.mutation({
      query: ({ userId, user }) => ({
        url: `/users/${userId}`,
        method: "PATCH",
        body: {
          user,
        },
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: builder.mutation({
      query: ({ userId }) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
