// src/components/VerificationPage.tsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BsArrowLeft, BsClock, BsCheckCircle } from "react-icons/bs";
import { FiMail, FiPhone, FiShield } from "react-icons/fi";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const VerificationPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { type, contact, ...signupData } = location.state || { 
    type: "email", 
    contact: "your address", 
    firstName: "", 
    lastName: "", 
    username: "" 
  };
  
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendCountdown]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single character
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
    
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (/^\d{6}$/.test(pastedData)) {
      const newCode = [...code];
      pastedData.split('').forEach((char, index) => {
        if (index < 6) newCode[index] = char;
      });
      setCode(newCode);
      // Focus last input
      const lastInput = document.getElementById(`code-5`);
      if (lastInput) lastInput.focus();
    }
  };

  const isCodeComplete = code.every(digit => digit !== "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isCodeComplete) {
      setError("Please enter the complete verification code");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      // Simulate API call for verification
      console.log(`Verifying code for ${type}: ${code.join('')}`);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess(true);
      
      // Wait a moment to show success, then navigate
      setTimeout(() => {
        navigate("/profile-creation", { state: { ...signupData, contact } });
      }, 1000);
      
    } catch (error) {
      console.error("Verification failed:", error);
      setError("Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    
    setCanResend(false);
    setResendCountdown(60); // 60 second countdown
    
    try {
      // Simulate API call to resend code
      console.log(`Resending code to ${contact}`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset code input
      setCode(["", "", "", "", "", ""]);
      setError("");
      
      // Focus first input
      const firstInput = document.getElementById('code-0');
      if (firstInput) firstInput.focus();
      
    } catch (error) {
      console.error("Resend failed:", error);
      setError("Failed to resend code. Please try again.");
    }
  };

  const getContactIcon = () => {
    return type === "email" ? <FiMail size={24} /> : <FiPhone size={24} />;
  };

  const getContactText = () => {
    return type === "email" ? "email address" : "phone number";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Link 
          to="/signup" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-6"
        >
          <BsArrowLeft size={20} />
          <span>Back to Sign Up</span>
        </Link>

        {/* Verification Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiShield className="text-blue-600" size={32} />
            </div>
            <Logo />
            <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-2">
              Verify Your {type === "email" ? "Email" : "Phone"}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We sent a 6-digit verification code to your {getContactText()}
            </p>
          </div>

          {/* Contact Display */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6 flex items-center gap-3">
            <div className="text-blue-600">
              {getContactIcon()}
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600">Code sent to:</p>
              <p className="font-medium text-gray-900">{contact}</p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-600 text-sm flex items-center gap-2">
              <BsCheckCircle size={20} />
              Verification successful! Redirecting...
            </div>
          )}

          {/* Verification Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Code Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                Enter the 6-digit code
              </label>
              <div className="flex gap-3 justify-center">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
                    placeholder="0"
                    disabled={loading || success}
                  />
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isCodeComplete || loading || success}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Verifying...
                </div>
              ) : success ? (
                <div className="flex items-center justify-center gap-2">
                  <BsCheckCircle size={20} />
                  Verified Successfully!
                </div>
              ) : (
                "Verify Account"
              )}
            </button>
          </form>

          {/* Resend Section */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 mb-3">
              Didn't receive a code?
            </p>
            <button
              onClick={handleResend}
              disabled={!canResend || loading}
              className="text-blue-600 hover:text-blue-700 font-medium hover:underline focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {canResend ? (
                "Resend Code"
              ) : (
                <div className="flex items-center gap-2">
                  <BsClock size={16} />
                  Resend in {resendCountdown}s
                </div>
              )}
            </button>
          </div>

          {/* Alternative Contact */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Wrong {getContactText()}?{" "}
              <Link 
                to="/signup" 
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
              >
                Go back and change it
              </Link>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Having trouble?{" "}
            <a href="#" className="text-blue-600 hover:underline">Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;