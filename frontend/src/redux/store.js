import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import wishlistReducer from './features/wishlist/wishlistSlice';

// RTK Query API slices
import { booksApi } from './features/books/booksApi';
import { ordersApi } from './features/orders/ordersApi';
import { userApi } from './features/users/UserApi';
import { adminApi } from './services/adminApi';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,

    // Add RTK Query reducers using their reducerPath
    [booksApi.reducerPath]: booksApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      booksApi.middleware,
      ordersApi.middleware,
      userApi.middleware,
      adminApi.middleware
    ),
});
