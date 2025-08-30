import React, { createContext, useContext, useState, ReactNode } from 'react';

// User interface
interface User {
  id: number;
  name: string;
  username: string;
  avatar: string;
  verified: boolean;
  online: boolean;
  bio?: string;
  followers: number;
  following: number;
  posts: number;
}

// Post interface
interface Post {
  id: number;
  userId: number;
  content: string;
  image?: string;
  video?: string;
  likes: number;
  comments: number;
  shares: number;
  music?: string;
  location?: string;
  timestamp: string;
  type: 'image' | 'video' | 'text';
}

// Message interface
interface Message {
  id: number;
  conversationId: number;
  senderId: number;
  text: string;
  timestamp: string;
  isOwn: boolean;
}

// Conversation interface
interface Conversation {
  id: number;
  participants: number[];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

// Data context interface
interface DataContextType {
  currentUser: User;
  users: User[];
  posts: Post[];
  conversations: Conversation[];
  messages: Message[];
  savedPosts: Post[];
  likedPosts: Post[];
  updateUser: (userId: number, updates: Partial<User>) => void;
  addPost: (post: Omit<Post, 'id'>) => void;
  likePost: (postId: number) => void;
  unlikePost: (postId: number) => void;
  savePost: (postId: number) => void;
  unsavePost: (postId: number) => void;
  sendMessage: (conversationId: number, text: string) => void;
}

// Create context
const DataContext = createContext<DataContextType | undefined>(undefined);

// Sample data
const sampleUsers: User[] = [
  {
    id: 1,
    name: "Priyanshu Pandey",
    username: "priyanshu_pandey",
    avatar: "/logo.svg",
    verified: true,
    online: true,
    bio: "CEO of Lovync & Founder 🚀 | Building the future of social connection. Leading innovation and meaningful relationships.",
    followers: 15000,
    following: 250,
    posts: 500
  },
  {
    id: 2,
    name: "Sarah Johnson",
    username: "sarah_j",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    verified: true,
    online: true,
    bio: "Adventure seeker & coffee lover ☕️",
    followers: 2156,
    following: 342,
    posts: 89
  },
  {
    id: 3,
    name: "Mike Chen",
    username: "mike_c",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    verified: false,
    online: false,
    bio: "Tech enthusiast & fitness lover 💪",
    followers: 892,
    following: 156,
    posts: 45
  },
  {
    id: 4,
    name: "Emma Davis",
    username: "emma_d",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    verified: true,
    online: true,
    bio: "Creative designer & travel enthusiast ✈️",
    followers: 3456,
    following: 234,
    posts: 67
  },
  {
    id: 5,
    name: "Alex Rodriguez",
    username: "alex_rod",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    verified: false,
    online: true,
    bio: "Music producer & DJ 🎵 | Creating vibes that move your soul",
    followers: 1892,
    following: 445,
    posts: 156
  },
  {
    id: 6,
    name: "Sophie Chen",
    username: "sophie_c",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    verified: true,
    online: false,
    bio: "Fashion blogger & lifestyle influencer 👗 | Sharing style tips and daily inspiration",
    followers: 5678,
    following: 123,
    posts: 234
  },
  {
    id: 7,
    name: "David Kim",
    username: "david_k",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    verified: false,
    online: true,
    bio: "Software engineer & open source contributor 💻 | Building the future one commit at a time",
    followers: 2341,
    following: 567,
    posts: 89
  },
  {
    id: 8,
    name: "Lisa Wang",
    username: "lisa_w",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    verified: true,
    online: true,
    bio: "Photographer & visual storyteller 📸 | Capturing moments that last forever",
    followers: 4123,
    following: 234,
    posts: 178
  }
];

const samplePosts: Post[] = [
  {
    id: 1,
    userId: 1,
    content: "As CEO & Founder of Lovync, I'm proud to announce our revolutionary social platform! The future of meaningful connections is here 🚀 #Lovync #CEO #Innovation #SocialMedia",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
    likes: 1247,
    comments: 89,
    shares: 23,
    timestamp: "2h ago",
    type: 'image'
  },
  {
    id: 2,
    userId: 2,
    content: "This new coffee trend is absolutely amazing! ☕️ The art and the taste are on another level. #CoffeeArt #Trending",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop",
    music: "Coffee Shop Vibes - LoFi Beats",
    location: "Downtown Coffee Co.",
    likes: 2847,
    comments: 234,
    shares: 89,
    timestamp: "1h ago",
    type: 'image'
  },
  {
    id: 3,
    userId: 3,
    content: "Just discovered this incredible hiking trail! The views are absolutely breathtaking 🏔️ #Hiking #Adventure #Trending",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=400&fit=crop",
    music: "Mountain Wind - Nature Sounds",
    location: "Mount Wilson Trail",
    likes: 1567,
    comments: 189,
    shares: 67,
    timestamp: "3h ago",
    type: 'image'
  },
  {
    id: 4,
    userId: 4,
    content: "This cooking technique is going viral! 🍳 So simple yet so effective. Everyone needs to try this! #Cooking #Viral #Trending",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=600&h=400&fit=crop",
    music: "Kitchen Sounds - Cooking",
    location: "Home Kitchen",
    likes: 3245,
    comments: 456,
    shares: 123,
    timestamp: "5h ago",
    type: 'image'
  },
  {
    id: 5,
    userId: 5,
    content: "New track dropping soon! 🎵 This one's going to be fire 🔥 #Music #NewRelease #Producer",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
    music: "Alex Rodriguez - New Track",
    location: "Studio A",
    likes: 1892,
    comments: 234,
    shares: 89,
    timestamp: "4h ago",
    type: 'image'
  },
  {
    id: 6,
    userId: 6,
    content: "Spring fashion trends are here! 🌸 What's your favorite look this season? #Fashion #Spring #Trending",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop",
    music: "Spring Vibes - Fashion",
    location: "Fashion District",
    likes: 4567,
    comments: 567,
    shares: 234,
    timestamp: "6h ago",
    type: 'image'
  },
  {
    id: 7,
    userId: 7,
    content: "Just pushed a major update to our open source project! 🚀 The community response has been incredible. #OpenSource #Coding #Community",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
    music: "Coding Vibes - LoFi",
    location: "Home Office",
    likes: 2341,
    comments: 345,
    shares: 123,
    timestamp: "8h ago",
    type: 'image'
  },
  {
    id: 8,
    userId: 8,
    content: "Sunset photography session was magical today! 🌅 Nature never fails to amaze me. #Photography #Sunset #Nature",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    music: "Nature Sounds - Sunset",
    location: "Beach Point",
    likes: 5123,
    comments: 678,
    shares: 345,
    timestamp: "10h ago",
    type: 'image'
  }
];

const sampleConversations: Conversation[] = [
  {
    id: 1,
    participants: [1, 2],
    lastMessage: "That sounds amazing! Can't wait to see the photos! 📸",
    lastMessageTime: "2m ago",
    unreadCount: 2
  },
  {
    id: 2,
    participants: [1, 3],
    lastMessage: "Thanks for the recommendation! I'll definitely check it out.",
    lastMessageTime: "1h ago",
    unreadCount: 0
  },
  {
    id: 3,
    participants: [1, 4],
    lastMessage: "Let's plan something for this weekend! 🎉",
    lastMessageTime: "3h ago",
    unreadCount: 1
  }
];

const sampleMessages: Message[] = [
  {
    id: 1,
    conversationId: 1,
    senderId: 2,
    text: "Hey! How's your day going? 😊",
    timestamp: "10:30 AM",
    isOwn: false
  },
  {
    id: 2,
    conversationId: 1,
    senderId: 1,
    text: "Hi Sarah! It's going great, thanks for asking! Just finished a really productive morning. How about you?",
    timestamp: "10:32 AM",
    isOwn: true
  },
  {
    id: 3,
    conversationId: 1,
    senderId: 2,
    text: "That sounds wonderful! I'm having a good day too. Just got back from a coffee run ☕️",
    timestamp: "10:35 AM",
    isOwn: false
  }
];

// Provider component
export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(sampleUsers);
  const [posts, setPosts] = useState<Post[]>(samplePosts);
  const [conversations, setConversations] = useState<Conversation[]>(sampleConversations);
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [savedPosts, setSavedPosts] = useState<Post[]>([]);
  const [likedPosts, setLikedPosts] = useState<Post[]>([]);

  const currentUser = users[0]; // Anshu Verma

  const updateUser = (userId: number, updates: Partial<User>) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, ...updates } : user
    ));
  };

  const addPost = (post: Omit<Post, 'id'>) => {
    const newPost = { ...post, id: Math.max(...posts.map(p => p.id)) + 1 };
    setPosts(prev => [newPost, ...prev]);
  };

  const likePost = (postId: number) => {
    setPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
    const post = posts.find(p => p.id === postId);
    if (post && !likedPosts.find(p => p.id === postId)) {
      setLikedPosts(prev => [...prev, post]);
    }
  };

  const unlikePost = (postId: number) => {
    setPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, likes: Math.max(0, post.likes - 1) } : post
    ));
    setLikedPosts(prev => prev.filter(p => p.id !== postId));
  };

  const savePost = (postId: number) => {
    const post = posts.find(p => p.id === postId);
    if (post && !savedPosts.find(p => p.id === postId)) {
      setSavedPosts(prev => [...prev, post]);
    }
  };

  const unsavePost = (postId: number) => {
    setSavedPosts(prev => prev.filter(p => p.id !== postId));
  };

  const sendMessage = (conversationId: number, text: string) => {
    const newMessage: Message = {
      id: Math.max(...messages.map(m => m.id)) + 1,
      conversationId,
      senderId: currentUser.id,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true
    };
    setMessages(prev => [...prev, newMessage]);
    
    // Update conversation
    setConversations(prev => prev.map(conv => 
      conv.id === conversationId 
        ? { ...conv, lastMessage: text, lastMessageTime: 'Just now', unreadCount: 0 }
        : conv
    ));
  };

  const value: DataContextType = {
    currentUser,
    users,
    posts,
    conversations,
    messages,
    savedPosts,
    likedPosts,
    updateUser,
    addPost,
    likePost,
    unlikePost,
    savePost,
    unsavePost,
    sendMessage
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to use the data context
export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
