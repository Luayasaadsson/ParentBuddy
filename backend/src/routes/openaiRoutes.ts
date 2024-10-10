import { Router } from "express";
import {
  getActivityRecommendations,
  getActivityHistory,
  toggleFavoriteActivity,
  getFavoriteActivities,
  deleteActivity,
} from "../controllers/openaiController";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = Router();

router.post("/activities", authenticateJWT, getActivityRecommendations);
router.get("/history", authenticateJWT, getActivityHistory);
router.put(
  "/activities/:activityId/favorite",
  authenticateJWT,
  toggleFavoriteActivity
);
router.get("/favorites", authenticateJWT, getFavoriteActivities);
router.delete("/activities/:activityId", authenticateJWT, deleteActivity);

export default router;
