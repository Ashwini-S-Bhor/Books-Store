import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseUrl";

const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/orders`,
    credentials: 'include',
  }),
  tagTypes: ['Orders'],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: "/",
        method: "POST",
        body: newOrder,
        credentials: 'include',
      }),
      invalidatesTags: ['Orders'],
    }),
    getOrderByEmail: builder.query({
      query: (email) => ({
        url: `/email/${email}`,
      }),
      providesTags: ['Orders'],
    }),
    // ✅ Add this endpoint
    fetchAllOrders: builder.query({
      query: () => "/",
      providesTags: ['Orders'],
    }),
    // Optional: if you want to update order status
    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ['Orders'],
    }),
  }),
});

// ✅ Export all hooks
export const { 
  useCreateOrderMutation, 
  useGetOrderByEmailQuery, 
  useFetchAllOrdersQuery,
  useUpdateOrderStatusMutation 
} = ordersApi;

export { ordersApi };
