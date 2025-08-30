// src/pages/Homepage.tsx
import React, { useState } from "react";
import { 
  BsHeart, 
  BsChatDots,
  BsShare,
  BsBookmark,
  BsThreeDots,
  BsSearch,
  BsBell,
  BsEye,
  BsPlay
} from 'react-icons/bs';
import { FiUser } from 'react-icons/fi';
import { MdVerified } from 'react-icons/md';

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
  location?: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  count: number;
}

const Homepage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<string>>(new Set());

  // Sample data
  const categories: Category[] = [
    { id: 'all', name: 'All', icon: '🌟', color: 'from-purple-500 to-pink-500', count: 0 },
    { id: 'tech', name: 'Technology', icon: '💻', color: 'from-blue-500 to-cyan-500', count: 1247 },
    { id: 'lifestyle', name: 'Lifestyle', icon: '✨', color: 'from-pink-500 to-rose-500', count: 892 },
    { id: 'creative', name: 'Creative', icon: '🎨', color: 'from-orange-500 to-yellow-500', count: 2156 },
    { id: 'business', name: 'Business', icon: '💼', color: 'from-green-500 to-emerald-500', count: 567 },
    { id: 'health', name: 'Health', icon: '🏃‍♀️', color: 'from-red-500 to-pink-500', count: 1342 }
  ];

  const featuredContent: Content[] = [
    {
      id: '1',
      type: 'post',
      user: {
        id: 'u1',
        name: 'Alex Chen',
        username: '@alexchen',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        verified: true,
        followers: 15420
      },
      timestamp: '2 hours ago',
      text: 'Just launched our new AI-powered design tool! 🚀 The future of creative work is here. What do you think about AI in design?',
      media: {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop'
      },
      stats: { views: 1247, likes: 89, comments: 23, shares: 12 },
      tags: ['AI', 'Design', 'Innovation', 'Tech'],
      location: 'San Francisco, CA'
    },
    {
      id: '2',
      type: 'post',
      user: {
        id: 'u2',
        name: 'Sarah Kim',
        username: '@sarahkim',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        verified: false,
        followers: 8920
      },
      timestamp: '4 hours ago',
      text: 'Morning routine that changed my life: 1. Cold shower 2. Meditation 3. Journaling 4. Exercise. Consistency is key! 💪',
      media: {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop'
      },
      stats: { views: 892, likes: 156, comments: 45, shares: 23 },
      tags: ['MorningRoutine', 'Wellness', 'SelfCare', 'Motivation'],
      location: 'New York, NY'
    },
    {
      id: '3',
      type: 'post',
      user: {
        id: 'u3',
        name: 'Mike Rodriguez',
        username: '@mikerod',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        verified: true,
        followers: 23450
      },
      timestamp: '6 hours ago',
      text: 'Building something amazing with the team today! Collaboration + creativity = magic ✨ What are you working on?',
      stats: { views: 2156, likes: 234, comments: 67, shares: 34 },
      tags: ['Teamwork', 'Creativity', 'Innovation', 'Collaboration']
    }
  ];

  // Event handlers
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

  // Render functions
  const renderHeader = () => (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Lovync
            </h1>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <BsSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for people, topics, or content..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
              <BsBell size={20} />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
              <FiUser size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );

  const renderCategories = () => (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-4 py-4 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span>{category.name}</span>
              {category.count > 0 && (
                <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">
                  {category.count.toLocaleString()}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContentCard = (content: Content) => (
    <div key={content.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200">
      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={content.user.avatar}
            alt={content.user.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-900">{content.user.name}</span>
              {content.user.verified && <MdVerified className="text-blue-500" size={18} />}
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>{content.user.username}</span>
              <span>•</span>
              <span>{content.timestamp}</span>
              {content.location && (
                <>
                  <span>•</span>
                  <span>{content.location}</span>
                </>
              )}
            </div>
          </div>
        </div>
        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
          <BsThreeDots size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="px-6 pb-4">
        {content.text && (
          <p className="text-gray-800 text-base leading-relaxed mb-4">{content.text}</p>
        )}

        {content.media && (
          <div className="relative rounded-xl overflow-hidden mb-4">
            <img
              src={content.media.type === 'video' ? content.media.thumbnail || content.media.url : content.media.url}
              alt="Content media"
              className="w-full h-80 object-cover"
            />
            {content.media.type === 'video' && (
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <button className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                  <BsPlay size={24} className="text-gray-800 ml-1" />
                </button>
              </div>
            )}
            {content.media.duration && (
              <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2 py-1 rounded-lg text-sm">
                {content.media.duration}
              </div>
            )}
          </div>
        )}

        {/* Tags */}
        {content.tags && content.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {content.tags.map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-purple-50 text-purple-700 text-sm rounded-full font-medium">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Stats and Actions */}
      <div className="px-6 py-4 border-t border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <span className="flex items-center space-x-1">
              <BsEye size={16} />
              <span>{content.stats.views.toLocaleString()}</span>
            </span>
            <span className="flex items-center space-x-1">
              <BsHeart size={16} />
              <span>{content.stats.likes.toLocaleString()}</span>
            </span>
            <span className="flex items-center space-x-1">
              <BsChatDots size={16} />
              <span>{content.stats.comments.toLocaleString()}</span>
            </span>
            <span className="flex items-center space-x-1">
              <BsShare size={16} />
              <span>{content.stats.shares.toLocaleString()}</span>
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex space-x-4">
            <button
              onClick={() => handleLike(content.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                likedPosts.has(content.id)
                  ? 'text-red-500 bg-red-50'
                  : 'text-gray-500 hover:text-red-500 hover:bg-red-50'
              }`}
            >
              <BsHeart size={16} className={likedPosts.has(content.id) ? 'fill-current' : ''} />
              <span>Like</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-500 hover:text-blue-500 hover:bg-blue-50 transition-colors">
              <BsChatDots size={16} />
              <span>Comment</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-500 hover:text-green-500 hover:bg-green-50 transition-colors">
              <BsShare size={16} />
              <span>Share</span>
            </button>
          </div>
          <button
            onClick={() => handleBookmark(content.id)}
            className={`p-2 rounded-lg transition-colors ${
              bookmarkedPosts.has(content.id)
                ? 'text-purple-500 bg-purple-50'
                : 'text-gray-500 hover:text-purple-500 hover:bg-purple-50'
            }`}
          >
            <BsBookmark size={16} className={bookmarkedPosts.has(content.id) ? 'fill-current' : ''} />
          </button>
        </div>
      </div>
    </div>
  );

  const renderMainContent = () => (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {featuredContent.map(renderContentCard)}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {renderHeader()}
      {renderCategories()}
      {renderMainContent()}
    </div>
  );
};

export default Homepage;
