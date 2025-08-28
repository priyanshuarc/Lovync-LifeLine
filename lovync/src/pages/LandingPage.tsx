// src/components/LandingPage.tsx
import React from "react";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 px-6">
      
      <div className="bg-white/90 backdrop-blur-sm p-10 rounded-2xl shadow-lg w-full max-w-lg text-center">
        
        {/* Logo */}
        <h1 className="text-6xl font-bold text-purple-700 mb-12">
          Lovync
        </h1>
        
        {/* Welcome Text */}
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Connect Authentically</h2>
        <p className="text-base mb-10 text-gray-600">
          A space to share, connect, and date, designed to help you beat{" "}
          <span className="text-purple-700 font-medium">social anxiety</span>.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/signup" className="w-full sm:w-auto">
            <button className="w-full bg-purple-700 text-white px-8 py-3 rounded-lg font-medium text-base shadow-md hover:bg-purple-800 transition-colors">
              Create Account
            </button>
          </Link>
          <Link to="/login" className="w-full sm:w-auto">
            <button className="w-full bg-purple-500 text-white px-8 py-3 rounded-lg font-medium text-base shadow-md hover:bg-purple-600 transition-colors">
              Log In
            </button>
          </Link>
        </div>

        {/* Footer Note */}
        <p className="text-xs text-gray-500 mt-8">
          By continuing, you agree to our{" "}
          <span className="underline cursor-pointer text-purple-700">Terms of Service</span> and{" "}
          <span className="underline cursor-pointer text-purple-700">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};

export default LandingPage;