import api from "../api";

const eventsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllEvents: builder.query({
      query: () => "/events",
    }),
    getEventById: builder.query({
      query: (id) => `/events/${id}`,
    }),
    getEventsByOrganisationId: builder.query({
      query: (id) => `/events/organisation/${id}`,
    }),
    createEvent: builder.mutation({
      query: (event) => ({
        url: "/events",
        method: "POST",
        body: {
          event,
        },
      }),
    }),
    updateEvent: builder.mutation({
      query: (id, event) => ({
        url: `/events/${id}`,
        method: "PUT",
        body: {
          event,
        },
      }),
    }),
    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `/events/${id}`,
        method: "DELETE",
      }),
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
