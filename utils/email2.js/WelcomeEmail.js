"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports["default"] = WelcomeEmail;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e };
}
function WelcomeEmail(_ref) {
  var firstName = _ref.firstName,
    url = _ref.url;
  return /*#__PURE__*/ _react["default"].createElement(
    "div",
    null,
    /*#__PURE__*/ _react["default"].createElement(
      "h1",
      {
        className: "text-2xl text-gray-900 font-thin",
      },
      "Welcome, ",
      firstName,
      "!"
    ),
    /*#__PURE__*/ _react["default"].createElement(
      "p",
      null,
      "We're excited to have you on board."
    ),
    /*#__PURE__*/ _react["default"].createElement(
      "p",
      null,
      "Click the link below to confirm your email:"
    ),
    /*#__PURE__*/ _react["default"].createElement(
      "a",
      {
        href: url,
      },
      "Confirm Email"
    )
  );
}
