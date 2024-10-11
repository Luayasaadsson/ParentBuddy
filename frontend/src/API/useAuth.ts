import { useState } from "react";
import { loginUser, registerUser } from "./api";
import { AxiosError } from "axios";

export const useAuth = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleLogin = async (email: string, password: string) => {
    try {
      await loginUser(email, password);
      setError(null);
      window.location.reload();
    } catch (err: unknown) {
      if (err instanceof AxiosError && err.response) {
        setError(err.response.data.message || "Inloggning misslyckades");
      } else {
        setError("Inloggning misslyckades");
      }
    }
  };

  const handleRegister = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      await registerUser(name, email, password);

      const token = await loginUser(email, password);
      localStorage.setItem("token", token);
      setSuccess("Användare skapad och inloggad.");
      setError(null);
      window.location.reload();
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(
          err.response?.data.message ||
            "Registreringen misslyckades. Försök igen."
        );
      }
    }
  };

  return {
    error,
    success,
    handleLogin,
    handleRegister,
  };
};
