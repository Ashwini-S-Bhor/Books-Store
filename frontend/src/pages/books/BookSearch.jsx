// src/pages/books/SearchPage.jsx
import React from 'react';
import BookSearch from '.././home/BookSearch'; // adjust path if needed

const SearchPage = () => {
  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold text-center mb-4">Search Books</h1>
      <BookSearch />
    </div>
  );
};

export default SearchPage;
