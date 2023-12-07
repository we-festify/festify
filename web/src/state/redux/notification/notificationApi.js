import api from "./../api";

const webPushApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getWebPushSubscription: builder.query({
      query: () => "/notifications/webpush/subscription",
      providesTags: ["WebPushSubscription"],
    }),
    subscribeWebPush: builder.mutation({
      query: (subscription) => ({
        url: "/notifications/webpush/subscription",
        method: "POST",
        body: { subscription },
      }),
      invalidatesTags: ["WebPushSubscription"],
    }),
    unsubscribeWebPush: builder.mutation({
      query: (subscription) => ({
        url: "/notifications/webpush/subscription",
        method: "DELETE",
        body: { subscription },
      }),
      invalidatesTags: ["WebPushSubscription"],
    }),
    testWebPush: builder.mutation({
      query: (notification) => ({
        url: "/notifications/webpush/test",
        method: "POST",
        body: { notification },
      }),
    }),
  }),
});

export const {
  useGetWebPushSubscriptionQuery,
  useSubscribeWebPushMutation,
  useUnsubscribeWebPushMutation,
  useTestWebPushMutation,
} = webPushApi;
