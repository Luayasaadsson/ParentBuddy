import React, { useState } from "react";
import Login from "../auth/Login";
import RegisterUser from "../auth/RegisterUser";
import { Button } from "@/components/ui/button";

const AuthWrapper: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
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
  );
};

export default AuthWrapper;
