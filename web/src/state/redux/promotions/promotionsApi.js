import api from "../api";

const promotionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllPromotions: builder.query({
      query: () => `/promotions`,
      providesTags: ["Promotions"],
    }),
    getPromotionById: builder.query({
      query: (id) => `/promotions/${id}`,
      providesTags: ["Promotions"],
    }),
    getPromotionByPromoCode: builder.query({
      query: (code) => `/promotions/code/${code}`,
      providesTags: ["Promotions"],
    }),
    getBestApplicablePromotion: builder.query({
      query: ({ orderType, orderAmount }) =>
        `/promotions/best?orderType=${orderType}&orderAmount=${orderAmount}`,
      providesTags: ["Promotions"],
    }),
    getAllMyPromotions: builder.query({
      query: () => `/promotions/me`,
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
  useGetBestApplicablePromotionQuery,
  useGetAllMyPromotionsQuery,
  useGetPromotionByPromoCodeQuery,
} = promotionApi;

export default promotionApi;
