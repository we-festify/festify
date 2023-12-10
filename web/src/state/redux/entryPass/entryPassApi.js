import api from "./../api";

const entryPassApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getEntryPassesOfSelf: builder.query({
      query: () => `/entry-passes`,
    }),
    purchaseEntryPass: builder.mutation({
      query: ({ eventId, promoCode }) => ({
        url: `/entry-passes/${eventId}/purchase`,
        method: "POST",
        body: {
          promoCode,
        },
      }),
    }),
  }),
});

export const { useGetEntryPassesOfSelfQuery, usePurchaseEntryPassMutation } =
  entryPassApi;
