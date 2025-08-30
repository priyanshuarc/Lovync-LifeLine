import React, { useState, useRef, useEffect } from 'react';
import { 
  BsSearch, 
  BsReply, 
  BsPaperclip,
  BsSend,
  BsVolumeMute,
  BsVolumeUp,
  BsCheck2All,
  BsCheck2,
  BsArrowLeft,
  BsShare,

  BsMic,
  BsThreeDots,
  BsForward,
  BsPencil,
  BsTrash,
  BsDownload,
  BsPlay,
  BsPause,
  BsStop
} from 'react-icons/bs';
import { FiEdit3, FiSearch } from 'react-icons/fi';
import { MdVerified, MdDelete, MdReport, MdBlock, MdPersonAdd, MdDescription } from 'react-icons/md';
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
  type?: 'text' | 'image' | 'video' | 'audio' | 'file';
  mediaUrl?: string;
  fileName?: string;
  fileSize?: string;
  replyTo?: Message;
  reactions?: { [key: string]: string[] }; // emoji: [userId1, userId2]
  isEdited?: boolean;
  isForwarded?: boolean;
  forwardedFrom?: string;
}

const MessagesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chats' | 'requests' | 'archived'>('chats');
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showChatInfo, setShowChatInfo] = useState(false);
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const [showReplyTo, setShowReplyTo] = useState<Message | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showMessageOptions, setShowMessageOptions] = useState<number | null>(null);
  const [showChatSearch, setShowChatSearch] = useState(false);
  const [chatSearchQuery, setChatSearchQuery] = useState('');
  const [editingMessageId, setEditingMessageId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const [isPlayingAudio, setIsPlayingAudio] = useState<number | null>(null);
  const [audioProgress, setAudioProgress] = useState<{ [key: number]: number }>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
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
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      lastMessage: "Let's meet tomorrow at 3 PM",
      time: "5 hours ago",
      unreadCount: 0,
      online: false
    }
  ];

  // Enhanced sample messages with new features
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hey! How's the project going?",
      timestamp: "10:30 AM",
      isOwn: false,
      type: 'text',
      reactions: { '❤️': ['user1'], '👍': ['user2'] }
    },
    {
      id: 2,
      text: "It's going great! Almost finished with the design phase.",
      timestamp: "10:32 AM",
      isOwn: true,
      isRead: true,
      type: 'text'
    },
    {
      id: 3,
      text: "That sounds amazing! Can't wait to see it.",
      timestamp: "10:33 AM",
      isOwn: false,
      type: 'text',
      replyTo: { id: 2, text: "It's going great! Almost finished with the design phase.", timestamp: "10:32 AM", isOwn: true, type: 'text' }
    },
    {
      id: 4,
      text: "Check out this new feature I added!",
      timestamp: "10:35 AM",
      isOwn: true,
      isRead: true,
      type: 'text'
    },
    {
      id: 5,
      text: "screenshot.png",
      timestamp: "10:36 AM",
      isOwn: true,
      isRead: true,
      type: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      fileName: 'screenshot.png',
      fileSize: '2.1 MB'
    },
    {
      id: 6,
      text: "Wow, that looks incredible! 🔥",
      timestamp: "10:37 AM",
      isOwn: false,
      type: 'text',
      reactions: { '🔥': ['user1'], '👏': ['user2'], '💯': ['user3'] }
    }
  ]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Auto-scroll to bottom when new message is added
  useEffect(() => {
    const messagesContainer = document.querySelector('.overflow-y-auto');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [messages]);

  // Auto-resize textarea when messageText changes
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [messageText]);

  const handleSendMessage = () => {
    if (messageText.trim() || showReplyTo) {
      const newMessage: Message = {
        id: Date.now(),
        text: messageText.trim() || 'Sent a message',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
        isRead: false,
        type: 'text',
        replyTo: showReplyTo || undefined
      };
      
      setMessages(prev => [...prev, newMessage]);
      setMessageText('');
      setShowReplyTo(null);
      setIsTyping(false);
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
    setShowChatInfo(false);
    setShowProfileInfo(false);
    setShowReplyTo(null);
    setShowMessageOptions(null);
    setShowChatSearch(false);
    setChatSearchQuery('');
  };

  const handleBackToChats = () => {
    setSelectedConversation(null);
    setShowChatInfo(false);
    setShowProfileInfo(false);
    setShowReplyTo(null);
    setShowMessageOptions(null);
    setShowChatSearch(false);
    setChatSearchQuery('');
  };

  const handleFileAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileType = file.type.startsWith('image/') ? 'image' : 
                      file.type.startsWith('video/') ? 'video' : 
                      file.type.startsWith('audio/') ? 'audio' : 'file';
      
      const newMessage: Message = {
        id: Date.now(),
        text: file.name,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
        isRead: false,
        type: fileType,
        mediaUrl: URL.createObjectURL(file),
        fileName: file.name,
        fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      };
      
      setMessages(prev => [...prev, newMessage]);
    }
  };





  const handleReplyToMessage = (message: Message) => {
    setShowReplyTo(message);
    setShowMessageOptions(null);
  };

  const handleForwardMessage = (message: Message) => {
    // In a real app, this would open a contact picker
    alert(`Forwarding message to contacts...`);
    setShowMessageOptions(null);
  };

  const handleEditMessage = (message: Message) => {
    setEditingMessageId(message.id);
    setEditText(message.text);
    setShowMessageOptions(null);
  };

  const handleSaveEdit = () => {
    if (editingMessageId && editText.trim()) {
      setMessages(prev => prev.map(msg => 
        msg.id === editingMessageId 
          ? { ...msg, text: editText.trim(), isEdited: true }
          : msg
      ));
      setEditingMessageId(null);
      setEditText('');
    }
  };

  const handleCancelEdit = () => {
    setEditingMessageId(null);
    setEditText('');
  };

  const handleDeleteMessage = (messageId: number) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      setMessages(prev => prev.filter(msg => msg.id !== messageId));
    }
    setShowMessageOptions(null);
  };

  const handleReaction = (messageId: number, emoji: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const currentReactions = msg.reactions || {};
        const currentUsers = currentReactions[emoji] || [];
        const userId = 'currentUser'; // In real app, get from context
        
        if (currentUsers.includes(userId)) {
          // Remove reaction
          const newUsers = currentUsers.filter(id => id !== userId);
          if (newUsers.length === 0) {
            const { [emoji]: removed, ...rest } = currentReactions;
            return { ...msg, reactions: rest };
          } else {
            return { ...msg, reactions: { ...currentReactions, [emoji]: newUsers } };
          }
        } else {
          // Add reaction
          return { 
            ...msg, 
            reactions: { ...currentReactions, [emoji]: [...currentUsers, userId] }
          };
        }
      }
      return msg;
    }));
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
    
    // In a real app, this would save the audio recording
    const newMessage: Message = {
      id: Date.now(),
      text: `Voice message (${Math.floor(recordingTime / 60)}:${(recordingTime % 60).toString().padStart(2, '0')})`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
      isRead: false,
      type: 'audio',
      mediaUrl: '#', // In real app, this would be the audio URL
      fileName: `voice_${Date.now()}.mp3`,
      fileSize: `${Math.floor(recordingTime / 60)}:${(recordingTime % 60).toString().padStart(2, '0')}`
    };
    
    setMessages(prev => [...prev, newMessage]);
    setRecordingTime(0);
  };

  const handlePlayAudio = (messageId: number) => {
    if (isPlayingAudio === messageId) {
      setIsPlayingAudio(null);
      setAudioProgress(prev => ({ ...prev, [messageId]: 0 }));
    } else {
      setIsPlayingAudio(messageId);
      // In a real app, this would play the audio
      setAudioProgress(prev => ({ ...prev, [messageId]: 0 }));
    }
  };



  const handleBlockUser = () => {
    if (window.confirm(`Are you sure you want to block ${selectedConversation?.user}? They won't be able to see your posts or contact you.`)) {
      alert(`${selectedConversation?.user} has been blocked.`);
      handleBackToChats();
    }
  };

  const handleReportUser = () => {
    if (window.confirm(`Report ${selectedConversation?.user}? This will be reviewed by our team.`)) {
      alert(`Report submitted for ${selectedConversation?.user}. Our team will review this.`);
    }
  };

  const handleMuteUser = () => {
    if (selectedConversation) {
      const updatedConversation = { ...selectedConversation, muted: !selectedConversation.muted };
      // In a real app, this would update the conversation in the data context
      alert(`${selectedConversation.user} has been ${updatedConversation.muted ? 'muted' : 'unmuted'}.`);
    }
  };

  const handleDeleteChat = () => {
    if (window.confirm('Are you sure you want to delete this chat? This action cannot be undone.')) {
      handleBackToChats();
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
    const nickname = prompt('Enter nickname for this user:');
    if (nickname && selectedConversation) {
      // In a real app, this would update the conversation nickname
      alert(`Nickname set to "${nickname}"`);
    }
  };

  const handlePinChat = () => {
    if (selectedConversation) {
      alert(`Chat with ${selectedConversation.user} has been pinned!`);
    }
  };

  const handleArchiveChat = () => {
    if (selectedConversation) {
      alert(`Chat with ${selectedConversation.user} has been archived!`);
      handleBackToChats();
    }
  };

  const filteredMessages = chatSearchQuery 
    ? messages.filter(msg => 
        msg.text.toLowerCase().includes(chatSearchQuery.toLowerCase()) ||
        (msg.fileName && msg.fileName.toLowerCase().includes(chatSearchQuery.toLowerCase()))
      )
    : messages;

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
      <div className="h-screen bg-gray-50 flex flex-col fixed inset-0 z-50 overflow-hidden" style={{ height: '100dvh' }}>
        {/* Chat Header - Your Original Theme */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 flex-shrink-0">
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
              className="w-10 h-10 rounded-full object-cover cursor-pointer"
              onClick={() => setShowChatInfo(!showChatInfo)}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900 truncate text-base">{selectedConversation.user}</h3>
                {selectedConversation.verified && <MdVerified className="text-purple-500 flex-shrink-0" size={16} />}
              </div>
              <p className="text-gray-500 truncate text-sm">
                {selectedConversation.online ? 'online' : 'last seen recently'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowChatSearch(!showChatSearch)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FiSearch size={18} />
            </button>
            <button
              onClick={() => setShowChatInfo(!showChatInfo)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
            >
              <BsThreeDots size={18} />
            </button>
          </div>
        </div>

        {/* Chat Search Bar */}
        {showChatSearch && (
          <div className="bg-white border-b border-gray-200 px-4 py-3">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search in conversation..."
                value={chatSearchQuery}
                onChange={(e) => setChatSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Reply Preview */}
        {showReplyTo && (
          <div className="bg-blue-50 border-b border-blue-200 px-4 py-2">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-blue-600 font-medium">Replying to</p>
                <p className="text-sm text-blue-800 truncate">{showReplyTo.text}</p>
              </div>
              <button
                onClick={() => setShowReplyTo(null)}
                className="text-blue-600 hover:text-blue-800 p-1"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Chat Messages Area - Your Theme */}
        <div className="flex-1 overflow-y-auto bg-gray-50 p-2 space-y-2 min-h-0" style={{ 
          height: 'calc(100vh - 200px)',
          minHeight: 'calc(100vh - 200px)',
          maxHeight: 'calc(100vh - 200px)',
          paddingBottom: '120px'
        }}>
          {filteredMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[75%] sm:max-w-xs lg:max-w-md px-3 py-2 rounded-xl ${
                message.isOwn
                  ? 'bg-purple-500 text-white'
                  : 'bg-white text-gray-900 border border-gray-200'
              }`}>
                
                {/* Reply Preview */}
                {message.replyTo && (
                  <div className={`mb-2 p-2 rounded-lg ${
                    message.isOwn ? 'bg-blue-400 bg-opacity-30' : 'bg-gray-100'
                  }`}>
                    <p className="text-xs opacity-75">Replying to</p>
                    <p className="text-sm truncate">{message.replyTo.text}</p>
                  </div>
                )}

                {/* Message Content */}
                {message.type === 'text' && (
                  <p className="text-sm leading-relaxed">
                    {message.text}
                    {message.isEdited && (
                      <span className="text-xs opacity-75 ml-2">(edited)</span>
                    )}
                  </p>
                )}

                {/* Media Messages */}
                {message.type === 'image' && (
                  <div>
                    <img
                      src={message.mediaUrl}
                      alt="Image"
                      className="w-full rounded-lg max-h-64 object-cover"
                    />
                  </div>
                )}

                {message.type === 'video' && (
                  <div>
                    <div className="relative">
                      <video
                        src={message.mediaUrl}
                        className="w-full rounded-lg max-h-64 object-cover"
                        controls
                      />
                    </div>
                  </div>
                )}

                {message.type === 'audio' && (
                  <div>
                    <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg">
                      <button
                        onClick={() => handlePlayAudio(message.id)}
                        className="p-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors"
                      >
                        {isPlayingAudio === message.id ? <BsPause size={16} /> : <BsPlay size={16} />}
                      </button>
                      <div className="flex-1">
                        <div className="w-full bg-gray-300 rounded-full h-2">
                          <div 
                            className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${audioProgress[message.id] || 0}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-600">{message.fileSize}</span>
                    </div>
                  </div>
                )}

                {message.type === 'file' && (
                  <div>
                    <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg">
                      <MdDescription size={24} className="text-purple-500" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500">{message.fileSize}</p>
                      </div>
                      <button className="p-2 text-gray-600 hover:text-gray-800 rounded-full hover:bg-gray-200 transition-colors">
                        <BsDownload size={16} />
                      </button>
                    </div>
                  </div>
                )}

                {/* Message Footer */}
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
                    
                    {/* Message Actions */}
                    <div className="flex items-center gap-1">
                      {!message.isOwn && (
                        <button
                          onClick={() => handleReaction(message.id, '❤️')}
                          className={`hover:scale-110 transition-transform ${
                            message.reactions?.['❤️']?.includes('currentUser') ? 'text-red-500' : 'text-gray-400'
                          }`}
                        >
                          ❤️
                        </button>
                      )}
                      
                      <button
                        onClick={() => setShowMessageOptions(message.id)}
                        className="hover:scale-110 transition-transform text-gray-400 hover:text-gray-600"
                      >
                        <BsThreeDots size={12} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Message Options Menu */}
                {showMessageOptions === message.id && (
                  <div className={`absolute ${message.isOwn ? 'left-0' : 'right-0'} mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-28`}>
                    <button
                      onClick={() => handleReplyToMessage(message)}
                      className="w-full px-2 py-2 text-left text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <BsReply size={12} />
                      Reply
                    </button>
                    <button
                      onClick={() => handleForwardMessage(message)}
                      className="w-full px-2 py-2 text-left text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <BsForward size={12} />
                      Forward
                    </button>
                    {message.isOwn && (
                      <button
                        onClick={() => handleEditMessage(message)}
                        className="w-full px-2 py-2 text-left text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                      >
                        <BsPencil size={12} />
                        Edit
                      </button>
                    )}
                    {message.isOwn && (
                      <button
                        onClick={() => handleDeleteMessage(message.id)}
                        className="w-full px-2 py-2 text-left text-xs text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <BsTrash size={12} />
                        Delete
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          <div ref={messagesEndRef} />
          
          {/* Enhanced Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white px-4 py-3 rounded-2xl">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">typing...</p>
              </div>
            </div>
          )}
        </div>

        {/* WhatsApp-style Chat Input */}
        <div className="bg-white border-t border-gray-200 p-3 flex-shrink-0" style={{ 
          paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))',
          position: 'fixed',
          bottom: '70px',
          left: 0,
          right: 0,
          zIndex: 9999,
          backgroundColor: 'white',
          boxShadow: '0 -2px 8px rgba(0,0,0,0.1)'
        }}>
          <div className="flex items-end gap-3">
            {/* Show other buttons only when not typing */}
            {!messageText.trim() && (
              <>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                  title="Attach file"
                >
                  <BsPaperclip size={18} />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileAttach}
                  accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt,.zip,.rar"
                  multiple
                />
                

              </>
            )}
            
            <div className="relative flex-1 min-w-0 mx-2">
              {editingMessageId ? (
                <div className="flex flex-col gap-2">
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none min-h-[40px] text-sm"
                    rows={1}
                    placeholder="Edit message..."
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveEdit}
                      className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-xs"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <textarea
                  ref={textareaRef}
                  value={messageText}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Limit to 500 characters
                    if (value.length <= 500) {
                      setMessageText(value);
                      // Auto-resize the textarea with larger height limit
                      const textarea = e.target;
                      textarea.style.height = 'auto';
                      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
                    }
                  }}
                  onInput={(e) => {
                    // Additional resize on input for better mobile support
                    const textarea = e.target as HTMLTextAreaElement;
                    textarea.style.height = 'auto';
                    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
                  }}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 resize-none min-h-[44px] max-h-[120px] text-sm"
                  rows={1}
                  style={{ 
                    minHeight: '44px',
                    maxHeight: '200px',
                    fontSize: '16px', // Prevents zoom on iOS
                    backgroundColor: 'white',
                    transition: 'all 0.2s ease',
                    overflow: 'auto',
                    lineHeight: '1.4',
                    borderRadius: '8px',
                    width: '100%'
                  }}
                />
              )}
              
              {/* Character counter */}
              <div className="text-xs text-gray-500 mt-1 text-right w-full">
                {messageText.length}/500
              </div>
            </div>
            
            <div className="flex gap-2 flex-shrink-0 ml-2">
              {isRecording ? (
                <button
                  onClick={handleStopRecording}
                  className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  title="Stop recording"
                >
                  <BsStop size={18} />
                </button>
              ) : (
                !messageText.trim() && (
                  <button
                    onClick={handleStartRecording}
                    className="p-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors"
                    title="Record voice message"
                  >
                    <BsMic size={18} />
                  </button>
                )
              )}
              
              {!isRecording && (
                <button
                  onClick={handleSendMessage}
                  disabled={!messageText.trim()}
                  className={`p-3 rounded-full transition-colors ${
                    messageText.trim() 
                      ? 'bg-purple-500 text-white hover:bg-purple-600' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  title="Send message"
                >
                  <BsSend size={18} />
                </button>
              )}
            </div>
          </div>
          
          {/* Recording Timer */}
          {isRecording && (
            <div className="mt-2 text-center">
              <div className="inline-flex items-center gap-2 px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                Recording... {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, '0')}
              </div>
            </div>
          )}
        </div>

        {/* Chat Info Sidebar */}
        {showChatInfo && (
          <div className="fixed inset-y-0 right-0 w-full bg-white shadow-lg z-[60]">
            <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
              <button
                onClick={() => setShowChatInfo(false)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <BsArrowLeft size={20} />
              </button>
              <h2 className="text-xl font-bold text-gray-900 flex-1">Chat Options</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-3">
              <div className="text-center mb-4">
                <img
                  src={selectedConversation.avatar}
                  alt={selectedConversation.user}
                  className="w-16 h-16 rounded-full object-cover mx-auto mb-2"
                />
                <h3 className="text-lg font-semibold text-gray-900 flex items-center justify-center gap-2">
                  {selectedConversation.user}
                  {selectedConversation.verified && <MdVerified className="text-blue-500" size={16} />}
                </h3>
                <p className="text-sm text-gray-600">@{selectedConversation.username}</p>
                <div className="flex items-center justify-center gap-3 mt-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${selectedConversation.online ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    {selectedConversation.online ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleViewProfile}
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <MdPersonAdd size={16} />
                  View Profile
                </button>

                <button
                  onClick={handleSetNickname}
                  className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <FiEdit3 size={16} />
                  Set Nickname
                </button>

                <button
                  onClick={handlePinChat}
                  className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  📌 Pin Chat
                </button>

                <button
                  onClick={handleShareProfile}
                  className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <BsShare size={16} />
                  Share Profile
                </button>

                <button
                  onClick={handleMuteUser}
                  className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  {selectedConversation.muted ? <BsVolumeUp size={16} /> : <BsVolumeMute size={16} />}
                  {selectedConversation.muted ? 'Unmute' : 'Mute'}
                </button>

                <button
                  onClick={handleArchiveChat}
                  className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  📁 Archive Chat
                </button>

                <button
                  onClick={handleBlockUser}
                  className="w-full bg-red-100 text-red-600 py-2 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <MdBlock size={16} />
                  Block User
                </button>

                <button
                  onClick={handleReportUser}
                  className="w-full bg-red-100 text-red-600 py-2 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <MdReport size={16} />
                  Report User
                </button>

                <button
                  onClick={handleDeleteChat}
                  className="w-full bg-red-100 text-red-600 py-2 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <MdDelete size={16} />
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Messages</h1>
          <p className="text-gray-600">Connect with your friends and followers</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="relative mb-6">
          <BsSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="flex">
            {(['chats', 'requests', 'archived'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 px-4 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === tab
                    ? 'text-blue-600 border-blue-600 bg-blue-50'
                    : 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  {tab === 'chats' && <span>💬</span>}
                  {tab === 'requests' && <span>👥</span>}
                  {tab === 'archived' && <span>📁</span>}
                  <span className="capitalize">{tab}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Conversations List */}
        <div className="space-y-3">
          {conversations
            .filter(conversation => 
              conversation.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
              conversation.username.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => handleConversationSelect(conversation)}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  {/* User Avatar */}
                  <div className="relative">
                    <img
                      src={conversation.avatar}
                      alt={conversation.user}
                      className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                    />
                    {conversation.online && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                    {conversation.muted && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-gray-400 border-2 border-white rounded-full flex items-center justify-center">
                        <BsVolumeMute size={8} className="text-white" />
                      </div>
                    )}
                  </div>

                  {/* Conversation Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">{conversation.user}</h3>
                      {conversation.verified && <MdVerified className="text-blue-500 flex-shrink-0" size={16} />}
                      {conversation.nickname && (
                        <span className="text-sm text-gray-500">({conversation.nickname})</span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-1">@{conversation.username}</p>
                    <p className="text-gray-700 text-sm line-clamp-2">{conversation.lastMessage}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-gray-500">{conversation.time}</span>
                      {conversation.unreadCount > 0 && (
                        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
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
    </div>
  );
};

export default MessagesPage;
