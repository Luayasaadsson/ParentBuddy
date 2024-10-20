import { Request, Response } from "express";
import User from "../models/userModel";
import { getActivityRecommendation } from "../services/openaiService";
import ActivityHistory from "../models/activityHistoryModel";
import { ChatCompletionMessageParam } from "openai/resources";

// Adjust the request type to include user
interface AuthenticatedRequest extends Request {
  user?: { userId: string; email: string };
}

// Function to detect language using OpenAI
const detectLanguage = async (text: string): Promise<string> => {
  const systemMessage: ChatCompletionMessageParam = {
    role: "system",
    content:
      "Detect the language of the following text. Respond with just the language name.",
  };

  const userMessage: ChatCompletionMessageParam = {
    role: "user",
    content: `The following text is about activities for children: "${text}"`,
  };

  const response = await getActivityRecommendation([
    systemMessage,
    userMessage,
  ]);
  const language = response?.trim().toLowerCase();

  console.log("Detected language:", language);

  if (language.includes("swedish")) {
    return "swedish";
  } else {
    return "english";
  }
};

export const getActivityRecommendations = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const { childAge, preferences, location, activityType, duration, budget } =
    req.body;

  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: "No valid user identifier." });
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ error: "User not found." });
      return;
    }

    // Detect the language based on preferences
    const language = await detectLanguage(preferences);

    let systemMessage: ChatCompletionMessageParam;
    if (!location || !location.latitude || !location.longitude) {
      // If location is missing, use generic recommendations without location information
      systemMessage = {
        role: "system",
        content:
          language === "swedish"
            ? "Du är en expert på att ge föräldrar förslag på aktiviteter för barn i Sverige. Ge generella rekommendationer på svenska baserat på barnets ålder, preferenser, aktivitetstyp, längd på aktivitet och budget."
            : "You are an expert in providing parents with activity suggestions for children. Provide general recommendations in English based on the child's age, preferences, activity type, duration, and budget.",
      };
    } else {
      // If location exists, include location in the recommendations
      systemMessage = {
        role: "system",
        content:
          language === "swedish"
            ? `Du är en expert på att ge föräldrar förslag på aktiviteter för barn i Sverige. Ge rekommendationer på svenska baserat på barnets ålder, plats (${location.latitude}, ${location.longitude}), preferenser, aktivitetstyp, längd på aktivitet och budget.`
            : `You are an expert in providing parents with activity suggestions for children. Provide recommendations in English based on the child's age, location (${location.latitude}, ${location.longitude}), preferences, activity type, duration, and budget.`,
      };
    }

    const userMessage: ChatCompletionMessageParam = {
      role: "user",
      content: `I have a child who is ${childAge} years old, prefers ${preferences}, and I am looking for ${activityType} activities that last ${duration} hours, with a budget of ${budget}.`,
    };

    const recommendation = await getActivityRecommendation([
      systemMessage,
      userMessage,
    ]);

    if (!recommendation) {
      throw new Error("No recommendation received from OpenAI");
    }

    // Save activity history
    const activityHistory = new ActivityHistory({
      user: user._id,
      recommendations: recommendation,
      preferences: preferences,
      location: location
        ? { latitude: location.latitude, longitude: location.longitude }
        : null,
      activityType,
      duration,
      budget,
    });

    await activityHistory.save();

    res.json({ recommendation });
  } catch (error: any) {
    console.error("Error fetching recommendations:", error.message);
    res.status(500).json({ error: "Error fetching recommendations." });
  }
};

export const getActivityHistory = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    // Retrieve the user's _id from the JWT token
    const userId = req.user?.userId;
    console.log("Fetching history for userId:", userId);

    // Check that userId exists
    if (!userId) {
      res.status(401).json({ error: "No valid user identifier." });
      return;
    }

    // Retrieve the user based on userId from the token
    const user = await User.findById(userId);
    console.log("User found:", user?.email);

    if (!user) {
      res.status(404).json({ error: "User not found." });
      return;
    }

    // Retrieve activity history based on the user's _id
    const history = await ActivityHistory.find({ user: user._id }).populate(
      "user",
      "name email"
    );
    console.log("History found:", history);

    if (!history.length) {
      res.status(200).json([]);
      return;
    }

    res.json(history); // Send the response back to the client
  } catch (error) {
    res.status(500).json({ error: "Error retrieving activity history." });
  }
};

// Function to toggle favorite status for an activity
export const toggleFavoriteActivity = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { activityId } = req.params;

  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: "No valid user identifier." });
      return;
    }

    // Retrieve the activity from history
    const activity = await ActivityHistory.findOne({
      _id: activityId,
      user: userId,
    });
    if (!activity) {
      res.status(404).json({ error: "Activity not found." });
      return;
    }

    // Toggle favoriting (true/false)
    activity.isFavorited = !activity.isFavorited;
    await activity.save();

    res.json({
      message: `Activity ${
        activity.isFavorited ? "favorited" : "unfavorited"
      } successfully.`,
    });
  } catch (error) {
    console.error("Error updating favorite status:", error);
    res.status(500).json({ error: "Error updating activity favorite status." });
  }
};

// Retrieve the user's favorite activities
export const getFavoriteActivities = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ message: "No valid user identifier." });
      return;
    }

    const favoriteActivities = await ActivityHistory.find({
      user: userId,
      isFavorited: true,
    });

    if (!favoriteActivities.length) {
      res.status(200).json([]);
      return;
    }

    res.status(200).json(favoriteActivities);
  } catch (error) {
    console.error("Error fetching favorite activities:", error);
    res.status(500).json({ message: "Server error." });
  }
};

export const deleteActivity = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const { activityId } = req.params;

  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: "No valid user identifier." });
      return;
    }

    // Find and remove the activity from the database
    const activity = await ActivityHistory.findOneAndDelete({
      _id: activityId,
      user: userId,
    });
    if (!activity) {
      res.status(404).json({ error: "Activity not found." });
      return;
    }

    res.status(200).json({ message: "Activity deleted successfully." });
  } catch (error) {
    console.error("Error deleting activity:", error);
    res.status(500).json({ error: "Server error while deleting activity." });
  }
};
