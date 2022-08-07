import express from "express";
import routes from "../routes";
import {
    getUpload,
    postUpload,
    watch,
    getEditVideo,
    postEditVideo,
    deleteVideo
} from "../controllers/videoController";
import { protectorMiddleware, uploadVideoMiddleware } from "../middlewares";

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", watch);

// Upload
videoRouter
    .route("/upload")
    .all(protectorMiddleware)
    .get(getUpload)
    .post(postUpload);

videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideoMiddleware, postUpload);

// Edit Video
videoRouter
    .route("/:id([0-9a-f]{24}/edit)")
    .all(protectorMiddleware)
    .get(getEditVideo)
    .post(postEditVideo);

// Delete Video
videoRouter
    .route("/:id([0-9a-f]{24}/delete)")
    .all(protectorMiddleware)
    .get(deleteVideo);


export default videoRouter;