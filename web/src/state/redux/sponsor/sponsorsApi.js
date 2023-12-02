import api from "../api";

const sponsorsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSponsors: builder.query({
      query: () => "/sponsors",
      providesTags: ["Sponsors"],
    }),
    getSponsorById: builder.query({
      query: (id) => `/sponsors/${id}`,
      providesTags: ["Sponsors"],
    }),
    createSponsor: builder.mutation({
      query: (sponsor) => ({
        url: "/sponsors",
        method: "POST",
        body: {
          sponsor,
        },
      }),
      invalidatesTags: ["Sponsors"],
    }),
    updateSponsor: builder.mutation({
      query: ({ sponsorId, sponsor }) => ({
        url: `/sponsors/${sponsorId}`,
        method: "PATCH",
        body: {
          sponsor,
        },
      }),
      invalidatesTags: ["Sponsors"],
    }),
    deleteSponsor: builder.mutation({
      query: (sponsorId) => ({
        url: `/sponsors/${sponsorId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Sponsors"],
    }),
  }),
});

export const {
  useGetSponsorsQuery,
  useGetSponsorByIdQuery,
  useCreateSponsorMutation,
  useUpdateSponsorMutation,
  useDeleteSponsorMutation,
} = sponsorsApi;
