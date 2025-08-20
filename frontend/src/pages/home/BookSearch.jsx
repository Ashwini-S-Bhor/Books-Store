import React, { useState, useEffect } from 'react';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi'; // ✅ adjust if needed

const BookSearch = () => {
  const [query, setQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);

  const { data: books = [], isLoading, isError } = useFetchAllBooksQuery();

  useEffect(() => {
    const lowerCaseQuery = query.toLowerCase();

    const results = books.filter((book) =>
      book.title.toLowerCase().includes(lowerCaseQuery) ||
      book.author.toLowerCase().includes(lowerCaseQuery)
    );

    setFilteredBooks(lowerCaseQuery ? results : []);
  }, [query, books]);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <input
        type="text"
        placeholder="Search by title or author..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
      />

      {isLoading && <p className="text-blue-500 text-center">Loading books...</p>}
      {isError && <p className="text-red-500 text-center">Failed to load books.</p>}

      {query && filteredBooks.length === 0 && (
        <p className="text-red-500 text-center">Book Not Available</p>
      )}

      {filteredBooks.length > 0 && (
        <ul className="space-y-2">
          {filteredBooks.map((book) => (
            <li key={book._id || book.id} className="border p-3 rounded shadow">
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <p className="text-gray-600">{book.author}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookSearch;
