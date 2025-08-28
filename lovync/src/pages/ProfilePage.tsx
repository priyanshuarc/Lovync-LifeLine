import React from 'react';
// Added some new icons for a richer UI
import { 
  BsGridFill, 
  BsBookmarkHeart, 
  BsPersonBadge, 
  BsHeart, 
  BsChatDots 
} from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
import { RiChatQuoteLine, RiSparkling2Line } from 'react-icons/ri';

// --- Enhanced Placeholder Data for the New Design ---
// Added interests and a prompt section to showcase personality.
// Image URLs now generate varying sizes to create a masonry effect.
const userProfile = {
  username: 'anshu_verma',
  fullName: 'Anshu Verma',
  avatarUrl: 'https://i.pravatar.cc/150?u=anshu_verma',
  postCount: 125,
  followerCount: 4032,
  followingCount: 589,
  bio: 'Digital Creator ✨ | Building Lovync to connect souls. Let\'s build something beautiful together.',
  website: 'lovync.com',
  interests: ['Photography', 'Minimalist Design', 'Indie Music', 'Bouldering', 'Third-wave Coffee'],
  prompt: {
    question: 'The key to my heart is...',
    answer: 'A thoughtfully curated Spotify playlist and a perfectly pulled espresso. 🎶☕'
  },
  posts: Array.from({ length: 12 }, (_, i) => ({
    id: i,
    imageUrl: `https://picsum.photos/id/${i + 10}/${i % 3 === 0 ? 600 : 500}/${i % 2 === 0 ? 700 : 500}`,
    likes: Math.floor(Math.random() * 2000),
    comments: Math.floor(Math.random() * 100),
  })),
};


// --- The Redesigned Profile Page Component ---
const ProfilePage: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen font-jejugothic text-gray-800">
      <main className="max-w-4xl mx-auto p-4 sm:p-6">

        {/* --- Profile Header: Centered & Focused --- */}
        <header className="flex flex-col items-center text-center mb-8">
          <div className="relative mb-4">
            <img
              src={userProfile.avatarUrl}
              alt="User Avatar"
              className="rounded-full w-32 h-32 md:w-40 md:h-40 object-cover p-1 bg-white shadow-lg"
            />
            {/* A subtle decorative ring */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-deep-purple/50 animate-spin-slow"></div>
          </div>
          
          <h1 className="text-3xl font-bold">{userProfile.fullName}</h1>
          <p className="text-gray-500 mb-4">@{userProfile.username}</p>

          <div className="flex items-center gap-4 mb-6">
            <button className="bg-deep-purple text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-purple-700 shadow-md transition-transform transform hover:scale-105">
              Follow
            </button>
            <button className="border border-gray-300 px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-200 transition">
              Message
            </button>
            <button className="text-gray-500 hover:text-deep-purple transition">
              <FiSettings size={24} />
            </button>
          </div>

          <div className="flex space-x-8 text-sm text-gray-600">
            <p><span className="font-bold text-lg text-gray-900">{userProfile.postCount}</span> Moments</p>
            <p><span className="font-bold text-lg text-gray-900">{userProfile.followerCount}</span> Followers</p>
            <p><span className="font-bold text-lg text-gray-900">{userProfile.followingCount}</span> Following</p>
          </div>
        </header>

        {/* --- Personality Card: Bio, Prompt & Interests --- */}
        <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8 text-center">
          <p className="text-base leading-relaxed mb-6">{userProfile.bio}</p>
          <a href="#" className="text-deep-purple font-semibold hover:underline text-sm mb-8 block">
            {userProfile.website}
          </a>
          
          {/* Prompt Section */}
          <div className="bg-purple-50/70 rounded-xl p-5 mb-6">
            <p className="font-semibold text-gray-500 flex items-center justify-center gap-2">
              <RiChatQuoteLine/> {userProfile.prompt.question}
            </p>
            <p className="text-lg mt-1">"{userProfile.prompt.answer}"</p>
          </div>

          {/* Interests Section */}
          <div>
            <h3 className="font-bold text-lg mb-3 flex items-center justify-center gap-2">
              <RiSparkling2Line className="text-deep-purple"/> Interests
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {userProfile.interests.map((interest) => (
                <span key={interest} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* --- Content Tabs --- */}
        <nav className="flex justify-center gap-4 mb-8">
          <button className="flex items-center gap-2 px-5 py-2 rounded-full bg-deep-purple text-white font-semibold text-sm shadow-sm">
            <BsGridFill /> Moments
          </button>
          <button className="flex items-center gap-2 px-5 py-2 rounded-full bg-white text-gray-600 font-semibold text-sm hover:bg-gray-200 transition">
            <BsBookmarkHeart /> Saved
          </button>
          <button className="flex items-center gap-2 px-5 py-2 rounded-full bg-white text-gray-600 font-semibold text-sm hover:bg-gray-200 transition">
            <BsPersonBadge /> Tagged
          </button>
        </nav>

        {/* --- Post Grid: Asymmetrical Masonry Layout --- */}
        {/* For a true masonry effect, a library like `react-masonry-css` would be best. 
            This simulates it with CSS grid for demonstration purposes. */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
          {userProfile.posts.map((post, index) => {
            const isTall = index % 6 === 1; // Make every 6th item tall
            const className = `relative group aspect-w-1 aspect-h-1 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 ${isTall ? 'md:row-span-2' : ''
              }`;

            return (
              <div key={post.id} className={className}>
                <img src={post.imageUrl} alt={`Post ${post.id}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center gap-4 text-white text-lg font-bold opacity-0 group-hover:opacity-100">
                  <span className="flex items-center gap-1"><BsHeart/> {post.likes}</span>
                  <span className="flex items-center gap-1"><BsChatDots/> {post.comments}</span>
                </div>
              </div>
            );
          })}
        </div>
        
      </main>
    </div>
  );
};

export default ProfilePage;