import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { BsHeart, BsChatDots, BsPlayCircle, BsShare, BsFire, BsStar, BsEye } from 'react-icons/bs';
import { MdVerified, MdTrendingUp, MdExplore } from 'react-icons/md';
import { FiTrendingUp, FiUsers, FiCompass } from 'react-icons/fi';

const ExplorePage: React.FC = () => {
  const navigate = useNavigate();
  const { posts, users, currentUser } = useData();
  const [activeTab, setActiveTab] = useState('discover');

  // Filter out current user's posts for discovery
  const discoverPosts = posts.filter(post => post.userId !== currentUser.id);
  const otherUsers = users.filter(user => user.id !== currentUser.id);

  const trendingTopics = [
    { name: "#LovyncLife", posts: 1247, trend: "viral", color: "from-pink-500 to-purple-500" },
    { name: "#DigitalLove", posts: 892, trend: "hot", color: "from-red-500 to-pink-500" },
    { name: "#TechConnections", posts: 2156, trend: "rising", color: "from-blue-500 to-cyan-500" },
    { name: "#InnovationHub", posts: 567, trend: "trending", color: "from-green-500 to-blue-500" },
    { name: "#CreativeMinds", posts: 1345, trend: "hot", color: "from-yellow-500 to-orange-500" },
    { name: "#FutureOfLove", posts: 987, trend: "rising", color: "from-purple-500 to-indigo-500" }
  ];

  const recommendedUsers = otherUsers.slice(0, 6);

  const handleUserClick = (username: string) => {
    navigate(`/profile/${username}`);
  };

  const handlePostClick = (postId: number) => {
    console.log('Post clicked:', postId);
  };

  const renderDiscoverTab = () => (
    <div className="space-y-6">
      {/* Featured Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <MdExplore size={24} />
          <h2 className="text-xl font-bold">Discover Amazing Content</h2>
        </div>
        <p className="text-purple-100 mb-4">
          Explore posts from creators around the world and discover new connections
        </p>
        <div className="flex items-center space-x-4 text-sm">
          <span className="flex items-center space-x-1">
            <BsEye size={16} />
            <span>{discoverPosts.length} posts to explore</span>
          </span>
          <span className="flex items-center space-x-1">
            <FiUsers size={16} />
            <span>{otherUsers.length} creators</span>
          </span>
        </div>
      </div>

      {/* Trending Topics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <BsFire className="text-orange-500" size={20} />
          <h3 className="text-lg font-semibold text-gray-900">Trending Topics</h3>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {trendingTopics.map((topic, index) => (
            <div key={index} className="group cursor-pointer">
              <div className={`bg-gradient-to-r ${topic.color} p-4 rounded-xl text-white hover:scale-105 transition-transform duration-200`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{topic.name}</span>
                  <span className="text-xs opacity-80">
                    {topic.trend === 'viral' ? '🔥' : topic.trend === 'hot' ? '⚡' : topic.trend === 'rising' ? '📈' : '⭐'}
                  </span>
                </div>
                <p className="text-sm opacity-90">{topic.posts.toLocaleString()} posts</p>
                <div className="mt-2 text-xs opacity-75 capitalize">{topic.trend}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Creators */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <BsStar className="text-yellow-500" size={20} />
          <h3 className="text-lg font-semibold text-gray-900">Recommended Creators</h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recommendedUsers.map((user) => (
            <div key={user.id} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => handleUserClick(user.username)}>
              <div className="flex items-center space-x-3 mb-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-gray-900 truncate">{user.name}</h4>
                    {user.verified && <MdVerified className="text-blue-500 flex-shrink-0" size={14} />}
                  </div>
                  <p className="text-sm text-gray-600">@{user.username}</p>
                </div>
              </div>
              {user.bio && (
                <p className="text-sm text-gray-700 mb-3 line-clamp-2">{user.bio}</p>
              )}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{user.posts} posts</span>
                <span>{user.followers.toLocaleString()} followers</span>
                <span className={`w-2 h-2 rounded-full ${user.online ? 'bg-green-500' : 'bg-gray-400'}`}></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Discover Posts Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <FiCompass className="text-blue-500" size={20} />
          <h3 className="text-lg font-semibold text-gray-900">Discover Posts</h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {discoverPosts.slice(0, 6).map((post) => {
            const user = users.find(u => u.id === post.userId);
            if (!user) return null;

            return (
              <div key={post.id} className="group cursor-pointer" onClick={() => handlePostClick(post.id)}>
                <div className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                  {post.image && (
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={post.image}
                        alt="Post content"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      {post.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <BsPlayCircle size={32} className="text-white" />
                        </div>
                      )}
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-sm font-medium text-gray-900">{user.name}</span>
                      {user.verified && <MdVerified className="text-blue-500" size={12} />}
                    </div>
                    <p className="text-sm text-gray-700 line-clamp-2 mb-3">{post.content}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center space-x-1">
                        <BsHeart size={12} />
                        <span>{post.likes.toLocaleString()}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <BsChatDots size={12} />
                        <span>{post.comments.toLocaleString()}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <BsShare size={12} />
                        <span>{post.shares.toLocaleString()}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderTrendingTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <MdTrendingUp className="text-green-500" size={20} />
          <h3 className="text-lg font-semibold text-gray-900">Trending Now</h3>
        </div>
        <p className="text-gray-600 mb-4">Discover what's trending across the platform</p>
        <div className="grid gap-4">
          {discoverPosts.slice(0, 5).map((post) => {
            const user = users.find(u => u.id === post.userId);
            if (!user) return null;

            return (
              <div key={post.id} className="border border-gray-200 rounded-xl p-4 hover:border-purple-300 transition-colors">
                <div className="flex items-start space-x-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold text-gray-900">{user.name}</span>
                      {user.verified && <MdVerified className="text-blue-500" size={14} />}
                      <span className="text-xs text-gray-500">@{user.username}</span>
                    </div>
                    <p className="text-gray-700 mb-2">{post.content}</p>
                    {post.image && (
                      <img
                        src={post.image}
                        alt="Post content"
                        className="w-full rounded-lg object-cover max-h-48 mb-2"
                      />
                    )}
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center space-x-1">
                        <BsHeart size={14} />
                        <span>{post.likes.toLocaleString()}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <BsChatDots size={14} />
                        <span>{post.comments.toLocaleString()}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <BsShare size={14} />
                        <span>{post.shares.toLocaleString()}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderCreatorsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <FiUsers className="text-purple-500" size={20} />
          <h3 className="text-lg font-semibold text-gray-900">Top Creators</h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {otherUsers.map((user) => (
            <div key={user.id} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => handleUserClick(user.username)}>
              <div className="text-center">
                <div className="relative inline-block mb-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  {user.online && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <h4 className="font-semibold text-gray-900">{user.name}</h4>
                  {user.verified && <MdVerified className="text-blue-500" size={16} />}
                </div>
                <p className="text-sm text-gray-600 mb-3">@{user.username}</p>
                {user.bio && (
                  <p className="text-sm text-gray-700 mb-3 line-clamp-2">{user.bio}</p>
                )}
                <div className="grid grid-cols-3 gap-2 text-xs text-gray-500">
                  <div>
                    <div className="font-semibold text-gray-900">{user.posts}</div>
                    <div>Posts</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{user.followers.toLocaleString()}</div>
                    <div>Followers</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{user.following}</div>
                    <div>Following</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-xl font-bold text-gray-900">Explore</h1>
          <p className="text-gray-600 mt-1 text-sm">Discover amazing content and creators</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        {/* Content Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="flex">
            <button
              onClick={() => setActiveTab('discover')}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors border-b-2 ${
                activeTab === 'discover'
                  ? 'text-purple-600 border-purple-600 bg-purple-50'
                  : 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <FiCompass size={16} />
                <span>Discover</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('trending')}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors border-b-2 ${
                activeTab === 'trending'
                  ? 'text-purple-600 border-purple-600 bg-purple-50'
                  : 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <FiTrendingUp size={16} />
                <span>Trending</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('creators')}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors border-b-2 ${
                activeTab === 'creators'
                  ? 'text-purple-600 border-purple-600 bg-purple-50'
                  : 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <FiUsers size={16} />
                <span>Creators</span>
              </div>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-96">
          {activeTab === 'discover' && renderDiscoverTab()}
          {activeTab === 'trending' && renderTrendingTab()}
          {activeTab === 'creators' && renderCreatorsTab()}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
