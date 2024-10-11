import React, { useState } from "react";
import { useActivityForm } from "./../../API/useActivityForm";
import ChatLoader from "./../../components/shared/ChatLoader";
import RecommendationDisplay from "./../../components/shared/RecommendationDisplay";
import FormInput from "./../common/FormInput";

interface ActivityFormProps {
  onNewRecommendation: () => void; // Prop for callback
}

const ActivityForm: React.FC<ActivityFormProps> = ({ onNewRecommendation }) => {
  const [childAge, setChildAge] = useState<number | "">("");
  const [preferences, setPreferences] = useState<string>("");
  const [activityType, setActivityType] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [equipment, setEquipment] = useState<boolean>(false);
  const { recommendation, loading, error, fetchRecommendations } =
    useActivityForm();
  const [geoLoading, setGeoLoading] = useState(false);

  // Function to get user location
  const getUserLocation = (): Promise<{
    latitude: number;
    longitude: number;
  }> => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          () => reject("User denied Geolocation")
        );
      } else {
        reject("Geolocation not available");
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeoLoading(true);

    // Default position if geolocation is not available
    const defaultLatitude = 59.3293; // Stockholm
    const defaultLongitude = 18.0686;

    try {
      const { latitude, longitude } = await getUserLocation();
      await fetchRecommendations(
        Number(childAge),
        preferences,
        latitude,
        longitude,
        activityType,
        duration,
        budget,
        equipment
      );
    } catch (error) {
      console.warn(error);
      // Using default position if geolocation fails
      await fetchRecommendations(
        Number(childAge),
        preferences,
        defaultLatitude,
        defaultLongitude,
        activityType,
        duration,
        budget,
        equipment
      );
    } finally {
      setGeoLoading(false);
    }

    onNewRecommendation();
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Barnets ålder"
          type="text"
          value={childAge}
          onChange={(e) => {
            const value = e.target.value;
            if (!isNaN(Number(value))) {
              setChildAge(value === "" ? "" : parseInt(value));
            }
          }}
        />

        <FormInput
          label="Fri text (t.ex. intressen, preferenser)"
          type="text"
          value={preferences}
          onChange={(e) => setPreferences(e.target.value)}
        />

        <div className="mt-4">
          <label htmlFor="activityType">Typ av aktivitet:</label>
          <select
            id="activityType"
            value={activityType}
            onChange={(e) => setActivityType(e.target.value)}
            className="w-full mt-2 p-2 border rounded"
          >
            <option value="">Välj typ av aktivitet</option>
            <option value="outdoor">Utomhus</option>
            <option value="indoor">Inomhus</option>
            <option value="cultural">Kulturell</option>
            <option value="sport">Sport</option>
          </select>
        </div>

        <div className="mt-4">
          <label htmlFor="duration">Längd:</label>
          <select
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full mt-2 p-2 border rounded"
          >
            <option value="">Välj längd på aktiviteten</option>
            <option value="30">30 minuter</option>
            <option value="60">1 timme</option>
            <option value="allDay">Hela dagen</option>
          </select>
        </div>

        <div className="mt-4">
          <label htmlFor="budget">Budget:</label>
          <select
            id="budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full mt-2 p-2 border rounded"
          >
            <option value="">Välj budget</option>
            <option value="free">Gratis</option>
            <option value="low">Låg kostnad</option>
            <option value="medium">Medel</option>
            <option value="high">Hög kostnad</option>
          </select>
        </div>

        <div className="mt-4">
          <label htmlFor="equipment">
            <input
              id="equipment"
              type="checkbox"
              checked={equipment}
              onChange={(e) => setEquipment(e.target.checked)}
              className="mr-2"
            />
            Krävs utrustning (t.ex. cykel, sportutrustning)
          </label>
        </div>

        <button
          type="submit"
          className="bg-primary text-white py-2 px-4 rounded hover:bg-secondary mt-4"
          disabled={geoLoading} // Disable button while fetching location
        >
          {geoLoading ? "Hämtar plats..." : "Få rekommendationer"}
        </button>
      </form>

      {geoLoading && <ChatLoader />}
      {loading && <ChatLoader />}

      {error && <p className="text-red-500">{error}</p>}
      {recommendation && (
        <RecommendationDisplay recommendation={recommendation} />
      )}
    </div>
  );
};

export default ActivityForm;
