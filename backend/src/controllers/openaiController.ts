import { Request, Response } from "express";
import User from "../models/userModel";
import { getActivityRecommendation } from "../services/openaiService";
import ActivityHistory from "../models/activityHistoryModel";
import { ChatCompletionMessageParam } from "openai/resources";

export const getActivityRecommendations = async (
  req: Request,
  res: Response
) => {
  const { name, email, childAge, preferences } = req.body;

  try {
    // Kontrollerar om användaren redan finns
    let user = await User.findOne({ email });

    if (!user) {
      // Skapar ny användare om inte hittad
      user = new User({ name, email, childAge });
      await user.save();
    }

    const userMessage: ChatCompletionMessageParam = {
      role: "user",
      content: `I have a child who is ${childAge} years old and prefers ${preferences}. Can you suggest some suitable activities?`,
    };

    const recommendation = await getActivityRecommendation([userMessage]);

    // Sparar aktivitetshistorik
    const activityHistory = new ActivityHistory({
      user: user._id,
      recommendations: recommendation,
      preferences: preferences,
    });

    await activityHistory.save();

    res.json({ recommendation });
  } catch (error) {
    res.status(500).json({ error: "Error fetching recommendations" });
  }
};
