import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Trophy, DollarSign, Gift } from 'lucide-react';

const Reward = ({ data }) => {
  return (
    <div className="mb-12">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-yellow-600 p-3 rounded-xl shadow-lg shadow-yellow-500/50 animate-bounce">
          <Trophy className="text-white" size={32} />
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-white text-glow">IMBALAN JIKA DITEMUKAN</h2>
      </div>
      
      <Card className="bg-gradient-to-br from-yellow-600 via-yellow-700 to-yellow-900 border-yellow-600 p-8 md:p-12 text-center relative overflow-hidden hover-lift">
        {/* Multiple animated backgrounds */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_50%)] pointer-events-none animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent_40%)] pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-yellow-300 to-transparent animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-yellow-300 to-transparent animate-pulse"></div>
        
        {/* Floating coins effect */}
        <div className="absolute top-10 left-10 text-yellow-300 text-4xl animate-float opacity-30">💰</div>
        <div className="absolute top-20 right-20 text-yellow-300 text-4xl animate-float animation-delay-2000 opacity-30">💰</div>
        <div className="absolute bottom-10 left-20 text-yellow-300 text-4xl animate-float animation-delay-4000 opacity-30">💰</div>
        
        <div className="relative z-10">
          <div className="bg-yellow-500/20 backdrop-blur-sm p-4 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 animate-bounce">
            <Trophy className="text-yellow-300 drop-shadow-lg" size={64} />
          </div>
          
          <Badge className="bg-black text-yellow-400 border-0 mb-4 text-lg px-6 py-2 font-bold shadow-lg shadow-yellow-900/50">
            💎 TOTAL HADIAH 💎
          </Badge>
          
          <div className="bg-gradient-to-r from-yellow-800 to-yellow-900 rounded-2xl p-6 mb-6 shadow-2xl border-4 border-yellow-500">
            <h3 className="text-5xl md:text-7xl font-black text-white mb-2 text-glow animate-pulse">{data.reward.main}</h3>
            <p className="text-yellow-200 text-lg font-semibold">*Syarat dan ketentuan berlaku</p>
          </div>
          
          <div className="mb-4">
            <p className="text-yellow-100 text-lg font-bold mb-4">ATAU PILIH SALAH SATU:</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {data.reward.alternatives.map((alt, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-yellow-700 to-yellow-900 border-2 border-yellow-500 rounded-lg px-6 py-3 hover-lift shadow-lg hover:shadow-yellow-500/50 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-yellow-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <p className="relative z-10 text-white text-lg font-bold">{alt}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Reward;