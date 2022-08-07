import express from "express";
import routes from "../routes";
import { getEdit, postEdit, startGithubLogin, finishGithubLogin, logout, getChangePassword, postChangePassword, see } from "../controllers/userController";
import { protectorMiddleware, publicOnlyMiddleware, localsMiddleware, avatarUploadMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.route("/change-password").all(protectorMiddleware).all(localsMiddleware).get(getChangePassword).post(postChangePassword);
userRouter
    .route("/edit")
    .all(protectorMiddleware)
    .all(localsMiddleware)
    .get(getEdit)
    .post(avatarUploadMiddleware.single("avatar"), postEdit);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
userRouter.get("/logout", protectorMiddleware, logout);
userRouter.get("/:id", see);

export default userRouter;
