const jwt = require('jsonwebtoken');


// it should be used as the authorization for req as Bearer
function authenticateToken(req, res, next) {
    const authheader = req.headers['authorization']; // Use req.headers instead of req.header
    const token = authheader && authheader.split(' ')[1]; // Corrected the split method
    if (token == null) {
        return res.status(401).json({ error: "no token" });
    } 
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if (error) {
            return res.status(403).json({ error: error.message });
        }
        // If verification succeeds, you might want to attach the user object to the request
        req.user = user;
        next(); // Call next() to move to the next middleware
    });
}

module.exports = authenticateToken; // Export the middleware function
