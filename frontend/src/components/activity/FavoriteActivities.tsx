import React, { useEffect, useState } from "react";
import { getFavoriteActivities, deleteFavoriteActivity } from "./../../API/api";
import RecommendationDisplay from "./../../components/shared/RecommendationDisplay";

interface FavoriteActivity {
  _id: string;
  recommendations: string;
  preferences: string;
  date: string;
}

interface FavoriteActivitiesProps {
  onFavoritesUpdated: () => void; // Callback för att uppdatera ActivityForm
}

const FavoriteActivities: React.FC<FavoriteActivitiesProps> = ({
  onFavoritesUpdated,
}) => {
  const [favorites, setFavorites] = useState<FavoriteActivity[]>([]);

  // Function to fetch favorites
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const result = await getFavoriteActivities();
        const sortedFavorites = result.sort(
          (a: FavoriteActivity, b: FavoriteActivity) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setFavorites(sortedFavorites);
      } catch (err) {
        console.error("Kunde inte hämta favoriter:", err);
      }
    };

    fetchFavorites();
  }, []);

  // Function to delete a favorite
  const handleDeleteFavorite = async (activityId: string) => {
    const confirmed = window.confirm(
      "Är du säker på att du vill ta bort denna favorit?"
    );
    if (!confirmed) return;

    try {
      await deleteFavoriteActivity(activityId);
      setFavorites((prevFavorites) =>
        prevFavorites.filter((activity) => activity._id !== activityId)
      );
      onFavoritesUpdated(); // Call callback to update the homepage
    } catch (err) {
      console.error("Kunde inte ta bort favorit:", err);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-primary mb-4">
        Dina favoritaktiviteter:
      </h2>

      {favorites.length > 0 ? (
        <ul className="space-y-4">
          {favorites.map((favorite) => (
            <li key={favorite._id} className="border-b py-4 relative group">
              <p>
                <strong>Datum:</strong>{" "}
                {new Date(favorite.date).toLocaleString()}
              </p>
              <p>
                <strong>Preferenser:</strong> {favorite.preferences}
              </p>
              <RecommendationDisplay
                recommendation={favorite.recommendations}
              />

              <button
                onClick={() => handleDeleteFavorite(favorite._id)}
                className="absolute right-0 top-0 m-2 p-2 rounded-full text-red-500 hover:bg-gray-200"
              >
                Ta bort
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Inga favoriter hittades.</p>
      )}
    </div>
  );
};

export default FavoriteActivities;
