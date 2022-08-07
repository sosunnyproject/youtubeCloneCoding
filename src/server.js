// express server

import "./db";
import express from "express";      // after babel
import morgan from "morgan";
import helmet from "helmet";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser"; // to accpet info from cookie
import bodyParser from "body-parser";  // to accept info from body
import userRouter from "./routers/userRouter";  // use {} to import something that is not 'export default ...'
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import apiRouter from "./routers/apiRouter";
import routes from "./routes";
import { localsMiddleware } from './middlewares';
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();
const logger = morgan("dev");

app.use(helmet());
app.set("view engine", "pug");

console.log(process.cwd()+"\\src\\views");
app.set("views", process.cwd() + "\\src\\views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));

// express session middleware
// server gives browser a sessionId
// browser sends back sessionId for every server request
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        // cookie: {
        //     maxAge: 10000,
        // },
        store: MongoStore.create({ mongoUrl: process.env.MONGO_URL })
    })
);

app.use(cookieParser());                 // cookies when userAuth

app.use(bodyParser.json());              // what content is the user sending to the website: form, json, video, data, such body types
app.use(bodyParser.urlencoded({ extended: true }));

app.use(localsMiddleware);

// .get --> .use if you use router.js
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);
app.use("/uploads", express.static("uploads"));
app.use("/assets", express.static("assets"));

const handleListening = () => {
    console.log(`Listening on: http://localhost:${PORT}`);
}

app.listen(PORT, handleListening);

export default app;