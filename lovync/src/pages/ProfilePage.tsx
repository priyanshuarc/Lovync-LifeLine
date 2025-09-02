import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/ProfilePage.css';
import { useData } from '../context/DataContext';
import { 
  BsGridFill, 
  BsBookmarkHeart, 
  BsHeart, 
  BsChatDots,
  BsPlayCircle,
  BsCollection
} from 'react-icons/bs';
import { FiEdit3 } from 'react-icons/fi';
import { MdVerified, MdAddAPhoto } from 'react-icons/md';
import { FiArrowLeft } from 'react-icons/fi';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { username } = useParams<{ username: string }>();
  const [activeTab, setActiveTab] = useState('posts');
  const { currentUser, users, posts, savedPosts, likedPosts } = useData();
  
  // Get the user whose profile we're viewing
  const profileUser = users.find(user => user.username === username) || currentUser;
  
  // Early return if no current user (still loading)
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  // If no profile user found, show current user's profile
  if (!profileUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Profile not found</p>
          <button 
            onClick={() => navigate('/homepage')}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    );
  }
  
  // Check if this is the current user's profile
  const isOwnProfile = profileUser.id === currentUser.id;
  
  // Get posts for the profile user
  const userPosts = posts.filter(post => post.userId === profileUser.id);

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  const handleShareProfile = () => {
    if (navigator.share) {
      navigator.share({
        title: `${profileUser.name}'s Profile`,
        text: `Check out ${profileUser.name}'s profile on Lovync!`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Profile link copied to clipboard!');
    }
  };

  const handleSettings = () => {
    console.log('Open settings');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FiArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold text-gray-900">Profile</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-12">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Profile Photo */}
            <div className="relative">
              <img
                src={profileUser.avatar}
                alt="Profile"
                className="w-20 h-20 lg:w-24 lg:h-24 rounded-full object-cover border-2 border-gray-200 profile-photo"
              />
              {isOwnProfile && (
                <button
                  onClick={handleEditProfile}
                  className="absolute -bottom-1 -right-1 lg:-bottom-2 lg:-right-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-1.5 lg:p-2 rounded-lg lg:rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg"
                >
                  <MdAddAPhoto size={14} />
                </button>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900">{profileUser.name}</h2>
                {/* Golden verified badge for Priyanshu Pandey */}
                {profileUser.isCEO && (
                  <MdVerified 
                    className="text-yellow-500" 
                    size={18} 
                    style={{
                      filter: 'drop-shadow(0 2px 4px rgba(255, 215, 0, 0.3))'
                    }}
                  />
                )}
                {/* Standard verified badge for other verified users */}
                {profileUser.verified && !profileUser.isCEO && (
                  <MdVerified className="text-purple-400" size={18} />
                )}
              </div>
              
              <p className="text-gray-600 mb-2 text-sm lg:text-base">@{profileUser.username}</p>
              
              {profileUser.bio && (
                <p className="text-gray-700 mb-3 leading-relaxed text-sm lg:text-base">{profileUser.bio}</p>
              )}

              {/* Stats Row */}
              <div className="flex items-center gap-4 lg:gap-6 mb-4 stats-row">
                <div className="text-center stats-item">
                  <div className="text-lg lg:text-xl font-bold text-gray-900">{profileUser.posts}</div>
                  <div className="text-xs lg:text-sm text-gray-600">Posts</div>
                </div>
                <div className="text-center stats-item">
                  <div className="text-lg lg:text-xl font-bold text-gray-900">{profileUser.followers.toLocaleString()}</div>
                  <div className="text-xs lg:text-sm text-gray-600">Followers</div>
                </div>
                <div className="text-center stats-item">
                  <div className="text-lg lg:text-xl font-bold text-gray-900">{profileUser.following.toLocaleString()}</div>
                  <div className="text-xs lg:text-sm text-gray-600">Following</div>
                </div>
              </div>

              {/* Action Buttons - Fixed for mobile visibility */}
              <div className="flex flex-wrap gap-2 lg:gap-3 w-full">
                {isOwnProfile ? (
                  <>
                    <button
                      onClick={handleEditProfile}
                      className="flex-1 min-w-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 lg:px-6 py-2 rounded-lg lg:rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 text-sm lg:text-base whitespace-nowrap"
                    >
                      Edit Profile
                    </button>
                    <button
                      onClick={handleSettings}
                      className="flex-1 min-w-0 bg-gray-100 text-gray-700 px-3 lg:px-6 py-2 rounded-lg lg:rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 text-sm lg:text-base whitespace-nowrap"
                    >
                      Settings
                    </button>
                  </>
                ) : (
                  <>
                    <button className="flex-1 min-w-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 lg:px-6 py-2 rounded-lg lg:rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 text-sm lg:text-base whitespace-nowrap">
                      Follow
                    </button>
                    <button className="flex-1 min-w-0 bg-gray-100 text-gray-700 px-3 lg:px-6 py-2 rounded-lg lg:rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 text-sm lg:text-base whitespace-nowrap">
                      Message
                    </button>
                    <button
                      onClick={handleShareProfile}
                      className="flex-1 min-w-0 bg-gray-100 text-gray-700 px-3 lg:px-6 py-2 rounded-lg lg:rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 text-sm lg:text-base whitespace-nowrap"
                    >
                      Share
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Spacer to ensure no overlap */}
        <div className="h-8 lg:h-12"></div>

        {/* Profile Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('posts')}
              className={`flex-1 py-3 lg:py-4 px-4 lg:px-6 text-sm font-medium transition-colors border-b-2 ${
                activeTab === 'posts'
                  ? 'text-blue-600 border-blue-600 bg-blue-50'
                  : 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              Posts
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`flex-1 py-3 lg:py-4 px-4 lg:px-6 text-sm font-medium transition-colors border-b-2 ${
                activeTab === 'saved'
                  ? 'text-blue-600 border-blue-600 bg-blue-50'
                  : 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              Saved
            </button>
            <button
              onClick={() => setActiveTab('liked')}
              className={`flex-1 py-3 lg:py-4 px-4 lg:px-6 text-sm font-medium transition-colors border-b-2 ${
                activeTab === 'liked'
                  ? 'text-blue-600 border-blue-600 bg-blue-50'
                  : 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              Liked
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-4 lg:p-6">
            {activeTab === 'posts' && (
              <div className="grid grid-cols-3 gap-2 lg:gap-4">
                {userPosts.map((post) => (
                  <div key={post.id} className="bg-white rounded-lg lg:rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={post.media?.url || 'https://picsum.photos/400/400'} 
                        alt={`Post ${post.id}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'saved' && (
              <div className="grid grid-cols-3 gap-2 lg:gap-4">
                {savedPosts.map((post) => (
                  <div key={post.id} className="bg-white rounded-lg lg:rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={post.media?.url || 'https://picsum.photos/400/400'} 
                        alt={`Post ${post.id}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'liked' && (
              <div className="grid grid-cols-3 gap-2 lg:gap-4">
                {likedPosts.map((post) => (
                  <div key={post.id} className="bg-white rounded-lg lg:rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={post.media?.url || 'https://picsum.photos/400/400'} 
                        alt={`Post ${post.id}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;