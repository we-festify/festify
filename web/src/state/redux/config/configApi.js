import api from "../api";

export const configApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyPermissions: builder.query({
      query: () => "/config/permissions/me",
      providesTags: ["Permissions"],
    }),
    getAllPermissions: builder.query({
      query: () => "/config/permissions",
      providesTags: ["Permissions"],
    }),
    getAllActions: builder.query({
      query: () => "/config/actions",
      providesTags: ["Actions"],
    }),
    updatePermissions: builder.mutation({
      query: (permissionsMap) => ({
        url: "/config/permissions",
        method: "PUT",
        body: { permissionsMap },
      }),
      invalidatesTags: ["Permissions"],
    }),
  }),
});

export const {
  useGetMyPermissionsQuery,
  useGetAllPermissionsQuery,
  useGetAllActionsQuery,
  useUpdatePermissionsMutation,
} = configApi;
