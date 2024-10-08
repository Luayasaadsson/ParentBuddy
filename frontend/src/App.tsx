import React from "react";
import ActivityForm from "./components/ActivityForm";
import ActivityHistory from "./components/ActivityHistory";

const App: React.FC = () => {
  const email = "user@test.se"; // Hårdkodad e-post för att testa just nu

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ParentBuddy</h1>
      <ActivityForm />
      <ActivityHistory email={email} />
    </div>
  );
};

export default App;
