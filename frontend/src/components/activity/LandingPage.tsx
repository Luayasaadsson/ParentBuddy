import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center dark:bg-gray-700 dark:text-white transition-colors duration-300">
      <h1 className="text-xl md:text-4xl font-bold mb-8 text-center">
        <span className="text-black dark:text-white">Välkommen till</span>
        <span className="text-primary"> Parent</span>
        <span className="text-secondary">Buddy</span>
      </h1>

      <p className="text-sm md:text-xl text-center mb-8 w-3/4">
        <span className="text-primary font-bold">Parent</span>
        <span className="text-secondary font-bold">Buddy</span> hjälper dig som
        förälder att enkelt hitta spännande aktiviteter att göra med dina barn,
        var ni än är. Tillåt platsdelning för personliga rekommendationer i din
        närhet och skapa oförglömliga minnen tillsammans!
      </p>

      <Button asChild variant="secondary" size="default">
        <Link to="/auth">Fortsätt till ParentBuddy</Link>
      </Button>
    </div>
  );
};

export default LandingPage;
