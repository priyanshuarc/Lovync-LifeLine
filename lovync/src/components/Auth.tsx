// 2.1 src/components/Auth.tsx
import React, { useState } from "react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true); // toggle between login/signup

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-200 via-purple-200 to-white">
      <div className="bg-white shadow-lg rounded-xl p-10 w-full max-w-md">
        {/* 2.1.1 Header */}
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-2">
          {isLogin ? "Login to Lovync" : "Sign Up for Lovync"}
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Speak your heart, even in silence.
        </p>

        {/* 2.1.2 Form */}
        <form className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* 2.1.3 Social Login */}
        <div className="mt-4">
          <button className="w-full bg-blue-500 text-white py-3 rounded-lg mb-2 hover:bg-blue-600 transition">
            Continue with Google
          </button>
          <button className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900 transition">
            Continue with Apple
          </button>
        </div>

        {/* 2.1.4 Toggle Login/Signup */}
        <p className="text-center text-gray-500 mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="text-purple-600 cursor-pointer font-semibold"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
