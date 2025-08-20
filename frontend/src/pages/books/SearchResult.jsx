import React from 'react'
import { useLocation } from 'react-router-dom'
import BookSearch from './BookSearch'
import { useSelector } from 'react-redux'

const useQuery = () => new URLSearchParams(useLocation().search);

const SearchResults = () => {
  const query = useQuery().get('q') || '';
  const books = useSelector((state) => state.books.allBooks); // assuming you store all books in redux
  return (
    <div className='p-4'>
      <h2 className='text-xl font-bold mb-4'>Search Results for: "{query}"</h2>
      <BookSearch books={books} queryFromURL={query} />
    </div>
  );
};

export default SearchResults;
