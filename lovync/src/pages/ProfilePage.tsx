import React, { useState } from 'react';
import '../styles/ProfilePage.css';
import { 
  BsGridFill, 
  BsBookmarkHeart, 
  BsHeart, 
  BsChatDots,
  BsPlayCircle,
  BsCollection
} from 'react-icons/bs';
import { FiSettings, FiEdit3 } from 'react-icons/fi';
import { MdVerified, MdAddAPhoto } from 'react-icons/md';

// User profile data for logged-in user
const userProfile = {
  username: 'anshu_verma',
  fullName: 'Anshu Verma',
  avatarUrl: 'https://i.pravatar.cc/150?u=anshu_verma',
  postCount: 125,
  followerCount: 4032,
  followingCount: 589,
  bio: 'Digital Creator & Tech Enthusiast ✨ | Building Lovync to connect souls. Passionate about innovation and meaningful connections.',
  verified: true,
  posts: Array.from({ length: 15 }, (_, i) => ({
    id: i,
    imageUrl: `https://picsum.photos/id/${i + 10}/${i % 3 === 0 ? 600 : 500}/${i % 2 === 0 ? 700 : 500}`,
    likes: Math.floor(Math.random() * 2000),
    comments: Math.floor(Math.random() * 100),
    type: i % 4 === 0 ? 'video' : 'image'
  })),
};

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('posts');

  const handleEditProfile = () => {
    // Here you would typically open a modal or navigate to edit page
    console.log('Edit profile clicked');
  };

  const handleAvatarChange = () => {
    // Handle avatar change logic
    console.log('Change avatar clicked');
  };

  return (
    <div className="bg-white min-h-screen font-jejugothic custom-scrollbar">
      {/* Header with back button and settings */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Profile</h1>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <FiSettings size={20} className="text-gray-600" />
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pb-8">
        {/* Profile Header Section */}
        <section className="pt-6 pb-8">
          <div className="flex items-start gap-6">
            {/* Profile Photo with Edit Button */}
            <div className="relative profile-photo-container">
              <div className="relative">
                <img
                  src={userProfile.avatarUrl}
                  alt="Profile Photo"
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-200 profile-photo"
                />
                <button
                  onClick={handleAvatarChange}
                  className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors shadow-lg avatar-change-btn"
                >
                  <MdAddAPhoto size={16} />
                </button>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-2xl font-bold text-gray-900">{userProfile.fullName}</h2>
                {userProfile.verified && (
                  <MdVerified className="text-blue-500" size={20} />
                )}
              </div>
              
              <p className="text-gray-600 mb-3">@{userProfile.username}</p>
              
              {userProfile.bio && (
                <p className="text-gray-700 mb-4 leading-relaxed">{userProfile.bio}</p>
              )}

                             {/* Stats Row */}
               <div className="flex items-center gap-8 mb-6 stats-row">
                 <div className="text-center stats-item">
                   <div className="text-xl font-bold text-gray-900">{userProfile.postCount}</div>
                   <div className="text-sm text-gray-600">Posts</div>
                 </div>
                 <div className="text-center stats-item">
                   <div className="text-xl font-bold text-gray-900">{userProfile.followerCount.toLocaleString()}</div>
                   <div className="text-sm text-gray-600">Followers</div>
                 </div>
                 <div className="text-center stats-item">
                   <div className="text-xl font-bold text-gray-900">{userProfile.followingCount.toLocaleString()}</div>
                   <div className="text-sm text-gray-600">Following</div>
                 </div>
               </div>

                             {/* Edit Profile Button */}
               <button
                 onClick={handleEditProfile}
                 className="bg-gray-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center gap-2 edit-profile-btn"
               >
                 <FiEdit3 size={16} />
                 Edit Profile
               </button>
            </div>
          </div>
        </section>

        {/* Content Tabs */}
        <section className="border-t border-gray-200">
          <nav className="flex">
            {[
              { id: 'posts', label: 'Posts', icon: <BsGridFill />, count: userProfile.postCount },
              { id: 'saved', label: 'Saved', icon: <BsBookmarkHeart />, count: 47 },
              { id: 'liked', label: 'Liked', icon: <BsHeart />, count: 156 },
              { id: 'collections', label: 'Collections', icon: <BsCollection />, count: 8 }
            ].map((tab) => (
                               <button
                   key={tab.id}
                   onClick={() => setActiveTab(tab.id)}
                   className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium transition-colors border-b-2 tab-button ${
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
        <section className="mt-6">
          {activeTab === 'posts' && (
            <div className="grid grid-cols-3 gap-1">
              {userProfile.posts.map((post) => (
                                 <div 
                   key={post.id} 
                   className="relative group cursor-pointer aspect-square post-item"
                   onClick={() => console.log('Post clicked:', post.id)}
                 >
                  <img 
                    src={post.imageUrl} 
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

          {activeTab === 'saved' && (
            <div className="text-center py-12">
              <BsBookmarkHeart size={48} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No saved posts yet</h3>
              <p className="text-gray-500">Save posts you love to your collection</p>
            </div>
          )}

          {activeTab === 'liked' && (
            <div className="text-center py-12">
              <BsHeart size={48} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No liked posts yet</h3>
              <p className="text-gray-500">Posts you like will appear here</p>
            </div>
          )}

          {activeTab === 'collections' && (
            <div className="text-center py-12">
              <BsCollection size={48} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No collections yet</h3>
              <p className="text-gray-500">Create collections to organize your favorite posts</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;