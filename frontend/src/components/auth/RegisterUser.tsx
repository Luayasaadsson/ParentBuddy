import React, { useState } from "react";
import { useAuth } from "./../../API/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const RegisterUser: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { error, success, handleRegister } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleRegister(name, email, password);
  };

  return (
    <div className="flex justify-center items-center w-full bg-background">
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
              />
            </div>
            <Button type="submit" variant="default" size="default">
              Registrera
            </Button>
          </form>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {success && <p className="text-green-500 mt-2">{success}</p>}
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterUser;
