import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MessagesPage.css';
import { 
  BsChatDots, 
  BsSearch, 
  BsSend, 
  BsThreeDotsVertical, 
  BsHeart,
  BsHeartFill,
  BsEmojiSmile,
  BsPaperclip,
  BsMic,
  BsPhone,
  BsCameraVideo,
  BsInfoCircle,
  BsTrash,
  BsLock,
  BsVolumeMute,
  BsVolumeUp,
  BsFlag,
  BsX,
  BsArrowLeft
} from 'react-icons/bs';
import { MdVerified, MdMoreVert } from 'react-icons/md';

interface Message {
  id: number;
  senderId: number;
  text: string;
  time: string;
  isOwn: boolean;
  liked?: boolean;
  timestamp: Date;
}

interface Conversation {
  id: number;
  user: string;
  username: string;
  verified: boolean;
  avatar: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  online: boolean;
  muted?: boolean;
  nickname?: string;
}

const MessagesPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('messages');
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [chatSearchQuery, setChatSearchQuery] = useState('');
  const [showChatOptions, setShowChatOptions] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showChatInfo, setShowChatInfo] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [nickname, setNickname] = useState('');
  const [isMobileChat, setIsMobileChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatOptionsRef = useRef<HTMLDivElement>(null);

  const conversations: Conversation[] = [
    {
      id: 1,
      user: "Sarah Johnson",
      username: "sarah_j",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      lastMessage: "That sounds amazing! Can't wait to see the photos! 📸",
      time: "2m ago",
      unreadCount: 2,
      online: true,
      muted: false
    },
    {
      id: 2,
      user: "Mike Chen",
      username: "mike_c",
      verified: false,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      lastMessage: "Thanks for the recommendation! I'll definitely check it out.",
      time: "1h ago",
      unreadCount: 0,
      online: false,
      muted: true
    },
    {
      id: 3,
      user: "Emma Davis",
      username: "emma_d",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      lastMessage: "Let's plan something for this weekend! 🎉",
      time: "3h ago",
      unreadCount: 1,
      online: true,
      muted: false
    },
    {
      id: 4,
      user: "Alex Rivera",
      username: "alex_r",
      verified: false,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      lastMessage: "The project is looking great so far!",
      time: "5h ago",
      unreadCount: 0,
      online: false,
      muted: false
    }
  ];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      senderId: 1,
      text: "Hey! How's your day going? 😊",
      time: "10:30 AM",
      isOwn: false,
      liked: false,
      timestamp: new Date()
    },
    {
      id: 2,
      senderId: 0,
      text: "Hi Sarah! It's going great, thanks for asking! Just finished a really productive morning. How about you?",
      time: "10:32 AM",
      isOwn: true,
      liked: true,
      timestamp: new Date()
    },
    {
      id: 3,
      senderId: 1,
      text: "That sounds wonderful! I'm having a good day too. Just got back from a coffee run ☕️",
      time: "10:35 AM",
      isOwn: false,
      liked: false,
      timestamp: new Date()
    },
    {
      id: 4,
      senderId: 0,
      text: "Coffee sounds perfect right now! Which place did you go to?",
      time: "10:37 AM",
      isOwn: true,
      liked: false,
      timestamp: new Date()
    },
    {
      id: 5,
      senderId: 1,
      text: "The new place downtown! It's called 'Brew & Bean' - they have amazing artisanal coffee and the atmosphere is so cozy!",
      time: "10:40 AM",
      isOwn: false,
      liked: true,
      timestamp: new Date()
    }
  ]);

  // Close chat options when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatOptionsRef.current && !chatOptionsRef.current.contains(event.target as Node)) {
        setShowChatOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileChat(window.innerWidth < 1024 && selectedConversation !== null);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [selectedConversation]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        senderId: 0,
        text: messageText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
        liked: false,
        timestamp: new Date()
      };
      setMessages([...messages, newMessage]);
      setMessageText('');
    }
  };

  const handleLikeMessage = (messageId: number) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, liked: !msg.liked } : msg
    ));
  };

  const handleProfileClick = (username: string) => {
    navigate(`/profile/${username}`);
  };

  const handleBackToConversations = () => {
    setSelectedConversation(null);
    setIsMobileChat(false);
  };

  const handleDeleteChat = () => {
    if (selectedConversation) {
      setSelectedConversation(null);
      setShowChatOptions(false);
      setShowChatInfo(false);
      setIsMobileChat(false);
    }
  };

  const handleBlockUser = () => {
    if (selectedConversation) {
      setShowChatOptions(false);
      setShowChatInfo(false);
    }
  };

  const handleMuteUser = () => {
    if (selectedConversation) {
      setShowChatOptions(false);
    }
  };

  const handleSetNickname = () => {
    if (selectedConversation && nickname.trim()) {
      // Set nickname logic here
      setShowNicknameModal(false);
      setNickname('');
    }
  };

  const handleReportUser = () => {
    if (reportReason.trim()) {
      // Report logic here
      setShowReportModal(false);
      setReportReason('');
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMessages = messages.filter(msg =>
    msg.text.toLowerCase().includes(chatSearchQuery.toLowerCase())
  );

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'messages':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 h-[calc(100vh-200px)] sm:h-[calc(100vh-240px)]">
            {/* Conversations List - Hidden on mobile when chat is open */}
            <div className={`lg:col-span-1 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden ${
              isMobileChat ? 'hidden' : 'block'
            }`}>
              {/* Search */}
              <div className="p-3 sm:p-4 border-b border-gray-100">
                <div className="relative">
                  <BsSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* Conversations */}
              <div className="overflow-y-auto h-[calc(100%-80px)]">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation.id)}
                    className={`p-3 sm:p-4 cursor-pointer transition-colors border-b border-gray-50 last:border-b-0 conversation-item ${
                      selectedConversation === conversation.id ? 'selected' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative flex-shrink-0">
                        <img 
                          src={conversation.avatar} 
                          alt={`${conversation.user}'s avatar`} 
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                        />
                        {conversation.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 border-2 border-white rounded-full online-indicator"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                              {conversation.nickname || conversation.user}
                            </span>
                            {conversation.verified && <MdVerified className="text-blue-500 flex-shrink-0 verified-badge" size={14} />}
                            {conversation.muted && <BsVolumeMute className="text-gray-400 flex-shrink-0 muted-indicator" size={12} />}
                          </div>
                          <span className="text-xs text-gray-500 flex-shrink-0">{conversation.time}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                      </div>
                      {conversation.unreadCount > 0 && (
                        <div className="flex-shrink-0">
                          <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                            {conversation.unreadCount}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className={`lg:col-span-2 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col ${
              isMobileChat ? 'col-span-1' : ''
            }`}>
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="p-3 sm:p-4 border-b border-gray-100 flex items-center justify-between chat-header">
                    <div className="flex items-center space-x-3">
                      {/* Back button for mobile */}
                      {isMobileChat && (
                        <button
                          onClick={handleBackToConversations}
                          className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-full transition-colors header-button"
                        >
                          <BsArrowLeft size={16} />
                        </button>
                      )}
                      <div className="relative flex-shrink-0">
                        <img 
                          src={selectedConv?.avatar} 
                          alt="User avatar" 
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-white text-sm sm:text-base">
                            {selectedConv?.nickname || selectedConv?.user}
                          </span>
                          {selectedConv?.verified && (
                            <MdVerified className="text-blue-300" size={14} />
                          )}
                        </div>
                        <p className="text-xs text-white text-opacity-80">
                          {selectedConv?.online ? 'Online' : 'Offline'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-full transition-colors header-button">
                        <BsPhone size={16} />
                      </button>
                      <button className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-full transition-colors header-button">
                        <BsCameraVideo size={16} />
                      </button>
                      <button 
                        className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-full transition-colors header-button"
                        onClick={() => setShowChatInfo(!showChatInfo)}
                      >
                        <BsInfoCircle size={16} />
                      </button>
                      <div className="relative" ref={chatOptionsRef}>
                        <button 
                          className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-full transition-colors header-button"
                          onClick={() => setShowChatOptions(!showChatOptions)}
                        >
                          <MdMoreVert size={16} />
                        </button>
                        
                        {/* Chat Options Dropdown */}
                        {showChatOptions && (
                          <div className="absolute right-0 top-12 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[200px] chat-options-dropdown">
                            <div className="py-2">
                              <button
                                onClick={handleMuteUser}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2 option-button"
                              >
                                {selectedConv?.muted ? <BsVolumeUp size={16} /> : <BsVolumeMute size={16} />}
                                <span>{selectedConv?.muted ? 'Unmute' : 'Mute'}</span>
                              </button>
                              <button
                                onClick={() => {
                                  setShowChatOptions(false);
                                  setShowNicknameModal(true);
                                }}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2 option-button"
                              >
                                <BsInfoCircle size={16} />
                                <span>Set Nickname</span>
                              </button>
                              <button
                                onClick={handleBlockUser}
                                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2 option-button danger"
                              >
                                <BsLock size={16} />
                                <span>Block User</span>
                              </button>
                              <button
                                onClick={() => {
                                  setShowChatOptions(false);
                                  setShowReportModal(true);
                                }}
                                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2 option-button danger"
                              >
                                <BsFlag size={16} />
                                <span>Report</span>
                              </button>
                              <button
                                onClick={handleDeleteChat}
                                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2 option-button danger"
                              >
                                <BsTrash size={16} />
                                <span>Delete Chat</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Chat Search */}
                  <div className="p-3 border-b border-gray-100">
                    <div className="relative">
                      <BsSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                      <input
                        type="text"
                        placeholder="Search in chat..."
                        value={chatSearchQuery}
                        onChange={(e) => setChatSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                      />
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
                    {filteredMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-xs sm:max-w-md lg:max-w-lg px-3 sm:px-4 py-2 sm:py-3 rounded-2xl relative group ${
                          message.isOwn 
                            ? 'bg-purple-500 text-white' 
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <p className="text-sm sm:text-base">{message.text}</p>
                          <div className="flex items-center justify-between mt-2">
                            <p className={`text-xs ${
                              message.isOwn ? 'text-purple-100' : 'text-gray-500'
                            }`}>
                              {message.time}
                            </p>
                            <button
                              onClick={() => handleLikeMessage(message.id)}
                              className={`ml-2 transition-colors like-button ${
                                message.liked ? 'liked' : ''
                              }`}
                            >
                              {message.liked ? <BsHeartFill size={12} /> : <BsHeart size={12} />}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="p-3 sm:p-4 border-t border-gray-100 message-input-container">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-gray-100 rounded-full transition-colors input-button">
                        <BsEmojiSmile size={16} />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-gray-100 rounded-full transition-colors input-button">
                        <BsPaperclip size={16} />
                      </button>
                      <input
                        type="text"
                        placeholder="Type a message..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base search-input"
                      />
                      <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-gray-100 rounded-full transition-colors input-button">
                        <BsMic size={16} />
                      </button>
                      <button
                        onClick={handleSendMessage}
                        disabled={!messageText.trim()}
                        className="p-2 sm:p-3 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed send-button"
                      >
                        <BsSend size={16} className="sm:w-[18px] sm:h-[18px]" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <BsChatDots className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-3 sm:mb-4" />
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Select a conversation</h3>
                    <p className="text-gray-500 text-sm sm:text-base">Choose a conversation from the list to start chatting</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'requests':
        return (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 text-center">
            <BsChatDots className="w-12 h-12 sm:w-16 sm:h-16 text-purple-500 mx-auto mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Friend Requests</h3>
            <p className="text-gray-500 mb-4 sm:mb-6 text-sm sm:text-base">You don't have any pending friend requests at the moment</p>
            <div className="space-y-2 sm:space-y-3">
              <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                <p className="text-sm sm:text-base text-gray-600">When someone sends you a friend request, it will appear here</p>
              </div>
            </div>
          </div>
        );

      case 'groups':
        return (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 text-center">
            <BsChatDots className="w-12 h-12 sm:w-16 sm:h-16 text-purple-500 mx-auto mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Group Chats</h3>
            <p className="text-gray-500 mb-4 sm:mb-6 text-sm sm:text-base">You haven't joined any group chats yet</p>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 text-sm sm:text-base">
              Create Group Chat
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
        {/* Content Tabs - Hidden on mobile when chat is open */}
        <div className={`bg-white rounded-xl shadow-sm border border-gray-200 mb-3 sm:mb-4 ${isMobileChat ? 'hidden' : 'block'}`}>
          <div className="flex overflow-x-auto">
              {[
                { id: 'messages', label: 'Messages' },
                { id: 'requests', label: 'Requests' },
                { id: 'groups', label: 'Groups' }
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
        )}

        {/* Tab Content */}
        {renderTabContent()}
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 modal-overlay">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 modal-content">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Report User</h3>
              <button
                onClick={() => setShowReportModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <BsX size={24} />
              </button>
            </div>
            <textarea
              placeholder="Please describe the reason for reporting..."
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              rows={4}
            />
            <div className="flex space-x-3 mt-4">
              <button
                onClick={() => setShowReportModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReportUser}
                disabled={!reportReason.trim()}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Nickname Modal */}
      {showNicknameModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 modal-overlay">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 modal-content">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Set Nickname</h3>
              <button
                onClick={() => setShowNicknameModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <BsX size={24} />
              </button>
            </div>
            <input
              type="text"
              placeholder="Enter nickname..."
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <div className="flex space-x-3 mt-4">
              <button
                onClick={() => setShowNicknameModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSetNickname}
                disabled={!nickname.trim()}
                className="flex-1 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Set
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesPage;
