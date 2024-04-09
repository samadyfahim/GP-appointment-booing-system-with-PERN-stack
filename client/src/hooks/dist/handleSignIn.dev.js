"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var handleSignIn = function handleSignIn(formData, signIn, navigate, setError) {
  var response, _response$data, accessToken, refreshToken;

  return regeneratorRuntime.async(function handleSignIn$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].post("http://localhost:5000/api/login", formData));

        case 3:
          response = _context.sent;

          if (response.data.ok) {
            _response$data = response.data, accessToken = _response$data.accessToken, refreshToken = _response$data.refreshToken;
            console.log(refreshToken);
            signIn({
              auth: {
                token: accessToken,
                type: "Bearer"
              },
              // refresh: refreshToken,
              userState: formData.email
            });
            navigate("/home");
          }

          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);

          if (_context.t0.response) {
            setError(_context.t0.response.data.error);
          } else if (_context.t0.request) {
            console.error("No response received:", _context.t0.request);
          } else {
            console.error("Error occurred during request setup:", _context.t0.message);
          }

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var _default = handleSignIn;
exports["default"] = _default;