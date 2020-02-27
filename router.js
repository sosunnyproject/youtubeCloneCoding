import express from "express";

export const userRouter = express.Router();

// routes of localhost:4000/user/...
userRouter.get("/", (req, res) => res.send("user index"));
userRouter.get("/edit", (req, res) => res.send("user edit"));
userRouter.get("/password", (req, res) => res.send("user password"));
