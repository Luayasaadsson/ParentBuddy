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
  const { recommendation, loading, error, fetchRecommendations } =
    useActivityForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (childAge && preferences) {
      await fetchRecommendations(Number(childAge), preferences); // Calling the function from the hook
      onNewRecommendation(); // Updating history
    }
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
          label="Preferenser"
          type="text"
          value={preferences}
          onChange={(e) => setPreferences(e.target.value)}
        />

        <button
          type="submit"
          className="bg-primary text-white py-2 px-4 rounded hover:bg-secondary"
        >
          Få rekommendationer
        </button>
      </form>

      {loading && <ChatLoader />}

      {error && <p className="text-red-500">{error}</p>}
      {recommendation && (
        <RecommendationDisplay recommendation={recommendation} />
      )}
    </div>
  );
};

export default ActivityForm;
