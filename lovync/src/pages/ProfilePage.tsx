// lovync/src/pages/ProfilePage.tsx

import React from 'react';
import { BsGrid3X3, BsBookmark, BsPersonSquare } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';

// Placeholder data - replace with actual data from your backend
const userProfile = {
  username: 'anshu_verma',
  fullName: 'Anshu Verma',
  avatarUrl: 'https://via.placeholder.com/150', // Replace with a real image URL
  postCount: 125,
  followerCount: 4032,
  followingCount: 589,
  bio: 'Digital Creator ✨ | Building Lovync to connect souls.',
  website: 'lovync.com',
  posts: Array.from({ length: 12 }, (_, i) => ({
    id: i,
    imageUrl: `https://picsum.photos/id/${i + 10}/500/500`,
    likes: Math.floor(Math.random() * 2000),
    comments: Math.floor(Math.random() * 100),
  })),
};

const ProfilePage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen font-jejugothic">
      <div className="max-w-4xl mx-auto p-4 sm:p-8">
        {/* Profile Header */}
        <header className="flex items-center mb-10">
          <div className="w-24 h-24 sm:w-36 sm:h-36 mr-6 sm:mr-12 flex-shrink-0">
            <img
              src={userProfile.avatarUrl}
              alt="User Avatar"
              className="rounded-full w-full h-full object-cover border-2 border-deep-purple p-1"
            />
          </div>
          <div className="flex-grow">
            <div className="flex items-center mb-3">
              <h1 className="text-2xl sm:text-3xl font-light text-gray-800 mr-4">{userProfile.username}</h1>
              <button className="bg-deep-purple text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-purple-700 transition">
                Follow
              </button>
              <button className="ml-auto text-gray-600 hover:text-deep-purple">
                <FiSettings size={24} />
              </button>
            </div>
            {/* Profile Stats */}
            <div className="flex space-x-6 mb-4">
              <p><span className="font-semibold">{userProfile.postCount}</span> posts</p>
              <p><span className="font-semibold">{userProfile.followerCount}</span> followers</p>
              <p><span className="font-semibold">{userProfile.followingCount}</span> following</p>
            </div>
            {/* Bio */}
            <div>
              <p className="font-semibold text-gray-900">{userProfile.fullName}</p>
              <p className="text-gray-700 whitespace-pre-line">{userProfile.bio}</p>
              <a href="#" className="text-deep-purple font-semibold hover:underline">
                {userProfile.website}
              </a>
            </div>
          </div>
        </header>

        {/* Profile Tabs */}
        <div className="border-t border-gray-300">
          <div className="flex justify-center -mt-px">
            <button className="flex items-center gap-2 px-6 py-3 text-deep-purple border-t-2 border-deep-purple font-semibold text-sm">
              <BsGrid3X3 /> POSTS
            </button>
            <button className="flex items-center gap-2 px-6 py-3 text-gray-500 font-semibold text-sm">
              <BsBookmark /> SAVED
            </button>
            <button className="flex items-center gap-2 px-6 py-3 text-gray-500 font-semibold text-sm">
              <BsPersonSquare /> TAGGED
            </button>
          </div>
        </div>

        {/* Post Grid */}
        <div className="grid grid-cols-3 gap-1 sm:gap-4">
          {userProfile.posts.map((post) => (
            <div key={post.id} className="relative group aspect-square">
              <img src={post.imageUrl} alt={`Post ${post.id}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition flex items-center justify-center gap-4 text-white text-lg font-semibold opacity-0 group-hover:opacity-100">
                <span>❤️ {post.likes}</span>
                <span>💬 {post.comments}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;