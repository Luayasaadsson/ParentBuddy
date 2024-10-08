import { Router } from "express";
import { getActivityRecommendations, getActivityHistory } from "../controllers/openaiController";

const router = Router();

router.post("/activities", getActivityRecommendations);
router.get("/history/:email", getActivityHistory);

export default router;
