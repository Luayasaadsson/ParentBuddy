import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-background">
      <h1 className="text-5xl font-bold text-primary text-center mb-8">
        Välkommen till Parent<span className="text-secondary">Buddy</span>
      </h1>
      <p className="text-xl text-center mb-8 w-3/6">
        <span className="text-primary">Parent</span>
        <span className="text-secondary">Buddy</span> hjälper dig som förälder
        att enkelt hitta spännande aktiviteter att göra med dina barn, var ni än
        är. Tillåt platsdelning för personliga rekommendationer i din närhet och
        skapa oförglömliga minnen tillsammans!
      </p>
      <Button asChild variant="default" size="default">
        <Link to="/auth">Fortsätt till ParentBuddy</Link>
      </Button>
    </div>
  );
};

export default LandingPage;
