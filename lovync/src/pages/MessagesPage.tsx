import React, { useState, useRef, useEffect } from 'react';
import { 
  BsSearch, 
  BsHeart, 
  BsReply, 
  BsPaperclip,
  BsSend,
  BsVolumeMute,
  BsVolumeUp,
  BsCheck2All,
  BsCheck2,
  BsArrowLeft,
  BsShare,
  BsEmojiSmile,
  BsMic
} from 'react-icons/bs';
import { FiEdit3, FiRotateCw } from 'react-icons/fi';
import { MdVerified, MdDelete, MdReport, MdBlock, MdPersonAdd } from 'react-icons/md';
import ProfileInfo from './ProfileInfo';

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

interface Message {
  id: number;
  text: string;
  timestamp: string;
  isOwn: boolean;
  isLiked?: boolean;
  isRead?: boolean;
}

const MessagesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chats' | 'requests' | 'archived'>('chats');
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showChatInfo, setShowChatInfo] = useState(false);
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showReplyTo, setShowReplyTo] = useState<Message | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout>();

  // Sample conversations data
  const conversations: Conversation[] = [
    {
      id: 1,
      user: "Sarah Johnson",
      username: "sarah_j",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      lastMessage: "That sounds amazing! Can't wait to see it.",
      time: "2 min ago",
      unreadCount: 2,
      online: true
    },
    {
      id: 2,
      user: "Mike Chen",
      username: "mike_c",
      verified: false,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      lastMessage: "Thanks for the help yesterday!",
      time: "1 hour ago",
      unreadCount: 0,
      online: false
    },
    {
      id: 3,
      user: "Emma Davis",
      username: "emma_d",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      lastMessage: "The design looks perfect!",
      time: "3 hours ago",
      unreadCount: 1,
      online: true,
      muted: true
    },
    {
      id: 4,
      user: "Alex Rodriguez",
      username: "alex_rod",
      verified: false,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      lastMessage: "Let's catch up soon!",
      time: "1 day ago",
      unreadCount: 0,
      online: false
    }
  ];

  // Sample messages for selected conversation
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hey! How's the new project coming along?",
      timestamp: "10:30 AM",
      isOwn: false,
      isRead: true
    },
    {
      id: 2,
      text: "It's going really well! We just finished the initial design phase.",
      timestamp: "10:32 AM",
      isOwn: true,
      isRead: true
    },
    {
      id: 3,
      text: "That sounds amazing! Can't wait to see it.",
      timestamp: "10:35 AM",
      isOwn: false,
      isRead: true
    },
    {
      id: 4,
      text: "I'll send you some screenshots later today!",
      timestamp: "10:37 AM",
      isOwn: true,
      isRead: false
    }
  ]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (messageText.trim() && selectedConversation) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: messageText.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
        isRead: false
      };
      
      setMessages(prev => [...prev, newMessage]);
      setMessageText('');
      setShowReplyTo(null);
      
      // Simulate typing indicator
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        // Simulate reply
        const replyMessage: Message = {
          id: messages.length + 2,
          text: "Thanks for the message! I'll get back to you soon.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isOwn: false,
          isRead: true
        };
        setMessages(prev => [...prev, replyMessage]);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleConversationSelect = (conversation: Conversation) => {
    setSelectedConversation(conversation);
  };

  const handleBackToChats = () => {
    setSelectedConversation(null);
    setShowChatInfo(false);
    setShowProfileInfo(false);
    setShowReplyTo(null);
  };

  const handleFileAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('File attached:', file.name);
      // Here you would typically upload the file and send a message with the file
      const fileMessage: Message = {
        id: messages.length + 1,
        text: `📎 ${file.name}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
        isRead: false
      };
      setMessages(prev => [...prev, fileMessage]);
    }
  };

  const handleLikeMessage = (messageId: number) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, isLiked: !msg.isLiked } : msg
    ));
  };

  const handleReplyToMessage = (message: Message) => {
    setShowReplyTo(message);
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    recordingIntervalRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
    }
    // Here you would typically process the recorded audio
    const audioMessage: Message = {
      id: messages.length + 1,
      text: `🎤 Voice message (${Math.floor(recordingTime / 60)}:${(recordingTime % 60).toString().padStart(2, '0')})`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
      isRead: false
    };
    setMessages(prev => [...prev, audioMessage]);
    setRecordingTime(0);
  };

  const handleBlockUser = () => {
    if (selectedConversation) {
      console.log('Blocking user:', selectedConversation.username);
      alert(`You have blocked ${selectedConversation.user}. They will no longer be able to contact you.`);
      setShowChatInfo(false);
      handleBackToChats();
    }
  };

  const handleReportUser = () => {
    if (selectedConversation) {
      console.log('Reporting user:', selectedConversation.username);
      alert(`Report submitted for ${selectedConversation.user}. Our team will review this.`);
      setShowChatInfo(false);
    }
  };

  const handleMuteUser = () => {
    if (selectedConversation) {
      console.log('Muting user:', selectedConversation.username);
      alert(`${selectedConversation.user} has been ${selectedConversation.muted ? 'unmuted' : 'muted'}.`);
      setShowChatInfo(false);
    }
  };

  const handleDeleteChat = () => {
    if (selectedConversation) {
      if (window.confirm(`Are you sure you want to delete this chat with ${selectedConversation.user}? This action cannot be undone.`)) {
        console.log('Deleting chat with:', selectedConversation.username);
        alert(`Chat with ${selectedConversation.user} has been deleted.`);
        setSelectedConversation(null);
        setShowChatInfo(false);
      }
    }
  };

  const handleShareProfile = () => {
    if (selectedConversation) {
      const shareText = `Check out ${selectedConversation.user}'s profile on Lovync!`;
      if (navigator.share) {
        navigator.share({
          title: `${selectedConversation.user} on Lovync`,
          text: shareText,
          url: `https://lovync.com/profile/${selectedConversation.username}`
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        navigator.clipboard.writeText(shareText);
        alert('Profile link copied to clipboard!');
      }
    }
  };

  const handleViewProfile = () => {
    setShowProfileInfo(true);
    setShowChatInfo(false);
  };

  const handleSetNickname = () => {
    if (selectedConversation) {
      const nickname = prompt(`Enter a nickname for ${selectedConversation.user}:`, selectedConversation.nickname || '');
      if (nickname !== null) {
        console.log('Setting nickname:', nickname);
        alert(`Nickname set to "${nickname}" for ${selectedConversation.user}`);
        setShowChatInfo(false);
      }
    }
  };

  const handlePinChat = () => {
    if (selectedConversation) {
      console.log('Pinning chat:', selectedConversation.username);
      alert(`Chat with ${selectedConversation.user} has been pinned to the top!`);
      setShowChatInfo(false);
    }
  };

  const handleArchiveChat = () => {
    if (selectedConversation) {
      if (window.confirm(`Archive this chat with ${selectedConversation.user}?`)) {
        console.log('Archiving chat:', selectedConversation.username);
        alert(`Chat with ${selectedConversation.user} has been archived.`);
        setShowChatInfo(false);
        handleBackToChats();
      }
    }
  };

  // Show ProfileInfo page
  if (showProfileInfo && selectedConversation) {
    return (
      <ProfileInfo 
        onClose={() => setShowProfileInfo(false)}
        conversation={selectedConversation}
      />
    );
  }

  // If conversation is selected, show full-screen chat
  if (selectedConversation) {
    return (
      <div className="h-screen bg-gray-50 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
          <button
            onClick={handleBackToChats}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
          >
            <BsArrowLeft size={20} />
          </button>
          
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <img
              src={selectedConversation.avatar}
              alt={selectedConversation.user}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900 truncate">{selectedConversation.user}</h3>
                {selectedConversation.verified && <MdVerified className="text-blue-500 flex-shrink-0" size={16} />}
              </div>
              <p className="text-sm text-gray-500 truncate">
                {selectedConversation.online ? 'online' : 'last seen recently'}
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setShowChatInfo(!showChatInfo)}
            className="px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors text-sm font-medium"
          >
            More
          </button>
        </div>

        {/* Reply Preview */}
        {showReplyTo && (
          <div className="bg-blue-50 border-b border-blue-200 px-4 py-2">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-blue-800 font-medium">Replying to {showReplyTo.isOwn ? 'yourself' : selectedConversation.user}</p>
                <p className="text-xs text-blue-600 truncate">{showReplyTo.text}</p>
              </div>
              <button
                onClick={() => setShowReplyTo(null)}
                className="text-blue-600 hover:text-blue-800 p-1"
              >
                <FiEdit3 size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto bg-gray-100 p-3 space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                message.isOwn
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-900'
              }`}>
                <p className="text-sm leading-relaxed">{message.text}</p>
                <div className={`flex items-center justify-between mt-2 text-xs ${
                  message.isOwn ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  <span>{message.timestamp}</span>
                  <div className="flex items-center gap-2">
                    {message.isOwn && (
                      <span>
                        {message.isRead ? <BsCheck2All size={12} /> : <BsCheck2 size={12} />}
                      </span>
                    )}
                    {!message.isOwn && (
                      <button
                        onClick={() => handleLikeMessage(message.id)}
                        className={`hover:scale-110 transition-transform ${
                          message.isLiked ? 'text-red-500' : 'text-gray-400'
                        }`}
                      >
                        <BsHeart size={12} />
                      </button>
                    )}
                    {!message.isOwn && (
                      <button
                        onClick={() => handleReplyToMessage(message)}
                        className="hover:scale-110 transition-transform text-gray-400 hover:text-blue-500"
                      >
                        <BsReply size={12} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <div ref={messagesEndRef} />
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white px-4 py-3 rounded-2xl">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="bg-white border-t border-gray-200 p-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            >
              <BsPaperclip size={18} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileAttach}
              accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
            />
            
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            >
              <BsEmojiSmile size={18} />
            </button>
            
            <div className="relative flex-1">
              <textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                rows={1}
              />
            </div>
            
            {isRecording ? (
              <button
                onClick={handleStopRecording}
                className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <FiRotateCw size={16} className="animate-spin" />
              </button>
            ) : (
              <button
                onMouseDown={handleStartRecording}
                onMouseUp={handleStopRecording}
                onMouseLeave={handleStopRecording}
                className="p-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors"
              >
                <BsMic size={16} />
              </button>
            )}
            
            <button
              onClick={handleSendMessage}
              disabled={!messageText.trim()}
              className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <BsSend size={16} />
            </button>
          </div>
          
          {/* Recording Timer */}
          {isRecording && (
            <div className="text-center mt-2">
              <span className="text-sm text-red-500 font-medium">
                Recording... {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, '0')}
              </span>
            </div>
          )}
        </div>

        {/* Chat Info Sidebar */}
        {showChatInfo && (
          <div className="fixed inset-y-0 right-0 w-full bg-white shadow-lg z-50">
            <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
              <button
                onClick={() => setShowChatInfo(false)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <BsArrowLeft size={20} />
              </button>
              <h2 className="text-xl font-bold text-gray-900 flex-1">Chat Options</h2>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              <div className="text-center mb-6">
                <img
                  src={selectedConversation.avatar}
                  alt={selectedConversation.user}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-3"
                />
                <h3 className="text-xl font-semibold text-gray-900 flex items-center justify-center gap-2">
                  {selectedConversation.user}
                  {selectedConversation.verified && <MdVerified className="text-blue-500" size={18} />}
                </h3>
                <p className="text-gray-600">@{selectedConversation.username}</p>
                <div className="flex items-center justify-center gap-4 mt-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${selectedConversation.online ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    {selectedConversation.online ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                <button 
                  onClick={handleViewProfile}
                  className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  <MdPersonAdd size={18} />
                  View Profile
                </button>
                
                <button 
                  onClick={handleSetNickname}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                  <FiEdit3 size={18} />
                  Set Nickname
                </button>
                
                <button 
                  onClick={handlePinChat}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                  📌 Pin Chat
                </button>
                
                <button 
                  onClick={handleShareProfile}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                  <BsShare size={18} />
                  Share Profile
                </button>
                
                <button
                  onClick={handleMuteUser}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                  {selectedConversation.muted ? <BsVolumeUp size={18} /> : <BsVolumeMute size={18} />}
                  {selectedConversation.muted ? 'Unmute' : 'Mute'}
                </button>
                
                <button
                  onClick={handleArchiveChat}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                  📁 Archive Chat
                </button>
                
                <button
                  onClick={handleBlockUser}
                  className="w-full bg-red-100 text-red-600 py-3 rounded-xl hover:bg-red-200 transition-colors flex items-center justify-center gap-2"
                >
                  <MdBlock size={18} />
                  Block User
                </button>
                
                <button
                  onClick={handleReportUser}
                  className="w-full bg-red-100 text-red-600 py-3 rounded-xl hover:bg-red-200 transition-colors flex items-center justify-center gap-2"
                >
                  <MdReport size={18} />
                  Report User
                </button>
                
                <button
                  onClick={handleDeleteChat}
                  className="w-full bg-red-100 text-red-600 py-3 rounded-xl hover:bg-red-200 transition-colors flex items-center justify-center gap-2"
                >
                  <MdDelete size={18} />
                  Delete Chat
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Main conversations list view
  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Messages</h1>
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
            <FiEdit3 size={20} />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white px-4 py-3 border-b border-gray-200">
        <div className="relative">
          <BsSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex">
          {(['chats', 'requests', 'archived'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => handleConversationSelect(conversation)}
            className="bg-white border-b border-gray-100 p-4 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={conversation.avatar}
                  alt={conversation.user}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {conversation.online && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 truncate">{conversation.user}</h3>
                    {conversation.verified && <MdVerified className="text-blue-500 flex-shrink-0" size={16} />}
                  </div>
                  <span className="text-xs text-gray-500">{conversation.time}</span>
                </div>
                
                <div className="flex items-center justify-between mt-1">
                  <p className="text-sm text-gray-600 truncate flex-1 mr-2">
                    {conversation.lastMessage}
                  </p>
                  {conversation.unreadCount > 0 && (
                    <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                      {conversation.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessagesPage;
