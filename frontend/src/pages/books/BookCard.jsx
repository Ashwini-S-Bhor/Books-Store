import React from 'react'
import { FiShoppingCart, FiHeart } from "react-icons/fi"; // ❤️ Wishlist icon
import { getImgUrl } from '../../utils/getImgUrl';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { addToWishlist } from '../../redux/features/wishlist/wishlistSlice'; // ✅ Wishlist slice
import { useAuth } from '../../context/AuthContext'; 
import toast from 'react-hot-toast'; 

export const BookCard = ({ book }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleAddToCart = (product) => {
    if (!currentUser) {
      toast.error("Please login to add items to cart");
      navigate('/login');
      return;
    }
    dispatch(addToCart(product));
    toast.success("Book added to cart");
  };

  const handleAddToWishlist = (product) => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    dispatch(addToWishlist(product));
    toast.success("Book added to wishlist");
  };

  return (
    <div className="rounded-lg transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:h-72 sm:justify-center gap-4">
        {/* Book Image */}
        <div className="sm:h-72 sm:flex-shrink-0 border rounded-md relative">
          <Link to={`/books/${book._id}`}>
            <img
              src={`${getImgUrl(book?.coverImage)}`}
              alt={book?.title}
              className="w-full bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
            />
          </Link>

          {/* ❤️ Wishlist button floating on image */}
          <button
            onClick={() => handleAddToWishlist(book)}
            className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-pink-100 transition"
          >
            <FiHeart className="text-red-500 text-xl" />
          </button>
        </div>

        {/* Book Details */}
        <div>
          <Link to={`/books/${book._id}`}>
            <h3 className="text-xl font-semibold hover:text-blue-600 mb-3">
              {book?.title}
            </h3>
          </Link>
          <p className="text-gray-600 mb-5">
            {book?.description.length > 80
              ? `${book.description.slice(0, 80)}...`
              : book.description}
          </p>
          <p className="font-medium mb-5">
            ${book?.newPrice}{' '}
            <span className="line-through font-normal ml-2">
              ${book?.oldPrice}
            </span>
          </p>

          {/* Add to Cart */}
          <button
            onClick={() => handleAddToCart(book)}
            className="btn-primary px-6 space-x-1 flex items-center gap-1"
          >
            <FiShoppingCart />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};
