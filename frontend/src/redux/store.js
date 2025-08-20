import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';

import { booksApi } from '../redux/features/books/booksApi';
import { ordersApi } from '../redux/features/orders/ordersApi';
import wishlistReducer from './features/wishlist/wishlistSlice'
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,

    // Add RTK Query reducers using their reducerPath
    [booksApi.reducerPath]: booksApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      booksApi.middleware,
      ordersApi.middleware
    ),
});
