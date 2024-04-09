"use strict";

var jwt = require("jsonwebtoken");

function jwtTokens(_ref) {
  var userId = _ref.userId,
      userName = _ref.userName,
      email = _ref.email;
  var user = {
    userId: userId,
    userName: userName,
    email: email
  };
  var accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "20s"
  });
  var refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "2m"
  });
  return {
    accessToken: accessToken,
    refreshToken: refreshToken
  };
}

module.exports = jwtTokens;