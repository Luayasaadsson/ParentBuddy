import React from "react";
import { useActivityHistory } from "./../../API/useActivityHistory";
import RecommendationDisplay from "./../../components/shared/RecommendationDisplay";

const ActivityHistory: React.FC = () => {
  const { history, loading, handleFavoriteToggle } = useActivityHistory();

  if (loading) {
    return <p>Laddar aktivitetshistorik...</p>;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-primary mb-4">
        Din aktivitetshistorik:
      </h2>

      {history.length > 0 ? (
        <ul className="space-y-4">
          {history.map((entry) => (
            <li key={entry._id} className="border-b py-4 relative group">
              <p>
                <strong>Datum:</strong> {new Date(entry.date).toLocaleString()}
              </p>
              <p>
                <strong>Preferenser:</strong> {entry.preferences}
              </p>
              <RecommendationDisplay recommendation={entry.recommendations} />

              <button
                onClick={() => handleFavoriteToggle(entry._id)}
                className={`absolute right-0 top-0 m-2 p-2 rounded-full ${
                  entry.isFavorited ? "text-yellow-500" : "text-gray-500"
                } group-hover:block`}
              >
                {entry.isFavorited ? "⭐" : "☆"}
              </button>
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
