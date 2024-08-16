import express from "express";
import { addComment } from "../controllers/post.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();


router.route("/comment").put(isAuthenticated, addComment);

export default router;