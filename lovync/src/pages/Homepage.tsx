// src/components/Homepage.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom"; // Step 1: Import Link

// A simple placeholder for your Logo component
const Logo = () => (
  <h1 className="text-2xl font-logo text-deep-purple">Lovync</h1>
);

const Homepage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  // This is a placeholder. In a real app, you'd get the current user's username.
  const currentUsername = "anshu_verma";

  const posts = [
    {
      id: 1,
      user: "Sarah Johnson",
      username: "@sarah_j",
      time: "2h ago",
      content: "Just had the most amazing coffee at this new place downtown! ☕️ The vibe is perfect for studying or catching up with friends. Highly recommend!",
      likes: 24,
      comments: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      user: "Mike Chen",
      username: "@mike_c",
      time: "4h ago",
      content: "Weekend hiking adventure complete! 🥾⛰️ Nothing beats the feeling of reaching the summit. Who wants to join me next weekend?",
      likes: 18,
      comments: 3,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      user: "Emma Davis",
      username: "@emma_d",
      time: "6h ago",
      content: "Trying out a new recipe today! Homemade pasta from scratch 🍝 Wish me luck! Will share the results if it turns out edible 😅",
      likes: 31,
      comments: 8,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-4">
            {/* Create Post */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center">
                  <span className="text-purple-700 font-medium">You</span>
                </div>
                <div className="flex-1">
                  <textarea
                    className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
                    rows={3}
                    placeholder="What's on your mind?"
                  />
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex gap-2">
                      <button className="text-gray-500 hover:text-purple-600">📷</button>
                      <button className="text-gray-500 hover:text-purple-600">😊</button>
                      <button className="text-gray-500 hover:text-purple-600">📍</button>
                    </div>
                    <button className="bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-800 transition-colors">
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Posts Feed */}
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-sm border">
                {/* Post Header */}
                <div className="p-4 flex items-center gap-3">
                  <img
                    src={post.avatar}
                    alt={post.user}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{post.user}</h4>
                    <p className="text-sm text-gray-500">{post.username} • {post.time}</p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                </div>

                {/* Post Content */}
                <div className="px-4 pb-3">
                  <p className="text-gray-800 leading-relaxed">{post.content}</p>
                </div>

                {/* Post Actions */}
                <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex gap-6">
                    <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span className="text-sm">{post.comments}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-500 hover:text-green-500 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'messages':
        return (
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Messages</h3>
            <p className="text-gray-500">Your conversations will appear here</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
          <Logo />
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5-5-5 5h5v-5H9l6 6z" />
              </svg>
            </button>
            <button className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5-5-5 5h5v-5H9l6 6z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        {renderTabContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex justify-around py-2">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
                activeTab === 'home' ? 'text-purple-700 bg-purple-50' : 'text-gray-500'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-xs mt-1">Home</span>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
                activeTab === 'messages' ? 'text-purple-700 bg-purple-50' : 'text-gray-500'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-xs mt-1">Messages</span>
            </button>

            {/* Step 2: Replace the button with a Link */}
            <Link
              to={`/profile/${currentUsername}`}
              className="flex flex-col items-center py-2 px-4 rounded-lg transition-colors text-gray-500"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-xs mt-1">Profile</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Homepage;