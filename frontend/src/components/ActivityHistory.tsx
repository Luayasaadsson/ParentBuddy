import React, { useEffect, useState } from "react";
import { getActivityHistory } from "../API/api";
import ChatLoader from "./ChatLoader";

interface ActivityHistoryProps {
  email: string;
}

interface ActivityEntry {
  date: string;
  recommendations: string;
  preferences: string;
}

const ActivityHistory: React.FC<ActivityHistoryProps> = ({ email }) => {
  const [history, setHistory] = useState<ActivityEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const result = await getActivityHistory(email);
        setHistory(result);
      } catch {
        console.error("Failed to fetch activity history");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [email]);

  if (loading) {
    return <ChatLoader />;
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">Din aktivitetshistorik:</h2>
      {history.length > 0 ? (
        <ul>
          {history.map((entry, index) => (
            <li key={index} className="border-b py-2">
              <p>
                <strong>Datum:</strong> {new Date(entry.date).toLocaleString()}
              </p>
              <p>
                <strong>Rekommendationer:</strong> {entry.recommendations}
              </p>
              <p>
                <strong>Preferenser:</strong> {entry.preferences}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Ingen historik hittades.</p>
      )}
    </div>
  );
};

export default ActivityHistory;
