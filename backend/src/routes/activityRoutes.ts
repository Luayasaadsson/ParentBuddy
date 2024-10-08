import express from "express";
import { getActivityRecommendations } from "../controllers/openaiController";

const router = express.Router();

router.post("/activities", getActivityRecommendations);

export default router;
