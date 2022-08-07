"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var VideoSchema = new _mongoose["default"].Schema({
  fileUrl: {
    type: String,
    required: "File URL is required"
  },
  title: {
    type: String,
    required: "Title is required"
  },
  description: String,
  views: {
    type: Number,
    "default": 0
  },
  createdAt: {
    type: Date,
    "default": Date.now
  },
  hashtags: [{
    type: String
  }],
  meta: {
    views: Number,
    rating: Number
  },
  owner: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User"
  },
  comments: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Comment"
  }]
});
VideoSchema["static"]("formatHashtags", function (hashtags) {
  return hashtags.split(",").map(function (word) {
    return word.startsWith("#") ? word : "#".concat(word);
  });
});

var Video = _mongoose["default"].model("Video", VideoSchema);

var _default = Video;
exports["default"] = _default;