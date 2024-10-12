import { useState, useEffect } from "react";
import {
  getActivityHistory,
  toggleFavoriteActivity,
  deleteFavoriteActivity,
} from "./api";

interface ActivityEntry {
  _id: string;
  recommendations: string;
  preferences: string;
  date: string;
  isFavorited?: boolean;
}

export const useActivityHistory = () => {
  const [history, setHistory] = useState<ActivityEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activityToDelete, setActivityToDelete] = useState<string | null>(null);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const result = await getActivityHistory();
      if (result && result.length > 0) {
        const sortedHistory = result.sort(
          (a: ActivityEntry, b: ActivityEntry) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setHistory(sortedHistory);
        setError(null);
      } else {
        setHistory([]);
      }
    } catch (err) {
      console.error("Error fetching activity history:", err);
      setError("Kunde inte hämta aktivitetshistorik.");
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = async (activityId: string) => {
    try {
      await toggleFavoriteActivity(activityId);
      setHistory((prevHistory) =>
        prevHistory.map((entry) =>
          entry._id === activityId
            ? { ...entry, isFavorited: !entry.isFavorited }
            : entry
        )
      );
    } catch (error) {
      console.error("Error toggling favorite status:", error);
    }
  };

  const handleDeleteActivity = (activityId: string) => {
    setActivityToDelete(activityId);
  };

  const confirmDeleteActivity = async () => {
    if (!activityToDelete) return;

    try {
      await deleteFavoriteActivity(activityToDelete);
      setHistory((prevHistory) =>
        prevHistory.filter((entry) => entry._id !== activityToDelete)
      );
      setActivityToDelete(null);
    } catch (error) {
      console.error("Error deleting activity:", error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return {
    history,
    loading,
    error,
    handleFavoriteToggle,
    handleDeleteActivity,
    confirmDeleteActivity,
    activityToDelete,
  };
};
