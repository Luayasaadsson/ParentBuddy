import { useState, useEffect } from "react";
import { IoIosArrowDropup } from "react-icons/io";

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = (): void => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    isVisible && (
      <div className="fixed bottom-6 right-10">
        <button
          onClick={scrollToTop}
          className="h-10 w-10 text-4xl text-white bg-primary rounded-full shadow-lg hover:bg-secondary transition-colors duration-300 ease-out flex items-center justify-center"
        >
          <IoIosArrowDropup />
        </button>
      </div>
    )
  );
};

export default ScrollToTopButton;
