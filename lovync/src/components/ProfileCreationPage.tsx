// src/components/ProfileCreationPage.tsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";

const ProfileCreationPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const {
    firstName: initialFirstName = "",
    lastName: initialLastName = "",
    contact: initialContact = "",
    username: initialUsername = "",
  } = location.state || {};

  const [currentStep, setCurrentStep] = useState(1);
  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);
  const [contact, Contact] = useState(initialContact);
  const [username, Username] = useState(initialUsername);
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const totalSteps = 4;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePic(e.target.files[0]);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    
    const profileData = {
      firstName,
      lastName,
      contact,
      username,
      bio,
      profilePic: profilePic ? URL.createObjectURL(profilePic) : null,
    };
    console.log("Saving profile data:", profileData);
    
    setTimeout(() => {
      setLoading(false);
      navigate("/homepage");
    }, 1500);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Basic Information</h3>
              <p className="text-sm text-gray-500">Let's start with the basics</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400" 
                  type="text" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Optional"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400" 
                  type="text" 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Optional"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Contact & Username</h3>
              <p className="text-sm text-gray-500">Your contact details and unique identity</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email or Mobile Number</label>
                <input 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-600 cursor-not-allowed" 
                  type="text" 
                  value={contact}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <input 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-600 cursor-not-allowed" 
                  type="text" 
                  value={username}
                  readOnly
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Profile Photo</h3>
              <p className="text-sm text-gray-500">Add a photo to make your profile more personal</p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-purple-200">
                {profilePic ? (
                  <img src={URL.createObjectURL(profilePic)} alt="Profile Preview" className="w-full h-full object-cover" />
                ) : (
                  <svg
                    className="w-16 h-16 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    ></path>
                  </svg>
                )}
              </div>
              <label className="cursor-pointer bg-purple-100 text-purple-700 px-6 py-2 rounded-lg font-medium hover:bg-purple-200 transition-colors">
                {profilePic ? "Change Photo" : "Add Photo"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
              <p className="text-xs text-gray-500">Optional - You can skip this step</p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Tell Us About Yourself</h3>
              <p className="text-sm text-gray-500">Share a bit about who you are</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                rows={6}
                placeholder="Tell us about yourself... (Optional)"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-2">This helps others get to know you better</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <div className="text-center mb-8">
          <Logo />
          <h2 className="text-xl font-medium text-gray-700 mt-4 mb-2">Welcome, {username}!</h2>
          <h3 className="text-lg font-medium text-gray-500">Create Your Profile</h3>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm text-purple-700">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-purple-700 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        <div className="mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4">
          <button
            onClick={handleBack}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              currentStep === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-300 text-gray-700 hover:bg-gray-400"
            }`}
            disabled={currentStep === 1}
          >
            Back
          </button>

          {currentStep === totalSteps ? (
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-purple-700 text-white rounded-lg font-medium hover:bg-purple-800 transition-colors flex-1"
              disabled={loading}
            >
              {loading ? "Saving..." : "Let's Dive!"}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-purple-700 text-white rounded-lg font-medium hover:bg-purple-800 transition-colors flex-1"
            >
              Next
            </button>
          )}
        </div>

        {/* Skip Option */}
        <div className="text-center mt-6">
          <button
            onClick={handleSubmit}
            className="text-sm text-gray-500 hover:text-purple-700 transition-colors"
          >
            Skip profile setup
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCreationPage;