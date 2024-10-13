import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuthStatus } from "./components/hooks/useAuthStatus";
import AuthWrapper from "./components/containers/AuthWrapper";
import AuthenticatedApp from "./components/containers/AuthenticatedApp";
import LandingPage from "./components/activity/LandingPage";

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

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/app" /> : <LandingPage />}
          />
          <Route
            path="/auth"
            element={isAuthenticated ? <Navigate to="/app" /> : <AuthWrapper />}
          />
          <Route
            path="/app/*"
            element={
              isAuthenticated ? (
                <AuthenticatedApp
                  userName={userName}
                  handleNewRecommendation={handleNewRecommendation}
                  logout={logout}
                  historyUpdated={historyUpdated}
                />
              ) : (
                <Navigate to="/auth" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
