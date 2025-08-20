const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// ✅ Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true,
}));

// ✅ Request logger (ADD THIS BEFORE routes)
app.use((req, res, next) => {
  console.log(`➡ ${req.method} ${req.originalUrl}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

// ✅ Import Routes
const bookRouter = require('./src/books/book.route');
const orderRoutes = require("./src/orders/order.route");
const authRoutes = require("./src/user/routes/auth");
const adminRoutes = require('./src/admin/AdminRoute');

// ✅ Use Routes
app.use("/api/books", bookRouter);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/admin', adminRoutes);

// ✅ Global error handler (ADD THIS AFTER routes)
app.use((err, req, res, next) => {
  console.error('🔥 Error caught by global handler:', err);
  if (!res.headersSent) {
    res.status(err.status || 500).json({
      message: err.message || 'Internal Server Error',
      stack: err.stack
    });
  }
});

// ✅ Default route
app.get('/', (req, res) => {
  res.send('📚 Book Store API is running...');
});


// ✅ MongoDB Connection + Server Start
(async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("✅ MongoDB connected successfully!");

    app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });

  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
})();
