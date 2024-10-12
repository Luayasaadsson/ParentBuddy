import React, { useEffect, useState } from "react";
import { getFavoriteActivities, deleteFavoriteActivity } from "./../../API/api";
import RecommendationDisplay from "./../../components/shared/RecommendationDisplay";
import { Button } from "@/components/ui/button";
import { FaRegTrashCan } from "react-icons/fa6";

interface FavoriteActivity {
  _id: string;
  recommendations: string;
  preferences: string;
  date: string;
}

interface FavoriteActivitiesProps {
  onFavoritesUpdated: () => void; // Callback to update ActivityForm
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
            <li
              key={favorite._id}
              className="relative border p-4 rounded-lg bg-gray-50"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="md:order-2 flex space-x-2 mb-4 md:mb-0 ml-auto md:absolute md:top-4 md:right-4">
                  <Button
                    variant="ghost"
                    onClick={() => handleDeleteFavorite(favorite._id)}
                    size="icon"
                    className="p-0 hover:bg-transparent"
                  >
                    <FaRegTrashCan className="h-5 w-5 text-gray-500 hover:text-red-500" />
                  </Button>
                </div>

                <div className="md:order-1 text-sm md:text-base">
                  <p className="mb-2">
                    <strong>Datum:</strong>{" "}
                    {new Date(favorite.date).toLocaleString()}
                  </p>
                  <p className="mb-2">
                    <strong>Preferenser:</strong> {favorite.preferences}
                  </p>
                  <RecommendationDisplay
                    recommendation={favorite.recommendations}
                  />
                </div>
              </div>
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
