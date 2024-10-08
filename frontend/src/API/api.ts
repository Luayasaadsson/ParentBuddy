import axios from "axios";

const API_URL = "http://localhost:6006/api";

export const getActivityHistory = async (email: string) => {
  try {
    const response = await axios.get(`${API_URL}/history/${email}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching activity history:", error);
    throw error;
  }
};

export const getActivityRecommendations = async (
  name: string,
  email: string,
  childAge: number,
  preferences: string
) => {
  try {
    const response = await axios.post(`${API_URL}/activities`, {
      name,
      email,
      childAge,
      preferences,
    });
    return response.data.recommendation;
  } catch (error) {
    console.error("Error fetching recommendations", error);
    throw error;
  }
};
