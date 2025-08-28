import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { BsHeart, BsChatDots, BsPlayCircle, BsShare, BsBookmark, BsMusicNote, BsGeoAlt, BsThreeDots } from 'react-icons/bs';
import { MdVerified } from 'react-icons/md';

const TrendingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('trending');
  const { posts, users } = useData();



  const trendingTopics = [
    { name: "#CoffeeArt", posts: 1247, trend: "rising" },
    { name: "#HikingAdventure", posts: 892, trend: "hot" },
    { name: "#CookingHacks", posts: 2156, trend: "viral" },
    { name: "#TechTrends", posts: 567, trend: "rising" },
    { name: "#FitnessGoals", posts: 1345, trend: "hot" },
    { name: "#TravelInspo", posts: 987, trend: "rising" }
  ];

  const trendingVideos = [
    { id: 1, title: "Amazing Coffee Art", views: "2.4M", duration: "0:45", thumbnail: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=200&fit=crop" },
    { id: 2, title: "Hiking Adventure", views: "1.8M", duration: "1:23", thumbnail: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=300&h=200&fit=crop" },
    { id: 3, title: "Cooking Masterclass", views: "3.1M", duration: "2:15", thumbnail: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300&h=200&fit=crop" }
  ];

  const trendingMusic = [
    { id: 1, title: "Coffee Shop Vibes", artist: "LoFi Beats", plays: "1.2M", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop" },
    { id: 2, title: "Mountain Wind", artist: "Nature Sounds", plays: "890K", cover: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop" },
    { id: 3, title: "Kitchen Rhythm", artist: "Cooking Sounds", plays: "2.1M", cover: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=100&h=100&fit=crop" }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
             case 'trending':
         return (
           <div className="space-y-4 sm:space-y-6">
             {/* Trending Posts */}
             <div className="space-y-4 sm:space-y-6">
               {posts.map((post) => {
                 const user = users.find(u => u.id === post.userId);
                 if (!user) return null;
                 
                 return (
                <div key={post.id} className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  {/* Post Header */}
                  <div className="p-3 sm:p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3 min-w-0">
                      <img 
                        src={user.avatar} 
                        alt={`${user.name}'s avatar`} 
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-gray-900 text-sm sm:text-base truncate">{user.name}</span>
                          {user.verified && <MdVerified className="text-blue-500 flex-shrink-0" size={16} />}
                        </div>
                        <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-500">
                          <span className="truncate">@{user.username}</span>
                          <span>•</span>
                          <span className="truncate">{post.timestamp}</span>
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
                      <button className="flex items-center gap-1.5 sm:gap-2 text-gray-500 hover:text-red-500 transition-colors">
                        <BsHeart size={18} className="sm:w-5 sm:h-5" />
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
                    <button className="p-2 text-gray-400 hover:text-purple-500 hover:bg-purple-50 rounded-lg transition-colors">
                      <BsBookmark size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </button>
                  </div>
                </div>
               );
             })}
           </div>
         </div>
       );

      case 'topics':
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Trending Topics</h3>
              <div className="grid gap-3 sm:gap-4">
                {trendingTopics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{topic.name}</p>
                      <p className="text-xs sm:text-sm text-gray-500">{topic.posts.toLocaleString()} posts</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        topic.trend === 'viral' ? 'bg-red-100 text-red-700' :
                        topic.trend === 'hot' ? 'bg-orange-100 text-orange-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {topic.trend === 'viral' ? '🔥 Viral' : topic.trend === 'hot' ? '🔥 Hot' : '📈 Rising'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'videos':
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Trending Videos</h3>
              <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {trendingVideos.map((video) => (
                  <div key={video.id} className="group cursor-pointer">
                    <div className="relative rounded-lg overflow-hidden mb-3">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title} 
                        className="w-full h-32 sm:h-40 object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                      <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/90 rounded-full flex items-center justify-center">
                          <BsPlayCircle size={24} className="text-gray-900 ml-1" />
                        </div>
                      </button>
                    </div>
                    <h4 className="font-medium text-gray-900 text-sm sm:text-base mb-1 truncate">{video.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-500">{video.views} views</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'music':
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Trending Music</h3>
              <div className="space-y-3 sm:space-y-4">
                {trendingMusic.map((track) => (
                  <div key={track.id} className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <img 
                      src={track.cover} 
                      alt={track.title} 
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 text-sm sm:text-base truncate">{track.title}</h4>
                      <p className="text-xs sm:text-sm text-gray-500 truncate">{track.artist}</p>
                      <p className="text-xs text-gray-400">{track.plays} plays</p>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-purple-500 hover:bg-purple-50 rounded-lg transition-colors flex-shrink-0">
                      <BsPlayCircle size={20} className="sm:w-6 sm:h-6" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
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
              { id: 'trending', label: 'Trending' },
              { id: 'topics', label: 'Topics' },
              { id: 'videos', label: 'Videos' },
              { id: 'music', label: 'Music' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-6 py-2 sm:py-3 text-sm font-medium transition-colors flex-shrink-0 ${
                  activeTab === tab.id
                    ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
};

export default TrendingPage;
