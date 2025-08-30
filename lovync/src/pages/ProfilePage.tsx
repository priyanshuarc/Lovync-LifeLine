import React, { useState, useEffect } from 'react';
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-3 py-3">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 mb-3">
          <div className="flex items-start gap-4">
            {/* Profile Photo with Edit Button */}
            <div className="relative profile-photo-container">
              <div className="relative">
                <img
                  src={profileUser.avatar}
                  alt="Profile"
                  className="profile-photo w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                  style={{
                    width: '96px',
                    height: '96px',
                    maxWidth: '96px',
                    maxHeight: '96px',
                    minWidth: '96px',
                    minHeight: '96px'
                  }}
                />
                {isOwnProfile && (
                  <button
                    onClick={handleAvatarChange}
                    className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors shadow-lg avatar-change-btn"
                  >
                    <MdAddAPhoto size={16} />
                  </button>
                )}
              </div>
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

              {/* Edit Profile Button - Only show for own profile */}
              {isOwnProfile && (
                <button
                  onClick={handleEditProfile}
                  className="bg-gray-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center gap-2 edit-profile-btn"
                >
                  <FiEdit3 size={16} />
                  Edit Profile
                </button>
              )}
              
              {/* Follow Button - Only show for other users */}
              {!isOwnProfile && (
                <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <BsHeart size={16} />
                  Follow
                </button>
              )}
            </div>
          </div>
        </div>

                {/* Content Tabs */}
        <section className="border-t border-gray-200">
          <nav className="flex">
            {[
              { id: 'posts', label: 'Posts', icon: <BsGridFill />, count: userPosts.length },
              { id: 'saved', label: 'Saved', icon: <BsBookmarkHeart />, count: isOwnProfile ? savedPosts.length : 0 },
              { id: 'liked', label: 'Liked', icon: <BsHeart />, count: isOwnProfile ? likedPosts.length : 0 },
              { id: 'collections', label: 'Collections', icon: <BsCollection />, count: 0 }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors border-b-2 tab-button ${
                  activeTab === tab.id
                    ? 'text-gray-900 border-gray-900 active'
                    : 'text-gray-500 border-transparent hover:text-gray-700'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </section>

                {/* Content Grid */}
        <section className="mt-3">
                     {activeTab === 'posts' && (
             <div className="grid grid-cols-3 gap-1">
               {userPosts.map((post) => (
                 <div 
                   key={post.id} 
                   className="relative group cursor-pointer aspect-square post-item"
                   onClick={() => console.log('Post clicked:', post.id)}
                 >
                   <img 
                     src={post.image || 'https://picsum.photos/400/400'} 
                     alt={`Post ${post.id}`} 
                     className="w-full h-full object-cover"
                   />
                   
                   {/* Video indicator */}
                   {post.type === 'video' && (
                     <div className="absolute top-2 right-2 bg-black/70 text-white p-1 rounded">
                       <BsPlayCircle size={16} />
                     </div>
                   )}

                   {/* Hover overlay with stats */}
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                     <div className="text-white text-center">
                       <div className="flex items-center gap-4">
                         <div className="flex items-center gap-1">
                           <BsHeart size={16} />
                           <span className="text-sm font-medium">{post.likes.toLocaleString()}</span>
                         </div>
                         <div className="flex items-center gap-1">
                           <BsChatDots size={16} />
                           <span className="text-sm font-medium">{post.comments}</span>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
               ))}
             </div>
           )}

                     {activeTab === 'saved' && isOwnProfile && (
             <div className="text-center py-12">
               <BsBookmarkHeart size={48} className="text-gray-300 mx-auto mb-4" />
               <h3 className="text-lg font-medium text-gray-900 mb-2">
                 {savedPosts.length > 0 ? 'Saved Posts' : 'No saved posts yet'}
               </h3>
               <p className="text-gray-500">
                 {savedPosts.length > 0 ? 'Your saved posts collection' : 'Save posts you love to your collection'}
               </p>
             </div>
           )}

           {activeTab === 'liked' && isOwnProfile && (
             <div className="text-center py-12">
               <BsHeart size={48} className="text-gray-300 mx-auto mb-4" />
               <h3 className="text-lg font-medium text-gray-900 mb-2">
                 {likedPosts.length > 0 ? 'Liked Posts' : 'No liked posts yet'}
               </h3>
               <p className="text-gray-500">
                 {likedPosts.length > 0 ? 'Posts you\'ve liked' : 'Posts you like will appear here'}
               </p>
             </div>
           )}

          {activeTab === 'collections' && isOwnProfile && (
            <div className="text-center py-12">
              <BsCollection size={48} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No collections yet</h3>
              <p className="text-gray-500">Create collections to organize your favorite posts</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;