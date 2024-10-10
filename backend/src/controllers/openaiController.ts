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
  const { childAge, preferences, location } = req.body;

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

    // Analyze the text and determine the language
    const language = await detectLanguage(preferences);

    // Adjust the language in the OpenAI request
    const systemMessage: ChatCompletionMessageParam = {
      role: "system",
      content:
        language === "swedish"
          ? `Du är en expert på att ge föräldrar förslag på aktiviteter för barn i Sverige. Ge rekommendationer på svenska baserat på platsen (${location.latitude}, ${location.longitude}).`
          : `You are an expert in providing parents with activity suggestions for children in English. Give recommendations in English based on the location (${location.latitude}, ${location.longitude}).`,
    };

    const userMessage: ChatCompletionMessageParam = {
      role: "user",
      content: `I have a child who is ${childAge} years old and prefers ${preferences}. Can you suggest some suitable activities in this location (${location.latitude}, ${location.longitude})?`,
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
      location: { latitude: location.latitude, longitude: location.longitude }, 
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
      res
        .status(404)
        .json({ error: "No activity history found for this user." });
      return;
    }

    res.json(history); // Send the response back to the client
  } catch (error) {
    res.status(500).json({ error: "Error retrieving activity history." });
  }
};
