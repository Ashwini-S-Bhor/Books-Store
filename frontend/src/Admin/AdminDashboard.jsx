// src/pages/admin/AdminDashboard.jsx
import React, { useState } from "react";
import {
  useFetchAllBooksQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} from "../redux/features/books/booksApi";
import {
  useFetchAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../redux/features/orders/ordersApi";
import {
  useFetchAllUsersQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../redux/features/users/UserApi";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const AdminDashboard = () => {
  // 📚 Books
  const { data: books = [], isLoading: booksLoading } = useFetchAllBooksQuery();
  const [addBook] = useAddBookMutation();
  const [updateBook] = useUpdateBookMutation();
  const [deleteBook] = useDeleteBookMutation();

  // 📦 Orders
  const { data: orders = [], isLoading: ordersLoading } =
    useFetchAllOrdersQuery();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  // 👥 Users
  const { data: users = [], isLoading: usersLoading } = useFetchAllUsersQuery();
  const [addUser] = useAddUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  // 📚 Inline book edit state
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    price: "",
    category: "",
  });

  const handleBookEdit = (id, field, value) => {
    updateBook({ id, [field]: value });
  };

  const handleBookDelete = (id) => {
    deleteBook(id);
  };

  const handleAddBook = () => {
    if (newBook.title && newBook.author && newBook.price) {
      addBook(newBook);
      setNewBook({ title: "", author: "", price: "", category: "" });
    }
  };

  const handleOrderStatusChange = (id, status) => {
    updateOrderStatus({ id, status });
  };

  if (booksLoading || ordersLoading || usersLoading) return <p>Loading...</p>;

  // 📊 Summary Data
  const totalBooks = books.length;
  const totalOrders = orders.length;
  const totalUsers = users.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);

  // 🥧 Pie Chart Data
  const pieData = [
    { name: "Books", value: totalBooks },
    { name: "Orders", value: totalOrders },
    { name: "Users", value: totalUsers },
    { name: "Revenue", value: totalRevenue },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📊 Admin Dashboard</h1>

      {/* 📊 Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-10">
        <div className="bg-blue-100 p-4 rounded shadow text-center">
          <h2 className="text-lg font-semibold">Books</h2>
          <p className="text-2xl">{totalBooks}</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow text-center">
          <h2 className="text-lg font-semibold">Orders</h2>
          <p className="text-2xl">{totalOrders}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow text-center">
          <h2 className="text-lg font-semibold">Users</h2>
          <p className="text-2xl">{totalUsers}</p>
        </div>
        <div className="bg-purple-100 p-4 rounded shadow text-center">
          <h2 className="text-lg font-semibold">Revenue</h2>
          <p className="text-2xl">${totalRevenue.toFixed(2)}</p>
        </div>
      </div>

      {/* 🥧 Pie Chart */}
      <div className="w-full h-80 mb-10">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={120}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 📚 Books Table */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Books Management</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Title</th>
              <th className="p-2">Author</th>
              <th className="p-2">Price</th>
              <th className="p-2">Category</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id} className="border-t">
                <td className="p-2">
                  <input
                    type="text"
                    value={book.title}
                    onChange={(e) =>
                      handleBookEdit(book._id, "title", e.target.value)
                    }
                    className="border px-2"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="text"
                    value={book.author}
                    onChange={(e) =>
                      handleBookEdit(book._id, "author", e.target.value)
                    }
                    className="border px-2"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    value={book.price}
                    onChange={(e) =>
                      handleBookEdit(book._id, "price", e.target.value)
                    }
                    className="border px-2 w-24"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="text"
                    value={book.category}
                    onChange={(e) =>
                      handleBookEdit(book._id, "category", e.target.value)
                    }
                    className="border px-2"
                  />
                </td>
                <td className="p-2">
                  <button
                    onClick={() => handleBookDelete(book._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {/* New Book Row */}
            <tr className="border-t bg-gray-50">
              <td className="p-2">
                <input
                  type="text"
                  placeholder="New Title"
                  value={newBook.title}
                  onChange={(e) =>
                    setNewBook({ ...newBook, title: e.target.value })
                  }
                  className="border px-2"
                />
              </td>
              <td className="p-2">
                <input
                  type="text"
                  placeholder="New Author"
                  value={newBook.author}
                  onChange={(e) =>
                    setNewBook({ ...newBook, author: e.target.value })
                  }
                  className="border px-2"
                />
              </td>
              <td className="p-2">
                <input
                  type="number"
                  placeholder="New Price"
                  value={newBook.price}
                  onChange={(e) =>
                    setNewBook({ ...newBook, price: e.target.value })
                  }
                  className="border px-2 w-24"
                />
              </td>
              <td className="p-2">
                <input
                  type="text"
                  placeholder="New Category"
                  value={newBook.category}
                  onChange={(e) =>
                    setNewBook({ ...newBook, category: e.target.value })
                  }
                  className="border px-2"
                />
              </td>
              <td className="p-2">
                <button
                  onClick={handleAddBook}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Add
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 📦 Orders Table */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Orders</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Order ID</th>
              <th className="p-2">User</th>
              <th className="p-2">Total Price</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-t">
                <td className="p-2">{order._id}</td>
                <td className="p-2">{order.userId?.email}</td>
                <td className="p-2">${order.totalPrice}</td>
                <td className="p-2">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleOrderStatusChange(order._id, e.target.value)
                    }
                    className="border px-2 py-1"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 👥 Users Table */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Users</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">User ID</th>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="p-2">{user._id}</td>
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminDashboard;
