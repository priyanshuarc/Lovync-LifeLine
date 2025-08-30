// src/pages/TrendingPage.tsx
import React, { useState } from 'react';
import { 
  BsFire, 
  BsClock, 
  BsEye, 
  BsStar,
  BsRocket,
  BsGlobe,
  BsGraphUp
} from 'react-icons/bs';
import { FiTrendingUp, FiBarChart2 } from 'react-icons/fi';
import { MdInsights } from 'react-icons/md';

const TrendingPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'overview' | 'posts' | 'topics' | 'creators' | 'insights'>('overview');
  const [selectedTimeframe, setSelectedTimeframe] = useState<'24h' | '7d' | '30d'>('24h');

  // Premium trending data with professional metrics
  const trendingTopics = [
    { 
      id: '1', 
      name: 'AI Art Revolution', 
      category: 'Technology', 
      posts: 12470, 
      growth: 456, 
      trend: 'viral', 
      icon: 'AI',
      momentum: 98.7,
      reach: '2.4M',
      engagement: 89.2,
      virality: 'Viral'
    },
    { 
      id: '2', 
      name: 'Sustainable Living', 
      category: 'Lifestyle', 
      posts: 8920, 
      growth: 234, 
      trend: 'hot', 
      icon: 'SL',
      momentum: 87.3,
      reach: '1.8M',
      engagement: 76.8,
      virality: 'Hot'
    },
    { 
      id: '3', 
      name: 'Mental Health Awareness', 
      category: 'Health', 
      posts: 15670, 
      growth: 345, 
      trend: 'rising', 
      icon: 'MH',
      momentum: 92.1,
      reach: '3.1M',
      engagement: 94.5,
      virality: 'Rising'
    },
    { 
      id: '4', 
      name: 'Remote Work Culture', 
      category: 'Business', 
      posts: 6780, 
      growth: 123, 
      trend: 'trending', 
      icon: 'RW',
      momentum: 78.9,
      reach: '1.2M',
      engagement: 82.3,
      virality: 'Trending'
    }
  ];

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Premium Header Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">Trending Analytics</h2>
            <p className="text-slate-300 text-lg">Real-time insights and performance metrics</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-blue-400">2.4M</div>
            <div className="text-slate-300">Total Engagement</div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">+45%</div>
            <div className="text-slate-300 text-sm">Engagement</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">+32%</div>
            <div className="text-slate-300 text-sm">Reach</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">+28%</div>
            <div className="text-slate-300 text-sm">Viral Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400">+41%</div>
            <div className="text-slate-300 text-sm">Momentum</div>
          </div>
        </div>
      </div>

      {/* Premium Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Viral Posts</p>
              <p className="text-3xl font-bold text-gray-900">2.4M</p>
              <p className="text-green-600 text-sm font-medium">+45% today</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <BsFire className="text-red-600 text-xl" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Hot Topics</p>
              <p className="text-3xl font-bold text-gray-900">156</p>
              <p className="text-orange-600 text-sm font-medium">+23% today</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <FiTrendingUp className="text-orange-600 text-xl" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Rising Stars</p>
              <p className="text-3xl font-bold text-gray-900">89</p>
              <p className="text-blue-600 text-sm font-medium">+67% today</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <BsRocket className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Trend Score</p>
              <p className="text-3xl font-bold text-gray-900">94</p>
              <p className="text-purple-600 text-sm font-medium">+12% today</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <BsStar className="text-purple-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Global Trend Map */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
            <BsGlobe className="text-blue-600" />
            Global Trend Distribution
          </h3>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-500">Live Data</span>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['North America', 'Europe', 'Asia', 'Global'].map((region, index) => (
            <div key={region} className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-sm font-bold">{index + 1}</span>
              </div>
              <h4 className="font-semibold text-gray-900 text-sm">{region}</h4>
              <div className="text-xl font-bold text-blue-600 mt-1">+{Math.floor(Math.random() * 40) + 20}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Topics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
            <BsGraphUp className="text-blue-600" />
            Top Trending Topics
          </h3>
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            View All
          </button>
        </div>
        <div className="grid gap-4">
          {trendingTopics.slice(0, 3).map((topic) => (
            <div key={topic.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">{topic.icon}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{topic.name}</h4>
                  <p className="text-sm text-gray-500">{topic.category} • {topic.posts.toLocaleString()} posts</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-400">Momentum: {topic.momentum}%</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-400">Reach: {topic.reach}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  topic.trend === 'viral' ? 'bg-red-100 text-red-700' :
                  topic.trend === 'hot' ? 'bg-orange-100 text-orange-700' :
                  topic.trend === 'rising' ? 'bg-blue-100 text-blue-700' :
                  'bg-purple-100 text-purple-700'
                }`}>
                  {topic.virality}
                </span>
                <span className="text-green-600 text-sm font-medium">+{topic.growth}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTrendingPosts = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Trending Posts</h3>
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <BsFire className="text-white text-2xl" />
          </div>
          <p className="text-gray-600 text-lg">Discover trending posts and viral content</p>
          <p className="text-gray-400 text-sm mt-2">Content analysis and performance metrics</p>
        </div>
      </div>
    </div>
  );

  const renderTopics = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">All Trending Topics</h3>
        <div className="grid gap-4">
          {trendingTopics.map((topic, index) => (
            <div key={topic.id} className="flex items-center justify-between p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg font-bold">{topic.icon}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">{topic.name}</h4>
                  <p className="text-sm text-gray-500">{topic.category} • {topic.posts.toLocaleString()} posts</p>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      Momentum: {topic.momentum}%
                    </span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                      Engagement: {topic.engagement}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                  topic.trend === 'viral' ? 'bg-red-100 text-red-700' :
                  topic.trend === 'hot' ? 'bg-orange-100 text-orange-700' :
                  topic.trend === 'rising' ? 'bg-blue-100 text-blue-700' :
                  'bg-purple-100 text-purple-700'
                }`}>
                  {topic.virality}
                </span>
                <div className="mt-2 text-2xl font-bold text-green-600">+{topic.growth}%</div>
                <div className="text-sm text-gray-500">24h growth</div>
                <div className="text-xs text-gray-400 mt-1">#{index + 1} trending</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCreators = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Trending Creators</h3>
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <BsStar className="text-white text-2xl" />
          </div>
          <p className="text-gray-600 text-lg">Discover rising stars and trending creators</p>
          <p className="text-gray-400 text-sm mt-2">Creator analytics and performance insights</p>
        </div>
      </div>
    </div>
  );

  const renderInsights = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <MdInsights className="text-blue-600" />
          Trend Insights & Analytics
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Peak Activity Hours</h4>
              <div className="space-y-3">
                {['9-11 AM', '2-4 PM', '7-9 PM'].map((time, index) => (
                  <div key={time} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{time}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                          style={{ width: `${Math.floor(Math.random() * 40) + 60}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 w-8 text-right">{Math.floor(Math.random() * 40) + 60}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Content Performance</h4>
              <div className="space-y-3">
                {['Videos', 'Images', 'Text Posts'].map((type, index) => (
                  <div key={type} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{type}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
                          style={{ width: `${Math.floor(Math.random() * 40) + 60}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 w-8 text-right">{Math.floor(Math.random() * 40) + 60}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMainContent = () => {
    switch (activeSection) {
      case 'overview':
        return renderOverview();
      case 'posts':
        return renderTrendingPosts();
      case 'topics':
        return renderTopics();
      case 'creators':
        return renderCreators();
      case 'insights':
        return renderInsights();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Premium Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <BsFire className="text-white text-xl" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Trending</h1>
            </div>
            
            {/* Timeframe Selector */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              {[
                { id: '24h', label: '24H', icon: BsClock },
                { id: '7d', label: '7D', icon: FiTrendingUp },
                { id: '30d', label: '30D', icon: FiTrendingUp }
              ].map((timeframe) => {
                const Icon = timeframe.icon;
                return (
                  <button
                    key={timeframe.id}
                    onClick={() => setSelectedTimeframe(timeframe.id as any)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      selectedTimeframe === timeframe.id
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Icon size={16} />
                    {timeframe.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: BsEye },
              { id: 'posts', label: 'Trending Posts', icon: BsFire },
              { id: 'topics', label: 'Topics', icon: FiTrendingUp },
              { id: 'creators', label: 'Creators', icon: BsStar },
              { id: 'insights', label: 'Insights', icon: FiBarChart2 }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id as any)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeSection === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderMainContent()}
      </div>
    </div>
  );
};

export default TrendingPage;

