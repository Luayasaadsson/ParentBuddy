import { Router } from "express";
import {
  getActivityRecommendations,
  getActivityHistory,
} from "../controllers/openaiController";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = Router();

router.post("/activities", authenticateJWT, getActivityRecommendations);
router.get("/history", authenticateJWT, getActivityHistory);

export default router;
