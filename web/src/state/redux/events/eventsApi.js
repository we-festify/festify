import api from "../api";

const eventsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllEvents: builder.query({
      query: () => "/events",
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
  }),
});

export const {
  useGetAllEventsQuery,
  useGetEventByIdQuery,
  useGetEventsByOrganisationIdQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventsApi;

export default eventsApi;
