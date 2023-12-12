import api from "./../api";

const entryPassApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getEntryPassById: builder.query({
      query: (id) => `/entry-passes/${id}`,
      providesTags: ["EntryPass"],
    }),
    getEntryPassesBySelf: builder.query({
      query: () => `/entry-passes/me`,
      providesTags: ["EntryPass"],
    }),
    purchaseEntryPass: builder.mutation({
      query: ({ eventId, promoCode }) => ({
        url: `/entry-passes/${eventId}/purchase`,
        method: "POST",
        body: {
          promoCode,
        },
      }),
      invalidatesTags: ["EntryPass"],
    }),
    checkInEntryPass: builder.mutation({
      query: (id) => ({
        url: `/entry-passes/${id}/check-in`,
        method: "POST",
      }),
      invalidatesTags: ["EntryPass"],
    }),
  }),
});

export const {
  useGetEntryPassByIdQuery,
  useGetEntryPassesBySelfQuery,
  usePurchaseEntryPassMutation,
  useCheckInEntryPassMutation,
} = entryPassApi;
