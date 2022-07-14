import express from "express";
import routes from "../routes";
import {trending, search } from "../controllers/videoController";
import {getJoin, postJoin, getLogin, postLogin, logout } from "../controllers/userController";


const globalRouter = express.Router();

globalRouter.get(routes.home, trending);

globalRouter.route("/join").get(getJoin).post(postJoin);
globalRouter.route("/login").get(getLogin).post(postLogin);

globalRouter.get(routes.logout, logout);
globalRouter.get(routes.search, search);


export default globalRouter;