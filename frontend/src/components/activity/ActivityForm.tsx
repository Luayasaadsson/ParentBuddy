import React, { useState } from "react";
import { useActivityForm } from "../hooks/useActivityForm";
import ChatLoader from "./../../components/shared/ChatLoader";
import RecommendationDisplay from "./RecommendationDisplay";
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
  // Collected state for all form fields
  const [formData, setFormData] = useState({
    childAge: "",
    preferences: "",
    activityType: "",
    duration: "",
    budget: "",
  });

  // State for validation errors
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  // Hooks from useActivityForm
  const { recommendation, loading, error, fetchRecommendations } =
    useActivityForm();
  const [geoLoading, setGeoLoading] = useState(false);
  const [isLocationDenied, setIsLocationDenied] = useState(false);

  // Handle changes in form fields
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  // Handle Select component changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  // Get the user's location or handle denied location sharing
  const getUserLocation = (): Promise<{
    latitude: number | null;
    longitude: number | null;
  }> => {
    return new Promise((resolve) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setIsLocationDenied(false); // Reset if location sharing is approved
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          () => {
            // If the user denies location sharing, set isLocationDenied to true
            setIsLocationDenied(true);
            resolve({ latitude: null, longitude: null });
          }
        );
      } else {
        // If geolocation is not supported, handle as if location sharing is denied
        setIsLocationDenied(true);
        resolve({ latitude: null, longitude: null });
      }
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validating form fields
    const errors: { [key: string]: string } = {};

    if (!formData.childAge) {
      errors.childAge = "Ålder är obligatoriskt.";
    }
    if (!formData.preferences) {
      errors.preferences = "Preferenser är obligatoriskt.";
    }
    if (!formData.activityType) {
      errors.activityType = "Typ av aktivitet är obligatoriskt.";
    }
    if (!formData.duration) {
      errors.duration = "Längd är obligatoriskt.";
    }
    if (!formData.budget) {
      errors.budget = "Budget är obligatoriskt.";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    } else {
      setValidationErrors({});
    }

    setGeoLoading(true);

    try {
      const { latitude, longitude } = await getUserLocation();

      // Sending recommendations with or without coordinates depending on the user's location
      await fetchRecommendations(
        Number(formData.childAge),
        formData.preferences,
        latitude,
        longitude,
        formData.activityType,
        formData.duration,
        formData.budget
      );
    } catch (error) {
      console.warn(error);
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
              className="text-sm md:text-lg font-bold text-primary"
            >
              Ålder
            </label>
            <Input
              id="childAge"
              name="childAge"
              type="text"
              value={formData.childAge}
              placeholder="Barnets ålder"
              className={`mt-2 border ${
                validationErrors.childAge ? "border-red-500" : "border-gray-300"
              } focus:border-primary focus:ring-primary`}
              onChange={handleInputChange}
            />
            {validationErrors.childAge && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.childAge}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="preferences"
              className="text-sm md:text-lg font-bold text-primary"
            >
              Preferenser
            </label>
            <Input
              id="preferences"
              name="preferences"
              type="text"
              value={formData.preferences}
              placeholder="T.ex. sport, musik, pyssel, djur"
              className={`mt-2 border ${
                validationErrors.preferences
                  ? "border-red-500"
                  : "border-gray-300"
              } focus:border-primary focus:ring-primary`}
              onChange={handleInputChange}
            />
            {validationErrors.preferences && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.preferences}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="text-sm md:text-lg font-bold text-primary">
              Typ av aktivitet
            </label>
            <Select
              name="activityType"
              value={formData.activityType}
              onValueChange={(value) =>
                handleSelectChange("activityType", value)
              }
            >
              <SelectTrigger
                className={`w-full mt-2 border ${
                  validationErrors.activityType
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:border-primary focus:ring-primary`}
              >
                <SelectValue placeholder="Välj typ av aktivitet" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="outdoor">Utomhus</SelectItem>
                <SelectItem value="indoor">Inomhus</SelectItem>
                <SelectItem value="cultural">Kulturell</SelectItem>
                <SelectItem value="sport">Sport</SelectItem>
              </SelectContent>
            </Select>
            {validationErrors.activityType && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.activityType}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="text-sm md:text-lg font-bold text-primary">
              Längd
            </label>
            <Select
              name="duration"
              value={formData.duration}
              onValueChange={(value) => handleSelectChange("duration", value)}
            >
              <SelectTrigger
                className={`w-full mt-2 border ${
                  validationErrors.duration
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:border-primary focus:ring-primary`}
              >
                <SelectValue placeholder="Välj längd på aktiviteten" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 minuter</SelectItem>
                <SelectItem value="60">1 timme</SelectItem>
                <SelectItem value="allDay">Hela dagen</SelectItem>
              </SelectContent>
            </Select>
            {validationErrors.duration && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.duration}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="text-sm md:text-lg font-bold text-primary">
              Budget
            </label>
            <Select
              name="budget"
              value={formData.budget}
              onValueChange={(value) => handleSelectChange("budget", value)}
            >
              <SelectTrigger
                className={`w-full mt-2 border ${
                  validationErrors.budget ? "border-red-500" : "border-gray-300"
                } focus:border-primary focus:ring-primary`}
              >
                <SelectValue placeholder="Välj budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="free">Gratis</SelectItem>
                <SelectItem value="low">Låg kostnad</SelectItem>
                <SelectItem value="medium">Medel</SelectItem>
                <SelectItem value="high">Hög kostnad</SelectItem>
              </SelectContent>
            </Select>
            {validationErrors.budget && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.budget}
              </p>
            )}
          </div>
        </div>

        <Button
          variant="default"
          size="sm"
          type="submit"
          disabled={geoLoading}
          className="mt-6 bg-secondary text-secondary-foreground hover:bg-secondary-600 text-xs md:text-md"
        >
          {geoLoading && !isLocationDenied
            ? "Hämtar plats..."
            : "Få rekommendationer"}
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
