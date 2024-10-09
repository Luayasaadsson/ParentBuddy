import React, { useState } from "react";
import { useAuth } from "./../../API/useAuth";
import FormInput from "./../common/FormInput";

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
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2>Registrera</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Namn"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          label="Lösenord"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-primary text-white py-2 px-4 rounded hover:bg-secondary"
        >
          Registrera
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </div>
  );
};

export default RegisterUser;
