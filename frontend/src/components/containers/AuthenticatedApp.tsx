import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import ActivityForm from "./../activity/ActivityForm";
import ActivityHistory from "./../activity/ActivityHistory";
import FavoriteActivities from "./../activity/FavoriteActivities";
import { Button } from "@/components/ui/button";

interface AuthenticatedAppProps {
  userName: string | null;
  handleNewRecommendation: () => void;
  logout: () => void;
  historyUpdated: number;
}

const AuthenticatedApp: React.FC<AuthenticatedAppProps> = ({
  userName,
  handleNewRecommendation,
  logout,
  historyUpdated,
}) => {
  return (
    <div className="p-8">
      <h1 className="text-5xl font-bold text-primary text-center mb-12">
        Parent
        <span className="text-secondary">Buddy</span>
      </h1>

      <nav className="flex justify-center items-center space-x-6 mb-8">
        <Button asChild variant="secondary">
          <Link to="/app">Hem</Link>
        </Button>
        <Button asChild variant="default">
          <Link to="/app/favorites">Favoriter</Link>
        </Button>
        <Button variant="destructive" onClick={logout}>
          Logga ut
        </Button>
      </nav>

      <div className="text-center text-xl text-secondary mb-4">
        {userName && `Välkommen tillbaka, ${userName}!`}
      </div>

      <div className="max-w-4xl mx-auto bg-card p-6 rounded-lg shadow-md">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <ActivityForm onNewRecommendation={handleNewRecommendation} />
                <ActivityHistory key={historyUpdated} />
              </>
            }
          />
          <Route
            path="/favorites"
            element={
              <FavoriteActivities
                onFavoritesUpdated={handleNewRecommendation}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default AuthenticatedApp;
