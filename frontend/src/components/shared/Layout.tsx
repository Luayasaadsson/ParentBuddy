import React from "react";
import { Outlet } from "react-router-dom";
import ThemeToggleButton from "./ThemeToggleButton";

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background dark:bg-gray-700 transition-colors duration-300">
      <div className="absolute top-4 right-4">
        <ThemeToggleButton />
      </div>

      <Outlet />
    </div>
  );
};

export default Layout;
