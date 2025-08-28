// src/components/Signup.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const contactType = contact.includes('@') ? "email" : "mobile";

    setTimeout(() => {
      setLoading(false);
      navigate("/verification", { 
        state: { 
          firstName, 
          lastName, 
          contact,
          type: contactType,
          username,
        } 
      });
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg text-center">
        <Logo />
        <h2 className="text-xl font-medium text-gray-700 mb-6">Create your account</h2>

        <form className="space-y-4" onSubmit={handleCreateAccount}>
          <div className="grid grid-cols-2 gap-3">
            <input 
              className="px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400" 
              type="text" 
              placeholder="First Name" 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input 
              className="px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400" 
              type="text" 
              placeholder="Last Name" 
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          
          <input 
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400" 
            type="text"
            placeholder="Email or Mobile Number" 
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
          
          <input 
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400" 
            type="text" 
            placeholder="Create Username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          
          <input 
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400" 
            type="password" 
            placeholder="Create Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <input 
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400" 
            type="password" 
            placeholder="Confirm Password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <p className="text-xs text-gray-600 text-center mt-4">
            By creating an account, you agree to our <span className="text-purple-700 font-medium">Terms of Service</span> and <span className="text-purple-700 font-medium">Privacy Policy</span>
          </p>
          
          <button 
            className="w-full bg-purple-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-800 transition-colors" 
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-500">OR</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <button className="flex items-center justify-center gap-3 w-full border border-gray-300 rounded-lg py-3 text-gray-700 font-medium hover:bg-gray-50 transition-colors">
          <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>

        <p className="text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link 
            to="/login" 
            className="text-purple-700 font-medium hover:underline"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;