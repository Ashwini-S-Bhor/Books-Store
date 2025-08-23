// src/admin/adminRoutes.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const Admin = require('./model');
const adminProtect = require('./adminMiddleware');
const { getAdminSummary } = require('./dashboard.controller');

// ---------------------
// 🔐 Admin Login Route
// ---------------------
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: 'Admin not found' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: admin._id, isAdmin: true },
      process.env.JWT_SECRET || 'defaultSecretKey',
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    res.json({
      message: 'Admin login successful',
      token,
      user: { id: admin._id, email: admin.email, role: 'admin' }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Server error during admin login' });
  }
});

// ---------------------
// ✅ Admin-only routes
// ---------------------
router.use(adminProtect);

// Dashboard summary
router.get('/summary', getAdminSummary);

module.exports = router;
