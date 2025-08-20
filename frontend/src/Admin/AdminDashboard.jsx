import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBook, FaShoppingCart, FaUsers, FaMoneyBillWave, FaCheckCircle } from "react-icons/fa";

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("adminToken");

  const [newBook, setNewBook] = useState({
    title: "",
    description: "",
    category: "",
    trending: "",
    coverImage: "",
    oldPrice: "",
    newPrice: "",
  });

  const [editBookId, setEditBookId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  useEffect(() => {
    fetchBooks();
    fetchSummary();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/admin/books", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(res.data);
      setError("");
    } catch {
      setError("Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  const fetchSummary = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/summary", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSummary(res.data);
      setError("");
    } catch {
      setError("Failed to load dashboard summary");
    }
  };

  const handleCreateBook = async () => {
    if (
      !newBook.title ||
      !newBook.description ||
      !newBook.category ||
      !newBook.trending ||
      !newBook.coverImage ||
      !newBook.oldPrice ||
      !newBook.newPrice
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/admin/books",
        {
          ...newBook,
          oldPrice: Number(newBook.oldPrice),
          newPrice: Number(newBook.newPrice),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewBook({
        title: "",
        description: "",
        category: "",
        trending: "",
        coverImage: "",
        oldPrice: "",
        newPrice: "",
      });
      fetchBooks();
      fetchSummary();
      setError("");
    } catch {
      setError("Failed to create book");
    }
  };

  const handleDeleteBook = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBooks();
      fetchSummary();
      setError("");
    } catch {
      setError("Failed to delete book");
    }
  };

  const handleEditClick = (book) => {
    setEditBookId(book._id);
    setEditFormData({
      title: book.title,
      description: book.description,
      category: book.category,
      trending: book.trending,
      coverImage: book.coverImage,
      oldPrice: book.oldPrice,
      newPrice: book.newPrice,
    });
  };

  const handleCancelEdit = () => {
    setEditBookId(null);
    setEditFormData({});
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/books/${id}`,
        {
          ...editFormData,
          oldPrice: Number(editFormData.oldPrice),
          newPrice: Number(editFormData.newPrice),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditBookId(null);
      setEditFormData({});
      fetchBooks();
      fetchSummary();
      setError("");
    } catch {
      setError("Failed to update book");
    }
  };

  // Summary card component
  const SummaryCard = ({ icon, title, value, bgColor }) => (
    <div
      className={`flex items-center p-4 rounded-lg shadow-md text-white ${bgColor}`}
    >
      <div className="text-4xl mr-4">{icon}</div>
      <div>
        <p className="text-lg font-semibold">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900">Admin Dashboard</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 mb-6 rounded flex justify-between items-center">
          <span>{error}</span>
          <button
            onClick={() => setError("")}
            className="text-red-700 font-semibold hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Summary Section */}
      {summary && (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
          <SummaryCard
            icon={<FaBook />}
            title="Total Books"
            value={summary.totalBooks}
            bgColor="bg-indigo-600"
          />
          <SummaryCard
            icon={<FaShoppingCart />}
            title="Total Orders"
            value={summary.totalOrders}
            bgColor="bg-green-600"
          />
          <SummaryCard
            icon={<FaUsers />}
            title="Total Users"
            value={summary.totalUsers}
            bgColor="bg-blue-600"
          />
          <SummaryCard
            icon={<FaMoneyBillWave />}
            title="Total Revenue"
            value={`₹${summary.totalRevenue}`}
            bgColor="bg-yellow-600"
          />
          <SummaryCard
            icon={<FaCheckCircle />}
            title="Books Sold"
            value={summary.totalSoldBooks}
            bgColor="bg-pink-600"
          />
        </section>
      )}

      {/* Add New Book */}
      <section className="mb-12 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add New Book</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Title"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            placeholder="Category"
            value={newBook.category}
            onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            placeholder="Trending (yes/no)"
            value={newBook.trending}
            onChange={(e) => setNewBook({ ...newBook, trending: e.target.value })}
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            placeholder="Cover Image URL"
            value={newBook.coverImage}
            onChange={(e) => setNewBook({ ...newBook, coverImage: e.target.value })}
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="number"
            placeholder="Old Price"
            value={newBook.oldPrice}
            onChange={(e) => setNewBook({ ...newBook, oldPrice: e.target.value })}
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="number"
            placeholder="New Price"
            value={newBook.newPrice}
            onChange={(e) => setNewBook({ ...newBook, newPrice: e.target.value })}
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <textarea
          placeholder="Description"
          value={newBook.description}
          onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
          className="w-full border border-gray-300 rounded-md p-3 mt-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows={4}
        ></textarea>
        <button
          onClick={handleCreateBook}
          className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow-md transition"
        >
          Add Book
        </button>
      </section>

      {/* Books List */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Books List</h2>

        {loading ? (
          <p className="text-gray-500">Loading books...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-indigo-100 text-indigo-900">
                  <th className="p-3 border-b">Title</th>
                  <th className="p-3 border-b">Category</th>
                  <th className="p-3 border-b">Old Price</th>
                  <th className="p-3 border-b">New Price</th>
                  <th className="p-3 border-b">Trending</th>
                  <th className="p-3 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.length === 0 && (
                  <tr>
                    <td colSpan="6" className="p-4 text-center text-gray-500">
                      No books found
                    </td>
                  </tr>
                )}
                {books.map((book, idx) =>
                  editBookId === book._id ? (
                    <tr
                      key={book._id}
                      className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="p-2 border-b">
                        <input
                          type="text"
                          name="title"
                          value={editFormData.title}
                          onChange={handleEditFormChange}
                          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </td>
                      <td className="p-2 border-b">
                        <input
                          type="text"
                          name="category"
                          value={editFormData.category}
                          onChange={handleEditFormChange}
                          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </td>
                      <td className="p-2 border-b">
                        <input
                          type="number"
                          name="oldPrice"
                          value={editFormData.oldPrice}
                          onChange={handleEditFormChange}
                          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </td>
                      <td className="p-2 border-b">
                        <input
                          type="number"
                          name="newPrice"
                          value={editFormData.newPrice}
                          onChange={handleEditFormChange}
                          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </td>
                      <td className="p-2 border-b">
                        <input
                          type="text"
                          name="trending"
                          value={editFormData.trending}
                          onChange={handleEditFormChange}
                          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </td>
                      <td className="p-2 border-b flex space-x-2">
                        <button
                          onClick={() => handleSaveEdit(book._id)}
                          className="flex-1 px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="flex-1 px-3 py-1 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ) : (
                    <tr
                      key={book._id}
                      className={
                        idx % 2 === 0
                          ? "bg-white hover:bg-indigo-50"
                          : "bg-gray-50 hover:bg-indigo-50"
                      }
                    >
                      <td className="p-3 border-b">{book.title}</td>
                      <td className="p-3 border-b">{book.category}</td>
                      <td className="p-3 border-b">₹{book.oldPrice}</td>
                      <td className="p-3 border-b">₹{book.newPrice}</td>
                      <td className="p-3 border-b">{book.trending}</td>
                      <td className="p-3 border-b space-x-2">
                        <button
                          onClick={() => handleEditClick(book)}
                          className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-md hover:bg-yellow-500 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteBook(book._id)}
                          className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
