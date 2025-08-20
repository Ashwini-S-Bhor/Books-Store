const jwt = require('jsonwebtoken');

const userProtect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied: No token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== 'user') {
      return res.status(403).json({ message: 'Access denied: Not a user' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Access denied: Invalid token' });
  }
};

module.exports = userProtect;
