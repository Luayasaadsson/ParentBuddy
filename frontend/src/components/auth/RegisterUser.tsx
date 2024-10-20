import React, { useState } from "react";
import { useAuth } from "./../hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ChatLoader from "./../../components/shared/ChatLoader";

const RegisterUser: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { error, success, handleRegister } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (!name || !email || !password) {
      return;
    }
    setLoading(true);

    try {
      await handleRegister(name, email, password);
    } finally {
      setLoading(false);
    }
  };

  const nameHasError = submitted && !name;
  const emailHasError = submitted && !email;
  const passwordHasError = submitted && !password;

  return (
    <div className="flex justify-center items-center w-full dark:bg-gray-700 dark:text-white transition-colors duration-300">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Registrera</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name">Namn</label>
              <Input
                id="name"
                type="text"
                value={name}
                placeholder="Skriv ditt namn"
                onChange={(e) => setName(e.target.value)}
                className={nameHasError ? "border border-red-500" : ""}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                type="email"
                value={email}
                placeholder="Skriv din email"
                onChange={(e) => setEmail(e.target.value)}
                className={emailHasError ? "border border-red-500" : ""}
              />
            </div>
            <div>
              <label htmlFor="password">Lösenord</label>
              <Input
                id="password"
                type="password"
                value={password}
                placeholder="Skriv ditt lösenord"
                onChange={(e) => setPassword(e.target.value)}
                className={passwordHasError ? "border border-red-500" : ""}
              />
            </div>
            <Button
              type="submit"
              variant="default"
              size="default"
              disabled={loading}
            >
              {loading ? "Registrerar..." : "Registrera"}
            </Button>
          </form>
          {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
          {success && <p className="text-green-500 mt-2">{success}</p>}
          {loading && <ChatLoader />}
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterUser;
