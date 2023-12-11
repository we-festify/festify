import api from "../api";

const paymentsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPaymentsBySelf: builder.query({
      query: () => "/payments/me",
      providesTags: ["Payments"],
    }),
  }),
});

export const { useGetPaymentsBySelfQuery } = paymentsApi;
