// src/pages/LandingPage.tsx
import React from "react";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-white to-orange-100 px-6">
      
      {/* Logo / App name */}
      <h1 className="text-5xl font-extrabold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent mb-16 animate-fadeIn">
        Lovync
      </h1>

      {/* Card Section */}
      <div className="bg-white/60 backdrop-blur-xl p-10 rounded-2xl shadow-xl w-full max-w-md animate-fadeIn">
        {/* Welcome Text */}
        <h2 className="text-3xl font-bold mb-4 text-gray-800">WELCOME</h2>
        <p className="text-lg mb-8 text-gray-600">
          Let’s beat{" "}
          <span className="text-pink-500 font-semibold">social anxiety</span>, Join us!
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <Link to="/login">
            <button className="w-full bg-gradient-to-r from-pink-500 to-orange-400 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:scale-105 transition">
              Login
            </button>
          </Link>

          <Link to="/register">
            <button className="w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:scale-105 transition">
              Create Account
            </button>
          </Link>
        </div>

        {/* Footer Note */}
        <p className="text-xs text-gray-500 mt-6">
          By continuing, you agree to our{" "}
          <span className="underline cursor-pointer">Terms of Service</span> and{" "}
          <span className="underline cursor-pointer">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
