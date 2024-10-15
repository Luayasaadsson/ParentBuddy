import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ScrollToTopButton from "../shared/ScrollButton";

const TermsOfService: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto md:w-1/2 px-4 py-20 text-text dark:text-text-dark dark:bg-gray-700 dark:text-white">
      <div className="mb-5">
        <Button onClick={() => navigate("/")} variant="secondary" size="sm">
          &larr; Tillbaka
        </Button>
      </div>
      <h1 className="text-md md:text-4xl font-bold mb-6 text-center">
        Användarvillkor
      </h1>

      <section className="mb-8">
        <p className="text-sm md:text-lg">
          Dessa användarvillkor reglerar din användning av{" "}
          <span className="text-primary text-md md:text-xl">Parent</span>
          <span className="text-secondary text-md md:text-xl">Buddy</span>.
          Genom att använda vår tjänst samtycker du till dessa villkor.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-md md:text-2xl font-semibold mb-2">
          Användning av tjänsten
        </h2>
        <p className="text-sm md:text-lg">
          Du samtycker till att använda ParentBuddy endast för lagliga ändamål
          och i enlighet med dessa användarvillkor. Du ansvarar för att all
          information som du delar är korrekt och uppdaterad.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-md md:text-2xl font-semibold mb-2">
          Kontoregistrering
        </h2>
        <p className="text-sm md:text-lg">
          För att kunna använda ParentBuddy och få rekommendationer behöver du
          registrera ett konto. Du ansvarar för att hålla din
          inloggningsinformation konfidentiell och att meddela oss om obehörig
          åtkomst till ditt konto.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-md md:text-2xl font-semibold mb-2">
          Ansvarsbegränsning
        </h2>
        <p className="text-sm md:text-lg">
          ParentBuddy tillhandahåller tjänsten i befintligt skick och ansvarar
          inte för eventuella skador eller förluster som uppstår genom
          användning av tjänsten. Vi garanterar inte att tjänsten alltid är
          tillgänglig eller fri från fel.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-md md:text-2xl font-semibold mb-2">
          Ändringar i villkoren
        </h2>
        <p className="text-sm md:text-lg">
          Vi kan uppdatera dessa användarvillkor när som helst. Eventuella
          ändringar träder i kraft när de publiceras på denna sida. Vi
          rekommenderar att du regelbundet granskar villkoren för att hålla dig
          uppdaterad.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-md md:text-2xl font-semibold mb-2">Kontakta oss</h2>
        <p className="text-sm md:text-lg">
          Om du har några frågor om dessa användarvillkor, vänligen kontakta oss
          på{" "}
          <a
            href="mailto:luay.asaadsson@chasacademy.com"
            className="text-primary dark:text-primary-dark hover:underline hover:text-secondary"
          >
            luay.asaadsson@chasacademy.com
          </a>
        </p>
      </section>
      <ScrollToTopButton />
    </div>
  );
};

export default TermsOfService;
