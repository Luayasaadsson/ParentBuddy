import React, { useState } from "react";
import { useActivityForm } from "./../../API/useActivityForm";
import ChatLoader from "./../../components/shared/ChatLoader";
import RecommendationDisplay from "./../../components/shared/RecommendationDisplay";
import { Button } from "./../ui/button";
import { Input } from "./../ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./../ui/select";

interface ActivityFormProps {
  onNewRecommendation: () => void; // Prop for callback
}

const ActivityForm: React.FC<ActivityFormProps> = ({ onNewRecommendation }) => {
  const [childAge, setChildAge] = useState<number | "">("");
  const [preferences, setPreferences] = useState<string>("");
  const [activityType, setActivityType] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
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
        budget
      );
    } catch (error) {
      console.warn(error);
      await fetchRecommendations(
        Number(childAge),
        preferences,
        defaultLatitude,
        defaultLongitude,
        activityType,
        duration,
        budget
      );
    } finally {
      setGeoLoading(false);
    }

    onNewRecommendation();
  };

  return (
    <div className="p-6 bg-primary-100 rounded-lg shadow-lg mb-6">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="childAge"
              className="text-lg font-bold text-primary"
            >
              Ålder
            </label>
            <Input
              id="childAge"
              type="text"
              value={childAge}
              placeholder="Barnets ålder"
              className="mt-2 border border-gray-300 focus:border-primary focus:ring-primary"
              onChange={(e) => {
                const value = e.target.value;
                if (!isNaN(Number(value))) {
                  setChildAge(value === "" ? "" : parseInt(value));
                }
              }}
            />
          </div>

          <div>
            <label
              htmlFor="preferences"
              className="text-lg font-bold text-primary"
            >
              Preferenser
            </label>
            <Input
              id="preferences"
              type="text"
              value={preferences}
              placeholder="T.ex. sport, musik, pyssel, djur"
              className="mt-2 border border-gray-300 focus:border-primary focus:ring-primary"
              onChange={(e) => setPreferences(e.target.value)}
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-lg font-bold text-primary">
              Typ av aktivitet
            </label>
            <Select
              value={activityType}
              onValueChange={(value) => setActivityType(value)}
            >
              <SelectTrigger className="w-full mt-2 border border-gray-300 focus:border-primary focus:ring-primary">
                <SelectValue placeholder="Välj typ av aktivitet" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="outdoor">Utomhus</SelectItem>
                <SelectItem value="indoor">Inomhus</SelectItem>
                <SelectItem value="cultural">Kulturell</SelectItem>
                <SelectItem value="sport">Sport</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-2">
            <label className="text-lg font-bold text-primary">Längd</label>
            <Select
              value={duration}
              onValueChange={(value) => setDuration(value)}
            >
              <SelectTrigger className="w-full mt-2 border border-gray-300 focus:border-primary focus:ring-primary">
                <SelectValue placeholder="Välj längd på aktiviteten" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 minuter</SelectItem>
                <SelectItem value="60">1 timme</SelectItem>
                <SelectItem value="allDay">Hela dagen</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-2">
            <label className="text-lg font-bold text-primary">Budget</label>
            <Select value={budget} onValueChange={(value) => setBudget(value)}>
              <SelectTrigger className="w-full mt-2 border border-gray-300 focus:border-primary focus:ring-primary">
                <SelectValue placeholder="Välj budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="free">Gratis</SelectItem>
                <SelectItem value="low">Låg kostnad</SelectItem>
                <SelectItem value="medium">Medel</SelectItem>
                <SelectItem value="high">Hög kostnad</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          variant="default"
          size="default"
          type="submit"
          disabled={geoLoading}
          className="mt-6 bg-secondary text-secondary-foreground hover:bg-secondary-600"
        >
          {geoLoading ? "Hämtar plats..." : "Få rekommendationer"}
        </Button>
      </form>

      {geoLoading && <ChatLoader />}
      {loading && <ChatLoader />}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {recommendation && (
        <RecommendationDisplay recommendation={recommendation} />
      )}
    </div>
  );
};

export default ActivityForm;
