import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { 
  User, 
  Post, 
  Comment, 
  Message, 
  Conversation, 
  Notification,
  PostFilters,
  SortOptions,
  ProfileUpdateForm,
  PostCreateForm
} from '../types';
import { apiService } from '../services/api';
import { sampleUsers, samplePosts, sampleConversations, sampleMessages } from '../data/sampleData';

// Action Types
type Action =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_AUTHENTICATED'; payload: boolean }
  | { type: 'SET_POSTS'; payload: Post[] }
  | { type: 'ADD_POST'; payload: Post }
  | { type: 'UPDATE_POST'; payload: Post }
  | { type: 'DELETE_POST'; payload: string }
  | { type: 'SET_CONVERSATIONS'; payload: Conversation[] }
  | { type: 'SET_MESSAGES'; payload: Message[] }
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'UPDATE_MESSAGE'; payload: Message }
  | { type: 'DELETE_MESSAGE'; payload: string }
  | { type: 'SET_POST_FILTERS'; payload: PostFilters }
  | { type: 'SET_SORT_OPTIONS'; payload: SortOptions }
  | { type: 'LIKE_POST'; payload: { postId: string; userId: string } }
  | { type: 'UNLIKE_POST'; payload: { postId: string; userId: string } }
  | { type: 'BOOKMARK_POST'; payload: { postId: string; userId: string } }
  | { type: 'UNBOOKMARK_POST'; payload: { postId: string; userId: string } }
  | { type: 'FOLLOW_USER'; payload: { userId: string; targetUserId: string } }
  | { type: 'UNFOLLOW_USER'; payload: { userId: string; targetUserId: string } }
  | { type: 'UPDATE_USER_PROFILE'; payload: User }
  | { type: 'UPDATE_USER_IN_LIST'; payload: User }
  | { type: 'CLEAR_DATA' };

// Define the state type to allow user to be null
type AppState = {
  // App State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Posts State
  posts: Post[];
  currentPost: Post | null;
  postFilters: PostFilters;
  sortOptions: SortOptions;
  
  // Messages State
  conversations: Conversation[];
  currentConversation: Conversation | null;
  messages: Message[];
  
  // Cached Data
  users: User[];
  savedPosts: Post[];
  likedPosts: Post[];
};

// Initial State
const initialState: AppState = {
  // App State
  user: sampleUsers[0], // Set default user to Priyanshu Pandey
  isAuthenticated: true, // Set to true for demo purposes
  isLoading: false,
  error: null,
  
  // Posts State
  posts: samplePosts,
  currentPost: null,
  postFilters: {
    category: undefined,
    tags: [],
    userId: undefined,
    type: undefined,
    dateRange: undefined,
  },
  sortOptions: {
    field: 'createdAt' as const,
    order: 'desc' as const,
  },
  
  // Messages State
  conversations: sampleConversations,
  currentConversation: null,
  messages: sampleMessages,
  
  // Cached Data
  users: sampleUsers,
  savedPosts: [],
  likedPosts: [],
};

// Reducer
function dataReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'SET_USER':
      return { ...state, user: action.payload };
    
    case 'SET_AUTHENTICATED':
      return { ...state, isAuthenticated: action.payload };
    
    case 'SET_POSTS':
      return { ...state, posts: action.payload };
    
    case 'ADD_POST':
      return { ...state, posts: [action.payload, ...state.posts] };
    
    case 'UPDATE_POST':
      return {
        ...state,
        posts: state.posts.map(post => 
          post.id === action.payload.id ? action.payload : post
        )
      };
    
    case 'DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload)
      };
    
    case 'SET_CONVERSATIONS':
      return { ...state, conversations: action.payload };
    
    case 'SET_MESSAGES':
      return { ...state, messages: action.payload };
    
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    
    case 'UPDATE_MESSAGE':
      return {
        ...state,
        messages: state.messages.map(message => 
          message.id === action.payload.id ? action.payload : message
        )
      };
    
    case 'DELETE_MESSAGE':
      return {
        ...state,
        messages: state.messages.filter(message => message.id !== action.payload)
      };
    
    case 'SET_POST_FILTERS':
      return { ...state, postFilters: action.payload };
    
    case 'SET_SORT_OPTIONS':
      return { ...state, sortOptions: action.payload };
    
    case 'LIKE_POST':
      return {
        ...state,
        posts: state.posts.map(post => 
          post.id === action.payload.postId 
            ? { ...post, isLiked: true, likes: post.likes + 1 }
            : post
        )
      };
    
    case 'UNLIKE_POST':
      return {
        ...state,
        posts: state.posts.map(post => 
          post.id === action.payload.postId 
            ? { ...post, isLiked: false, likes: Math.max(0, post.likes - 1) }
            : post
        )
      };
    
    case 'BOOKMARK_POST':
      return {
        ...state,
        posts: state.posts.map(post => 
          post.id === action.payload.postId 
            ? { ...post, isBookmarked: true }
            : post
        )
      };
    
    case 'UNBOOKMARK_POST':
      return {
        ...state,
        posts: state.posts.map(post => 
          post.id === action.payload.postId 
            ? { ...post, isBookmarked: false }
            : post
        )
      };
    
    case 'FOLLOW_USER':
      return {
        ...state,
        users: state.users.map(user => 
          user.id === action.payload.targetUserId 
            ? { ...user, followers: user.followers + 1 }
            : user
        )
      };
    
    case 'UNFOLLOW_USER':
      return {
        ...state,
        users: state.users.map(user => 
          user.id === action.payload.targetUserId 
            ? { ...user, followers: Math.max(0, user.followers - 1) }
            : user
        )
      };
    
    case 'UPDATE_USER_PROFILE':
      return { ...state, user: action.payload };
    
    case 'UPDATE_USER_IN_LIST':
      return {
        ...state,
        users: state.users.map(user => 
          user.id === action.payload.id ? action.payload : user
        )
      };
    
    case 'CLEAR_DATA':
      return initialState;
    
    default:
      return state;
  }
}

// Context Interface
interface DataContextType {
  // State
  state: AppState;
  dispatch: React.Dispatch<Action>;
  currentUser: User | null;
  users: User[];
  posts: Post[];
  conversations: Conversation[];
  messages: Message[];
  savedPosts: Post[];
  likedPosts: Post[];
  isLoading: boolean;
  error: string | null;
  
  // Auth Methods
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: any) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  
  // Post Methods
  fetchPosts: (filters?: PostFilters, sortOptions?: SortOptions, page?: number) => Promise<void>;
  createPost: (postData: PostCreateForm) => Promise<boolean>;
  updatePost: (postId: string, data: Partial<PostCreateForm>) => Promise<boolean>;
  deletePost: (postId: string) => Promise<boolean>;
  likePost: (postId: string) => Promise<boolean>;
  unlikePost: (postId: string) => Promise<boolean>;
  bookmarkPost: (postId: string) => Promise<boolean>;
  unbookmarkPost: (postId: string) => Promise<boolean>;
  
  // User Methods
  fetchUser: (userId: string) => Promise<User | null>;
  updateProfile: (data: ProfileUpdateForm) => Promise<boolean>;
  updateUser: (userId: string, data: Partial<User>) => Promise<boolean>;
  followUser: (targetUserId: string) => Promise<boolean>;
  unfollowUser: (targetUserId: string) => Promise<boolean>;
  
  // Message Methods
  fetchConversations: () => Promise<void>;
  fetchMessages: (conversationId: string) => Promise<void>;
  sendMessage: (conversationId: string, content: string, type?: Message['type']) => Promise<boolean>;
  
  // Utility Methods
  getUserById: (userId: string) => User | null;
  getPostById: (postId: string) => Post | null;
  clearError: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Provider Component
interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  // Initialize on mount
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      apiService.setToken(token);
      refreshUser();
    }
  }, []);

  // API Methods
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
      const response = await apiService.login({ email, password });
      
      if (response.success && response.data) {
        apiService.setToken(response.data.token);
        dispatch({ type: 'SET_USER', payload: response.data.user });
        dispatch({ type: 'SET_AUTHENTICATED', payload: true });
        return true;
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Login failed' });
        return false;
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Login failed' });
      return false;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const signup = async (userData: any): Promise<boolean> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
      const response = await apiService.signup(userData);
      
      if (response.success && response.data) {
        apiService.setToken(response.data.token);
        dispatch({ type: 'SET_USER', payload: response.data.user });
        dispatch({ type: 'SET_AUTHENTICATED', payload: true });
        return true;
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error || 'Signup failed' });
        return false;
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Signup failed' });
      return false;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await apiService.logout();
    } finally {
      apiService.clearToken();
      dispatch({ type: 'CLEAR_DATA' });
    }
  };

  const refreshUser = async (): Promise<void> => {
    try {
      const response = await apiService.getCurrentUser();
      
      if (response.success && response.data) {
        dispatch({ type: 'SET_USER', payload: response.data });
        dispatch({ type: 'SET_AUTHENTICATED', payload: true });
      } else {
        dispatch({ type: 'SET_AUTHENTICATED', payload: false });
      }
    } catch (error) {
      dispatch({ type: 'SET_AUTHENTICATED', payload: false });
    }
  };

  // Post Methods
  const fetchPosts = async (filters?: PostFilters, sortOptions?: SortOptions, page = 1): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const response = await apiService.getPosts(
        filters || state.postFilters,
        sortOptions || state.sortOptions,
        page
      );
      
      if (response.success && response.data) {
        dispatch({ type: 'SET_POSTS', payload: response.data.data });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch posts' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const createPost = async (postData: PostCreateForm): Promise<boolean> => {
    if (!state.user) return false;
    
    try {
      const response = await apiService.createPost(state.user.id, postData);
      
      if (response.success && response.data) {
        dispatch({ type: 'ADD_POST', payload: response.data });
        return true;
      }
      return false;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to create post' });
      return false;
    }
  };

  const updatePost = async (postId: string, data: Partial<PostCreateForm>): Promise<boolean> => {
    try {
      const response = await apiService.updatePost(postId, data);
      
      if (response.success && response.data) {
        dispatch({ type: 'UPDATE_POST', payload: response.data });
        return true;
      }
      return false;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update post' });
      return false;
    }
  };

  const deletePost = async (postId: string): Promise<boolean> => {
    try {
      const response = await apiService.deletePost(postId);
      
      if (response.success) {
        dispatch({ type: 'DELETE_POST', payload: postId });
        return true;
      }
      return false;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to delete post' });
      return false;
    }
  };

  const likePost = async (postId: string): Promise<boolean> => {
    if (!state.user) return false;
    
    try {
      const response = await apiService.likePost(postId, state.user.id);
      
      if (response.success) {
        dispatch({ type: 'LIKE_POST', payload: { postId, userId: state.user!.id } });
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const unlikePost = async (postId: string): Promise<boolean> => {
    if (!state.user) return false;
    
    try {
      const response = await apiService.unlikePost(postId, state.user.id);
      
      if (response.success) {
        dispatch({ type: 'UNLIKE_POST', payload: { postId, userId: state.user!.id } });
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const bookmarkPost = async (postId: string): Promise<boolean> => {
    if (!state.user) return false;
    
    try {
      const response = await apiService.bookmarkPost(postId, state.user.id);
      
      if (response.success) {
        dispatch({ type: 'BOOKMARK_POST', payload: { postId, userId: state.user!.id } });
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const unbookmarkPost = async (postId: string): Promise<boolean> => {
    if (!state.user) return false;
    
    try {
      const response = await apiService.unbookmarkPost(postId, state.user.id);
      
      if (response.success) {
        dispatch({ type: 'UNBOOKMARK_POST', payload: { postId, userId: state.user!.id } });
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  // User Methods
  const fetchUser = async (userId: string): Promise<User | null> => {
    try {
      const response = await apiService.getUserById(userId);
      return response.success && response.data ? response.data : null;
    } catch (error) {
      return null;
    }
  };

  const updateProfile = async (data: ProfileUpdateForm): Promise<boolean> => {
    if (!state.user) return false;
    
    try {
      const response = await apiService.updateProfile(state.user.id, data);
      
      if (response.success && response.data) {
        dispatch({ type: 'UPDATE_USER_PROFILE', payload: response.data });
        dispatch({ type: 'UPDATE_USER_IN_LIST', payload: response.data });
        return true;
      }
      return false;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update profile' });
      return false;
    }
  };

  const updateUser = async (userId: string, data: Partial<User>): Promise<boolean> => {
    try {
      const response = await apiService.updateProfile(userId, data as ProfileUpdateForm);
      
      if (response.success && response.data) {
        if (state.user && state.user.id === userId) {
          dispatch({ type: 'UPDATE_USER_PROFILE', payload: response.data });
        }
        dispatch({ type: 'UPDATE_USER_IN_LIST', payload: response.data });
        return true;
      }
      return false;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update user' });
      return false;
    }
  };

  const followUser = async (targetUserId: string): Promise<boolean> => {
    if (!state.user) return false;
    
    try {
      const response = await apiService.followUser(state.user.id, targetUserId);
      
      if (response.success) {
        dispatch({ type: 'FOLLOW_USER', payload: { userId: state.user.id, targetUserId } });
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const unfollowUser = async (targetUserId: string): Promise<boolean> => {
    if (!state.user) return false;
    
    try {
      const response = await apiService.unfollowUser(state.user.id, targetUserId);
      
      if (response.success) {
        dispatch({ type: 'UNFOLLOW_USER', payload: { userId: state.user.id, targetUserId } });
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  // Message Methods
  const fetchConversations = async (): Promise<void> => {
    try {
      const response = await apiService.getConversations();
      
      if (response.success && response.data) {
        dispatch({ type: 'SET_CONVERSATIONS', payload: response.data });
      }
    } catch (error) {
      // Handle error silently for now
    }
  };

  const fetchMessages = async (conversationId: string): Promise<void> => {
    try {
      const response = await apiService.getMessages(conversationId);
      
      if (response.success && response.data) {
        dispatch({ type: 'SET_MESSAGES', payload: response.data.data });
      }
    } catch (error) {
      // Handle error silently for now
    }
  };

  const sendMessage = async (conversationId: string, content: string, type: Message['type'] = 'text'): Promise<boolean> => {
    if (!state.user) return false;
    
    try {
      const response = await apiService.sendMessage(conversationId, state.user.id, content, type);
      
      if (response.success && response.data) {
        dispatch({ type: 'ADD_MESSAGE', payload: response.data });
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  // Utility Methods
  const getUserById = (userId: string): User | null => {
    return state.users.find(user => user.id === userId) || null;
  };

  const getPostById = (postId: string): Post | null => {
    return state.posts.find(post => post.id === postId) || null;
  };

  const clearError = () => {
    dispatch({ type: 'SET_ERROR', payload: null });
  };

  const value: DataContextType = {
    state,
    dispatch,
    currentUser: state.user,
    users: state.users,
    posts: state.posts,
    conversations: state.conversations,
    messages: state.messages,
    savedPosts: state.savedPosts,
    likedPosts: state.likedPosts,
    isLoading: state.isLoading,
    error: state.error,
    login,
    signup,
    logout,
    refreshUser,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
    likePost,
    unlikePost,
    bookmarkPost,
    unbookmarkPost,
    fetchUser,
    updateProfile,
    updateUser,
    followUser,
    unfollowUser,
    fetchConversations,
    fetchMessages,
    sendMessage,
    getUserById,
    getPostById,
    clearError,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

// Hook
export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
