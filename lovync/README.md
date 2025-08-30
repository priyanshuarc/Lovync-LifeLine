# 🚀 Lovync - Social Media Platform

**Building the future of social connection** - A modern, scalable social media platform built with React, TypeScript, and Tailwind CSS.

## ✨ Features

- **🔐 Authentication System** - Secure login/signup with JWT tokens
- **👥 User Profiles** - Rich profiles with verification badges and CEO status
- **📱 Responsive Design** - Mobile-first approach with beautiful UI/UX
- **💬 Real-time Messaging** - WhatsApp-like chat experience
- **📝 Content Creation** - Support for text, image, video, and story posts
- **🔍 Advanced Search** - Search across users, posts, and content
- **📊 Analytics** - User engagement and post performance tracking
- **⚙️ Settings & Privacy** - Comprehensive user preferences and privacy controls
- **🌐 Multi-language Support** - Internationalization ready
- **🎨 Theme System** - Light/dark mode support

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx      # Main layout wrapper
│   ├── Logo.tsx        # Lovync logo component
│   ├── GoldenVerifiedBadge.tsx  # CEO verification badge
│   └── ...
├── pages/              # Main application pages
│   ├── Homepage.tsx    # Main feed with posts
│   ├── ProfilePage.tsx # User profile display
│   ├── MessagesPage.tsx # Chat interface
│   ├── EditProfilePage.tsx # Profile editing
│   ├── TrendingPage.tsx # Trending content
│   └── ...
├── context/            # React context providers
│   ├── DataContext.tsx # Main data management
│   └── ...
├── services/           # API and external services
│   ├── api.ts         # REST API service layer
│   └── ...
├── types/              # TypeScript type definitions
│   └── index.ts       # All application types
├── data/               # Sample data and mock content
│   └── sampleData.ts  # Comprehensive sample data
├── config/             # Configuration files
│   └── index.ts       # Environment and app config
├── styles/             # CSS and styling files
│   ├── Logo.css       # Logo-specific styles
│   ├── ProfilePage.css # Profile page styles
│   └── ...
└── utils/              # Utility functions and helpers
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/lovync-lifeline.git
   cd lovync-lifeline/lovync
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:3001/api

# Supabase Configuration (Optional)
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
REACT_APP_SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Firebase Configuration (Optional)
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
```

### Backend Connection

The project is designed to work with multiple backend solutions:

#### 1. **Local Express Server** (Default)
- Runs on `http://localhost:3001`
- RESTful API endpoints
- JWT authentication
- File upload support

#### 2. **Supabase**
- Real-time database
- Built-in authentication
- Row-level security
- Auto-generated APIs

#### 3. **Firebase**
- Cloud Firestore database
- Firebase Authentication
- Cloud Storage
- Real-time updates

#### 4. **Custom Backend**
- Any REST API
- Custom authentication
- Flexible data structure

## 📊 Data Structure

### User Model
```typescript
interface User {
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
```

### Post Model
```typescript
interface Post {
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
```

### Message Model
```typescript
interface Message {
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
```

## 🔌 API Integration

### REST API Endpoints

The application uses a comprehensive REST API structure:

- **Authentication**: `/auth/*`
- **Users**: `/users/*`
- **Posts**: `/posts/*`
- **Comments**: `/comments/*`
- **Messages**: `/conversations/*`
- **Search**: `/search/*`
- **Notifications**: `/notifications/*`
- **Upload**: `/upload`

### API Service Layer

```typescript
import { apiService } from '../services/api';

// Example usage
const response = await apiService.login({ email, password });
const posts = await apiService.getPosts();
const user = await apiService.getUserById(userId);
```

## 🎨 UI Components

### Component Library

- **Layout Components**: Header, Sidebar, Navigation
- **Form Components**: Inputs, Buttons, Modals
- **Content Components**: Post Cards, User Cards, Message Bubbles
- **Feedback Components**: Loading, Error, Success states
- **Navigation Components**: Breadcrumbs, Pagination, Tabs

### Styling

- **Tailwind CSS** for utility-first styling
- **Custom CSS** for complex animations and specific components
- **Responsive Design** with mobile-first approach
- **Theme System** supporting light/dark modes

## 🔐 Authentication & Security

### JWT Token Management
- Automatic token refresh
- Secure storage in localStorage
- Automatic logout on expiration
- Protected route handling

### Security Features
- Password strength validation
- Rate limiting support
- CSRF protection ready
- Input sanitization
- File upload validation

## 📱 Mobile Optimization

### Responsive Features
- Touch-friendly interactions
- Mobile-optimized layouts
- Progressive Web App ready
- Offline capability support
- Push notification support

### Performance
- Lazy loading of components
- Image optimization
- Code splitting
- Bundle optimization

## 🧪 Testing

### Testing Setup
```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

### Testing Strategy
- Unit tests for utilities and helpers
- Component testing with React Testing Library
- Integration tests for API calls
- E2E tests for critical user flows

## 🚀 Deployment

### Build Process
```bash
# Create production build
npm run build

# Preview production build
npm run serve
```

### Deployment Options
- **Vercel**: Zero-config deployment
- **Netlify**: Static site hosting
- **AWS S3**: Static website hosting
- **Docker**: Containerized deployment
- **Custom Server**: Express.js backend

## 🔧 Development

### Code Quality
- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type safety
- **Husky** for git hooks

### Development Scripts
```bash
npm start          # Start development server
npm run build      # Build for production
npm run test       # Run tests
npm run lint       # Run ESLint
npm run format     # Run Prettier
npm run type-check # Run TypeScript check
```

## 📚 API Documentation

### Authentication Endpoints

#### POST `/auth/login`
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### POST `/auth/signup`
```json
{
  "email": "user@example.com",
  "password": "password123",
  "username": "username",
  "name": "Full Name"
}
```

### User Endpoints

#### GET `/users/me`
Returns the current authenticated user.

#### PUT `/users/:id`
Update user profile information.

#### POST `/users/:id/avatar`
Upload user avatar image.

### Post Endpoints

#### GET `/posts`
Get posts with filtering and pagination.

#### POST `/users/:id/posts`
Create a new post.

#### PUT `/posts/:id`
Update an existing post.

#### DELETE `/posts/:id`
Delete a post.

## 🌟 Special Features

### CEO Badge System
- Exclusive golden "CEO" badge for Priyanshu Pandey
- Regular purple verification badges for other verified users
- Conditional rendering based on user status

### Advanced Messaging
- WhatsApp-like chat interface
- Message reactions and replies
- File and media sharing
- Real-time typing indicators
- Message search and filtering

### Content Management
- Multiple post types (text, image, video, story)
- Tag-based categorization
- Advanced filtering and sorting
- Bookmark and collection system

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [Wiki](https://github.com/yourusername/lovync-lifeline/wiki)
- **Issues**: [GitHub Issues](https://github.com/yourusername/lovync-lifeline/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/lovync-lifeline/discussions)

## 🙏 Acknowledgments

- **Priyanshu Pandey** - CEO & Founder of Lovync
- **React Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS framework
- **TypeScript** - For type safety and developer experience

---

**Built with ❤️ by the Lovync Team**
