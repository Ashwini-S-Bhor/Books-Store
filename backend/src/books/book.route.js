// src/books/book.routes.js
const express = require('express');
const router = express.Router();
const {
  postABook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteABook
} = require('./book.controller');
const adminProtect = require('../admin/adminMiddleware');

// Public routes
router.get("/", getAllBooks);
router.get("/:id", getSingleBook);

// Admin-only routes
router.post("/", adminProtect, postABook);
router.put("/:id", adminProtect, updateBook);
router.delete("/:id", adminProtect, deleteABook);

module.exports = router;
