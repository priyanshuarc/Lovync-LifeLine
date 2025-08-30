import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { 
  BsArrowLeft, 
  BsCamera, 
  BsCheckLg, 
  BsX,
  BsZoomIn,
  BsZoomOut
} from 'react-icons/bs';
import { FiEdit3, FiUser, FiMail, FiMapPin, FiRotateCw } from 'react-icons/fi';

interface FormData {
  name: string;
  username: string;
  email: string;
  phone: string;
  bio: string;
  location: string;
  website: string;
  avatar: string;
}

const EditProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, updateUser } = useData();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [showCropper, setShowCropper] = useState(false);
  const [cropData, setCropData] = useState<{x: number, y: number, scale: number, rotation: number}>({
    x: 0, y: 0, scale: 1, rotation: 0
  });
  const [originalImage, setOriginalImage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [formData, setFormData] = useState<FormData>({
    name: currentUser.name,
    username: currentUser.username,
    email: 'anshu@example.com', // Placeholder since email not in User interface
    phone: '+1 (555) 123-4567', // Placeholder
    bio: currentUser.bio || '',
    location: 'Digital World', // Placeholder
    website: 'lovync.com', // Placeholder
    avatar: currentUser.avatar
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setOriginalImage(result);
        setFormData(prev => ({ ...prev, avatar: result }));
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = () => {
    if (canvasRef.current && originalImage) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = new Image();
      img.onload = () => {
        // Set canvas size to desired output size (96x96 for profile)
        canvas.width = 96;
        canvas.height = 96;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Apply transformations
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((cropData.rotation * Math.PI) / 180);
        ctx.scale(cropData.scale, cropData.scale);
        ctx.translate(-cropData.x, -cropData.y);

        // Draw image centered
        const size = Math.min(img.width, img.height);
        const sx = (img.width - size) / 2;
        const sy = (img.height - size) / 2;
        ctx.drawImage(img, sx, sy, size, size, -size/2, -size/2, size, size);

        ctx.restore();

        // Get cropped image data
        const croppedImage = canvas.toDataURL('image/jpeg', 0.9);
        setFormData(prev => ({ ...prev, avatar: croppedImage }));
        setShowCropper(false);
      };
      img.src = originalImage;
    }
  };

  const handleCancelCrop = () => {
    setShowCropper(false);
    setFormData(prev => ({ ...prev, avatar: currentUser.avatar }));
    setOriginalImage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user data
      updateUser(currentUser.id, {
        name: formData.name,
        username: formData.username,
        bio: formData.bio,
        avatar: formData.avatar
      });
      
      // Navigate back to profile
      navigate(`/profile/${formData.username}`);
    } catch (error) {
      console.error('Update failed:', error);
      setErrors({ general: "Update failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (showCropper) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 max-w-md w-full">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Crop Profile Picture</h2>
            <button
              onClick={handleCancelCrop}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <BsX size={20} className="sm:hidden" />
              <BsX size={24} className="hidden sm:block" />
            </button>
          </div>

          {/* Image Preview with Crop Controls */}
          <div className="relative mb-4 sm:mb-6">
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 mx-auto border-2 border-blue-500 rounded-full overflow-hidden">
              <img
                src={originalImage}
                alt="Crop preview"
                className="w-full h-full object-cover"
                style={{
                  transform: `translate(${cropData.x}px, ${cropData.y}px) scale(${cropData.scale}) rotate(${cropData.rotation}deg)`
                }}
              />
              <div className="absolute inset-0 border-2 border-white rounded-full pointer-events-none"></div>
            </div>
          </div>

          {/* Crop Controls */}
          <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
            <div className="flex items-center justify-between">
              <label className="text-xs sm:text-sm font-medium text-gray-700">Scale</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCropData(prev => ({ ...prev, scale: Math.max(0.5, prev.scale - 0.1) }))}
                  className="p-1.5 sm:p-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <BsZoomOut size={14} className="sm:hidden" />
                  <BsZoomOut size={16} className="hidden sm:block" />
                </button>
                <span className="text-xs sm:text-sm text-gray-600 w-10 sm:w-12 text-center">{cropData.scale.toFixed(1)}x</span>
                <button
                  onClick={() => setCropData(prev => ({ ...prev, scale: Math.min(3, prev.scale + 0.1) }))}
                  className="p-1.5 sm:p-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <BsZoomIn size={14} className="sm:hidden" />
                  <BsZoomIn size={16} className="hidden sm:block" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-xs sm:text-sm font-medium text-gray-700">Rotation</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCropData(prev => ({ ...prev, rotation: prev.rotation - 15 }))}
                  className="p-1.5 sm:p-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <FiRotateCw size={14} className="sm:hidden" />
                  <FiRotateCw size={16} className="hidden sm:block" />
                </button>
                <span className="text-xs sm:text-sm text-gray-600 w-10 sm:w-12 text-center">{cropData.rotation}°</span>
                <button
                  onClick={() => setCropData(prev => ({ ...prev, rotation: prev.rotation + 15 }))}
                  className="p-1.5 sm:p-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <FiRotateCw size={14} className="sm:hidden" />
                  <FiRotateCw size={16} className="hidden sm:block" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-xs sm:text-sm font-medium text-gray-700">Position X</label>
              <input
                type="range"
                min="-50"
                max="50"
                value={cropData.x}
                onChange={(e) => setCropData(prev => ({ ...prev, x: parseInt(e.target.value) }))}
                className="w-20 sm:w-24"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-xs sm:text-sm font-medium text-gray-700">Position Y</label>
              <input
                type="range"
                min="-50"
                max="50"
                value={cropData.y}
                onChange={(e) => setCropData(prev => ({ ...prev, y: parseInt(e.target.value) }))}
                className="w-20 sm:w-24"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleCancelCrop}
              className="flex-1 bg-gray-200 text-gray-700 px-3 sm:px-4 py-2 sm:py-3 rounded-xl font-medium hover:bg-gray-300 transition-colors text-sm sm:text-base"
            >
              Cancel
            </button>
            <button
              onClick={handleCrop}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <BsCheckLg size={16} className="sm:hidden" />
              <BsCheckLg size={18} className="hidden sm:block" />
              Crop & Save
            </button>
          </div>
        </div>
        
        {/* Hidden canvas for processing */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={handleBack}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <BsArrowLeft size={18} className="sm:hidden" />
              <BsArrowLeft size={20} className="hidden sm:block" />
            </button>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">Edit Profile</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Avatar Section */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BsCamera className="text-blue-500 sm:hidden" size={18} />
              <BsCamera className="text-blue-500 hidden sm:block" size={20} />
              Profile Picture
            </h2>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="relative">
                <img
                  src={formData.avatar}
                  alt="Profile"
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-gray-100 shadow-lg"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 sm:p-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg"
                >
                  <FiEdit3 size={14} className="sm:hidden" />
                  <FiEdit3 size={16} className="hidden sm:block" />
                </button>
              </div>
              
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">Update your profile picture</h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
                  Choose a high-quality image that represents you well. 
                  We'll help you crop it to the perfect size.
                </p>
                <p className="text-xs text-gray-500">
                  JPG, PNG or GIF. Max size 5MB.
                </p>
              </div>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>

          {/* Personal Information */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FiUser className="text-blue-500 sm:hidden" size={18} />
              <FiUser className="text-blue-500 hidden sm:block" size={20} />
              Personal Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm sm:text-base ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Username *
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm sm:text-base ${
                    errors.username ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Choose a username"
                />
                {errors.username && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.username}</p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none text-sm sm:text-base"
                placeholder="Tell us about yourself..."
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FiMail className="text-blue-500 sm:hidden" size={18} />
              <FiMail className="text-blue-500 hidden sm:block" size={20} />
              Contact Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm sm:text-base ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm sm:text-base"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FiMapPin className="text-blue-500 sm:hidden" size={18} />
              <FiMapPin className="text-blue-500 hidden sm:block" size={20} />
              Additional Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm sm:text-base"
                  placeholder="Where are you based?"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm sm:text-base"
                  placeholder="Your website URL"
                />
              </div>
            </div>
          </div>

          {/* Error Message */}
          {errors.general && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-red-600 text-xs sm:text-sm">{errors.general}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 sm:gap-4 pt-4">
            <button
              type="button"
              onClick={handleBack}
              className="flex-1 bg-gray-200 text-gray-700 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium hover:bg-gray-300 transition-colors text-sm sm:text-base"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <BsCheckLg size={16} className="sm:hidden" />
                  <BsCheckLg size={18} className="hidden sm:block" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
