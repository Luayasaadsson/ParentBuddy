import React, { useState } from "react";
import Login from "../auth/Login";
import RegisterUser from "../auth/RegisterUser";

const AuthWrapper: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      {isRegistering ? <RegisterUser /> : <Login />}
      <button
        onClick={() => setIsRegistering(!isRegistering)}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        {isRegistering
          ? "Har du redan ett konto? Logga in"
          : "Har du inget konto? Registrera dig"}
      </button>
    </div>
  );
};

export default AuthWrapper;
