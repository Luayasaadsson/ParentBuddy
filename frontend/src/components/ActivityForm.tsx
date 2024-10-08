import React, { useState } from 'react';
import { getActivityRecommendations } from "../API/api";
import ChatLoader from './ChatLoader';

const ActivityForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [childAge, setChildAge] = useState<number | ''>('');
  const [preferences, setPreferences] = useState<string>('');
  const [recommendation, setRecommendation] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (name && email && childAge && preferences) {
      setLoading(true);

      try {
        const result = await getActivityRecommendations(name, email, childAge, preferences);
        setRecommendation(result);
      } catch (error) {
        console.error('Error fetching activity recommendations:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Ditt namn
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Din e-post
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Barnets ålder
          </label>
          <input
            type="number"
            value={childAge}
            onChange={(e) => setChildAge(parseInt(e.target.value))}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Preferenser
          </label>
          <input
            type="text"
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:border-blue-300"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Få rekommendationer
        </button>
      </form>

      {loading && <ChatLoader />}

      {recommendation && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Rekommenderade aktiviteter:</h2>
          <p>{recommendation}</p>
        </div>
      )}
    </div>
  );
};

export default ActivityForm;
