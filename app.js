// package.json > "scripts" : node index.js 커맨드를 npm start 커맨드로 대체

// const express = require('express');  // before babel
import express from "express";      // after babel
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser"; // to accpet info from cookie
import bodyParser from "body-parser";  // to accept info from body
import {userRouter} from "./routers/userRouter";  // use {} to import something that is not 'export default ...'
import {videoRouter} from "./routers/videoRouter";  
import {globalRouter} from "./routers/globalRouter";

const app = express();
const middleware = (req, res, next) => res.send("not happening");

// middlewares
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet());
app.use(morgan("dev")); // dev, common, ...

// .get --> .use if you use router.js
app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/video", videoRouter);

export default app;