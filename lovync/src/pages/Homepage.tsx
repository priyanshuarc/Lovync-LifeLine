// src/components/Homepage.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  BsHeart, 
  BsChatDots,
  BsPlayCircle,
  BsCamera,
  BsEmojiSmile,
  BsGeoAlt,
  BsThreeDots,
  BsShare,
  BsBookmark,
  BsMusicNote
} from 'react-icons/bs';
import { FiHome, FiMessageCircle, FiTrendingUp } from 'react-icons/fi';
import { MdVerified } from 'react-icons/md';

const Homepage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [newPostContent, setNewPostContent] = useState('');
  const [isLiked, setIsLiked] = useState<{[key: number]: boolean}>({});
  const [isBookmarked, setIsBookmarked] = useState<{[key: number]: boolean}>({});

  // Enhanced posts data with more realistic content
  const posts = [
    {
      id: 1,
      user: "Sarah Johnson",
      username: "@sarah_j",
      verified: true,
      time: "2h ago",
      content: "Just had the most amazing coffee at this new place downtown! ☕️ The vibe is perfect for studying or catching up with friends. Highly recommend! #CoffeeLover #DowntownVibes",
      likes: 1247,
      comments: 89,
      shares: 23,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop",
      music: "Coffee Shop Vibes - LoFi Beats",
      location: "Downtown Coffee Co."
    },
    {
      id: 2,
      user: "Mike Chen",
      username: "@mike_c",
      verified: false,
      time: "4h ago",
      content: "Weekend hiking adventure complete! 🥾⛰️ Nothing beats the feeling of reaching the summit. The view was absolutely breathtaking! Who wants to join me next weekend? #Hiking #Adventure #WeekendVibes",
      likes: 892,
      comments: 156,
      shares: 45,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=400&fit=crop",
      music: "Mountain Wind - Nature Sounds",
      location: "Mount Wilson Trail"
    },
    {
      id: 3,
      user: "Emma Davis",
      username: "@emma_d",
      verified: true,
      time: "6h ago",
      content: "Trying out a new recipe today! Homemade pasta from scratch 🍝 Wish me luck! Will share the results if it turns out edible 😅 #Cooking #Homemade #Pasta #Foodie",
      likes: 2156,
      comments: 234,
      shares: 67,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=600&h=400&fit=crop",
      music: "Italian Kitchen - Cooking Sounds",
      location: "Home Kitchen"
    },
    {
      id: 4,
      user: "Alex Rivera",
      username: "@alex_r",
      verified: false,
      time: "8h ago",
      content: "Late night coding session! 💻 Building something amazing for Lovync. The creative process is so rewarding when you see your ideas come to life. #Coding #Tech #Innovation #Lovync",
      likes: 567,
      comments: 78,
      shares: 12,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
      music: "Code Flow - Electronic",
      location: "Home Office"
    }
  ];

  const handleLike = (postId: number) => {
    setIsLiked(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleBookmark = (postId: number) => {
    setIsBookmarked(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleCreatePost = () => {
    if (newPostContent.trim()) {
      console.log('Creating post:', newPostContent);
      setNewPostContent('');
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-4 sm:space-y-6">
            {/* Create Post Section */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
              <div className="flex items-start space-x-3">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" 
                  alt="Your avatar" 
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <textarea
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="What's on your mind?"
                    className="w-full p-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                    rows={3}
                  />
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-purple-500 hover:bg-purple-50 rounded-lg transition-colors">
                        <BsCamera size={16} className="sm:w-[18px] sm:h-[18px]" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-purple-500 hover:bg-purple-50 rounded-lg transition-colors">
                        <BsEmojiSmile size={16} className="sm:w-[18px] sm:h-[18px]" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-purple-500 hover:bg-purple-50 rounded-lg transition-colors">
                        <BsGeoAlt size={16} className="sm:w-[18px] sm:h-[18px]" />
                      </button>
                    </div>
                    <button
                      onClick={handleCreatePost}
                      disabled={!newPostContent.trim()}
                      className="px-4 sm:px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Posts Feed */}
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Post Header */}
                <div className="p-3 sm:p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3 min-w-0">
                    <img 
                      src={post.avatar} 
                      alt={`${post.user}'s avatar`} 
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-900 text-sm sm:text-base truncate">{post.user}</span>
                        {post.verified && <MdVerified className="text-blue-500 flex-shrink-0" size={16} />}
                      </div>
                      <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-500">
                        <span className="truncate">{post.username}</span>
                        <span>•</span>
                        <span className="truncate">{post.time}</span>
                        {post.location && (
                          <>
                            <span>•</span>
                            <div className="flex items-center space-x-1 truncate">
                              <BsGeoAlt size={10} className="sm:w-3 sm:h-3 flex-shrink-0" />
                              <span className="truncate">{post.location}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0">
                    <BsThreeDots size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </button>
                </div>

                {/* Post Content */}
                <div className="px-3 sm:px-4 pb-3 sm:pb-4">
                  <p className="text-gray-800 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">{post.content}</p>
                  
                  {/* Post Image */}
                  {post.image && (
                    <div className="relative rounded-lg sm:rounded-xl overflow-hidden mb-3 sm:mb-4">
                      <img 
                        src={post.image} 
                        alt="Post content" 
                        className="w-full h-48 sm:h-64 object-cover"
                      />
                      {post.music && (
                        <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 bg-black/70 backdrop-blur-sm rounded-lg p-2 sm:p-3">
                          <div className="flex items-center gap-2 sm:gap-3 text-white">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <BsMusicNote size={12} className="sm:w-4 sm:h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs sm:text-sm font-medium truncate">{post.music}</p>
                              <p className="text-xs text-gray-300">Original Sound</p>
                            </div>
                            <button className="p-1.5 sm:p-2 hover:bg-white/20 rounded-full transition-colors flex-shrink-0">
                              <BsPlayCircle size={16} className="sm:w-5 sm:h-5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Post Actions */}
                <div className="px-3 sm:px-4 py-2 sm:py-3 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex gap-4 sm:gap-6">
                    <button 
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1.5 sm:gap-2 transition-colors ${
                        isLiked[post.id] ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                      }`}
                    >
                      <BsHeart size={18} className={`sm:w-5 sm:h-5 ${isLiked[post.id] ? 'fill-current' : ''}`} />
                      <span className="text-xs sm:text-sm font-medium">{post.likes.toLocaleString()}</span>
                    </button>
                    <button className="flex items-center gap-1.5 sm:gap-2 text-gray-500 hover:text-blue-500 transition-colors">
                      <BsChatDots size={18} className="sm:w-5 sm:h-5" />
                      <span className="text-xs sm:text-sm font-medium">{post.comments.toLocaleString()}</span>
                    </button>
                    <button className="flex items-center gap-1.5 sm:gap-2 text-gray-500 hover:text-green-500 transition-colors">
                      <BsShare size={16} className="sm:w-[18px] sm:h-[18px]" />
                      <span className="text-xs sm:text-sm font-medium">{post.shares.toLocaleString()}</span>
                    </button>
                  </div>
                  <button 
                    onClick={() => handleBookmark(post.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      isBookmarked[post.id] 
                        ? 'text-purple-500 bg-purple-50' 
                        : 'text-gray-500 hover:text-purple-500 hover:bg-purple-50'
                    }`}
                  >
                    <BsBookmark size={16} className={`sm:w-[18px] sm:h-[18px] ${isBookmarked[post.id] ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        );

      case 'trending':
        return (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 text-center">
            <FiTrendingUp className="w-12 h-12 sm:w-16 sm:h-16 text-purple-500 mx-auto mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Trending Now</h3>
            <p className="text-gray-500 mb-4 sm:mb-6 text-sm sm:text-base">Discover what's hot and trending in your area</p>
            <div className="space-y-2 sm:space-y-3">
              {['#CoffeeVibes', '#WeekendAdventure', '#HomemadePasta', '#CodingLife'].map((trend, index) => (
                <div key={index} className="p-2 sm:p-3 bg-gray-50 rounded-lg text-left">
                  <p className="font-medium text-gray-900 text-sm sm:text-base">{trend}</p>
                  <p className="text-xs sm:text-sm text-gray-500">{Math.floor(Math.random() * 1000) + 100} posts</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'messages':
        return (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 text-center">
            <FiMessageCircle className="w-12 h-12 sm:w-16 sm:h-16 text-purple-500 mx-auto mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Messages</h3>
            <p className="text-gray-500 mb-4 sm:mb-6 text-sm sm:text-base">Your conversations will appear here</p>
            <Link 
              to="/messages"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 text-sm sm:text-base"
            >
              View All Messages
            </Link>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
        {/* Content Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-3 sm:mb-4">
          <div className="flex overflow-x-auto">
            {[
              { id: 'home', label: 'Home', icon: FiHome },
              { id: 'trending', label: 'Trending', icon: FiTrendingUp },
              { id: 'messages', label: 'Messages', icon: FiMessageCircle }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 text-sm font-medium transition-colors flex-shrink-0 ${
                    activeTab === tab.id
                      ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Homepage;