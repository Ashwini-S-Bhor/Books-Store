// src/redux/services/adminApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseUrl";

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/admin`,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery,
  tagTypes: ["AdminSummary"],
  endpoints: (builder) => ({
    // 📊 Get dashboard summary
    fetchAdminSummary: builder.query({
      query: () => "/summary",
      providesTags: ["AdminSummary"],
    }),
  }),
});

// ✅ Export hooks
export const { useFetchAdminSummaryQuery } = adminApi;

// ✅ Export API instance
export { adminApi };
