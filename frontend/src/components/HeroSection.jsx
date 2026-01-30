import React from 'react';
import { MapPin, Users } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

const HeroSection = ({ data }) => {
  return (
    <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-700 p-8 md:p-12 mb-12 hover-lift relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-500 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl opacity-10 animate-pulse animation-delay-2000"></div>
      
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Images */}
        <div className="md:col-span-1 space-y-6">
          {/* Main Profile */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-75 transition-all duration-500 animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity animate-blob"></div>
            <img
              src={data.profileImage}
              alt="Iqoy Profile"
              className="relative w-full aspect-square object-cover rounded-2xl border-4 border-gray-700 shadow-2xl transform group-hover:scale-105 group-hover:rotate-2 transition-all duration-500"
            />
            <Badge className="absolute top-4 right-4 bg-red-600 text-white border-0 text-xs font-bold animate-bounce shadow-lg">
              WANTED
            </Badge>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
          </div>

          {/* Face Photo */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-75 transition-all duration-500 animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-red-500 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity animate-blob animation-delay-2000"></div>
            <img
              src={data.faceImage}
              alt="Iqoy Face"
              className="relative w-full aspect-square object-cover rounded-2xl border-4 border-gray-700 shadow-2xl transform group-hover:scale-105 group-hover:-rotate-2 transition-all duration-500"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
          </div>
        </div>

        {/* Info */}
        <div className="md:col-span-2 flex flex-col justify-center space-y-6">
          <div>
            <Badge className="bg-gradient-to-r from-red-600 to-red-700 text-white border-0 mb-4 text-sm px-4 py-2 shadow-lg hover:shadow-red-500/50 transition-shadow">
              ⚠️ BAHAYA TINGGI
            </Badge>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-2 tracking-tight text-glow">
              {data.name}
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 font-medium">Alias: <span className="text-red-400">{data.alias}</span></p>
          </div>

          <div className="flex items-center space-x-3 text-gray-300 bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm hover:bg-gray-800/70 transition-colors">
            <MapPin className="text-red-500 animate-bounce" size={24} />
            <span className="text-lg md:text-xl font-semibold">{data.location}</span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-gradient-to-br from-blue-900 to-blue-950 rounded-xl p-4 text-center hover-lift border border-blue-800 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="text-3xl md:text-4xl font-black text-blue-400">{data.stats.friends}</div>
                <div className="text-xs md:text-sm text-gray-400 mt-1">Teman</div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-900 to-green-950 rounded-xl p-4 text-center hover-lift border border-green-800 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="text-3xl md:text-4xl font-black text-green-400">{data.stats.together}</div>
                <div className="text-xs md:text-sm text-gray-400 mt-1">Bersama</div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-900 to-purple-950 rounded-xl p-4 text-center hover-lift border border-purple-800 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="text-3xl md:text-4xl font-black text-purple-400">{data.stats.posts}</div>
                <div className="text-xs md:text-sm text-gray-400 mt-1">Postingan</div>
              </div>
            </div>
          </div>

          {/* Friends Info */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-4 flex items-center space-x-3 hover-lift border border-gray-700">
            <Users className="text-blue-400 animate-pulse" size={24} />
            <p className="text-gray-300 text-sm md:text-base">
              <span className="font-bold text-white">Berteman dengan</span> {data.friendsWith.join(', ')} dan {data.friendsWith.length + 237} lainnya
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default HeroSection;