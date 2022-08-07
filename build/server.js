"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("./db");

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _helmet = _interopRequireDefault(require("helmet"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _connectMongo = _interopRequireDefault(require("connect-mongo"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _userRouter = _interopRequireDefault(require("./routers/userRouter"));

var _videoRouter = _interopRequireDefault(require("./routers/videoRouter"));

var _globalRouter = _interopRequireDefault(require("./routers/globalRouter"));

var _apiRouter = _interopRequireDefault(require("./routers/apiRouter"));

var _middlewares = require("./middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// express server
// after babel
// to accpet info from cookie
// to accept info from body
// use {} to import something that is not 'export default ...'
var app = (0, _express["default"])();
var logger = (0, _morgan["default"])("dev");
app.use((0, _helmet["default"])());
app.set("view engine", "pug");
console.log(process.cwd() + "\\src\\views");
app.set("views", process.cwd() + "\\src\\views");
app.use(logger);
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_express["default"].json()); // receive body payload as json. JSON.parse role
// express session middleware
// server gives browser a sessionId
// browser sends back sessionId for every server request

app.use((0, _expressSession["default"])({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  // cookie: {
  //     maxAge: 10000,
  // },
  store: _connectMongo["default"].create({
    mongoUrl: process.env.MONGO_URL
  })
}));
app.use((0, _cookieParser["default"])()); // cookies when userAuth

app.use(_bodyParser["default"].json()); // what content is the user sending to the website: form, json, video, data, such body types

app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_middlewares.localsMiddleware);
app.use("/uploads", _express["default"]["static"]("uploads"));
app.use("/assets", _express["default"]["static"]("assets"));
app.use("/users", _userRouter["default"]);
app.use("/videos", _videoRouter["default"]);
app.use("/api", _apiRouter["default"]);
app.use("/", _globalRouter["default"]);
var _default = app;
exports["default"] = _default;