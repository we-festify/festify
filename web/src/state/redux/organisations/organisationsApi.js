import api from "./../api";

const organisationsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrganisations: builder.query({
      query: () => "/organisations",
    }),
  }),
});

export const { useGetAllOrganisationsQuery } = organisationsApi;
