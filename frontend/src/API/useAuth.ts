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
        const serverMessage = err.response.data.message;

        if (serverMessage === "Incorrect password") {
          setError("Felaktigt lösenord, försök igen.");
        } else if (serverMessage === "User not found") {
          setError("Användaren hittades inte, vänligen kontrollera din email.");
        } else {
          setError(serverMessage || "Inloggning misslyckades.");
        }
      } else {
        setError("Inloggning misslyckades.");
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
        const serverMessage = err.response?.data.message;

        if (serverMessage === "Email address is already registered") {
          setError(
            "E-postadressen finns redan registrerad. Vänligen logga in."
          );
        } else if (
          serverMessage === "Password must be at least 6 characters."
        ) {
          setError("Lösenordet måste vara minst 6 tecken.");
        } else {
          setError(
            serverMessage || "Registreringen misslyckades. Försök igen."
          );
        }
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
