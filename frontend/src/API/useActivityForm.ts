import { useState } from "react";
import { getActivityRecommendations } from "./api";

export const useActivityForm = () => {
  const [recommendation, setRecommendation] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = async (
    childAge: number,
    preferences: string,
    latitude: number,
    longitude: number
  ) => {
    setLoading(true);
    setError(null);
    try {
      const result = await getActivityRecommendations(childAge, preferences, latitude, longitude);
      setRecommendation(result);
    } catch {
      setError("Could not fetch recommendations.");
    } finally {
      setLoading(false);
    }
  };

  return {
    recommendation,
    loading,
    error,
    fetchRecommendations,
  };
};