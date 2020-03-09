// package.json > "scripts" : node index.js 커맨드를 npm start 커맨드로 대체

// const express = require('express');  // before babel
import express from "express";      // after babel
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser"; // to accpet info from cookie
import bodyParser from "body-parser";  // to accept info from body
import userRouter from "./routers/userRouter";  // use {} to import something that is not 'export default ...'
import videoRouter from "./routers/videoRouter";  
import globalRouter from "./routers/globalRouter";
import apiRouter from "./routers/apiRouter";
import routes from "./routes";
import { localsMiddleware } from './middlewares';

const app = express();

app.use(helmet());
app.set("view engine", "pug");
app.use(cookieParser());                 // cookies when userAuth

app.use(bodyParser.json());              // what content is the user sending to the website: form, json, video, data, such body types
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("dev"));                 // logger
app.use(localsMiddleware);

// .get --> .use if you use router.js
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

export default app;