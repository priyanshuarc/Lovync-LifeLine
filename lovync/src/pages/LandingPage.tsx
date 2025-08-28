// src/pages/LandingPage.tsx
import React from "react";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-white to-orange-100 px-6 font-jejugothic">
      
      {/* Logo / App name */}
      <h1 className="text-5xl font-logo bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent mb-16 animate-fadeIn">
  Lovync
</h1>

      {/* Card Section */}
      <div className="bg-white/70 backdrop-blur-2xl p-12 rounded-3xl shadow-xl w-full max-w-md animate-fadeIn text-center">
        
        {/* Welcome Text */}
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Welcome</h2>
        <p className="text-lg mb-10 text-gray-600">
          Let’s beat{" "}
          <span className="text-pink-500 font-semibold">social anxiety</span>, together.
        </p>

        {/* Main Button */}
        <Link to="/login">
          <button className="w-full bg-gradient-to-r from-pink-500 to-orange-400 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:scale-105 hover:shadow-xl transition duration-300 ease-in-out">
            Let’s Dive Now 🚀
          </button>
        </Link>

        {/* Footer Note */}
        <p className="text-xs text-gray-500 mt-8 leading-relaxed">
          By continuing, you agree to our{" "}
          <span className="underline cursor-pointer">Terms of Service</span> and{" "}
          <span className="underline cursor-pointer">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
