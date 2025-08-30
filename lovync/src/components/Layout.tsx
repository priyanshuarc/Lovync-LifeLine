import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiHome, FiCompass, FiTrendingUp, FiMessageCircle, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { BsSearch, BsBell, BsPlus } from 'react-icons/bs';
import { useData } from '../context/DataContext';
import Logo from './Logo';

interface LayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showNav = true }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useData();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/homepage' && location.pathname === '/homepage') return true;
    if (path === '/explore' && location.pathname === '/explore') return true;
    if (path === '/search' && location.pathname === '/search') return true;
    if (path === '/trending' && location.pathname === '/trending') return true;
    if (path === '/messages' && location.pathname === '/messages') return true;
    if (path.startsWith('/profile') && location.pathname.startsWith('/profile')) return true;
    return false;
  };

  const handleCreatePost = () => {
    // Handle create post functionality
    console.log('Create post clicked');
  };

  const handleSearch = () => {
    navigate('/search');
  };

  const handleNotifications = () => {
    // Handle notifications
    console.log('Notifications clicked');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (!showNav) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Left Sidebar - Desktop */}
      <div className="hidden lg:flex lg:w-64 xl:w-72 bg-white border-r border-gray-200 flex-col fixed left-0 top-0 h-full z-40">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <Logo />
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link
            to="/homepage"
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              isActive('/homepage')
                ? 'bg-purple-50 text-purple-600 border border-purple-200'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <FiHome size={20} />
            <span className="font-medium">Home</span>
          </Link>

          <Link
            to="/explore"
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              isActive('/explore')
                ? 'bg-purple-50 text-purple-600 border border-purple-200'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <FiCompass size={20} />
            <span className="font-medium">Explore</span>
          </Link>

          <Link
            to="/search"
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              isActive('/search')
                ? 'bg-purple-50 text-purple-600 border border-purple-200'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <BsSearch size={20} />
            <span className="font-medium">Search</span>
          </Link>

          <Link
            to="/trending"
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              isActive('/trending')
                ? 'bg-purple-50 text-purple-600 border border-purple-200'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <FiTrendingUp size={20} />
            <span className="font-medium">Trending</span>
          </Link>

          <Link
            to="/messages"
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              isActive('/messages')
                ? 'bg-purple-50 text-purple-600 border border-purple-200'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <FiMessageCircle size={20} />
            <span className="font-medium">Messages</span>
          </Link>

          <Link
            to={`/profile/${currentUser.username}`}
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              isActive('/profile')
                ? 'bg-purple-50 text-purple-600 border border-purple-200'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <FiUser size={20} />
            <span className="font-medium">Profile</span>
          </Link>
        </nav>

        {/* Create Post Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleCreatePost}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <BsPlus size={18} />
            <span>Create Post</span>
          </button>
        </div>
      </div>

      {/* Top Navigation Bar - Mobile & Tablet */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FiMenu size={20} />
            </button>
            <Link to="/" className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Lovync
            </Link>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleSearch}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <BsSearch size={18} />
            </button>
            <button
              onClick={handleNotifications}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <BsBell size={18} />
            </button>
            <button
              onClick={handleCreatePost}
              className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              <BsPlus size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Lovync
          </Link>
          <button
            onClick={toggleMobileMenu}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        <nav className="px-4 py-6 space-y-2">
          <Link
            to="/homepage"
            onClick={toggleMobileMenu}
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              isActive('/homepage')
                ? 'bg-purple-50 text-purple-600 border border-purple-200'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <FiHome size={20} />
            <span className="font-medium">Home</span>
          </Link>

          <Link
            to="/explore"
            onClick={toggleMobileMenu}
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              isActive('/explore')
                ? 'bg-purple-50 text-purple-600 border border-purple-200'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <FiCompass size={20} />
            <span className="font-medium">Explore</span>
          </Link>

          <Link
            to="/search"
            onClick={toggleMobileMenu}
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              isActive('/search')
                ? 'bg-purple-50 text-purple-600 border border-purple-200'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <BsSearch size={20} />
            <span className="font-medium">Search</span>
          </Link>

          <Link
            to="/trending"
            onClick={toggleMobileMenu}
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              isActive('/trending')
                ? 'bg-purple-50 text-purple-600 border border-purple-200'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <FiTrendingUp size={20} />
            <span className="font-medium">Trending</span>
          </Link>

          <Link
            to="/messages"
            onClick={toggleMobileMenu}
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              isActive('/messages')
                ? 'bg-purple-50 text-purple-600 border border-purple-200'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <FiMessageCircle size={20} />
            <span className="font-medium">Messages</span>
          </Link>

          <Link
            to={`/profile/${currentUser.username}`}
            onClick={toggleMobileMenu}
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              isActive('/profile')
                ? 'bg-purple-50 text-purple-600 border border-purple-200'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <FiUser size={20} />
            <span className="font-medium">Profile</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleCreatePost}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <BsPlus size={18} />
            <span>Create Post</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 ${showNav ? 'lg:ml-64 xl:ml-72' : ''} ${showNav ? 'pt-16 lg:pt-0' : ''}`}>
        <div className="min-h-screen">
          {children}
        </div>
      </div>

             {/* Bottom Navigation - Mobile & Tablet */}
       {showNav && (
         <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
           <div className="flex items-center justify-around py-2">
             <Link
               to="/homepage"
               className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                 isActive('/homepage')
                   ? 'text-purple-600 bg-purple-50'
                   : 'text-gray-600 hover:text-gray-900'
               }`}
             >
               <FiHome size={20} />
               <span className="text-xs mt-1">Home</span>
             </Link>

             <Link
               to="/explore"
               className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                 isActive('/explore')
                   ? 'text-purple-600 bg-purple-50'
                   : 'text-gray-600 hover:text-gray-900'
               }`}
             >
               <FiCompass size={20} />
               <span className="text-xs mt-1">Explore</span>
             </Link>

             <Link
               to="/search"
               className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                 isActive('/search')
                   ? 'text-purple-600 bg-purple-50'
                   : 'text-gray-600 hover:text-gray-900'
               }`}
             >
               <BsSearch size={20} />
               <span className="text-xs mt-1">Search</span>
             </Link>

             <Link
               to="/messages"
               className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                 isActive('/messages')
                   ? 'text-purple-600 bg-purple-50'
                   : 'text-gray-600 hover:text-gray-900'
               }`}
             >
               <FiMessageCircle size={20} />
               <span className="text-xs mt-1">Messages</span>
             </Link>

                           <Link
                to={`/profile/${currentUser.username}`}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                  isActive('/profile')
                    ? 'text-purple-600 bg-purple-50'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <FiUser size={20} />
                <span className="text-xs mt-1">Profile</span>
              </Link>
           </div>
         </div>
       )}
    </div>
  );
};

export default Layout;
