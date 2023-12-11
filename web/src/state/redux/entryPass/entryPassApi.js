import api from "./../api";

const entryPassApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getEntryPassesBySelf: builder.query({
      query: () => `/entry-passes/me`,
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

export const { useGetEntryPassesBySelfQuery, usePurchaseEntryPassMutation } =
  entryPassApi;
