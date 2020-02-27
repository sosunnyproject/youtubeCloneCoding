// package.json > "scripts" : node index.js 커맨드를 npm start 커맨드로 대체

// const express = require('express');  // before babel
import express from "express";      // after babel
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser"; // to accpet info from cookie
import bodyParser from "body-parser";  // to accept info from body

const app = express();

const handleHome = (req, res) =>  res.send("Hello from home");    // answer something

const handleProfile = (req, res) => res.send("You are on my profile");

const middleware = (req, res, next) => res.send("not happening");

// middlewares
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet());
app.use(morgan("dev")); // dev, common, ...

app.get("/", handleHome);
app.get("/profile", handleProfile);

export default app;