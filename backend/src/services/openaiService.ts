import OpenAI from "openai";
import dotenv from "dotenv";
import { ChatCompletionMessageParam } from "openai/resources";

dotenv.config({ path: "./config.env" });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getActivityRecommendation = async (
  messages: ChatCompletionMessageParam[]
): Promise<string> => {
  try {
    const conversation: ChatCompletionMessageParam[] = [
      {
        role: "system",
        content:
          "You are an expert in suggesting activities for parents with small children based on the child's age and preferences.",
      },
      ...messages,
    ];

    console.log("Sending the following messages to OpenAI:", conversation);
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      /*   model: "gpt-3.5-turbo", */
      messages: conversation,
      max_tokens: 1000,
      temperature: 0.5,
    });

    const message = response.choices[0]?.message?.content;

    if (!message) {
      throw new Error("No response from the AI.");
    }

    return message;
  } catch (error: any) {
    console.error("Error fetching recommendation from OpenAI:", error);
    throw new Error(
      "An error occurred while getting the activity recommendation."
    );
  }
};
