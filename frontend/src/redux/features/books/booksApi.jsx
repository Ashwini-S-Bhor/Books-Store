import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../../utils/baseUrl'

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/books`,
  credentials: 'include',
  prepareHeaders: (Headers) => {
    const token = localStorage.getItem('token');
    if (token) {
      Headers.set('Authorization', `Bearer ${token}`);
    }
    return Headers;
  }
});

const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery,
  tagTypes: ['Books'],
  endpoints: (builder) => ({
    // GET all
    fetchAllBooks: builder.query({
      query: () => "/",
      providesTags: ["Books"]
    }),
    // GET one
    fetchBookById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Books", id }],
    }),
    // POST (create)
    addBook: builder.mutation({
      query: (newBook) => ({
        url: "/",
        method: "POST",
        body: newBook
      }),
      invalidatesTags: ["Books"]
    }),
    // PUT (update)
    updateBook: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/${id}`,
        method: "PUT",
        body: rest
      }),
      invalidatesTags: ["Books"]
    }),
    // DELETE
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Books"]
    })
  })
});

// ✅ Export hooks
export const {
  useFetchAllBooksQuery,
  useFetchBookByIdQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation
} = booksApi;

// ✅ Export API instance
export { booksApi };
