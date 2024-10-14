import React, { useState, useEffect } from "react";
import { ImSun } from "react-icons/im";
import { RxMoon } from "react-icons/rx";

const ThemeToggleButton: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center p-2 text-2xl text-black dark:text-white"
    >
      {isDarkMode ? <ImSun /> : <RxMoon />}
    </button>
  );
};

export default ThemeToggleButton;
