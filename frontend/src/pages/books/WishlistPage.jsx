import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist, clearWishlist } from "../../redux/features/wishlist/wishlistSlice";
import { getImgUrl } from "../../utils/getImgUrl";
import { Link } from "react-router-dom";

const WishlistPage = () => {
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const dispatch = useDispatch();

  if (wishlistItems.length === 0) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-semibold">Your Wishlist is Empty 😢</h2>
        <p className="mt-2">Browse books and add them to your wishlist.</p>
        <Link to="/books" className="btn-primary mt-4 inline-block">
          Browse Books
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-6">My Wishlist ❤️</h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {wishlistItems.map((item) => (
          <div
            key={item._id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <Link to={`/books/${item._id}`}>
              <img
                src={getImgUrl(item.coverImage)}
                alt={item.title}
                className="h-48 w-full object-cover rounded-md mb-3"
              />
              <h3 className="text-lg font-semibold text-center">{item.title}</h3>
            </Link>
            <p className="text-gray-600 text-center mt-1">
              ${item.newPrice}{" "}
              <span className="line-through text-sm ml-1">
                ${item.oldPrice}
              </span>
            </p>
            <button
              onClick={() => dispatch(removeFromWishlist(item))}
              className="btn-secondary w-full mt-3"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6 text-right">
        <button
          onClick={() => dispatch(clearWishlist())}
          className="btn-danger px-6 py-2"
        >
          Clear Wishlist
        </button>
      </div>
    </div>
  );
};

export default WishlistPage;
