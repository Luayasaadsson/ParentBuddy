import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useAuthStatus } from "./components/hooks/useAuthStatus";
import AuthWrapper from "./components/containers/AuthWrapper";
import ActivityForm from "./components/activity/ActivityForm";
import ActivityHistory from "./components/activity/ActivityHistory";
import FavoriteActivities from "./components/activity/FavoriteActivities";
import { Button } from "@/components/ui/button";

const App: React.FC = () => {
  const { isAuthenticated, logout } = useAuthStatus();
  const [historyUpdated, setHistoryUpdated] = useState<number>(0);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleNewRecommendation = () => {
    setHistoryUpdated((prev) => prev + 1);
  };

  if (!isAuthenticated) {
    return <AuthWrapper />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-background p-8">
        <h1 className="text-5xl font-bold text-primary text-center mb-12">
          ParentBuddy
        </h1>

        <nav className="flex justify-center items-center space-x-6 mb-8">
          <Button asChild variant="secondary">
            <Link to="/">Hem</Link>
          </Button>
          <Button asChild variant="default">
            <Link to="/favorites">Favoriter</Link>
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
    </Router>
  );
};

export default App;
