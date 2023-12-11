import api from "../api";

const participantsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createParticipant: builder.mutation({
      query: ({ participant, promoCode }) => ({
        url: "/participants",
        method: "POST",
        body: {
          participant,
          promoCode,
        },
      }),
      invalidatesTags: ["Participants"],
    }),
    getParticipationsBySelf: builder.query({
      query: () => "/participants/me",
      providesTags: ["Participants"],
    }),
    getParticipationsByEventId: builder.query({
      query: (eventId) => `/participants/event/${eventId}`,
      providesTags: ["Participants"],
    }),
  }),
});

export const {
  useCreateParticipantMutation,
  useGetParticipationsBySelfQuery,
  useGetParticipationsByEventIdQuery,
} = participantsApi;
