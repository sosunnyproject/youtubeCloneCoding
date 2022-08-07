import express from "express";
import routes from "../routes";
import { trending, search } from "../controllers/videoController";
import { getJoin, postJoin, getLogin, postLogin } from "../controllers/userController";
import { publicOnlyMiddleware } from "../middlewares";


const globalRouter = express.Router();

globalRouter.get("/", trending);

globalRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);
globalRouter.route("/login").all(publicOnlyMiddleware).get(getLogin).post(postLogin);

globalRouter.get(routes.search, search);


export default globalRouter;