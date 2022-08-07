"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("../routes"));

var _userController = require("../controllers/userController");

var _middlewares = require("../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userRouter = _express["default"].Router();

userRouter.route("/change-password").all(_middlewares.protectorMiddleware).all(_middlewares.localsMiddleware).get(_userController.getChangePassword).post(_userController.postChangePassword);
userRouter.route("/edit").all(_middlewares.protectorMiddleware).all(_middlewares.localsMiddleware).get(_userController.getEdit).post(_middlewares.avatarUploadMiddleware.single("avatar"), _userController.postEdit);
userRouter.get("/github/start", _middlewares.publicOnlyMiddleware, _userController.startGithubLogin);
userRouter.get("/github/finish", _middlewares.publicOnlyMiddleware, _userController.finishGithubLogin);
userRouter.get("/logout", _middlewares.protectorMiddleware, _userController.logout);
userRouter.get("/:id", _userController.see);
var _default = userRouter;
exports["default"] = _default;