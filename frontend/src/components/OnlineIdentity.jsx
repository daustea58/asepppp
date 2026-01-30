import React from 'react';
import { Card } from './ui/card';
import { User, Facebook, Image } from 'lucide-react';

const OnlineIdentity = ({ data }) => {
  return (
    <div className="mb-12">
      <div className="flex items-center space-x-3 mb-6">
        <User className="text-green-500" size={32} />
        <h2 className="text-3xl md:text-4xl font-black text-white">IDENTITAS ONLINE</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-600 to-blue-800 border-0 p-6 transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center space-x-3 mb-4">
            <Facebook className="text-white" size={28} />
            <h3 className="text-xl font-bold text-white">Nama Facebook</h3>
          </div>
          <p className="text-3xl font-black text-white">{data.onlineIdentity.facebookName}</p>
        </Card>

        <Card className="bg-gradient-to-br from-purple-600 to-purple-800 border-0 p-6 transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center space-x-3 mb-4">
            <Image className="text-white" size={28} />
            <h3 className="text-xl font-bold text-white">Foto Profil</h3>
          </div>
          <p className="text-3xl font-black text-white">{data.onlineIdentity.profilePicture}</p>
        </Card>

        <Card className="bg-gradient-to-br from-pink-600 to-pink-800 border-0 p-6 transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center space-x-3 mb-4">
            <User className="text-white" size={28} />
            <h3 className="text-xl font-bold text-white">Bio Facebook</h3>
          </div>
          <p className="text-xl font-black text-white">"{data.onlineIdentity.bio}"</p>
          <p className="text-sm text-pink-200 mt-2 italic">(padahal {data.onlineIdentity.bioReality})</p>
        </Card>
      </div>
    </div>
  );
};

export default OnlineIdentity;