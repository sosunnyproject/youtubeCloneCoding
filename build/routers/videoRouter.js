"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("../routes"));

var _videoController = require("../controllers/videoController");

var _middlewares = require("../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var videoRouter = _express["default"].Router();

videoRouter.get("/:id([0-9a-f]{24})", _videoController.watch); // Upload

videoRouter.route("/upload").all(_middlewares.protectorMiddleware).get(_videoController.getUpload).post(_middlewares.videoUploadMiddleware.single("video"), _videoController.postUpload); // Edit Video

videoRouter.route("/:id([0-9a-f]{24})/edit").all(_middlewares.protectorMiddleware).get(_videoController.getEditVideo).post(_videoController.postEditVideo); // Delete Video

videoRouter.route("/:id([0-9a-f]{24})/delete").all(_middlewares.protectorMiddleware).get(_videoController.deleteVideo);
var _default = videoRouter;
exports["default"] = _default;