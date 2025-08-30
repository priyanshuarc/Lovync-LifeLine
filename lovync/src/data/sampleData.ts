import { User, Post, Comment, Message, Conversation, Notification } from '../types';

// Sample Users Data
export const sampleUsers: User[] = [
  {
    id: '1',
    username: 'priyanshu_pandey',
    email: 'priyanshu@lovync.com',
    name: 'Priyanshu Pandey',
    bio: 'CEO of Lovync & Founder 🚀 | Building the future of social connection. Leading innovation and meaningful relationships.',
    avatar: '/logo.svg',
    verified: true,
    isCEO: true,
    followers: 15000,
    following: 250,
    posts: 500,
    location: 'Digital World',
    website: 'lovync.com',
    joinedDate: '2024-01-01',
    isPrivate: false,
    isOnline: true,
    lastSeen: new Date().toISOString(),
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    username: 'sarah_johnson',
    email: 'sarah@example.com',
    name: 'Sarah Johnson',
    bio: 'Digital creator & tech enthusiast. Building amazing experiences one pixel at a time. ✨',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    verified: true,
    isCEO: false,
    followers: 15420,
    following: 892,
    posts: 156,
    location: 'San Francisco, CA',
    website: 'https://sarahjohnson.com',
    joinedDate: '2022-03-15',
    isPrivate: false,
    isOnline: true,
    lastSeen: new Date().toISOString(),
    createdAt: '2022-03-15T00:00:00Z',
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    username: 'mike_chen',
    email: 'mike@example.com',
    name: 'Mike Chen',
    bio: 'Software engineer passionate about clean code and user experience. Building the future, one commit at a time.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    verified: false,
    isCEO: false,
    followers: 3240,
    following: 156,
    posts: 89,
    location: 'Seattle, WA',
    website: 'https://mikechen.dev',
    joinedDate: '2023-06-20',
    isPrivate: false,
    isOnline: false,
    lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    createdAt: '2023-06-20T00:00:00Z',
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    username: 'emma_davis',
    email: 'emma@example.com',
    name: 'Emma Davis',
    bio: 'Creative designer and art director. Making the world more beautiful through thoughtful design.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    verified: true,
    isCEO: false,
    followers: 8760,
    following: 234,
    posts: 203,
    location: 'New York, NY',
    website: 'https://emmadavis.design',
    joinedDate: '2022-09-10',
    isPrivate: false,
    isOnline: true,
    lastSeen: new Date().toISOString(),
    createdAt: '2022-09-10T00:00:00Z',
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    username: 'alex_rodriguez',
    email: 'alex@example.com',
    name: 'Alex Rodriguez',
    bio: 'Marketing strategist and growth hacker. Helping brands reach their full potential.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    verified: false,
    isCEO: false,
    followers: 5430,
    following: 189,
    posts: 67,
    location: 'Miami, FL',
    website: 'https://alexrodriguez.com',
    joinedDate: '2023-01-15',
    isPrivate: false,
    isOnline: false,
    lastSeen: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    createdAt: '2023-01-15T00:00:00Z',
    updatedAt: new Date().toISOString(),
  },
];

// Sample Posts Data
export const samplePosts: Post[] = [
  {
    id: '1',
    userId: '1',
    type: 'text',
    content: 'As CEO & Founder of Lovync, I\'m proud to announce our revolutionary social platform! The future of meaningful connections is here 🚀 #Lovync #CEO #Innovation',
    tags: ['#TechLaunch', '#Innovation', '#UI/UX'],
    category: 'technology',
    likes: 1247,
    comments: 89,
    shares: 156,
    views: 15420,
    isLiked: false,
    isBookmarked: false,
    isShared: false,
    isEdited: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    userId: '1',
    type: 'image',
    content: 'Behind the scenes of our latest feature development. The team has been working tirelessly to bring you the best experience possible! 💪',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      alt: 'Team working on development',
    },
    tags: ['#Development', '#TeamWork', '#Innovation'],
    category: 'technology',
    likes: 892,
    comments: 45,
    shares: 78,
    views: 8920,
    isLiked: false,
    isBookmarked: false,
    isShared: false,
    isEdited: false,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    userId: '2',
    type: 'video',
    content: 'Just finished this amazing UI animation! What do you think? 🎨✨',
    media: {
      type: 'video',
      url: 'https://example.com/video1.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
      duration: '0:15',
      alt: 'UI animation showcase',
    },
    tags: ['#UI/UX', '#Animation', '#Design'],
    category: 'creative',
    likes: 567,
    comments: 23,
    shares: 34,
    views: 5670,
    isLiked: false,
    isBookmarked: false,
    isShared: false,
    isEdited: false,
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    userId: '3',
    type: 'text',
    content: 'Just deployed a major update to our backend system. The performance improvements are incredible! 🚀 #Backend #Performance #Deployment',
    tags: ['#Backend', '#Performance', '#Deployment'],
    category: 'technology',
    likes: 234,
    comments: 12,
    shares: 8,
    views: 2340,
    isLiked: false,
    isBookmarked: false,
    isShared: false,
    isEdited: false,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '5',
    userId: '4',
    type: 'image',
    content: 'New brand identity design for a tech startup. Clean, modern, and memorable! 🎯',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      alt: 'Brand identity design',
    },
    tags: ['#Branding', '#Design', '#Identity'],
    category: 'creative',
    likes: 423,
    comments: 18,
    shares: 25,
    views: 4230,
    isLiked: false,
    isBookmarked: false,
    isShared: false,
    isEdited: false,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
  },
];

// Sample Comments Data
export const sampleComments: Comment[] = [
  {
    id: '1',
    postId: '1',
    userId: '2',
    content: 'This is absolutely amazing! Can\'t wait to see what you\'ve built! 🎉',
    likes: 12,
    replies: 3,
    isEdited: false,
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    postId: '1',
    userId: '3',
    content: 'The platform looks incredible! Great work on the UI/UX.',
    likes: 8,
    replies: 1,
    isEdited: false,
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    postId: '2',
    userId: '4',
    content: 'Love seeing the behind-the-scenes! The attention to detail is impressive.',
    likes: 15,
    replies: 0,
    isEdited: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
];

// Sample Messages Data
export const sampleMessages: Message[] = [
  {
    id: '1',
    conversationId: '1',
    senderId: '2',
    type: 'text',
    content: 'Hey! How\'s the project going?',
    reactions: {},
    isRead: true,
    isEdited: false,
    isForwarded: false,
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    conversationId: '1',
    senderId: '1',
    type: 'text',
    content: 'It\'s going great! Almost finished with the design phase.',
    reactions: {},
    isRead: true,
    isEdited: false,
    isForwarded: false,
    createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    conversationId: '1',
    senderId: '2',
    type: 'text',
    content: 'That sounds amazing! Can\'t wait to see it.',
    reactions: {},
    isRead: true,
    isEdited: false,
    isForwarded: false,
    replyTo: {
      messageId: '2',
      content: 'It\'s going great! Almost finished with the design phase.',
      senderName: 'Priyanshu Pandey',
    },
    createdAt: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
  },
];

// Sample Conversations Data
export const sampleConversations: Conversation[] = [
  {
    id: '1',
    participants: ['1', '2'],
    lastMessage: sampleMessages[2],
    unreadCount: 0,
    isMuted: false,
    isPinned: false,
    isArchived: false,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    participants: ['1', '3'],
    lastMessage: {
      id: '4',
      conversationId: '2',
      senderId: '3',
      type: 'text',
      content: 'Thanks for the help yesterday!',
      reactions: {},
      isRead: false,
      isEdited: false,
      isForwarded: false,
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    },
    unreadCount: 1,
    isMuted: false,
    isPinned: false,
    isArchived: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
];

// Sample Notifications Data
export const sampleNotifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    type: 'like',
    title: 'New Like',
    message: 'Sarah Johnson liked your post',
    data: { postId: '1', userId: '2' },
    isRead: false,
    createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    userId: '1',
    type: 'comment',
    title: 'New Comment',
    message: 'Mike Chen commented on your post',
    data: { postId: '1', commentId: '2' },
    isRead: false,
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    userId: '1',
    type: 'follow',
    title: 'New Follower',
    message: 'Emma Davis started following you',
    data: { userId: '4' },
    isRead: true,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Helper function to get user by ID
export const getUserById = (userId: string): User | undefined => {
  return sampleUsers.find(user => user.id === userId);
};

// Helper function to get user by username
export const getUserByUsername = (username: string): User | undefined => {
  return sampleUsers.find(user => user.username === username);
};

// Helper function to get posts by user ID
export const getPostsByUserId = (userId: string): Post[] => {
  return samplePosts.filter(post => post.userId === userId);
};

// Helper function to get comments by post ID
export const getCommentsByPostId = (postId: string): Comment[] => {
  return sampleComments.filter(comment => comment.postId === postId);
};

// Helper function to get messages by conversation ID
export const getMessagesByConversationId = (conversationId: string): Message[] => {
  return sampleMessages.filter(message => message.conversationId === conversationId);
};

// Helper function to get notifications by user ID
export const getNotificationsByUserId = (userId: string): Notification[] => {
  return sampleNotifications.filter(notification => notification.userId === userId);
};

// Helper function to get conversations by user ID
export const getConversationsByUserId = (userId: string): Conversation[] => {
  return sampleConversations.filter(conversation => 
    conversation.participants.includes(userId)
  );
};
