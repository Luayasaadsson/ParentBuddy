import React, { useState } from "react";
import { useAuthStatus } from "./components/hooks/useAuthStatus";
import AuthWrapper from "./components/containers/AuthWrapper";
import Logout from "./components/auth/Logout";
import ActivityForm from "./components/activity/ActivityForm";
import ActivityHistory from "./components/activity/ActivityHistory";

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
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-4xl font-bold text-primary text-center mb-8">
        ParentBuddy
      </h1>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <Logout onLogout={logout} />
        <ActivityForm onNewRecommendation={handleNewRecommendation} />
        <ActivityHistory key={historyUpdated} />
      </div>
    </div>
  );
};

export default App;
