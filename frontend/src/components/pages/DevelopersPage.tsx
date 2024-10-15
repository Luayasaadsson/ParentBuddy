import React from "react";
import { useNavigate } from "react-router-dom";
import { developers } from "@/constants/developersData";
import { MdEmail } from "react-icons/md";
import { FaFacebook, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import ScrollToTopButton from "../shared/ScrollButton";
import { Button } from "@/components/ui/button";

const DevelopersPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto md:w-1/2 px-4 py-20 text-text dark:text-text-dark dark:bg-gray-700 dark:text-white">
      <div className="mb-5">
        <Button onClick={() => navigate("/")} variant="secondary" size="sm">
          &larr; Tillbaka
        </Button>
      </div>
      <h1 className="text-4xl font-bold mb-8 text-center">
        Utvecklarna bakom <span className="text-primary">Parent</span>
        <span className="text-secondary">Buddy</span>
      </h1>

      <div className="flex flex-row justify-center items-center gap-8">
        {developers.map((developer) => (
          <div
            key={developer.name}
            className="max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 text-center"
          >
            <img
              src={developer.image}
              alt={`${developer.name}'s image`}
              className="w-48 h-48 rounded-full mx-auto mb-4"
            />
            <h2 className="text-xl font-bold text-primary">{developer.name}</h2>
            <p className="text-secondary mb-2">{developer.role}</p>
            <p className="text-sm mb-4 w-1/2 mx-auto">
              {developer.description}
            </p>

            <div className="flex justify-center space-x-4">
              <a
                href={`mailto:${developer.email}`}
                className="hover:text-primary"
                aria-label="Email"
              >
                <MdEmail size={24} />
              </a>
              <a
                href={developer.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
                aria-label="Github"
              >
                <FaGithub size={24} />
              </a>
              <a
                href={developer.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href={developer.facebook}
                target="_blank"
                className="hover:text-primary"
                aria-label="Facebook"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href={developer.instagram}
                target="_blank"
                className="hover:text-primary"
                aria-label="Instagram"
              >
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        ))}
      </div>
      <ScrollToTopButton />
    </div>
  );
};

export default DevelopersPage;
