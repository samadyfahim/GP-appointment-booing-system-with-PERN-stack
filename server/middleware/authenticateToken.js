const jwt = require("jsonwebtoken");

// Middleware function to authenticate JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]; // Use req.headers instead of req.header
  const token = authHeader && authHeader.split(" ")[1]; // Corrected the split method
  if (token == null) {
    return res.status(401).json({ error: "No token provided" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decodedToken) => {
    if (error) {
      return res.status(403).json({ error: "Invalid token" });
    }
    // If verification succeeds, you might want to attach the user object to the request
    req.user = decodedToken;
    next(); // Call next() to move to the next middleware
  });
};

module.exports = { authenticateToken };
