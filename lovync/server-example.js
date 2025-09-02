const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (for uploaded images)
app.use('/uploads', express.static('uploads'));

// JWT Secret (in production, use environment variable)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// In-memory data storage (replace with database in production)
let users = [
  {
    id: '1',
    username: 'priyanshu_pandey',
    email: 'priyanshu@lovync.com',
    name: 'Priyanshu Pandey',
    bio: 'CEO of Lovync & Founder 🚀 | Building the future of social connection.',
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
    password: 'hashed_password_here' // In production, use bcrypt
  }
];

let posts = [];
let conversations = [];
let messages = [];

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  }
});

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    data: {
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    }
  });
});

// Authentication routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = users.find(u => u.email === email);
  
  if (!user || user.password !== password) { // In production, use bcrypt.compare
    return res.status(401).json({
      success: false,
      error: 'Invalid email or password'
    });
  }

  // Generate JWT token
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  // Remove password from response
  const { password: _, ...userWithoutPassword } = user;

  res.json({
    success: true,
    data: {
      user: userWithoutPassword,
      token
    }
  });
});

app.post('/api/auth/signup', (req, res) => {
  const { email, password, username, name } = req.body;

  // Check if user already exists
  if (users.find(u => u.email === email || u.username === username)) {
    return res.status(400).json({
      success: false,
      error: 'User already exists'
    });
  }

  // Create new user
  const newUser = {
    id: (users.length + 1).toString(),
    username,
    email,
    name,
    bio: '',
    avatar: '/default-avatar.png',
    verified: false,
    isCEO: false,
    followers: 0,
    following: 0,
    posts: 0,
    location: '',
    website: '',
    joinedDate: new Date().toISOString(),
    isPrivate: false,
    isOnline: true,
    lastSeen: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    password // In production, hash with bcrypt
  };

  users.push(newUser);

  // Generate JWT token
  const token = jwt.sign(
    { userId: newUser.id, email: newUser.email },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  // Remove password from response
  const { password: _, ...userWithoutPassword } = newUser;

  res.status(201).json({
    success: true,
    data: {
      user: userWithoutPassword,
      token
    }
  });
});

app.post('/api/auth/logout', authenticateToken, (req, res) => {
  // In a real app, you might want to blacklist the token
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

// User routes
app.get('/api/users/me', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }

  const { password: _, ...userWithoutPassword } = user;
  res.json({
    success: true,
    data: userWithoutPassword
  });
});

app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }

  const { password: _, ...userWithoutPassword } = user;
  res.json({
    success: true,
    data: userWithoutPassword
  });
});

app.get('/api/users/username/:username', (req, res) => {
  const user = users.find(u => u.username === req.params.username);
  if (!user) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }

  const { password: _, ...userWithoutPassword } = user;
  res.json({
    success: true,
    data: userWithoutPassword
  });
});

app.put('/api/users/:id', authenticateToken, (req, res) => {
  if (req.user.userId !== req.params.id) {
    return res.status(403).json({
      success: false,
      error: 'Can only update own profile'
    });
  }

  const userIndex = users.findIndex(u => u.id === req.params.id);
  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }

  // Update user fields
  const updatedUser = {
    ...users[userIndex],
    ...req.body,
    updatedAt: new Date().toISOString()
  };

  users[userIndex] = updatedUser;

  const { password: _, ...userWithoutPassword } = updatedUser;
  res.json({
    success: true,
    data: userWithoutPassword
  });
});

app.post('/api/users/:id/avatar', authenticateToken, upload.single('avatar'), (req, res) => {
  if (req.user.userId !== req.params.id) {
    return res.status(403).json({
      success: false,
      error: 'Can only update own avatar'
    });
  }

  if (!req.file) {
    return res.status(400).json({
      success: false,
      error: 'No file uploaded'
    });
  }

  const avatarUrl = `/uploads/${req.file.filename}`;
  
  // Update user avatar
  const userIndex = users.findIndex(u => u.id === req.params.id);
  if (userIndex !== -1) {
    users[userIndex].avatar = avatarUrl;
    users[userIndex].updatedAt = new Date().toISOString();
  }

  res.json({
    success: true,
    data: {
      avatarUrl
    }
  });
});

// Post routes
app.get('/api/posts', (req, res) => {
  const { page = 1, limit = 20, userId, category, type } = req.query;
  
  let filteredPosts = [...posts];
  
  // Apply filters
  if (userId) {
    filteredPosts = filteredPosts.filter(p => p.userId === userId);
  }
  
  if (category) {
    filteredPosts = filteredPosts.filter(p => p.category === category);
  }
  
  if (type) {
    filteredPosts = filteredPosts.filter(p => p.type === type);
  }
  
  // Sort by creation date (newest first)
  filteredPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
  
  res.json({
    success: true,
    data: {
      data: paginatedPosts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: filteredPosts.length,
        totalPages: Math.ceil(filteredPosts.length / limit),
        hasNext: endIndex < filteredPosts.length,
        hasPrev: page > 1
      }
    }
  });
});

app.post('/api/users/:id/posts', authenticateToken, upload.single('media'), (req, res) => {
  if (req.user.userId !== req.params.id) {
    return res.status(403).json({
      success: false,
      error: 'Can only create posts for yourself'
    });
  }

  const { type, content, tags, category } = req.body;
  
  const newPost = {
    id: (posts.length + 1).toString(),
    userId: req.params.id,
    type,
    content,
    tags: tags ? JSON.parse(tags) : [],
    category,
    likes: 0,
    comments: 0,
    shares: 0,
    views: 0,
    isLiked: false,
    isBookmarked: false,
    isShared: false,
    isEdited: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  // Add media if uploaded
  if (req.file) {
    newPost.media = {
      type: req.file.mimetype.startsWith('image/') ? 'image' : 'video',
      url: `/uploads/${req.file.filename}`,
      thumbnail: req.file.mimetype.startsWith('image/') ? `/uploads/${req.file.filename}` : undefined,
      alt: req.file.originalname
    };
  }

  posts.push(newPost);
  
  // Update user post count
  const userIndex = users.findIndex(u => u.id === req.params.id);
  if (userIndex !== -1) {
    users[userIndex].posts += 1;
  }

  res.status(201).json({
    success: true,
    data: newPost
  });
});

// Search routes
app.get('/api/search', (req, res) => {
  const { q, type = 'all' } = req.query;
  
  if (!q) {
    return res.status(400).json({
      success: false,
      error: 'Search query required'
    });
  }

  const query = q.toLowerCase();
  const results = {
    users: [],
    posts: [],
    tags: [],
    categories: []
  };

  if (type === 'all' || type === 'users') {
    results.users = users.filter(user => 
      user.name.toLowerCase().includes(query) ||
      user.username.toLowerCase().includes(query) ||
      user.bio.toLowerCase().includes(query)
    ).map(({ password, ...user }) => user);
  }

  if (type === 'all' || type === 'posts') {
    results.posts = posts.filter(post => 
      post.content.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }

  res.json({
    success: true,
    data: results
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        error: 'File too large. Maximum size is 5MB.'
      });
    }
  }
  
  res.status(500).json({
    success: false,
    error: 'Something went wrong!'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Lovync API Server running on port ${PORT}`);
  console.log(`📱 API available at: http://localhost:${PORT}/api`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;


