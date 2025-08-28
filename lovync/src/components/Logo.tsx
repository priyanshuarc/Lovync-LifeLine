// src/components/Logo.tsx
// src/components/Logo.tsx
import React from "react";
import { Link } from "react-router-dom";

const Logo: React.FC = () => {
  return (
    <Link to="/" className="inline-block">
      <div className="px-8 py-4" style={{ overflow: 'visible' }}>
        <h1 
          className="text-4xl md:text-5xl font-logo font-bold whitespace-nowrap"
          style={{
            background: 'linear-gradient(45deg, #1E40AF, #3B82F6, #8B5CF6, #7C3AED)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: '#1E40AF', // fallback color
            display: 'inline-block',
            paddingRight: '8px'
          }}
        >
          Lovync
        </h1>
      </div>
    </Link>
  );
};

export default Logo;