// src/components/ProfileCreationPage.tsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BsArrowLeft, BsCamera, BsEmojiSmile, BsLightning } from "react-icons/bs";
import { FiUser, FiMail, FiMapPin, FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";
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
  const [formData, setFormData] = useState({
    firstName: initialFirstName,
    lastName: initialLastName,
    contact: initialContact,
    username: initialUsername,
    bio: "",
    location: "",
    interests: [] as string[],
    relationshipStatus: "",
    lookingFor: "",
  });
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const totalSteps = 5;

  const interests = [
    "Photography", "Travel", "Music", "Cooking", "Fitness", "Reading", 
    "Gaming", "Art", "Technology", "Sports", "Dancing", "Writing",
    "Nature", "Fashion", "Movies", "Pets", "Volunteering", "Learning"
  ];

  const relationshipStatuses = [
    "Single", "In a relationship", "Married", "Divorced", "Widowed", "It's complicated"
  ];

  const lookingFor = [
    "Friendship", "Dating", "Serious relationship", "Marriage", "Networking", "Just chatting"
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors({ profilePic: "File size must be less than 5MB" });
        return;
      }
      setProfilePic(file);
      setErrors(prev => ({ ...prev, profilePic: "" }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
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

  const handleSubmit = async () => {
    setLoading(true);
    
    try {
      const profileData = {
        ...formData,
        profilePic: profilePic ? URL.createObjectURL(profilePic) : null,
      };
      console.log("Saving profile data:", profileData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      navigate("/homepage");
    } catch (error) {
      console.error("Profile creation failed:", error);
      setErrors({ general: "Failed to create profile. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUser className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Basic Information</h3>
              <p className="text-gray-600">Let's start with the basics</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input 
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200" 
                  type="text" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Your first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input 
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200" 
                  type="text" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Your last name"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiMail className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Contact & Username</h3>
              <p className="text-gray-600">Your contact details and unique identity</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email or Mobile Number</label>
                <input 
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-600 cursor-not-allowed" 
                  type="text" 
                  value={formData.contact}
                  readOnly
                />
                <p className="text-xs text-gray-500 mt-1">This was set during signup and cannot be changed</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <input 
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-600 cursor-not-allowed" 
                  type="text" 
                  value={formData.username}
                  readOnly
                />
                <p className="text-xs text-gray-500 mt-1">This was set during signup and cannot be changed</p>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BsCamera className="text-purple-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Profile Photo</h3>
              <p className="text-gray-600">Add a photo to make your profile more personal</p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center overflow-hidden border-4 border-blue-200">
                  {profilePic ? (
                    <img src={URL.createObjectURL(profilePic)} alt="Profile Preview" className="w-full h-full object-cover" />
                  ) : (
                    <FiUser className="w-16 h-16 text-blue-400" />
                  )}
                </div>
                {profilePic && (
                  <button
                    onClick={() => setProfilePic(null)}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                )}
              </div>
              <label className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                {profilePic ? "Change Photo" : "Add Photo"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
              {errors.profilePic && (
                <p className="text-sm text-red-600">{errors.profilePic}</p>
              )}
              <p className="text-xs text-gray-500 text-center">Optional - You can skip this step<br />Supports JPG, PNG up to 5MB</p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BsEmojiSmile className="text-yellow-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Tell Us About Yourself</h3>
              <p className="text-gray-600">Share a bit about who you are</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea
                  name="bio"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 resize-none transition-all duration-200"
                  rows={4}
                  placeholder="Tell us about yourself... (Optional)"
                  value={formData.bio}
                  onChange={handleInputChange}
                />
                <p className="text-xs text-gray-500 mt-2">This helps others get to know you better</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <div className="relative">
                  <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    name="location"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
                    placeholder="Where are you located?"
                    value={formData.location}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Interests</label>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => handleInterestToggle(interest)}
                      className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        formData.interests.includes(interest)
                          ? 'bg-blue-500 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">Select up to 8 interests that describe you</p>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiHeart className="text-pink-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Relationship Preferences</h3>
              <p className="text-gray-600">Help us understand what you're looking for</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Status</label>
                <select
                  name="relationshipStatus"
                  value={formData.relationshipStatus}
                  onChange={(e) => setFormData(prev => ({ ...prev, relationshipStatus: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
                >
                  <option value="">Select your status</option>
                  {relationshipStatuses.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Looking For</label>
                <select
                  name="lookingFor"
                  value={formData.lookingFor}
                  onChange={(e) => setFormData(prev => ({ ...prev, lookingFor: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
                >
                  <option value="">What are you looking for?</option>
                  {lookingFor.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Back Button */}
        <Link 
          to="/verification" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-6"
        >
          <BsArrowLeft size={20} />
          <span>Back to Verification</span>
        </Link>

        {/* Profile Creation Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          <div className="text-center mb-8">
            <Logo />
            <h2 className="text-2xl font-bold text-gray-900 mt-4 mb-2">Welcome, {formData.username}!</h2>
            <h3 className="text-lg font-medium text-gray-600">Create Your Profile</h3>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm text-blue-600 font-medium">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Basic Info</span>
              <span>Contact</span>
              <span>Photo</span>
              <span>About</span>
              <span>Preferences</span>
            </div>
          </div>

          {/* Error Message */}
          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {errors.general}
            </div>
          )}

          {/* Step Content */}
          <div className="mb-8">
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between gap-4">
            <button
              onClick={handleBack}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                currentStep === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400 hover:transform hover:-translate-y-0.5"
              }`}
              disabled={currentStep === 1}
            >
              Back
            </button>

            {currentStep === totalSteps ? (
              <button
                onClick={handleSubmit}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Profile...
                  </>
                ) : (
                  <>
                    <BsLightning size={20} />
                    Let's Dive!
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                Next
                <BsArrowLeft className="rotate-180" size={20} />
              </button>
            )}
          </div>

          {/* Skip Option */}
          <div className="text-center mt-6">
            <button
              onClick={handleSubmit}
              className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
            >
              Skip profile setup for now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCreationPage;