import React from 'react';

interface GoldenVerifiedBadgeProps {
  size?: number;
  className?: string;
}

const GoldenVerifiedBadge: React.FC<GoldenVerifiedBadgeProps> = ({ 
  size = 16, 
  className = "" 
}) => {
  return (
    <div className={`relative ${className}`}>
      <span 
        className="inline-flex items-center justify-center px-2 py-1 rounded-full text-xs font-bold tracking-wide uppercase"
        style={{
          background: 'linear-gradient(135deg, #FFD700 0%, #DAA520 100%)',
          color: '#8B4513',
          textShadow: '0 1px 2px rgba(255,255,255,0.8)',
          border: '1px solid #B8860B',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          minWidth: '32px',
          height: '20px',
          fontSize: '10px',
          fontWeight: '900',
          letterSpacing: '0.5px'
        }}
      >
        CEO
      </span>
    </div>
  );
};

export default GoldenVerifiedBadge;
