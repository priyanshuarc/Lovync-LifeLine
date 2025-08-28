// src/pages/LandingPage.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo'; // Import the new Logo component

const LandingPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50">
            <header className="flex-grow flex items-center justify-center flex-col p-4">
                <Logo /> {/* Use the reusable Logo component here */}
                <p className="mt-4 text-xl md:text-2xl text-gray-700">
                    Connect and share your story with the world.
                </p>
            </header>

            <footer className="p-4 w-full">
                <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
                    <Link
                        to="/signup"
                        className="w-full md:w-auto px-8 py-3 rounded-full font-semibold shadow-md transition-transform transform hover:scale-105 bg-purple-700 text-white"
                    >
                        Get Started
                    </Link>
                    <Link
                        to="/login"
                        className="w-full md:w-auto px-8 py-3 rounded-full font-semibold shadow-md transition-transform transform hover:scale-105 bg-gray-200 text-gray-800"
                    >
                        Log In
                    </Link>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;