import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const phoneNumber = '6285723426498';
  const message = 'Halo! Saya menemukan Iqoy yang dicari! 🚨';
  
  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      {/* WhatsApp Floating Button */}
      <div 
        className="fixed bottom-8 right-8 z-50 group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Tooltip */}
        <div className={`absolute bottom-full right-0 mb-3 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
          <div className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow-xl border border-green-500 whitespace-nowrap">
            <p className="font-bold text-sm">Laporkan Iqoy!</p>
            <p className="text-xs text-gray-400">Klik untuk WhatsApp</p>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleClick}
          className="relative bg-gradient-to-br from-green-500 to-green-700 text-white p-4 rounded-full shadow-2xl transform transition-all duration-300 hover:scale-110 hover:rotate-12 active:scale-95 group"
        >
          {/* Pulse animation rings */}
          <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></div>
          <div className="absolute inset-0 rounded-full bg-green-400 animate-pulse opacity-50"></div>
          
          {/* Icon */}
          <MessageCircle size={32} className="relative z-10" />
          
          {/* Badge notification */}
          <div className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-bounce">
            !
          </div>
        </button>
      </div>

      {/* Call to Action Banner (appears on scroll) */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-green-600 via-green-700 to-green-600 text-white py-3 px-6 z-40 transform translate-y-full transition-transform duration-500 hover:translate-y-0 group">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <MessageCircle className="animate-bounce" size={24} />
            <div>
              <p className="font-bold text-sm md:text-base">Menemukan Iqoy? Segera Laporkan!</p>
              <p className="text-xs text-green-100">Dapatkan hadiah 1.000.000 DOLLAR!</p>
            </div>
          </div>
          <button
            onClick={handleClick}
            className="bg-white text-green-700 px-6 py-2 rounded-full font-bold text-sm md:text-base hover:bg-green-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            WhatsApp Sekarang
          </button>
        </div>
      </div>
    </>
  );
};

export default WhatsAppButton;