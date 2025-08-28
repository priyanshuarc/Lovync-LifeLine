// src/components/Login.tsx
import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo"; // Import the new Logo component

const Login: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <Logo /> {/* Use the reusable Logo component here */}
        <h2 className="text-xl font-medium text-gray-700 mb-6">Log in to continue</h2>

        <form className="space-y-4">
          <input 
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400" 
            type="text" 
            placeholder="Email, Username or Phone" 
          />
          <input 
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400" 
            type="password" 
            placeholder="Password" 
          />
          <button 
            className="w-full bg-purple-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-800 transition-colors" 
            type="submit"
          >
            Log In
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-500">OR</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <button className="flex items-center justify-center gap-3 w-full border border-gray-300 rounded-lg py-3 text-gray-700 font-medium hover:bg-gray-50 transition-colors">
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <p className="text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link 
            to="/signup" 
            className="text-purple-700 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;