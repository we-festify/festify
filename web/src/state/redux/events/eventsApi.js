import { encodeQuery } from "../../../services/json-query";
import api from "../api";

const eventsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllEvents: builder.query({
      query: (q) => `/events?q=${encodeQuery(q)}`,
      providesTags: ["Events"],
    }),
    getEventById: builder.query({
      query: (id) => `/events/${id}`,
      providesTags: ["Events"],
    }),
    getEventsByOrganisationId: builder.query({
      query: (id) => `/events/organisation/${id}`,
      providesTags: ["Events"],
    }),
    createEvent: builder.mutation({
      query: (event) => ({
        url: "/events",
        method: "POST",
        body: {
          event,
        },
      }),
      invalidatesTags: ["Events"],
    }),
    updateEvent: builder.mutation({
      query: (event) => ({
        url: `/events/${event._id}`,
        method: "PUT",
        body: {
          event,
        },
      }),
      invalidatesTags: ["Events"],
    }),
    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `/events/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Events"],
    }),

    // Announcements
    createAnnouncement: builder.mutation({
      query: ({ announcement, eventId }) => ({
        url: `/events/${eventId}/announcements`,
        method: "POST",
        body: {
          announcement,
        },
      }),
      invalidatesTags: ["Announcements"],
    }),
    getAnnouncementsByEventId: builder.query({
      query: ({ eventId, page = 1, limit = 10 }) =>
        `/events/${eventId}/announcements?page=${page}&limit=${limit}`,
      providesTags: ["Announcements"],
    }),
    deleteAnnouncement: builder.mutation({
      query: (announcement) => ({
        url: `/events/${announcement.event}/announcements/${announcement._id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Announcements"],
    }),
  }),
});

export const {
  useGetAllEventsQuery,
  useGetEventByIdQuery,
  useGetEventsByOrganisationIdQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,

  useCreateAnnouncementMutation,
  useGetAnnouncementsByEventIdQuery,
  useDeleteAnnouncementMutation,
} = eventsApi;

export default eventsApi;
