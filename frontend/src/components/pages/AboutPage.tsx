import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ScrollToTopButton from "../shared/ScrollButton";

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto md:w-1/2 px-4 py-10 text-text dark:text-text-dark dark:bg-gray-700 dark:text-white">
      <div className="mb-5">
        <Button onClick={() => navigate("/")} variant="secondary" size="sm">
          &larr; Tillbaka
        </Button>
      </div>
      <h1 className="font-bold mb-6 text-center text-lg md:text-4xl">
        Om <span className="text-primary dark:text-primary-dark">Parent</span>
        <span className="text-secondary dark:text-secondary-dark">Buddy</span>
      </h1>

      <section className="mb-8">
        <h2 className="font-semibold mb-2 text-lg md:text-2xl">Vår Mission</h2>
        <p className="text-xs md:text-lg">
          På ParentBuddy är vårt uppdrag att förena föräldrar och barn genom
          spännande och meningsfulla aktiviteter. Vi strävar efter att göra det
          enkelt för familjer att skapa oförglömliga minnen tillsammans.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="font-semibold mb-2 text-md md:text-2xl">Vår Historia</h2>
        <p className="text-xs md:text-lg">
          Idén till ParentBuddy föddes när vi själva upplevde svårigheten att
          hitta roliga och passande aktiviteter för våra barn. Vi insåg att det
          fanns ett behov av en plattform som kunde ge personliga
          rekommendationer baserat på barnens ålder, intressen och familjens
          preferenser.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-md md:text-2xl font-semibold mb-2">
          Teamet Bakom ParentBuddy
        </h2>
        <p className="text-xs md:text-lg">
          Vårt dedikerade team består av föräldrar, utvecklare och kreativa
          tänkare som alla delar passionen för att förbättra familjers liv.
          Tillsammans arbetar vi för att göra ParentBuddy till det bästa
          verktyget för familjeaktiviteter.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-md md:text-2xl font-semibold mb-2">Vår Vision</h2>
        <p className="text-xs md:text-lg">
          Vi strävar efter att ständigt förbättra och expandera vår plattform.
          Håll utkik efter nya funktioner, fler aktiviteter och ännu bättre
          personliga rekommendationer i framtiden!
        </p>
      </section>

      <section className="mb-8 text-center">
        <h2 className="text-md md:text-2xl font-semibold mb-2">Kontakta Oss</h2>
        <p className="text-xs md:text-lg mb-2">
          Har du frågor, förslag eller feedback? Vi vill gärna höra från dig!
        </p>
        <a
          href="/contact"
          className="text-primary dark:text-primary-dark text-sm md:text-lg hover:text-secondary hover:underline"
        >
          Kontakta oss här
        </a>
      </section>
      <ScrollToTopButton />
    </div>
  );
};

export default AboutPage;
