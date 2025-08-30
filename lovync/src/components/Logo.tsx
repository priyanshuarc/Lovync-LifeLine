// src/components/Logo.tsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Logo.css";

const Logo: React.FC = () => {
  return (
    <Link to="/" className="inline-block">
      <div className="px-1 py-1 sm:px-2 sm:py-1">
        <div className="flex flex-col items-start">
          {/* Premium High Contrast Cursive Logo - Just Lovync */}
          <div className="black-cursive-logo">
            <span className="letter-l">L</span>
            <span className="letter-o">o</span>
            <span className="letter-v">v</span>
            <span className="letter-y">y</span>
            <span className="letter-n">n</span>
            <span className="letter-c">c</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Logo;