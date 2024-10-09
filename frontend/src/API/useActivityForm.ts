import { useState } from "react";
import { getActivityRecommendations } from "./api";

export const useActivityForm = () => {
  const [recommendation, setRecommendation] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = async (
    childAge: number,
    preferences: string
  ) => {
    setLoading(true);
    try {
      const result = await getActivityRecommendations(childAge, preferences);
      setRecommendation(result);
      setError(null);
    } catch (err) {
      setError("Error fetching recommendations");
      console.error("Error fetching activity recommendations:", err);
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
