import React from "react";
import { useActivityHistory } from "./../../API/useActivityHistory";
import RecommendationDisplay from "./../../components/shared/RecommendationDisplay";

const ActivityHistory: React.FC = () => {
  const { history, loading, error } = useActivityHistory();

  if (loading) {
    return <p>Laddar aktivitetshistorik...</p>;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-primary mb-4">
        Din aktivitetshistorik:
      </h2>
      {error && <p className="text-red-500">{error}</p>}
      {history.length > 0 ? (
        <ul className="space-y-4">
          {history.map((entry) => (
            <li key={entry._id} className="border-b py-4">
              <p>
                <strong>Datum:</strong> {new Date(entry.date).toLocaleString()}
              </p>
              <p>
                <strong>Preferenser:</strong> {entry.preferences}
              </p>
              <RecommendationDisplay recommendation={entry.recommendations} />
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
