
const jwt = require('jsonwebtoken');

const isAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check for token in Authorization header
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ message: 'Authorization token missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify the JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultSecretKey');

    // Debug log for development
    console.log("Decoded token in isAdmin middleware:", decoded);

    // Check if user is admin
    if (!decoded.isAdmin) {
      return res
        .status(403)
        .json({ message: 'Access denied. Admins only.' });
    }

    // Attach decoded info to request object
    req.admin = decoded;
    next();
  } catch (err) {
    console.error("JWT verification error:", err.message);
    return res
      .status(401)
      .json({ message: 'Invalid or expired token' });
  }
};

module.exports = isAdmin;
