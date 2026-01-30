import React from 'react';
import { Card } from './ui/card';
import { AlertTriangle, X } from 'lucide-react';

const DangerousHabits = ({ data }) => {
  return (
    <div className="mb-12">
      <div className="flex items-center space-x-3 mb-6">
        <AlertTriangle className="text-red-500 animate-pulse" size={32} />
        <h2 className="text-3xl md:text-4xl font-black text-white">KEBIASAAN BERBAHAYA</h2>
      </div>
      
      <Card className="bg-gradient-to-br from-red-900 to-black border-red-700 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.dangerousHabits.map((habit, index) => (
            <div
              key={index}
              className="bg-red-950 border-2 border-red-700 rounded-lg p-4 flex items-start space-x-3 transform hover:translate-x-2 transition-all duration-300"
            >
              <X className="text-red-500 flex-shrink-0 mt-1" size={24} />
              <p className="text-gray-200 text-base md:text-lg leading-relaxed">{habit}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default DangerousHabits;