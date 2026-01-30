import React from 'react';

const AnimatedBackground = () => {
  return (
    <>
      {/* Animated gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Top left orb */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        
        {/* Top right orb */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        {/* Bottom orb */}
        <div className="absolute -bottom-40 left-1/2 transform -translate-x-1/2 w-80 h-80 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }}></div>

      {/* Vignette effect */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)'
      }}></div>
    </>
  );
};

export default AnimatedBackground;