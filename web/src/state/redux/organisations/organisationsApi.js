import api from "./../api";

const organisationsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrganisations: builder.query({
      query: () => "/organisations",
      providesTags: ["Organisations"],
    }),
    createOrganisation: builder.mutation({
      query: (organisation) => ({
        url: "/organisations",
        method: "POST",
        body: {
          organisation,
        },
      }),
      invalidatesTags: ["Organisations"],
    }),
    updateOrganisation: builder.mutation({
      query: (organisation) => ({
        url: `/organisations/${organisation.id}`,
        method: "PATCH",
        body: {
          organisation,
        },
      }),
      invalidatesTags: ["Organisations"],
    }),
    deleteOrganisation: builder.mutation({
      query: (organisationId) => ({
        url: `/organisations/${organisationId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Organisations"],
    }),
  }),
});

export const {
  useGetAllOrganisationsQuery,
  useCreateOrganisationMutation,
  useUpdateOrganisationMutation,
  useDeleteOrganisationMutation,
} = organisationsApi;
