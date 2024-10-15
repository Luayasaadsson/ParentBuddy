import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background text-text dark:bg-gray-700 dark:text-white py-4 border-t border-gray-900 dark:border-gray-200">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-evenly items-center">
        <div className="mb-4 md:mb-0">
          <Link to="/">
            <h2 className="text-xl font-bold text-primary">
              Parent
              <span className="text-secondary dark:text-secondary-dark">
                Buddy
              </span>
            </h2>
          </Link>
        </div>

        <div className="mb-4 md:mb-0">
          <ul className="flex space-x-4 gap-4 flex-wrap justify-center text-sm md:text-lg">
            <li>
              <Link to="/about" className="hover:text-primary">
                Om oss
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary">
                Kontakt
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-primary">
                Integritetspolicy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-primary">
                Användarvillkor
              </Link>
            </li>
            <li>
              <Link to="/developers" className="hover:text-primary">
                Utvecklare
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex space-x-4">
          <a
            href="https://www.facebook.com/luay.asaad.56"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
            aria-label="Facebook"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/luay-asaadsson-432916280/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://www.instagram.com/luayasaadsson/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
            aria-label="Instagram"
          >
            <FaInstagram size={24} />
          </a>
        </div>
      </div>

      <div className="mt-4 text-center text-sm">
        © {currentYear} ParentBuddy. Alla rättigheter förbehållna.
      </div>
    </footer>
  );
};

export default Footer;
