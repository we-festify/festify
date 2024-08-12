import api from "../api";

const promotionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllPromotions: builder.query({
      query: ({ limit = 10, page = 1, search = "" } = {}) =>
        encodeURI(`/promotions?limit=${limit}&page=${page}&search=${search}`),
      providesTags: ["Promotions"],
    }),
    getPromotionById: builder.query({
      query: (id) => `/promotions/${id}`,
      providesTags: ["Promotions"],
    }),
    createPromotion: builder.mutation({
      query: (promotion) => ({
        url: "/promotions",
        method: "POST",
        body: {
          promotionCampaign: promotion,
        },
      }),
      invalidatesTags: ["Promotions"],
    }),
    updatePromotion: builder.mutation({
      query: ({ id, promotion }) => ({
        url: `/promotions/${id}`,
        method: "PUT",
        body: {
          promotionCampaign: promotion,
        },
      }),
      invalidatesTags: ["Promotions"],
    }),
  }),
});

export const {
  useGetAllPromotionsQuery,
  useGetPromotionByIdQuery,
  useCreatePromotionMutation,
  useUpdatePromotionMutation,
} = promotionApi;

export default promotionApi;
