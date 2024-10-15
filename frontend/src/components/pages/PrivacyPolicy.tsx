import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ScrollToTopButton from "../shared/ScrollButton";

const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto md:w-1/2 px-4 py-20 text-text dark:text-text-dark dark:bg-gray-700 dark:text-white">
      <div className="mb-5">
        <Button onClick={() => navigate("/")} variant="secondary" size="sm">
          &larr; Tillbaka
        </Button>
      </div>

      <h1 className="text-xl md:text-4xl font-bold mb-6 text-center">
        Integritetspolicy
      </h1>

      <section className="mb-8">
        <p className="text-md md:text-lg">
          Vi värnar om din integritet och strävar efter att skydda din
          personliga information. Denna integritetspolicy förklarar hur vi
          samlar in, använder och skyddar din information.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-md md:text-2xl font-semibold mb-2">
          Vilken information vi samlar in
        </h2>
        <ul className="list-disc list-inside space-y-2 text-xs md:text-lg">
          <li>
            Personlig information: namn, e-postadress och annan
            kontaktinformation.
          </li>
          <li>
            Platsinformation: Om du tillåter platsdelning samlar vi in din plats
            för att ge personliga rekommendationer.
          </li>
          <li>
            Aktivitetsdata: Information om aktiviteter som du interagerar med i
            vår app.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-md md:text-2xl font-semibold mb-2">
          Hur vi använder informationen
        </h2>
        <p className="text-xs md:text-lg">
          Vi använder informationen vi samlar in för att förbättra
          användarupplevelsen och ge dig personliga rekommendationer. Vi delar
          inte din information med tredje part utan ditt samtycke, förutom när
          det krävs enligt lag.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-md md:text-2xl font-semibold mb-2">
          Delning av information
        </h2>
        <p className="text-xs md:text-lg">
          Vi delar inte din personliga information med tredje part utan ditt
          samtycke, förutom när det krävs enligt lag eller för att skydda våra
          rättigheter.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-md md:text-2xl font-semibold mb-2">
          Dina rättigheter
        </h2>
        <p className="text-xs md:text-lg">
          Du har rätt att när som helst begära åtkomst till, korrigera eller
          radera din personliga information. Kontakta oss om du vill utöva dessa
          rättigheter.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-md md:text-2xl font-semibold mb-2">Säkerhet</h2>
        <p className="text-xs md:text-lg">
          Vi använder lämpliga säkerhetsåtgärder för att skydda din personliga
          information mot obehörig åtkomst, förändring eller radering.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-md md:text-2xl font-semibold mb-2">
          Ändringar i denna integritetspolicy
        </h2>
        <p className="text-xs md:text-lg">
          Vi kan komma att uppdatera denna integritetspolicy från tid till
          annan. Vi kommer att meddela dig om eventuella ändringar på denna
          sida.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-md md:text-2xl font-semibold mb-2">Kontakta oss</h2>
        <p className="text-xs md:text-lg">
          Om du har några frågor om denna integritetspolicy, vänligen kontakta
          oss på{" "}
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

export default PrivacyPolicy;
