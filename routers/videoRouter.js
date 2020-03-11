import express from "express";
import routes from "../routes";
import { getUpload, postUpload, videoDetail, editVideo, deleteVideo, videos} from "../controllers/videoController";
import {uploadVideoMiddleware } from "../middlewares";

const videoRouter = express.Router();

videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideoMiddleware, postUpload);

videoRouter.get(routes.editVideo, editVideo);
videoRouter.get(routes.deleteVideo, deleteVideo);
videoRouter.get(routes.videoDetail(), videoDetail);

export default videoRouter;