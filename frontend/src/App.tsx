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
import LandingPage from "./components/pages/LandingPage";
import Layout from "./components/shared/Layout";
import AboutPage from "./components/pages/AboutPage";
import ContactPage from "./components/pages/ContactPage";
import PrivacyPolicy from "./components/pages/PrivacyPolicy";
import TermsOfService from "./components/pages/TermsOfService";
import DevelopersPage from "./components/pages/DevelopersPage";

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
      <Routes>
        <Route element={<Layout />}>
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
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/developers" element={<DevelopersPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
