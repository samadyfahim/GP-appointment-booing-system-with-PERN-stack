const jwt = require("jsonwebtoken");

function jwtTokens({ userId }) {
  const user = {
    userId,
  };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1h",
  });
  return { accessToken, refreshToken };
}

module.exports = jwtTokens;
