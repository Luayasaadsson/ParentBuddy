import { Request, Response } from "express";
import User from "../models/userModel";
import { getActivityRecommendation } from "../services/openaiService";
import ActivityHistory from "../models/activityHistoryModel";
import { ChatCompletionMessageParam } from "openai/resources";

export const getActivityRecommendations = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, email, childAge, preferences } = req.body;

  try {
    // Kontrollerar om användaren redan finns
    let user = await User.findOne({ email });

    if (!user) {
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

export const getActivityHistory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email } = req.params;

  try {
    // Hämtar användaren baserat på e-post
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ error: "User not found." });
      return;
    }

    // Hämtar aktivitetshistorik baserat på användarens _id
    const history = await ActivityHistory.find({ user: user._id }).populate(
      "user",
      "name email"
    );

    if (!history.length) {
      res
        .status(404)
        .json({ error: "No activity history found for this user." });
      return;
    }

    res.json(history); // Skickar svar tillbaka till klienten
  } catch (error) {
    res.status(500).json({ error: "Error fetching activity history" });
  }
};
