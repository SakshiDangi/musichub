import express from "express";
import { getAdminGig, getAllGig, getGigById, postGig } from "../controllers/gig.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postGig);
router.route("/get").get(isAuthenticated, getAllGig);
router.route("/getadmingig").get(isAuthenticated, getAdminGig);
router.route("/get/:id").get(isAuthenticated,getGigById);

export default router;