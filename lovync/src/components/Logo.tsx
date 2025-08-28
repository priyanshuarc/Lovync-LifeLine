// src/components/Logo.tsx

import React from "react";
import { Link } from "react-router-dom";

const Logo: React.FC = () => {
  return (
    <Link to="/">
      <h1 className="text-5xl font-logo font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#8E70CF] to-[#A4A5F5]">
        Lovync
      </h1>
    </Link>
  );
};

export default Logo;