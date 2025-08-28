import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { BsSearch, BsHeart, BsChatDots, BsPersonPlus } from 'react-icons/bs';
import { MdVerified } from 'react-icons/md';
import { FiTrendingUp, FiUsers } from 'react-icons/fi';

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const { users, posts, currentUser } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(users.filter(u => u.id !== currentUser.id));
  const [activeTab, setActiveTab] = useState('users');
  const [filteredPosts, setFilteredPosts] = useState(posts);

  useEffect(() => {
    if (searchQuery.trim()) {
      // Search users
      const userResults = users.filter(user => 
        user.id !== currentUser.id && (
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (user.bio && user.bio.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      );
      setSearchResults(userResults);

      // Search posts
      const postResults = posts.filter(post => 
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPosts(postResults);
    } else {
      setSearchResults(users.filter(u => u.id !== currentUser.id));
      setFilteredPosts(posts);
    }
  }, [searchQuery, users, posts, currentUser.id]);

  const handleUserClick = (username: string) => {
    navigate(`/profile/${username}`);
  };

  const handleFollow = (userId: number) => {
    // This would update the follow status in the data context
    console.log('Follow user:', userId);
  };

  const handleMessage = (userId: number) => {
    // This would navigate to messages with the selected user
    navigate('/messages');
  };

  const renderUsersTab = () => (
    <div className="space-y-3">
      {searchResults.length > 0 ? (
        searchResults.map((user) => (
          <div key={user.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              {/* User Avatar */}
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 cursor-pointer"
                  onClick={() => handleUserClick(user.username)}
                />
                {user.online && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>

              {/* User Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 
                    className="font-semibold text-gray-900 truncate cursor-pointer hover:text-blue-600"
                    onClick={() => handleUserClick(user.username)}
                  >
                    {user.name}
                  </h3>
                  {user.verified && <MdVerified className="text-blue-500 flex-shrink-0" size={16} />}
                </div>
                <p className="text-gray-600 text-sm mb-1">@{user.username}</p>
                {user.bio && (
                  <p className="text-gray-700 text-sm line-clamp-2">{user.bio}</p>
                )}
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                  <span>{user.posts} posts</span>
                  <span>{user.followers.toLocaleString()} followers</span>
                  <span>{user.following} following</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => handleFollow(user.id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm flex items-center space-x-2"
                >
                  <BsPersonPlus size={14} />
                  <span>Follow</span>
                </button>
                <button
                  onClick={() => handleMessage(user.id)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm flex items-center space-x-2"
                >
                  <BsChatDots size={14} />
                  <span>Message</span>
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-12">
          <FiUsers className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
          <p className="text-gray-500">Try adjusting your search terms</p>
        </div>
      )}
    </div>
  );

  const renderPostsTab = () => (
    <div className="space-y-4">
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => {
          const user = users.find(u => u.id === post.userId);
          if (!user) return null;

          return (
            <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Post Header */}
              <div className="p-4 flex items-center space-x-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover cursor-pointer"
                  onClick={() => handleUserClick(user.username)}
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span 
                      className="font-semibold text-gray-900 cursor-pointer hover:text-blue-600"
                      onClick={() => handleUserClick(user.username)}
                    >
                      {user.name}
                    </span>
                    {user.verified && <MdVerified className="text-blue-500" size={14} />}
                  </div>
                  <p className="text-sm text-gray-500">@{user.username} • {post.timestamp}</p>
                </div>
              </div>

              {/* Post Content */}
              <div className="px-4 pb-4">
                <p className="text-gray-800 mb-3">{post.content}</p>
                {post.image && (
                  <img
                    src={post.image}
                    alt="Post content"
                    className="w-full rounded-lg object-cover max-h-96"
                  />
                )}
              </div>

              {/* Post Actions */}
              <div className="px-4 py-3 border-t border-gray-100 flex items-center space-x-6">
                <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors">
                  <BsHeart size={16} />
                  <span className="text-sm">{post.likes.toLocaleString()}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                  <BsChatDots size={16} />
                  <span className="text-sm">{post.comments.toLocaleString()}</span>
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center py-12">
          <FiTrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
          <p className="text-gray-500">Try adjusting your search terms</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-xl font-bold text-gray-900">Search</h1>
          <p className="text-gray-600 mt-1 text-sm">Find people and discover content</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        {/* Search Bar */}
        <div className="relative mb-6">
          <BsSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search for users, posts, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          />
        </div>

        {/* Search Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="flex">
            <button
              onClick={() => setActiveTab('users')}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors border-b-2 ${
                activeTab === 'users'
                  ? 'text-blue-600 border-blue-600 bg-blue-50'
                  : 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <FiUsers size={16} />
                <span>Users ({searchResults.length})</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('posts')}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors border-b-2 ${
                activeTab === 'posts'
                  ? 'text-blue-600 border-blue-600 bg-blue-50'
                  : 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <FiTrendingUp size={16} />
                <span>Posts ({filteredPosts.length})</span>
              </div>
            </button>
          </div>
        </div>

        {/* Search Results */}
        <div className="min-h-96">
          {activeTab === 'users' ? renderUsersTab() : renderPostsTab()}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

