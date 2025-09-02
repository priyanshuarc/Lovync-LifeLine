// Environment Configuration
export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_TEST: process.env.NODE_ENV === 'test',
};

// API Configuration
export const API_CONFIG = {
  // Base URLs for different environments
  BASE_URLS: {
    development: 'http://localhost:3001/api',
    production: 'https://api.lovync.com/api',
    test: 'http://localhost:3001/api',
  },
  
  // Current base URL based on environment
  get BASE_URL() {
    return this.BASE_URLS[ENV.NODE_ENV as keyof typeof this.BASE_URLS] || this.BASE_URLS.development;
  },
  
  // API endpoints
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      SIGNUP: '/auth/signup',
      LOGOUT: '/auth/logout',
      REFRESH: '/auth/refresh',
      VERIFY_EMAIL: '/auth/verify-email',
      FORGOT_PASSWORD: '/auth/forgot-password',
      RESET_PASSWORD: '/auth/reset-password',
    },
    USERS: {
      ME: '/users/me',
      BY_ID: '/users/:id',
      BY_USERNAME: '/users/username/:username',
      UPDATE: '/users/:id',
      AVATAR: '/users/:id/avatar',
      FOLLOW: '/users/:id/follow',
      UNFOLLOW: '/users/:id/unfollow',
      FOLLOWERS: '/users/:id/followers',
      FOLLOWING: '/users/:id/following',
      ANALYTICS: '/users/:id/analytics',
      SETTINGS: '/users/:id/settings',
    },
    POSTS: {
      LIST: '/posts',
      BY_ID: '/posts/:id',
      CREATE: '/users/:id/posts',
      UPDATE: '/posts/:id',
      DELETE: '/posts/:id',
      LIKE: '/posts/:id/like',
      UNLIKE: '/posts/:id/unlike',
      BOOKMARK: '/posts/:id/bookmark',
      UNBOOKMARK: '/posts/:id/unbookmark',
      SHARE: '/posts/:id/share',
      COMMENTS: '/posts/:id/comments',
      ANALYTICS: '/posts/:id/analytics',
    },
    COMMENTS: {
      CREATE: '/posts/:postId/comments',
      UPDATE: '/comments/:id',
      DELETE: '/comments/:id',
      LIKE: '/comments/:id/like',
    },
    MESSAGES: {
      CONVERSATIONS: '/users/:id/conversations',
      MESSAGES: '/conversations/:id/messages',
      SEND: '/conversations/:id/messages',
      READ: '/messages/:id/read',
      DELETE: '/messages/:id',
    },
    SEARCH: {
      GLOBAL: '/search',
      USERS: '/search/users',
      POSTS: '/search/posts',
    },
    NOTIFICATIONS: {
      LIST: '/users/:id/notifications',
      READ: '/notifications/:id/read',
      READ_ALL: '/users/:id/notifications/read-all',
    },
    UPLOAD: '/upload',
    HEALTH: '/health',
  },
  
  // Request configuration
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
  
  // Headers
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  
  // File upload limits
  UPLOAD_LIMITS: {
    IMAGE: {
      MAX_SIZE: 5 * 1024 * 1024, // 5MB
      ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    },
    VIDEO: {
      MAX_SIZE: 50 * 1024 * 1024, // 50MB
      ALLOWED_TYPES: ['video/mp4', 'video/webm', 'video/ogg'],
    },
    AUDIO: {
      MAX_SIZE: 10 * 1024 * 1024, // 10MB
      ALLOWED_TYPES: ['audio/mp3', 'audio/wav', 'audio/ogg'],
    },
    DOCUMENT: {
      MAX_SIZE: 10 * 1024 * 1024, // 10MB
      ALLOWED_TYPES: ['application/pdf', 'text/plain', 'application/msword'],
    },
  },
};

// Database Configuration (for future use with Supabase, Firebase, etc.)
export const DB_CONFIG = {
  // Supabase Configuration
  SUPABASE: {
    URL: process.env.REACT_APP_SUPABASE_URL || '',
    ANON_KEY: process.env.REACT_APP_SUPABASE_ANON_KEY || '',
    SERVICE_ROLE_KEY: process.env.REACT_APP_SUPABASE_SERVICE_ROLE_KEY || '',
  },
  
  // Firebase Configuration
  FIREBASE: {
    API_KEY: process.env.REACT_APP_FIREBASE_API_KEY || '',
    AUTH_DOMAIN: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || '',
    PROJECT_ID: process.env.REACT_APP_FIREBASE_PROJECT_ID || '',
    STORAGE_BUCKET: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || '',
    MESSAGING_SENDER_ID: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || '',
    APP_ID: process.env.REACT_APP_FIREBASE_APP_ID || '',
  },
  
  // Local Storage Configuration
  LOCAL_STORAGE: {
    AUTH_TOKEN_KEY: 'auth_token',
    USER_DATA_KEY: 'user_data',
    THEME_KEY: 'theme_preference',
    LANGUAGE_KEY: 'language_preference',
    SETTINGS_KEY: 'user_settings',
  },
};

// Feature Flags
export const FEATURE_FLAGS = {
  ENABLE_REAL_TIME_MESSAGING: true,
  ENABLE_PUSH_NOTIFICATIONS: true,
  ENABLE_ANALYTICS: true,
  ENABLE_SEARCH_SUGGESTIONS: true,
  ENABLE_AUTO_SAVE_DRAFTS: true,
  ENABLE_OFFLINE_MODE: false,
  ENABLE_SOCIAL_LOGIN: false,
  ENABLE_TWO_FACTOR_AUTH: false,
  ENABLE_END_TO_END_ENCRYPTION: false,
};

// App Configuration
export const APP_CONFIG = {
  NAME: 'Lovync',
  VERSION: '1.0.0',
  DESCRIPTION: 'Building the future of social connection',
  
  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 100,
    DEFAULT_POSTS_LIMIT: 20,
    DEFAULT_COMMENTS_LIMIT: 20,
    DEFAULT_MESSAGES_LIMIT: 50,
    DEFAULT_USERS_LIMIT: 20,
  },
  
  // Cache Configuration
  CACHE: {
    USER_CACHE_TTL: 5 * 60 * 1000, // 5 minutes
    POST_CACHE_TTL: 2 * 60 * 1000, // 2 minutes
    SEARCH_CACHE_TTL: 1 * 60 * 1000, // 1 minute
    MAX_CACHE_SIZE: 100, // Maximum number of items in cache
  },
  
  // Validation Rules
  VALIDATION: {
    USERNAME: {
      MIN_LENGTH: 3,
      MAX_LENGTH: 30,
      PATTERN: /^[a-zA-Z0-9_]+$/,
    },
    PASSWORD: {
      MIN_LENGTH: 8,
      REQUIRE_UPPERCASE: true,
      REQUIRE_LOWERCASE: true,
      REQUIRE_NUMBERS: true,
      REQUIRE_SPECIAL_CHARS: false,
    },
    POST: {
      MAX_CONTENT_LENGTH: 1000,
      MAX_TAGS: 10,
      MAX_TAG_LENGTH: 20,
    },
    MESSAGE: {
      MAX_CONTENT_LENGTH: 1000,
    },
  },
  
  // UI Configuration
  UI: {
    THEMES: ['light', 'dark', 'auto'] as const,
    LANGUAGES: ['en', 'es', 'fr', 'de', 'hi', 'zh'] as const,
    DEFAULT_THEME: 'light' as const,
    DEFAULT_LANGUAGE: 'en' as const,
    
    // Animation durations
    ANIMATION_DURATION: {
      FAST: 150,
      NORMAL: 300,
      SLOW: 500,
    },
    
    // Breakpoints
    BREAKPOINTS: {
      MOBILE: 640,
      TABLET: 768,
      DESKTOP: 1024,
      LARGE_DESKTOP: 1280,
    },
  },
  
  // Security Configuration
  SECURITY: {
    SESSION_TIMEOUT: 24 * 60 * 60 * 1000, // 24 hours
    MAX_LOGIN_ATTEMPTS: 5,
    LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutes
    PASSWORD_EXPIRY_DAYS: 90,
    REQUIRE_EMAIL_VERIFICATION: true,
    REQUIRE_PHONE_VERIFICATION: false,
  },
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK: {
    CONNECTION_FAILED: 'Connection failed. Please check your internet connection.',
    TIMEOUT: 'Request timed out. Please try again.',
    SERVER_ERROR: 'Server error. Please try again later.',
    UNAUTHORIZED: 'You are not authorized to perform this action.',
    FORBIDDEN: 'Access denied.',
    NOT_FOUND: 'The requested resource was not found.',
    VALIDATION_ERROR: 'Please check your input and try again.',
  },
  AUTH: {
    INVALID_CREDENTIALS: 'Invalid email or password.',
    ACCOUNT_LOCKED: 'Account is temporarily locked due to multiple failed attempts.',
    EMAIL_NOT_VERIFIED: 'Please verify your email address before logging in.',
    SESSION_EXPIRED: 'Your session has expired. Please log in again.',
    WEAK_PASSWORD: 'Password is too weak. Please choose a stronger password.',
    USERNAME_TAKEN: 'Username is already taken. Please choose another one.',
    EMAIL_TAKEN: 'Email is already registered. Please use a different email.',
  },
  UPLOAD: {
    FILE_TOO_LARGE: 'File is too large. Please choose a smaller file.',
    INVALID_FILE_TYPE: 'Invalid file type. Please choose a supported file format.',
    UPLOAD_FAILED: 'Upload failed. Please try again.',
  },
  GENERAL: {
    UNKNOWN_ERROR: 'An unknown error occurred. Please try again.',
    OPERATION_FAILED: 'Operation failed. Please try again.',
    PERMISSION_DENIED: 'You don\'t have permission to perform this action.',
  },
};

// Success Messages
export const SUCCESS_MESSAGES = {
  AUTH: {
    LOGIN_SUCCESS: 'Successfully logged in!',
    SIGNUP_SUCCESS: 'Account created successfully! Please verify your email.',
    LOGOUT_SUCCESS: 'Successfully logged out!',
    PASSWORD_RESET: 'Password reset successfully!',
    PROFILE_UPDATED: 'Profile updated successfully!',
  },
  POSTS: {
    CREATED: 'Post created successfully!',
    UPDATED: 'Post updated successfully!',
    DELETED: 'Post deleted successfully!',
    LIKED: 'Post liked!',
    UNLIKED: 'Post unliked!',
    BOOKMARKED: 'Post bookmarked!',
    UNBOOKMARKED: 'Post removed from bookmarks!',
  },
  USERS: {
    FOLLOWED: 'User followed successfully!',
    UNFOLLOWED: 'User unfollowed successfully!',
    BLOCKED: 'User blocked successfully!',
    UNBLOCKED: 'User unblocked successfully!',
  },
  MESSAGES: {
    SENT: 'Message sent successfully!',
    DELETED: 'Message deleted successfully!',
  },
  GENERAL: {
    SAVED: 'Changes saved successfully!',
    UPDATED: 'Updated successfully!',
    DELETED: 'Deleted successfully!',
  },
};

// Export all configurations
export default {
  ENV,
  API_CONFIG,
  DB_CONFIG,
  FEATURE_FLAGS,
  APP_CONFIG,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
};


