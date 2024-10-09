import React from "react";

const ChatLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-black">
      <div className="relative">
        {/* Outermost circle */}
        <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-36 h-36 animate-spin-slow"></div>

        {/* Inner pulsating circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 border-4 border-blue-300 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ChatLoader;
