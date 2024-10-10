import { useState } from "react";
import { loginUser, registerUser } from "./api";
import { AxiosError } from "axios";

export const useAuth = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleLogin = async (email: string, password: string) => {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          await loginUser(email, password, latitude, longitude);
          setError(null);
          window.location.reload();
        });
      } else {
        await loginUser(email, password);
        setError(null);
        window.location.reload();
      }
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
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          await registerUser(name, email, password, latitude, longitude);
          setSuccess("Användare skapad. Du kan nu logga in.");
          setError(null);
        });
      } else {
        await registerUser(name, email, password);
        setSuccess("Användare skapad. Du kan nu logga in.");
        setError(null);
      }
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
