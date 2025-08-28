// src/components/VerificationPage.tsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";

const VerificationPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { type, contact, ...signupData } = location.state || { type: "email", contact: "your address", firstName: "", lastName: "", username: "" };
  
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call for verification
    console.log(`Verifying code for ${type}: ${code}`);
    setTimeout(() => {
      setLoading(false);
      // On success, navigate to profile creation page with all the signup data
      navigate("/profile-creation", { state: { ...signupData, contact } });
    }, 1500); // Simulate a network delay
  };

  const handleResend = () => {
    // Simulate API call to resend code
    console.log(`Resending code to ${contact}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#B5C7EB] px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <div className="mb-6">
          <Logo />
        </div>
        <h2 className="text-xl font-medium text-gray-700 mb-2">Verify Your {type === "email" ? "Email" : "Phone"}</h2>
        <p className="text-gray-500 text-sm mb-6">
          We sent a verification code to {contact}.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-center focus:outline-none focus:ring-2 focus:ring-[#A4A5F5]"
            type="text"
            placeholder="Enter code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <button
            className="w-full bg-[#8E70CF] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#A4A5F5] transition-colors"
            type="submit"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify Account"}
          </button>
        </form>

        <div className="mt-4 text-sm text-gray-600">
          Didn't receive a code?
          <button
            onClick={handleResend}
            className="ml-1 text-[#8E70CF] font-medium hover:underline focus:outline-none"
            disabled={loading}
          >
            Resend
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;