require('dotenv').config();
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  jwt.verify(token, process.env.SECRET_JWT_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(403).json({ success: false, message: `Forbidden error: ${err.message}` });
    }

    req.id = decoded.id;
    req.type = decoded.type;
    next();
  });
};

module.exports = authenticateToken;
