import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearCredentials, setCredentials } from "./auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefresh = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error?.status === 401) {
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);
    if (refreshResult?.data) {
      api.dispatch(setCredentials(refreshResult.data));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(clearCredentials());
    }
  }
  return result;
};

const api = createApi({
  baseQuery: baseQueryWithRefresh,
  endpoints: (builder) => ({
    // ...endpoints
  }),
  tagTypes: [
    "Events",
    "Organisations",
    "Users",
    "Participants",
    "Sponsors",
    "Promotions",
    "Announcements",
    "WebPushSubscription",
    "FCM", // for firebase cloud messaging
    "NotificationPermission", // for user notification permission
    "Payments", // for user payments
    "EntryPass", // for user entry passes
    "Permissions", // for rbac permissions
    "Actions", // for rbac actions
    "Features", // for feature flags
    "Promotions", // for promotion campaigns
    "Rewards", // for user rewards
    "Banners", // for banners
  ],
});

export default api;
