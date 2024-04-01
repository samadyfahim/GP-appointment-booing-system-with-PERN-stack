const jwt = require('jsonwebtoken');

function jwtTokens({
    userId, 
    userName,
    email
}){
    const user = {
        userId, 
        userName,
        email
    }
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '50s' });
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1h' });
    return { accessToken, refreshToken };
}

module.exports = jwtTokens;
