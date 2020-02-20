// package.json > "scripts" : node index.js 커맨드를 npm start 커맨드로 대체

// const express = require('express');  // before babel
import express from "express";      // after babel
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookieParser"; // to accpet info from cookie
import bodyParser from "bodyParser";  // to accept info from body

const app = express();
const PORT = 4000;

const handleListening = () =>
  console.log(`Listening on: http://localhost:${PORT}`);

// app.post : request 비번, 데이터를 유저--> 서버로 보냈을 때, 댓글을 포스팅할 때
// app.get : response : 기본적인 브라우저가 페이지를 읽어올때, res.send('html 코드'),
// response: 요청을 받으면 응답을 해야함
const handleHome = (req, res) =>  res.send("Hello from home");    // answer something

// es6 arrow function
const handleProfile = (req, res) => res.send("You are on my profile");

// middleware can kill the process
// if you invoke res.send, instead of next();
const middleware = (req, res, next) => res.send("not happening");

// middlewares
app.use(cookieParser());
app.use(bodyParser.json());
app.user(bodyParser.urlencoded({extended: true}));
app.use(helmet());
app.user(morgan("dev")); // dev, common, ...

app.get("/", handleHome);
app.get("/profile", handleProfile)
app.listen(PORT, handleListening);

// respond with hello world when GET request is made to the homepage
// app.get("/", function(req, res){
//     res.send('hello world')
// })
