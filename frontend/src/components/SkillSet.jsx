import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Zap, Shield, Target, Skull } from 'lucide-react';

const SkillSet = ({ data }) => {
  const skillColors = [
    { bg: 'from-green-600 to-green-800', badge: 'bg-green-500', icon: Zap, shadow: 'shadow-green-500/50' },
    { bg: 'from-yellow-600 to-yellow-800', badge: 'bg-yellow-500', icon: Shield, shadow: 'shadow-yellow-500/50' },
    { bg: 'from-red-600 to-red-800', badge: 'bg-red-500', icon: Target, shadow: 'shadow-red-500/50' },
    { bg: 'from-purple-600 to-purple-800', badge: 'bg-purple-500', icon: Skull, shadow: 'shadow-purple-500/50' }
  ];

  return (
    <div className="mb-12">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-yellow-600 p-3 rounded-xl shadow-lg shadow-yellow-500/50 animate-pulse">
          <Zap className="text-white" size={32} />
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-white text-glow">SKILL SET</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.skills.map((skill, index) => {
          const color = skillColors[index];
          const Icon = color.icon;
          return (
            <Card
              key={index}
              className={`bg-gradient-to-br ${color.bg} border-0 p-6 hover-lift relative overflow-hidden group`}
            >
              {/* Animated background effects */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full -ml-16 -mb-16 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <Badge className={`${color.badge} text-white border-0 text-xs font-bold px-3 py-1 shadow-lg ${color.shadow}`}>
                    {skill.type}
                  </Badge>
                  <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg group-hover:bg-white/30 transition-colors">
                    <Icon size={32} className="text-white" />
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-3 group-hover:text-yellow-200 transition-colors">{skill.name}</h3>
                <p className="text-gray-100 text-base md:text-lg leading-relaxed">{skill.description}</p>
                {skill.cooldown && (
                  <div className="mt-4 bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2 inline-block">
                    <p className="text-gray-200 text-sm font-semibold">⚡ {skill.cooldown}</p>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default SkillSet;