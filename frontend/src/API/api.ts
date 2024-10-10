import axios from "axios";

const API_URL = "http://localhost:6006/api";

// Function to get JWT-token from localStorage
const getToken = () => localStorage.getItem("token");

// Function to create a user
export const registerUser = async (
  name: string,
  email: string,
  password: string,
  lat?: number,
  lon?: number
): Promise<void> => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      name,
      email,
      password,
      location: { latitude: lat, longitude: lon },
    });
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

// Function for login
export const loginUser = async (
  email: string,
  password: string,
  lat?: number,
  lon?: number
): Promise<string> => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
      location: { latitude: lat, longitude: lon },
    });
    const token = response.data.token;
    localStorage.setItem("token", token); // Save token in localStorage
    return token;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

// Function to get activity history
export const getActivityHistory = async () => {
  const token = localStorage.getItem("token");

  if (!token) throw new Error("No token available");

  try {
    const response = await axios.get(`${API_URL}/history`, {
      headers: {
        Authorization: `Bearer ${token}`, // Send token in headers
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching activity history:", error);
    throw error;
  }
};

// Function to send recommendations and get response from server
export const getActivityRecommendations = async (
  childAge: number,
  preferences: string,
  latitude: number,
  longitude: number
) => {
  const token = getToken();

  if (!token) throw new Error("No token available");

  try {
    const response = await axios.post(
      `${API_URL}/activities`,
      {
        childAge,
        preferences,
        location: { latitude, longitude }, 
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.recommendation;
  } catch (error) {
    console.error("Error fetching recommendations", error);
    throw error;
  }
};
