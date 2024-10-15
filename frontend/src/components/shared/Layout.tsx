import React from "react";
import { Outlet } from "react-router-dom";
import ThemeToggleButton from "./ThemeToggleButton";
import Footer from "./../activity/Footer";

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-gray-700 transition-colors duration-300">
      <div className="absolute top-4 right-4">
        <ThemeToggleButton />
      </div>

      <div className="flex-grow flex justify-center items-center">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
