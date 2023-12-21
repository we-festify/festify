import api from "../api";

const mapApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllMarkers: builder.query({
      query: () => "/map/markers",
    }),
    getMarkerById: builder.query({
      query: (id) => `/map/markers/${id}`,
    }),
    createMarker: builder.mutation({
      query: (marker) => ({
        url: "/map/markers",
        method: "POST",
        body: { marker },
      }),
    }),
    updateMarkerById: builder.mutation({
      query: ({ markerId, marker }) => ({
        url: `/map/markers/${markerId}`,
        method: "PATCH",
        body: { marker },
      }),
    }),
    deleteMarkerById: builder.mutation({
      query: (id) => ({
        url: `/map/markers/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllMarkersQuery,
  useCreateMarkerMutation,
  useGetMarkerByIdQuery,
  useUpdateMarkerByIdMutation,
  useDeleteMarkerByIdMutation,
} = mapApi;
