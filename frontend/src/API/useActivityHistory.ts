import { useState, useEffect } from "react";
import { getActivityHistory } from "./api";

interface ActivityEntry {
  _id: string;
  recommendations: string;
  preferences: string;
  date: string;
}

export const useActivityHistory = () => {
  const [history, setHistory] = useState<ActivityEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    fetchHistory();
  }, []);

  return {
    history,
    loading,
    error,
  };
};
