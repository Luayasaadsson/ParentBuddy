import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useAuthStatus } from "./components/hooks/useAuthStatus";
import AuthWrapper from "./components/containers/AuthWrapper";
import Logout from "./components/auth/Logout";
import ActivityForm from "./components/activity/ActivityForm";
import ActivityHistory from "./components/activity/ActivityHistory";
import FavoriteActivities from "./components/activity/FavoriteActivities";

const App: React.FC = () => {
  const { isAuthenticated, logout } = useAuthStatus();
  const [historyUpdated, setHistoryUpdated] = useState<number>(0);

  const handleNewRecommendation = () => {
    setHistoryUpdated((prev) => prev + 1);
  };

  if (!isAuthenticated) {
    return <AuthWrapper />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-background p-8">
        <h1 className="text-4xl font-bold text-primary text-center mb-8">
          ParentBuddy
        </h1>

        <nav className="text-center mb-8">
          <Link to="/" className="text-blue-500 hover:underline mx-4">
            Hem
          </Link>
          <Link to="/favorites" className="text-blue-500 hover:underline mx-4">
            Favoriter
          </Link>
        </nav>

        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <Logout onLogout={logout} />

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
