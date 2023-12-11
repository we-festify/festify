import api from "./../api";

const webPushApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Notification Permission
    getNotificationPermission: builder.query({
      query: () => "/notifications/permission",
      providesTags: ["NotificationPermission"],
    }),
    updateNotificationPermission: builder.mutation({
      query: (notificationPermission) => ({
        url: "/notifications/permission",
        method: "PATCH",
        body: { notificationPermission },
      }),
      invalidatesTags: ["NotificationPermission"],
    }),

    // Web Push
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
  useGetNotificationPermissionQuery,
  useUpdateNotificationPermissionMutation,

  useGetWebPushSubscriptionQuery,
  useSubscribeWebPushMutation,
  useUnsubscribeWebPushMutation,
  useTestWebPushMutation,
} = webPushApi;
