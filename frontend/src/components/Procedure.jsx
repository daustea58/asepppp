import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ClipboardCheck } from 'lucide-react';

const Procedure = ({ data }) => {
  return (
    <div className="mb-12">
      <div className="flex items-center space-x-3 mb-6">
        <ClipboardCheck className="text-purple-500" size={32} />
        <h2 className="text-3xl md:text-4xl font-black text-white">PROSEDUR JIKA BERTEMU</h2>
      </div>
      
      <Card className="bg-gradient-to-br from-purple-900 to-black border-purple-700 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.procedures.map((procedure, index) => (
            <div
              key={index}
              className="bg-purple-950 border-2 border-purple-600 rounded-xl p-6 text-center transform hover:scale-105 hover:rotate-2 transition-all duration-300"
            >
              <Badge className="bg-purple-600 text-white border-0 mb-4 text-2xl w-12 h-12 rounded-full flex items-center justify-center mx-auto font-black">
                {index + 1}
              </Badge>
              <p className="text-white text-xl md:text-2xl font-bold">{procedure}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Procedure;