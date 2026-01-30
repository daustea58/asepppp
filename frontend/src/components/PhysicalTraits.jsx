import React from 'react';
import { Card } from './ui/card';
import { Eye } from 'lucide-react';

const PhysicalTraits = ({ data }) => {
  return (
    <div className="mb-12">
      <div className="flex items-center space-x-3 mb-6">
        <Eye className="text-red-500" size={32} />
        <h2 className="text-3xl md:text-4xl font-black text-white">CIRI-CIRI FISIK</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.physicalTraits.map((trait, index) => (
          <Card
            key={index}
            className="bg-gray-800 border-gray-700 p-6 hover:bg-gray-750 transform hover:translate-x-2 transition-all duration-300"
          >
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-200 text-base md:text-lg leading-relaxed">{trait}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PhysicalTraits;