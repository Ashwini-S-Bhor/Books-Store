import React, { useState, useEffect } from 'react';
import { HiOutlineBars3CenterLeft } from "react-icons/hi2";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { HiOutlineUser } from "react-icons/hi";
import { FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi";
import avatarImg from "../assets/news/avatar.png";
import { useSelector } from 'react-redux';
import { useFetchAllBooksQuery } from '../redux/features/books/booksApi';

const navigation = [
  { name: "Orders", href: "/orders" },
  { name: "Cart Page", href: "/cart" },
  { name: "Check Out", href: "/checkout" }
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = useSelector(state => state.cart.cartItems);
  const { data: books = [], isLoading, error } = useFetchAllBooksQuery();
const wishlistItems = useSelector(state =>state.wishlist.wishlistItems);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);

  // ✅ Check token on location change
  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    const userToken = localStorage.getItem("userToken");
    setIsAdmin(!!adminToken);
    setIsUser(!!userToken);
  }, [location]);

  useEffect(() => {
    const lowerQuery = query.toLowerCase();
    const results = books.filter(book =>
      book?.title?.toLowerCase().includes(lowerQuery) ||
      book?.author?.toLowerCase().includes(lowerQuery)
    );
    setFilteredBooks(lowerQuery ? results : []);
  }, [query, books]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
    setIsAdmin(false);
    setIsUser(false);
    navigate("/");
  };

  return (
    <header className="max-w-screen-2xl mx-auto px-4 py-6">
      <nav className="flex flex-col gap-4">
        <div className='flex justify-between items-center'>
          <div className='flex items-center md:gap-16 gap-4'>
            <Link to="/"><HiOutlineBars3CenterLeft className='size-6' /></Link>

            <div className='relative sm:w-72 w-40'>
              <CiSearch className='absolute left-3 top-2.5 text-gray-500' />
              <input
                type="text"
                placeholder="Search Book"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-[#EAEAEA] w-full py-2 pl-10 pr-2 rounded-md focus:outline-none"
              />
            </div>
          </div>

          <div className='relative flex items-center md:space-x-3 space-x-2'>
            {(isAdmin || isUser) ? (
              <div className="relative">
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <img src={avatarImg} alt="User avatar" className="size-7 rounded-full ring-2 ring-blue-500" />
                </button>

                {isDropdownOpen && (
                  <div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40'>
                    <ul className='py-2'>
                      {isAdmin && (
                        <li>
                          <Link
                            to="/admin/dashboard"
                            className='block px-4 py-2 text-sm hover:bg-gray-100'
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            Dashboard
                          </Link>
                        </li>
                      )}

                      {navigation.map(item => (
                        <li key={item.name}>
                          <Link
                            to={item.href}
                            className='block px-4 py-2 text-sm hover:bg-gray-100'
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}

                      <li>
                        <button
                          onClick={handleLogout}
                          className='block w-full text-left px-4 py-2 text-sm hover:bg-gray-100'
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative">
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <HiOutlineUser className="size-6" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                    <ul className="py-2">
                      <li>
                        <Link
                          to="/login"
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Login as User
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/admin/login"
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Login as Admin
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}

            <Link to="/wishlist" className="relative hidden sm:block">
              <FaRegHeart className='size-6' />
              {wishlistItems.length > 0 && (
                <span className ="absolutr -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <Link to='/cart' className='bg-orange-300 sm:px-6 py-2 flex items-center rounded-sm'>
              <HiOutlineShoppingCart />
              <span className='text-sm font-semibold sm:ml-1'>{cartItems.length}</span>
            </Link>
          </div>
        </div>

        {query && (
          <div className='bg-white shadow p-4 rounded-md max-w-2xl mx-auto'>
            {isLoading ? (
              <p className="text-center text-gray-500">Loading books...</p>
            ) : error ? (
              <p className="text-center text-red-500">Failed to fetch books</p>
            ) : filteredBooks.length > 0 ? (
              <ul className="space-y-2">
                {filteredBooks.map((book) => (
                  <li key={book._id}>
                    <Link
                      to={`/book/${book._id}`}
                      className="block border p-2 rounded hover:bg-gray-100 transition"
                      onClick={() => {
                        setQuery('');
                        setFilteredBooks([]);
                      }}
                    >
                      <h3 className="font-semibold">{book.title}</h3>
                      <p className="text-gray-600 text-sm">{book.author}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className='text-center text-red-500'>Book Not Available</p>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
