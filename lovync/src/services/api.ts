import { 
  User, 
  Post, 
  Comment, 
  Message, 
  Conversation, 
  Notification, 
  SearchResult,
  ApiResponse,
  PaginatedResponse,
  PostFilters,
  SortOptions,
  ProfileUpdateForm,
  PostCreateForm,
  LoginForm,
  SignupForm
} from '../types';

// Base API Configuration
export const API_CONFIG = {
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// API Service Class
class ApiService {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  // Set authentication token
  setToken(token: string) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  // Get authentication token
  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('auth_token');
    }
    return this.token;
  }

  // Clear authentication token
  clearToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  // Generic request method
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const token = this.getToken();
      const url = `${this.baseURL}${endpoint}`;
      
      const config: RequestInit = {
        ...options,
        headers: {
          ...API_CONFIG.headers,
          ...(token && { Authorization: `Bearer ${token}` }),
          ...options.headers,
        },
      };

      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      return data;
    } catch (error) {
      console.error('API Request Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  // Authentication APIs
  async login(credentials: LoginForm): Promise<ApiResponse<{ user: User; token: string }>> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async signup(userData: SignupForm): Promise<ApiResponse<{ user: User; token: string }>> {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout(): Promise<ApiResponse<void>> {
    const response = await this.request('/auth/logout', { method: 'POST' });
    if (response.success) {
      this.clearToken();
    }
    return response as ApiResponse<void>;
  }

  async refreshToken(): Promise<ApiResponse<{ token: string }>> {
    return this.request('/auth/refresh', { method: 'POST' });
  }

  async verifyEmail(token: string): Promise<ApiResponse<void>> {
    return this.request(`/auth/verify-email?token=${token}`, { method: 'POST' });
  }

  async forgotPassword(email: string): Promise<ApiResponse<void>> {
    return this.request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async resetPassword(token: string, password: string): Promise<ApiResponse<void>> {
    return this.request('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
    });
  }

  // User APIs
  async getCurrentUser(): Promise<ApiResponse<User>> {
    return this.request('/users/me');
  }

  async getUserById(userId: string): Promise<ApiResponse<User>> {
    return this.request(`/users/${userId}`);
  }

  async getUserByUsername(username: string): Promise<ApiResponse<User>> {
    return this.request(`/users/username/${username}`);
  }

  async updateProfile(userId: string, data: ProfileUpdateForm): Promise<ApiResponse<User>> {
    return this.request(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async uploadAvatar(userId: string, file: File): Promise<ApiResponse<{ avatar: string }>> {
    const formData = new FormData();
    formData.append('avatar', file);

    return this.request(`/users/${userId}/avatar`, {
      method: 'POST',
      headers: {}, // Let browser set Content-Type for FormData
      body: formData,
    });
  }

  async followUser(userId: string, targetUserId: string): Promise<ApiResponse<void>> {
    return this.request(`/users/${userId}/follow`, {
      method: 'POST',
      body: JSON.stringify({ targetUserId }),
    });
  }

  async unfollowUser(userId: string, targetUserId: string): Promise<ApiResponse<void>> {
    return this.request(`/users/${userId}/unfollow`, {
      method: 'DELETE',
      body: JSON.stringify({ targetUserId }),
    });
  }

  async getFollowers(userId: string, page = 1, limit = 20): Promise<ApiResponse<PaginatedResponse<User>>> {
    return this.request(`/users/${userId}/followers?page=${page}&limit=${limit}`);
  }

  async getFollowing(userId: string, page = 1, limit = 20): Promise<ApiResponse<PaginatedResponse<User>>> {
    return this.request(`/users/${userId}/following?page=${page}&limit=${limit}`);
  }

  // Post APIs
  async getPosts(
    filters: PostFilters = {},
    sortOptions: SortOptions = { field: 'createdAt', order: 'desc' },
    page = 1,
    limit = 20
  ): Promise<ApiResponse<PaginatedResponse<Post>>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      sortField: sortOptions.field,
      sortOrder: sortOptions.order,
      ...(filters.category && { category: filters.category }),
      ...(filters.userId && { userId: filters.userId }),
      ...(filters.type && { type: filters.type }),
      ...(filters.tags && { tags: filters.tags.join(',') }),
    });

    return this.request(`/posts?${params}`);
  }

  async getPostById(postId: string): Promise<ApiResponse<Post>> {
    return this.request(`/posts/${postId}`);
  }

  async createPost(userId: string, postData: PostCreateForm): Promise<ApiResponse<Post>> {
    const formData = new FormData();
    formData.append('type', postData.type);
    formData.append('content', postData.content);
    formData.append('tags', JSON.stringify(postData.tags));
    formData.append('category', postData.category);
    
    if (postData.media) {
      formData.append('media', postData.media);
    }

    return this.request(`/users/${userId}/posts`, {
      method: 'POST',
      headers: {}, // Let browser set Content-Type for FormData
      body: formData,
    });
  }

  async updatePost(postId: string, data: Partial<PostCreateForm>): Promise<ApiResponse<Post>> {
    return this.request(`/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deletePost(postId: string): Promise<ApiResponse<void>> {
    return this.request(`/posts/${postId}`, { method: 'DELETE' });
  }

  async likePost(postId: string, userId: string): Promise<ApiResponse<void>> {
    return this.request(`/posts/${postId}/like`, {
      method: 'POST',
      body: JSON.stringify({ userId }),
    });
  }

  async unlikePost(postId: string, userId: string): Promise<ApiResponse<void>> {
    return this.request(`/posts/${postId}/unlike`, {
      method: 'DELETE',
      body: JSON.stringify({ userId }),
    });
  }

  async bookmarkPost(postId: string, userId: string): Promise<ApiResponse<void>> {
    return this.request(`/posts/${postId}/bookmark`, {
      method: 'POST',
      body: JSON.stringify({ userId }),
    });
  }

  async unbookmarkPost(postId: string, userId: string): Promise<ApiResponse<void>> {
    return this.request(`/posts/${postId}/unbookmark`, {
      method: 'DELETE',
      body: JSON.stringify({ userId }),
    });
  }

  async sharePost(postId: string, userId: string): Promise<ApiResponse<void>> {
    return this.request(`/posts/${postId}/share`, {
      method: 'POST',
      body: JSON.stringify({ userId }),
    });
  }

  // Comment APIs
  async getComments(postId: string, page = 1, limit = 20): Promise<ApiResponse<PaginatedResponse<Comment>>> {
    return this.request(`/posts/${postId}/comments?page=${page}&limit=${limit}`);
  }

  async createComment(postId: string, userId: string, content: string, parentId?: string): Promise<ApiResponse<Comment>> {
    return this.request(`/posts/${postId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ userId, content, parentId }),
    });
  }

  async updateComment(commentId: string, content: string): Promise<ApiResponse<Comment>> {
    return this.request(`/comments/${commentId}`, {
      method: 'PUT',
      body: JSON.stringify({ content }),
    });
  }

  async deleteComment(commentId: string): Promise<ApiResponse<void>> {
    return this.request(`/comments/${commentId}`, { method: 'DELETE' });
  }

  async likeComment(commentId: string, userId: string): Promise<ApiResponse<void>> {
    return this.request(`/comments/${commentId}/like`, {
      method: 'POST',
      body: JSON.stringify({ userId }),
    });
  }

  // Message APIs
  async getConversations(): Promise<ApiResponse<Conversation[]>> {
    return this.request('/conversations');
  }

  async getMessages(conversationId: string, page = 1, limit = 50): Promise<ApiResponse<PaginatedResponse<Message>>> {
    return this.request(`/conversations/${conversationId}/messages?page=${page}&limit=${limit}`);
  }

  async sendMessage(conversationId: string, senderId: string, content: string, type: Message['type'] = 'text'): Promise<ApiResponse<Message>> {
    return this.request(`/conversations/${conversationId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ senderId, content, type }),
    });
  }

  async markMessageAsRead(messageId: string): Promise<ApiResponse<void>> {
    return this.request(`/messages/${messageId}/read`, { method: 'PUT' });
  }

  async deleteMessage(messageId: string): Promise<ApiResponse<void>> {
    return this.request(`/messages/${messageId}`, { method: 'DELETE' });
  }

  // Search APIs
  async search(query: string, type?: 'users' | 'posts' | 'all'): Promise<ApiResponse<SearchResult>> {
    const params = new URLSearchParams({ q: query });
    if (type && type !== 'all') {
      params.append('type', type);
    }
    return this.request(`/search?${params}`);
  }

  async searchUsers(query: string, page = 1, limit = 20): Promise<ApiResponse<PaginatedResponse<User>>> {
    return this.request(`/search/users?q=${query}&page=${page}&limit=${limit}`);
  }

  async searchPosts(query: string, page = 1, limit = 20): Promise<ApiResponse<PaginatedResponse<Post>>> {
    return this.request(`/search/posts?q=${query}&page=${page}&limit=${limit}`);
  }

  // Notification APIs
  async getNotifications(userId: string, page = 1, limit = 20): Promise<ApiResponse<PaginatedResponse<Notification>>> {
    return this.request(`/users/${userId}/notifications?page=${page}&limit=${limit}`);
  }

  async markNotificationAsRead(notificationId: string): Promise<ApiResponse<void>> {
    return this.request(`/notifications/${notificationId}/read`, { method: 'PUT' });
  }

  async markAllNotificationsAsRead(userId: string): Promise<ApiResponse<void>> {
    return this.request(`/users/${userId}/notifications/read-all`, { method: 'PUT' });
  }

  // Analytics APIs
  async getUserAnalytics(userId: string): Promise<ApiResponse<any>> {
    return this.request(`/users/${userId}/analytics`);
  }

  async getPostAnalytics(postId: string): Promise<ApiResponse<any>> {
    return this.request(`/posts/${postId}/analytics`);
  }

  // Settings APIs
  async getUserSettings(userId: string): Promise<ApiResponse<any>> {
    return this.request(`/users/${userId}/settings`);
  }

  async updateUserSettings(userId: string, settings: any): Promise<ApiResponse<any>> {
    return this.request(`/users/${userId}/settings`, {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  }

  // File Upload APIs
  async uploadFile(file: File, type: 'image' | 'video' | 'audio' | 'document'): Promise<ApiResponse<{ url: string; filename: string; size: number }>> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    return this.request('/upload', {
      method: 'POST',
      headers: {}, // Let browser set Content-Type for FormData
      body: formData,
    });
  }

  // Health Check
  async healthCheck(): Promise<ApiResponse<{ status: string; timestamp: string }>> {
    return this.request('/health');
  }
}

// Create and export the API service instance
export const apiService = new ApiService(API_CONFIG.baseURL);

// Export the service class for testing or custom instances
export default ApiService;


