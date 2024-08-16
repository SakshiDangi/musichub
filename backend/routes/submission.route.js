import express from "express";
import { applyGig, getApplicants, getSubmitedGig, updateStatus } from "../controllers/submission.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/apply/:id").get(isAuthenticated, applyGig);
router.route("/get").get(isAuthenticated, getSubmitedGig);
router.route("/:id/applicants").get(isAuthenticated, getApplicants);
router.route("/status/:id/update").post(isAuthenticated, updateStatus);

export default router;