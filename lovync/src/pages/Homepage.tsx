// src/pages/Homepage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BsHeart, 
  BsChatDots,
  BsShare,
  BsBookmark,
  BsPlay,
  BsFire,
  BsClock,
  BsPersonPlus,
  BsEye
} from 'react-icons/bs';
import { MdVerified, MdTrendingUp } from 'react-icons/md';
import GoldenVerifiedBadge from '../components/GoldenVerifiedBadge';
import { FiTrendingUp, FiUsers, FiCompass } from 'react-icons/fi';

// Clean, well-structured interfaces
interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  verified: boolean;
  followers: number;
}

interface Content {
  id: string;
  type: 'post' | 'story' | 'highlight';
  user: User;
  timestamp: string;
  text?: string;
  media?: {
    type: 'image' | 'video';
    url: string;
    thumbnail?: string;
    duration?: string;
  };
  stats: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
  };
  tags?: string[];
  category: string;
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  count: number;
}

const Homepage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<'trending' | 'following' | 'discover'>('trending');

  // Enhanced sample data with better structure
  const categories: Category[] = [
    { id: 'all', name: 'All', icon: <FiCompass size={20} />, color: 'from-blue-500 to-purple-600', count: 1250 },
    { id: 'technology', name: 'Technology', icon: <BsFire size={20} />, color: 'from-red-500 to-orange-500', count: 342 },
    { id: 'lifestyle', name: 'Lifestyle', icon: <FiUsers size={20} />, color: 'from-green-500 to-emerald-500', count: 289 },
    { id: 'creative', name: 'Creative', icon: <MdTrendingUp size={20} />, color: 'from-purple-500 to-pink-500', count: 156 },
    { id: 'business', name: 'Business', icon: <FiTrendingUp size={20} />, color: 'from-indigo-500 to-blue-500', count: 203 }
  ];

  const featuredContent: Content[] = [
    {
      id: '1',
      type: 'post',
      user: {
        id: '1',
        name: 'Priyanshu Pandey',
        username: 'priyanshu_pandey',
        avatar: '/logo.svg',
        verified: true,
        followers: 15000
      },
      timestamp: '2 hours ago',
      text: 'As CEO & Founder of Lovync, I\'m proud to announce our revolutionary social platform! The future of meaningful connections is here 🚀 #Lovync #CEO #Innovation',
      media: {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'
      },
      stats: {
        views: 15420,
        likes: 1247,
        comments: 89,
        shares: 156
      },
      tags: ['#TechLaunch', '#Innovation', '#UI/UX'],
      category: 'technology'
    },
    {
      id: '2',
      type: 'post',
      user: {
        id: '2',
        name: 'Emma Wilson',
        username: 'emma_wilson',
        avatar: 'https://i.pravatar.cc/150?u=emma_wilson',
        verified: false,
        followers: 2156
      },
      timestamp: '4 hours ago',
      text: 'Beautiful sunset at the beach today! Sometimes you just need to disconnect and enjoy nature. 🌅',
      media: {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
      },
      stats: {
        views: 8920,
        likes: 567,
        comments: 34,
        shares: 78
      },
      tags: ['#Sunset', '#Beach', '#Nature'],
      category: 'lifestyle'
    },
    {
      id: '3',
      type: 'post',
      user: {
        id: '3',
        name: 'Alex Chen',
        username: 'alex_chen',
        avatar: 'https://i.pravatar.cc/150?u=alex_chen',
        verified: true,
        followers: 5678
      },
      timestamp: '6 hours ago',
      text: 'New tutorial video is up! Learn how to build a modern web app with React and TypeScript. Link in bio! 💻',
      media: {
        type: 'video',
        url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
        duration: '12:34'
      },
      stats: {
        views: 23450,
        likes: 1890,
        comments: 156,
        shares: 234
      },
      tags: ['#React', '#TypeScript', '#WebDev'],
      category: 'technology'
    },
    {
      id: '4',
      type: 'post',
      user: {
        id: '4',
        name: 'Sarah Johnson',
        username: 'sarah_j',
        avatar: 'https://i.pravatar.cc/150?u=sarah_j',
        verified: false,
        followers: 3421
      },
      timestamp: '1 day ago',
      text: 'Finished reading this amazing book! Highly recommend for anyone interested in personal development. 📚',
      media: {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=600&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop'
      },
      stats: {
        views: 5670,
        likes: 423,
        comments: 28,
        shares: 45
      },
      tags: ['#Books', '#Reading', '#PersonalGrowth'],
      category: 'lifestyle'
    },
    {
      id: '5',
      type: 'post',
      user: {
        id: '5',
        name: 'Mike Rodriguez',
        username: 'mike_rod',
        avatar: 'https://i.pravatar.cc/150?u=mike_rod',
        verified: true,
        followers: 7890
      },
      timestamp: '2 days ago',
      text: 'Excited to announce our new partnership! This is going to revolutionize how we approach digital marketing. 🚀',
      media: {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop'
      },
      stats: {
        views: 18920,
        likes: 1456,
        comments: 89,
        shares: 234
      },
      tags: ['#Partnership', '#DigitalMarketing', '#Innovation'],
      category: 'business'
    }
  ];

  const handleLike = (postId: string) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleBookmark = (postId: string) => {
    setBookmarkedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleShare = (postId: string) => {
    console.log('Sharing post:', postId);
  };

  const handleComment = (postId: string) => {
    console.log('Commenting on post:', postId);
  };

  const handleUserClick = (username: string) => {
    navigate(`/profile/${username}`);
  };

  const renderCategories = () => (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-4 sm:mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Explore Categories</h2>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View All
        </button>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`group relative p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 ${
              selectedCategory === category.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center text-white mb-2 sm:mb-3 mx-auto group-hover:scale-110 transition-transform duration-200`}>
              {category.icon}
            </div>
            <h3 className="font-medium text-gray-900 text-xs sm:text-sm mb-1">{category.name}</h3>
            <p className="text-xs text-gray-500">{category.count} posts</p>
          </button>
        ))}
      </div>
    </div>
  );

  const renderContentCard = (content: Content) => (
    <div key={content.id} className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-200 mb-4 sm:mb-6">
      {/* Post Header */}
      <div className="p-3 sm:p-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div 
            className="flex items-center gap-3 flex-1 cursor-pointer"
            onClick={() => handleUserClick(content.user.username)}
          >
            <img
              src={content.user.avatar}
              alt={content.user.name}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 
                  className="font-semibold text-gray-900 truncate cursor-pointer hover:text-blue-600 transition-colors text-sm sm:text-base"
                >
                  {content.user.name}
                </h3>
                {content.user.verified && content.user.id === '1' ? (
                  <GoldenVerifiedBadge size={16} />
                ) : content.user.verified ? (
                  <MdVerified className="text-purple-400 flex-shrink-0" size={16} />
                ) : null}
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                <span>@{content.user.username}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <BsClock size={12} />
                  {content.timestamp}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Post Content */}
      {content.text && (
        <div className="px-3 sm:px-4 py-2 sm:py-3">
          <p className="text-sm sm:text-base text-gray-800 leading-relaxed">{content.text}</p>
          {content.tags && (
            <div className="flex flex-wrap gap-2 mt-2 sm:mt-3">
              {content.tags.map((tag, index) => (
                <span key={index} className="text-blue-600 text-xs sm:text-sm hover:underline cursor-pointer">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Media Content */}
      {content.media && (
        <div className="relative">
          {content.media.type === 'image' ? (
            <img
              src={content.media.url}
              alt="Post content"
              className="w-full h-auto object-cover"
            />
          ) : (
            <div className="relative">
              <img
                src={content.media.thumbnail}
                alt="Video thumbnail"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="bg-white/90 rounded-full p-3 sm:p-4">
                  <BsPlay size={20} className="text-gray-900 ml-1" />
                </div>
              </div>
              {content.media.duration && (
                <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 bg-black/80 text-white px-2 py-1 rounded text-xs">
                  {content.media.duration}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Post Stats */}
      <div className="px-3 sm:px-4 py-2 sm:py-3 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="flex items-center gap-1">
              <BsPlay size={12} className="sm:hidden" />
              <BsEye size={14} className="hidden sm:block" />
              {content.stats.views.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <BsPersonPlus size={12} className="sm:hidden" />
              <BsPersonPlus size={14} className="hidden sm:block" />
              {content.user.followers.toLocaleString()}
            </span>
          </div>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
            {content.category}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => handleLike(content.id)}
              className={`flex items-center gap-2 p-2 rounded-xl transition-colors ${
                likedPosts.has(content.id)
                  ? 'text-red-500 bg-red-50'
                  : 'text-gray-500 hover:text-red-500 hover:bg-red-50'
              }`}
            >
              <BsHeart size={16} className={likedPosts.has(content.id) ? 'fill-current' : ''} />
              <span className="text-xs sm:text-sm font-medium hidden sm:inline">{content.stats.likes.toLocaleString()}</span>
            </button>

            <button
              onClick={() => handleComment(content.id)}
              className="flex items-center gap-2 p-2 rounded-xl text-gray-500 hover:text-blue-500 hover:bg-blue-50 transition-colors"
            >
              <BsChatDots size={16} />
              <span className="text-xs sm:text-sm font-medium hidden sm:inline">{content.stats.comments.toLocaleString()}</span>
            </button>

            <button
              onClick={() => handleShare(content.id)}
              className="flex items-center gap-2 p-2 rounded-xl text-gray-500 hover:text-green-500 hover:bg-green-50 transition-colors"
            >
              <BsShare size={16} />
              <span className="text-xs sm:text-sm font-medium hidden sm:inline">{content.stats.shares.toLocaleString()}</span>
            </button>
          </div>

          <button
            onClick={() => handleBookmark(content.id)}
            className={`p-2 rounded-xl transition-colors ${
              bookmarkedPosts.has(content.id)
                ? 'text-blue-500 bg-blue-50'
                : 'text-gray-500 hover:text-blue-500 hover:bg-blue-50'
            }`}
          >
            <BsBookmark size={16} className={bookmarkedPosts.has(content.id) ? 'fill-current' : ''} />
          </button>
        </div>
      </div>
    </div>
  );

  const renderMainContent = () => (
    <div className="space-y-4 sm:space-y-6">
      {featuredContent
        .filter(content => selectedCategory === 'all' || content.category === selectedCategory)
        .map(renderContentCard)
      }
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'trending':
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-orange-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <BsFire className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">Trending Now</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Discover what's hot in your network</p>
                </div>
              </div>
            </div>
            {renderMainContent()}
          </div>
        );
      case 'following':
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <FiUsers className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">Following Feed</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Latest updates from people you follow</p>
                </div>
              </div>
            </div>
            {renderMainContent()}
          </div>
        );
      case 'discover':
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-green-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <FiCompass className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">Discover</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Find new content and creators</p>
                </div>
              </div>
            </div>
            {renderMainContent()}
          </div>
        );
      default:
        return renderMainContent();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Content Tabs - Mobile Optimized */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-3 sm:px-4">
          <div className="flex space-x-4 sm:space-x-8 overflow-x-auto">
            {[
              { id: 'trending', label: 'Trending', icon: <BsFire size={16} className="sm:hidden" /> },
              { id: 'following', label: 'Following', icon: <FiUsers size={16} className="sm:hidden" /> },
              { id: 'discover', label: 'Discover', icon: <FiCompass size={16} className="sm:hidden" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-3 sm:py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area - Mobile Optimized */}
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {renderCategories()}
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Homepage;
