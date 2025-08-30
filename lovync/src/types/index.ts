// Core User Types
export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  bio?: string;
  avatar: string;
  verified: boolean;
  isCEO?: boolean;
  followers: number;
  following: number;
  posts: number;
  location?: string;
  website?: string;
  joinedDate: string;
  isPrivate: boolean;
  isOnline: boolean;
  lastSeen: string;
  createdAt: string;
  updatedAt: string;
}

// Post Types
export interface Post {
  id: string;
  userId: string;
  type: 'text' | 'image' | 'video' | 'story' | 'highlight';
  content: string;
  media?: {
    type: 'image' | 'video';
    url: string;
    thumbnail?: string;
    duration?: string;
    alt?: string;
  };
  tags: string[];
  category: string;
  likes: number;
  comments: number;
  shares: number;
  views: number;
  isLiked: boolean;
  isBookmarked: boolean;
  isShared: boolean;
  isEdited: boolean;
  editedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Comment Types
export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  likes: number;
  replies: number;
  parentId?: string;
  isEdited: boolean;
  editedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Message Types
export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  type: 'text' | 'image' | 'video' | 'audio' | 'file';
  content: string;
  mediaUrl?: string;
  fileName?: string;
  fileSize?: string;
  replyTo?: {
    messageId: string;
    content: string;
    senderName: string;
  };
  reactions: { [emoji: string]: string[] };
  isRead: boolean;
  isEdited: boolean;
  isForwarded: boolean;
  forwardedFrom?: string;
  editedAt?: string;
  createdAt: string;
}

// Conversation Types
export interface Conversation {
  id: string;
  participants: string[];
  lastMessage: Message;
  unreadCount: number;
  isMuted: boolean;
  isPinned: boolean;
  isArchived: boolean;
  nickname?: string;
  createdAt: string;
  updatedAt: string;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'message' | 'verification';
  title: string;
  message: string;
  data: {
    postId?: string;
    commentId?: string;
    userId?: string;
    conversationId?: string;
  };
  isRead: boolean;
  createdAt: string;
}

// Search Types
export interface SearchResult {
  users: User[];
  posts: Post[];
  tags: string[];
  categories: string[];
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Filter and Sort Types
export interface PostFilters {
  category?: string;
  tags?: string[];
  userId?: string;
  type?: Post['type'];
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface SortOptions {
  field: 'createdAt' | 'likes' | 'comments' | 'views' | 'updatedAt';
  order: 'asc' | 'desc';
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
}

export interface SignupForm {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  name: string;
}

export interface ProfileUpdateForm {
  name?: string;
  username?: string;
  bio?: string;
  avatar?: string;
  location?: string;
  website?: string;
  isPrivate?: boolean;
}

export interface PostCreateForm {
  type: Post['type'];
  content: string;
  media?: File;
  tags: string[];
  category: string;
}

// State Types
export interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface PostState {
  posts: Post[];
  currentPost: Post | null;
  isLoading: boolean;
  error: string | null;
  filters: PostFilters;
  sortOptions: SortOptions;
}

export interface MessageState {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

// Event Types
export interface UserEvent {
  type: 'online' | 'offline' | 'typing' | 'post_created' | 'profile_updated';
  userId: string;
  data?: any;
  timestamp: string;
}

// Analytics Types
export interface UserAnalytics {
  userId: string;
  totalPosts: number;
  totalLikes: number;
  totalComments: number;
  totalViews: number;
  followersGrowth: number;
  engagementRate: number;
  topPosts: string[];
  activeHours: number[];
  createdAt: string;
  updatedAt: string;
}

// Settings Types
export interface UserSettings {
  userId: string;
  notifications: {
    likes: boolean;
    comments: boolean;
    follows: boolean;
    mentions: boolean;
    messages: boolean;
    verification: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private' | 'followers';
    showOnlineStatus: boolean;
    showLastSeen: boolean;
    allowMessages: 'everyone' | 'followers' | 'none';
  };
  theme: 'light' | 'dark' | 'auto';
  language: string;
  timezone: string;
  createdAt: string;
  updatedAt: string;
}
