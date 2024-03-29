"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CommentSchema = new _mongoose["default"].Schema({
  text: {
    type: String,
    required: "Text is required"
  },
  owner: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  createdAt: {
    type: Date,
    "default": Date.now
  },
  video: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Video"
  }
});

var Comment = _mongoose["default"].model("Comment", CommentSchema);

var _default = Comment;
exports["default"] = _default;