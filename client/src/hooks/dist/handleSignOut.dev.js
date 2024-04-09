"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactRouterDom = require("react-router-dom");

var _useSignOut = _interopRequireDefault(require("react-auth-kit/hooks/useSignOut"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var handleSignOut = function handleSignOut() {
  var navigate = (0, _reactRouterDom.useNavigate)();
  var signOut = (0, _useSignOut["default"])();
  signOut();
  navigate("/login");
};

var _default = handleSignOut; //  const handleLogout = () => {
//         handleSignOut();
//     };

exports["default"] = _default;