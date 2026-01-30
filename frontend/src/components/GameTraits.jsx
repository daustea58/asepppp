import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Gamepad2, TrendingDown, Users, MessageSquare } from 'lucide-react';

const GameTraits = ({ data }) => {
  const icons = [Gamepad2, TrendingDown, Users, MessageSquare];
  
  return (
    <div className="mb-12">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-blue-600 p-3 rounded-xl shadow-lg shadow-blue-500/50">
          <Gamepad2 className="text-white" size={32} />
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-white text-glow">CIRI-CIRI DALAM GAME</h2>
      </div>

      <Card className="bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 border-blue-700 p-8 mb-6 relative overflow-hidden group hover-lift">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/20 to-blue-500/0 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
        
        <div className="relative z-10 text-center">
          <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black border-0 mb-4 text-lg px-6 py-2 font-bold shadow-lg shadow-yellow-500/50 animate-pulse">
            ⭐ HERO FAVORIT
          </Badge>
          <h3 className="text-5xl md:text-7xl font-black text-white mb-2 tracking-wider text-glow">{data.gameTraits.favoriteHero}</h3>
          <p className="text-blue-200 text-lg font-semibold">Winrate: <span className="text-yellow-400">{data.gameTraits.winrate}</span></p>
        </div>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.gameTraits.behaviors.map((behavior, index) => {
          const Icon = icons[index % icons.length];
          return (
            <Card
              key={index}
              className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 p-6 hover-lift relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-blue-600/10 group-hover:from-blue-600/10 group-hover:to-blue-600/20 transition-all duration-300"></div>
              <div className="relative z-10 flex items-start space-x-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-3 rounded-lg flex-shrink-0 shadow-lg group-hover:shadow-blue-500/50 transition-shadow">
                  <Icon size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-200 text-base md:text-lg leading-relaxed font-medium">{behavior.text}</p>
                  {behavior.quote && (
                    <blockquote className="mt-3 pl-4 border-l-4 border-red-500 text-red-400 italic text-sm md:text-base font-semibold bg-red-950/30 py-2 rounded-r">
                      "{behavior.quote}"
                    </blockquote>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default GameTraits;