import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../auth/Login";
import RegisterUser from "../auth/RegisterUser";
import { Button } from "@/components/ui/button";

const AuthWrapper: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="p-6">
        <Button onClick={() => navigate("/")} variant="secondary" size="sm">
          &larr; Tillbaka
        </Button>
      </div>

      <div className="flex flex-col justify-center items-center flex-grow">
        {isRegistering ? <RegisterUser /> : <Login />}
        <Button
          onClick={() => setIsRegistering(!isRegistering)}
          variant="default"
          size="lg"
          className="mt-4"
        >
          {isRegistering
            ? "Har du redan ett konto? Logga in"
            : "Har du inget konto? Registrera dig"}
        </Button>
      </div>
    </div>
  );
};

export default AuthWrapper;
