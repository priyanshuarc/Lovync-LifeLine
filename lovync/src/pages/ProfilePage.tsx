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
  const profileUser = users.find(user => user.username === username);
  
  // Early return if no profile user or current user
  if (!profileUser || !currentUser) {
    return <div>Loading...</div>;
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
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Profile Photo */}
            <div className="relative">
              <img
                src={profileUser.avatar}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-200 profile-photo"
              />
              {isOwnProfile && (
                <button
                  onClick={handleEditProfile}
                  className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg"
                >
                  <MdAddAPhoto size={16} />
                </button>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-2xl font-bold text-gray-900">{profileUser.name}</h2>
                {profileUser.verified && (
                  <MdVerified className="text-blue-500" size={20} />
                )}
              </div>
              
              <p className="text-gray-600 mb-2">@{profileUser.username}</p>
              
              {profileUser.bio && (
                <p className="text-gray-700 mb-3 leading-relaxed">{profileUser.bio}</p>
              )}

              {/* Stats Row */}
              <div className="flex items-center gap-6 mb-4 stats-row">
                <div className="text-center stats-item">
                  <div className="text-xl font-bold text-gray-900">{profileUser.posts}</div>
                  <div className="text-sm text-gray-600">Posts</div>
                </div>
                <div className="text-center stats-item">
                  <div className="text-xl font-bold text-gray-900">{profileUser.followers.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Followers</div>
                </div>
                <div className="text-center stats-item">
                  <div className="text-xl font-bold text-gray-900">{profileUser.following.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Following</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                {isOwnProfile ? (
                  <>
                    <button
                      onClick={handleEditProfile}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                    >
                      Edit Profile
                    </button>
                    <button
                      onClick={handleSettings}
                      className="bg-gray-100 text-gray-700 px-6 py-2 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200"
                    >
                      Settings
                    </button>
                  </>
                ) : (
                  <>
                    <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200">
                      Follow
                    </button>
                    <button className="bg-gray-100 text-gray-700 px-6 py-2 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200">
                      Message
                    </button>
                    <button
                      onClick={handleShareProfile}
                      className="bg-gray-100 text-gray-700 px-6 py-2 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200"
                    >
                      Share
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('posts')}
              className={`flex-1 py-4 px-6 text-sm font-medium transition-colors border-b-2 ${
                activeTab === 'posts'
                  ? 'text-blue-600 border-blue-600 bg-blue-50'
                  : 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              Posts
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`flex-1 py-4 px-6 text-sm font-medium transition-colors border-b-2 ${
                activeTab === 'saved'
                  ? 'text-blue-600 border-blue-600 bg-blue-50'
                  : 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              Saved
            </button>
            <button
              onClick={() => setActiveTab('liked')}
              className={`flex-1 py-4 px-6 text-sm font-medium transition-colors border-b-2 ${
                activeTab === 'liked'
                  ? 'text-blue-600 border-blue-600 bg-blue-50'
                  : 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              Liked
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'posts' && (
              <div className="grid grid-cols-3 gap-4">
                {userPosts.map((post) => (
                  <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
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
              <div className="grid grid-cols-3 gap-4">
                {savedPosts.map((post) => (
                  <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
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
              <div className="grid grid-cols-3 gap-4">
                {likedPosts.map((post) => (
                  <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
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