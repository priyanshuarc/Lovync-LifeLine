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
  BsCollection,
  BsShare,
  BsLink45Deg,
  BsGeoAlt,
  BsCalendar3
} from 'react-icons/bs';
import { FiEdit3, FiSettings } from 'react-icons/fi';
import { MdAddAPhoto } from 'react-icons/md';
import GoldenVerifiedBadge from '../components/GoldenVerifiedBadge';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { username } = useParams<{ username: string }>();
  const [activeTab, setActiveTab] = useState('posts');
  const { currentUser, users, posts, savedPosts, likedPosts } = useData();
  
  // Get the user whose profile we're viewing
  const profileUser = users.find(user => user.username === username) || currentUser;
  
  // Check if this is the current user's profile
  const isOwnProfile = profileUser.id === currentUser.id;
  
  // Get posts for the profile user
  const userPosts = posts.filter(post => post.userId === profileUser.id);

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  const handleAvatarChange = () => {
    // Handle avatar change logic
    console.log('Change avatar clicked');
  };

  const handleSettings = () => {
    navigate('/settings');
  };

  const handleShareProfile = () => {
    // Handle share profile logic
    console.log('Share profile clicked');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {/* Profile Header */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
            {/* Profile Photo Section */}
            <div className="flex flex-col items-center lg:items-start space-y-4">
              <div className="relative profile-photo-container">
                <div className="relative">
                  <img
                    src={profileUser.avatar}
                    alt="Profile"
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl sm:rounded-2xl object-cover border-4 border-gray-100 profile-photo shadow-lg"
                  />
                  {isOwnProfile && (
                    <button
                      onClick={handleAvatarChange}
                      className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 sm:p-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg avatar-change-btn"
                    >
                      <MdAddAPhoto size={16} className="sm:hidden" />
                      <MdAddAPhoto size={20} className="hidden sm:block" />
                    </button>
                  )}
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="flex flex-col space-y-2 w-full lg:w-auto">
                {isOwnProfile ? (
                  <button
                    onClick={handleEditProfile}
                    className="w-full lg:w-auto bg-gradient-to-r from-gray-900 to-gray-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium hover:from-gray-800 hover:to-gray-600 transition-all duration-200 flex items-center justify-center gap-2 shadow-md text-sm sm:text-base"
                  >
                    <FiEdit3 size={16} className="sm:hidden" />
                    <FiEdit3 size={18} className="hidden sm:block" />
                    Edit Profile
                  </button>
                ) : (
                  <button className="w-full lg:w-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-md text-sm sm:text-base">
                    <BsHeart size={16} className="sm:hidden" />
                    <BsHeart size={18} className="hidden sm:block" />
                    Follow
                  </button>
                )}
                
                <button
                  onClick={handleShareProfile}
                  className="w-full lg:w-auto bg-gray-100 text-gray-700 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <BsShare size={16} className="sm:hidden" />
                  <BsShare size={18} className="hidden sm:block" />
                  Share Profile
                </button>
              </div>
            </div>

            {/* Profile Info Section */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{profileUser.name}</h1>
                {profileUser.verified && (
                  <GoldenVerifiedBadge size={20} />
                )}
                  </div>
                  
                  <p className="text-base sm:text-lg text-gray-600 mb-2 sm:mb-3">@{profileUser.username}</p>
                  
                  {profileUser.bio && (
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4 max-w-2xl">{profileUser.bio}</p>
                  )}

                  {/* Profile Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="flex items-center gap-2 text-gray-600">
                      <BsGeoAlt size={14} className="sm:hidden" />
                      <BsGeoAlt size={16} className="hidden sm:block" />
                      <span className="text-xs sm:text-sm">Digital World</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <BsLink45Deg size={14} className="sm:hidden" />
                      <BsLink45Deg size={16} className="hidden sm:block" />
                      <span className="text-xs sm:text-sm text-blue-600">lovync.com</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <BsCalendar3 size={14} className="sm:hidden" />
                      <BsCalendar3 size={16} className="hidden sm:block" />
                      <span className="text-xs sm:text-sm">Joined 2024</span>
                    </div>
                  </div>
                </div>

                {/* Settings Button for own profile */}
                {isOwnProfile && (
                  <button
                    onClick={handleSettings}
                    className="p-2 sm:p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200"
                  >
                    <FiSettings size={18} className="sm:hidden" />
                    <FiSettings size={20} className="hidden sm:block" />
                  </button>
                )}
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6 py-3 sm:py-4 border-t border-gray-100">
                <div className="text-center stats-item">
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">{profileUser.posts}</div>
                  <div className="text-xs sm:text-sm text-gray-600 font-medium">Posts</div>
                </div>
                <div className="text-center stats-item">
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">{profileUser.followers.toLocaleString()}</div>
                  <div className="text-xs sm:text-sm text-gray-600 font-medium">Followers</div>
                </div>
                <div className="text-center stats-item">
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">{profileUser.following.toLocaleString()}</div>
                  <div className="text-xs sm:text-sm text-gray-600 font-medium">Following</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 mb-4 sm:mb-6">
          <nav className="flex overflow-x-auto">
            {[
              { id: 'posts', label: 'Posts', icon: <BsGridFill />, count: userPosts.length },
              { id: 'saved', label: 'Saved', icon: <BsBookmarkHeart />, count: isOwnProfile ? savedPosts.length : 0 },
              { id: 'liked', label: 'Liked', icon: <BsHeart />, count: isOwnProfile ? likedPosts.length : 0 },
              { id: 'collections', label: 'Collections', icon: <BsCollection />, count: 0 }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 sm:gap-3 py-3 sm:py-4 px-2 text-xs sm:text-sm font-medium transition-all duration-200 border-b-2 tab-button whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-blue-600 bg-blue-50'
                    : 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                <span className="bg-gray-200 text-gray-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium">
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content Grid */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
          {activeTab === 'posts' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {userPosts.map((post) => (
                <div 
                  key={post.id} 
                  className="relative group cursor-pointer aspect-square post-item rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200"
                  onClick={() => console.log('Post clicked:', post.id)}
                >
                  <img 
                    src={post.image || 'https://picsum.photos/400/400'} 
                    alt={`Post ${post.id}`} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  
                  {/* Video indicator */}
                  {post.type === 'video' && (
                    <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-black/80 text-white p-1.5 sm:p-2 rounded-lg">
                      <BsPlayCircle size={14} className="sm:hidden" />
                      <BsPlayCircle size={16} className="hidden sm:block" />
                    </div>
                  )}

                  {/* Hover overlay with stats */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="flex items-center gap-4 sm:gap-6">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <BsHeart size={16} className="sm:hidden" />
                          <BsHeart size={18} className="hidden sm:block" />
                          <span className="text-xs sm:text-sm font-medium">{post.likes.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <BsChatDots size={16} className="sm:hidden" />
                          <BsChatDots size={18} className="hidden sm:block" />
                          <span className="text-xs sm:text-sm font-medium">{post.comments}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'saved' && isOwnProfile && (
            <div className="text-center py-12 sm:py-16">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <BsBookmarkHeart size={24} className="sm:hidden text-blue-600" />
                <BsBookmarkHeart size={32} className="hidden sm:block text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                {savedPosts.length > 0 ? 'Your Saved Collection' : 'No saved posts yet'}
              </h3>
              <p className="text-sm sm:text-base text-gray-500 max-w-md mx-auto">
                {savedPosts.length > 0 ? 'Posts you\'ve saved for later inspiration' : 'Save posts you love to your collection for easy access'}
              </p>
            </div>
          )}

          {activeTab === 'liked' && isOwnProfile && (
            <div className="text-center py-12 sm:py-16">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-red-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <BsHeart size={24} className="sm:hidden text-red-600" />
                <BsHeart size={32} className="hidden sm:block text-red-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                {likedPosts.length > 0 ? 'Posts You Love' : 'No liked posts yet'}
              </h3>
              <p className="text-sm sm:text-base text-gray-500 max-w-md mx-auto">
                {likedPosts.length > 0 ? 'A collection of posts that caught your attention' : 'Posts you like will appear here for easy reference'}
              </p>
            </div>
          )}

          {activeTab === 'collections' && isOwnProfile && (
            <div className="text-center py-12 sm:py-16">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <BsCollection size={24} className="sm:hidden text-green-600" />
                <BsCollection size={32} className="hidden sm:block text-green-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Create Your First Collection</h3>
              <p className="text-sm sm:text-base text-gray-500 max-w-md mx-auto mb-4 sm:mb-6">
                Organize your favorite posts into themed collections for better discovery
              </p>
              <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-200 text-sm sm:text-base">
                Create Collection
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;