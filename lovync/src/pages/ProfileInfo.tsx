import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BsArrowLeft,
  BsHeart,
  BsShare,
  BsVolumeMute,
  BsVolumeUp,
  BsGrid,
  BsBookmark,
  BsPlay,
  BsLink45Deg,
  BsGeoAlt,
  BsCalendar3,
  BsPersonPlus
} from 'react-icons/bs';
import { FiMoreHorizontal } from 'react-icons/fi';
import { MdVerified, MdReport, MdBlock } from 'react-icons/md';
import GoldenVerifiedBadge from '../components/GoldenVerifiedBadge';

interface ProfileInfoProps {
  onClose: () => void;
  conversation: any;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ onClose, conversation }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'posts' | 'saved' | 'tagged'>('posts');
  const [isFollowing, setIsFollowing] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [isMuted, setIsMuted] = useState(conversation?.muted || false);

  // Sample user data (in real app, this would come from API)
  const user = {
    id: '1',
    name: conversation?.user || 'Sarah Johnson',
    username: conversation?.username || 'sarah_j',
    verified: conversation?.verified || true,
    avatar: conversation?.avatar || 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    bio: 'Digital creator & tech enthusiast. Building amazing experiences one pixel at a time. ✨',
    followers: 15420,
    following: 892,
    posts: 156,
    website: 'https://sarahjohnson.com',
    location: 'San Francisco, CA',
    joinedDate: 'March 2022',
    isPrivate: false,
    isFollowing: isFollowing,
    isBlocked: isBlocked,
    isMuted: isMuted
  };

  // Sample posts data
  const posts = [
    {
      id: '1',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop',
      likes: 1247,
      comments: 89
    },
    {
      id: '2',
      type: 'video',
      url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop',
      duration: '2:34',
      likes: 892,
      comments: 45
    },
    {
      id: '3',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
      likes: 567,
      comments: 23
    },
    {
      id: '4',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop',
      likes: 423,
      comments: 18
    },
    {
      id: '5',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop',
      likes: 1456,
      comments: 89
    },
    {
      id: '6',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop',
      likes: 234,
      comments: 12
    }
  ];

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleBlock = () => {
    if (window.confirm(`Are you sure you want to block ${user.name}? They won't be able to see your posts or contact you.`)) {
      setIsBlocked(true);
      alert(`${user.name} has been blocked.`);
    }
  };

  const handleUnblock = () => {
    if (window.confirm(`Unblock ${user.name}?`)) {
      setIsBlocked(false);
      alert(`${user.name} has been unblocked.`);
    }
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
    alert(`${user.name} has been ${isMuted ? 'unmuted' : 'muted'}.`);
  };

  const handleReport = () => {
    if (window.confirm(`Report ${user.name}? This will be reviewed by our team.`)) {
      alert(`Report submitted for ${user.name}. Our team will review this.`);
    }
  };

  const handleShareProfile = () => {
    const shareText = `Check out ${user.name}'s profile on Lovync!`;
    if (navigator.share) {
      navigator.share({
        title: `${user.name} on Lovync`,
        text: shareText,
        url: `https://lovync.com/profile/${user.username}`
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Profile link copied to clipboard!');
    }
  };

  const handleMessage = () => {
    onClose(); // Close profile info and go back to chat
  };

  const handleViewProfile = () => {
    navigate(`/profile/${user.username}`);
  };

  const renderPosts = () => (
    <div className="grid grid-cols-3 gap-1">
      {posts.map((post) => (
        <div key={post.id} className="relative aspect-square group cursor-pointer">
          <img
            src={post.type === 'video' ? post.thumbnail : post.url}
            alt="Post"
            className="w-full h-full object-cover"
          />
          {post.type === 'video' && (
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <BsPlay size={20} className="text-white" />
            </div>
          )}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
            <div className="hidden group-hover:flex items-center gap-4 text-white">
              <div className="flex items-center gap-1">
                <BsHeart size={16} />
                <span className="text-sm font-medium">{post.likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <BsBookmark size={16} />
                <span className="text-sm font-medium">{post.comments}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSaved = () => (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
        <BsBookmark size={24} className="text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Saved Posts</h3>
      <p className="text-gray-500">Posts you save will appear here</p>
    </div>
  );

  const renderTagged = () => (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
        <BsPersonPlus size={24} className="text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Tagged Posts</h3>
      <p className="text-gray-500">Posts you're tagged in will appear here</p>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 sticky top-0">
        <button
          onClick={onClose}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
        >
          <BsArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-semibold text-gray-900 flex-1">Profile Info</h1>
        <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
          <FiMoreHorizontal size={18} />
        </button>
      </div>

      {/* Profile Header */}
      <div className="px-4 py-6">
        <div className="flex items-start gap-4 mb-6">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
                              {user.verified && user.username === 'priyanshu_pandey' ? (
                                <GoldenVerifiedBadge size={20} />
                              ) : user.verified ? (
                                <MdVerified className="text-purple-400" size={20} />
                              ) : null}
            </div>
            <p className="text-gray-600 mb-3">@{user.username}</p>
            {user.bio && (
              <p className="text-gray-700 mb-3 leading-relaxed">{user.bio}</p>
            )}
            
            {/* Profile Details */}
            <div className="space-y-2 mb-4">
              {user.website && (
                <div className="flex items-center gap-2 text-blue-600">
                  <BsLink45Deg size={14} />
                  <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">
                    {user.website.replace('https://', '')}
                  </a>
                </div>
              )}
              {user.location && (
                <div className="flex items-center gap-2 text-gray-600">
                  <BsGeoAlt size={14} />
                  <span className="text-sm">{user.location}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-gray-600">
                <BsCalendar3 size={14} />
                <span className="text-sm">Joined {user.joinedDate}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 mb-4">
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">{user.posts}</div>
                <div className="text-sm text-gray-600">posts</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">{user.followers.toLocaleString()}</div>
                <div className="text-sm text-gray-600">followers</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">{user.following.toLocaleString()}</div>
                <div className="text-sm text-gray-600">following</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              {!isBlocked ? (
                <>
                  <button
                    onClick={handleMessage}
                    className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors font-medium"
                  >
                    Message
                  </button>
                  <button
                    onClick={handleFollow}
                    className={`flex-1 py-2 px-4 rounded-lg border transition-colors font-medium ${
                      isFollowing
                        ? 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                        : 'bg-gray-900 text-white border-gray-900 hover:bg-gray-800'
                    }`}
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </button>
                </>
              ) : (
                <button
                  onClick={handleUnblock}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-200 transition-colors font-medium"
                >
                  Unblock
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-t border-gray-200">
        <div className="flex">
          {(['posts', 'saved', 'tagged'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors border-b-2 ${
                activeTab === tab
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                {tab === 'posts' && <BsGrid size={16} />}
                {tab === 'saved' && <BsBookmark size={16} />}
                {tab === 'tagged' && <BsPersonPlus size={16} />}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-4 py-4">
        {activeTab === 'posts' && renderPosts()}
        {activeTab === 'saved' && renderSaved()}
        {activeTab === 'tagged' && renderTagged()}
      </div>

      {/* Action Menu */}
      <div className="border-t border-gray-200 px-4 py-4 space-y-2">
        <button
          onClick={handleShareProfile}
          className="w-full flex items-center gap-3 py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <BsShare size={18} />
          Share Profile
        </button>
        
        <button
          onClick={handleMute}
          className="w-full flex items-center gap-3 py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
        >
          {isMuted ? <BsVolumeUp size={18} /> : <BsVolumeMute size={18} />}
          {isMuted ? 'Unmute' : 'Mute'}
        </button>
        
        <button
          onClick={handleViewProfile}
          className="w-full flex items-center gap-3 py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <BsPersonPlus size={18} />
          View Full Profile
        </button>
        
        <button
          onClick={handleReport}
          className="w-full flex items-center gap-3 py-3 px-4 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <MdReport size={18} />
          Report
        </button>
        
        {!isBlocked && (
          <button
            onClick={handleBlock}
            className="w-full flex items-center gap-3 py-3 px-4 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <MdBlock size={18} />
            Block
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;
