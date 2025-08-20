// backend/src/admin/admin.controller.js
const Book = require('../books/book.model');
const Order = require('../orders/order.model');
const User = require('../user/model/User');

// 📊 Admin Dashboard Summary
const getAdminSummary = async (req, res) => {
  try {
    // Get counts in parallel
    const [totalBooks, totalOrders, totalUsers] = await Promise.all([
      Book.countDocuments(),
      Order.countDocuments(),
      User.countDocuments()
    ]);

    // Aggregate for revenue & sold books
    const revenueData = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" },
          totalSoldBooks: { $sum: { $size: "$productIds" } }
        }
      }
    ]);

    res.status(200).json({
      totalBooks,
      totalOrders,
      totalUsers,
      totalRevenue: revenueData[0]?.totalRevenue || 0,
      totalSoldBooks: revenueData[0]?.totalSoldBooks || 0
    });
  } catch (error) {
    console.error("Admin Dashboard Error:", error);
    res.status(500).json({ message: "Failed to fetch dashboard data" });
  }
};

// ➕ Create Book
const createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ message: "Error creating book" });
  }
};

// 📄 Get All Books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Error fetching books" });
  }
};

// ✏ Update Book
const updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(updatedBook);
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ message: "Error updating book" });
  }
};

// 🗑 Delete Book
const deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ message: "Error deleting book" });
  }
};

module.exports = {
  getAdminSummary,
  createBook,
  getBooks,
  updateBook,
  deleteBook
};
