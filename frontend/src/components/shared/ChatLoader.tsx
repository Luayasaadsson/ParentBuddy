import React from "react";
import { helix } from "ldrs";

helix.register();

const ChatLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-black">
      <l-helix size="250" speed="4" color="hsl(180, 75%, 60%)"></l-helix>
    </div>
  );
};

export default ChatLoader;
