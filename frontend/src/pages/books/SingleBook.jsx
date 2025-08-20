import React from 'react';
import { FiShoppingCart } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { getImgUrl } from '../../utils/getImgUrl';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { useFetchBookByIdQuery } from '../../redux/features/books/booksApi';

const SingleBook = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    data: book,
    isLoading,
    isError,
  } = useFetchBookByIdQuery(id);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (isLoading) return <div className="text-center mt-6">Loading...</div>;
  if (isError || !book) return <div className="text-center mt-6 text-red-500">Error loading book info</div>;

  return (
    <div className="max-w-lg mx-auto p-6 shadow-lg rounded-md mt-10 bg-white">
      <h1 className="text-2xl font-bold mb-6 text-center">{book.title}</h1>

      <div>
        <div className="mb-6 text-center">
          <img
            src={getImgUrl(book.coverImage)}
            alt={book.title}
            className="w-60 h-auto mx-auto"
          />
        </div>

        <div className="mb-6 space-y-2 text-gray-800">
          <p><strong>Author:</strong> {book.author || 'Admin'}</p>
          <p><strong>Published:</strong> {new Date(book.createdAt).toLocaleDateString()}</p>
          <p><strong>Category:</strong> {book.category || 'General'}</p>
          <p><strong>Description:</strong> {book.description}</p>
        </div>

        <button
          onClick={() => handleAddToCart(book)}
          className="bg-orange-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-orange-600"
        >
          <FiShoppingCart />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default SingleBook;
