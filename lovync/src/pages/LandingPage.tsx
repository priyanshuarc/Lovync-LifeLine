// src/pages/LandingPage.tsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BsHeart, 
  BsChatDots, 
  BsPlayCircle, 
  BsArrowRight,
  BsStar,
  BsGlobe,
  BsShield,
  BsLightning
} from 'react-icons/bs';
import { FiTrendingUp, FiUsers } from 'react-icons/fi';
import Logo from '../components/Logo';

const LandingPage: React.FC = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <BsHeart className="text-6xl text-red-500" />,
      title: "Connect with Like-minded Souls",
      description: "Find people who share your passions, interests, and values. Build meaningful connections that last."
    },
    {
      icon: <BsChatDots className="text-6xl text-blue-500" />,
      title: "Share Your Story",
      description: "Express yourself through posts, photos, and videos. Let the world see the real you."
    },
    {
      icon: <FiTrendingUp className="text-6xl text-green-500" />,
      title: "Discover Amazing Content",
      description: "Explore trending posts, discover new interests, and stay connected with what matters to you."
    }
  ];

  const stats = [
    { number: "10M+", label: "Active Users" },
    { number: "50M+", label: "Posts Shared" },
    { number: "100M+", label: "Connections Made" }
  ];

  const benefits = [
    {
      icon: <FiUsers className="text-3xl text-blue-500" />,
      title: "Community First",
      description: "Join vibrant communities around your interests and passions."
    },
    {
      icon: <BsGlobe className="text-3xl text-green-500" />,
      title: "Global Reach",
      description: "Connect with people from around the world, breaking geographical barriers."
    },
    {
      icon: <BsShield className="text-3xl text-purple-500" />,
      title: "Safe & Secure",
      description: "Your privacy and security are our top priorities."
    },
    {
      icon: <BsLightning className="text-3xl text-yellow-500" />,
      title: "Real-time Updates",
      description: "Stay connected with instant notifications and live updates."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo />
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
            <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
            <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2.5 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Where
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"> Souls </span>
              Connect
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join millions of people sharing their stories, building connections, and discovering amazing content on Lovync - the next generation social platform.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link
                to="/signup"
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2"
              >
                Start Your Journey
                <BsArrowRight className="text-xl" />
              </Link>
              <button className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors">
                <BsPlayCircle className="text-2xl" />
                <span className="text-lg font-medium">Watch Demo</span>
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-pink-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '2s' }}></div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Lovync?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of social networking with features designed to make connections meaningful and content engaging.
            </p>
          </div>

          {/* Rotating Feature Showcase */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-12 border border-gray-100">
              <div className="mb-8">
                {features[currentFeature].icon}
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                {features[currentFeature].title}
              </h3>
              <p className="text-xl text-gray-600 leading-relaxed">
                {features[currentFeature].description}
              </p>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-all duration-300 hover:transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Millions</h2>
          <p className="text-xl text-gray-600 mb-12">Join a community that's growing every day</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <BsStar key={i} className="text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Lovync has completely changed how I connect with people. The community is amazing and the content is always engaging!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full"></div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">Sarah M.</div>
                  <div className="text-sm text-gray-500">Verified User</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <BsStar key={i} className="text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Finally, a social platform that focuses on real connections rather than just likes and follows. Love it!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full"></div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">Mike R.</div>
                  <div className="text-sm text-gray-500">Community Leader</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <BsStar key={i} className="text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "The content discovery is incredible. I've found so many new interests and amazing people here!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-red-500 rounded-full"></div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">Emma L.</div>
                  <div className="text-sm text-gray-500">Content Creator</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join millions of people who are already connecting, sharing, and discovering on Lovync.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/signup"
              className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Create Account
            </Link>
            <Link
              to="/login"
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Logo />
              <p className="text-gray-400 mt-4">
                Connecting souls, sharing stories, building communities.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Safety</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Lovync. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;