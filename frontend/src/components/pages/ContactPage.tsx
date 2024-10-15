import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();
  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission (I will later connect it to backend)
    setFormSubmitted(true);
    console.log(formData);
  };

  return (
    <div className="container mx-auto md:w-1/2 px-4 py-20 text-text dark:text-text-dark dark:bg-gray-700 dark:text-white">
      <div className="mb-5">
        <Button onClick={() => navigate("/")} variant="secondary" size="sm">
          &larr; Tillbaka
        </Button>
      </div>

      <h1 className="text-xl md:text-4xl font-bold mb-6 text-center">
        Kontakta Oss
      </h1>

      {formSubmitted ? (
        <p className="text-sm md:text-xl text-center mb-8 text-secondary">
          Tack för ditt meddelande! Vi hör av oss snart.
        </p>
      ) : (
        <>
          <p className="text-sm md:text-xl text-center mb-8">
            Har du frågor eller förslag? Fyll i formuläret nedan eller kontakta
            oss via e-post på{" "}
            <a
              href="mailto:luay.asaadsson@chasacademy.com"
              className="text-primary dark:text-primary-dark hover:underline hover:text-secondary"
            >
              luay.asaadsson@chasacademy.com
            </a>
          </p>

          <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
            <div>
              <label
                htmlFor="name"
                className="text-xs md:text-lg font-semibold block mb-2"
              >
                Ditt namn
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Skriv ditt namn"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="placeholder:text-gray-500 dark:placeholder:text-gray-300 border-black dark:border-white text-xs md:text-md"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="text-xs md:text-lg font-semibold block mb-2"
              >
                Din e-postadress
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Skriv din e-postadress"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="placeholder:text-gray-500 dark:placeholder:text-gray-300 border-black dark:border-white text-xs md:text-md"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="text-xs md:text-lg font-semibold block mb-2"
              >
                Ditt meddelande
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="Skriv ditt meddelande här..."
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                required
                className="placeholder:text-gray-500 dark:placeholder:text-gray-300 border-black dark:border-white text-xs md:text-md"
              />
            </div>

            <Button
              type="submit"
              variant="secondary"
              size="default"
              className="w-full text-xs md:text-lg"
            >
              Skicka meddelande
            </Button>
          </form>
        </>
      )}

      <div className="mt-8 text-center">
        <p className="text-sm md:text-lg">Följ oss på sociala medier:</p>
        <div className="flex justify-center space-x-6 mt-4">
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
    </div>
  );
};

export default ContactPage;
