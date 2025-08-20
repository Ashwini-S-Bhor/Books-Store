import { createSlice } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';

const initialState = {
  wishlistItems: JSON.parse(localStorage.getItem("wishlistItems")) || []
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const existingItem = state.wishlistItems.find(
        (item) => item._id === action.payload._id
      );

      if (!existingItem) {
        state.wishlistItems.push(action.payload);
        localStorage.setItem("wishlistItems", JSON.stringify(state.wishlistItems));
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Book added to Wishlist",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          title: "Already in Wishlist",
          icon: "warning",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok!",
        });
      }
    },
    removeFromWishlist: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem("wishlistItems", JSON.stringify(state.wishlistItems));
    },
    clearWishlist: (state) => {
      state.wishlistItems = [];
      localStorage.removeItem("wishlistItems");
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
