import React, { useEffect, useState } from 'react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { AlertCircle, MapPin, Users, Trophy, Zap, Shield, Target, Skull } from 'lucide-react';
import { mockData } from '../data/mock';
import HeroSection from '../components/HeroSection';
import PhysicalTraits from '../components/PhysicalTraits';
import GameTraits from '../components/GameTraits';
import SkillSet from '../components/SkillSet';
import OnlineIdentity from '../components/OnlineIdentity';
import DangerousHabits from '../components/DangerousHabits';
import Reward from '../components/Reward';
import Procedure from '../components/Procedure';
import WhatsAppButton from '../components/WhatsAppButton';
import AnimatedBackground from '../components/AnimatedBackground';
import ScrollReveal from '../components/ScrollReveal';
import VotingSystem from '../components/VotingSystem';
import VisitorCounter from '../components/VisitorCounter';
import SoundManager from '../components/SoundManager';

const Home = () => {
  const [data, setData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [playSound, setPlaySound] = useState(null);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setData(mockData);
      setIsLoaded(true);
    }, 300);
  }, []);

  const handleSoundReady = (soundFunction) => {
    setPlaySound(() => soundFunction);
  };

  const handleClick = () => {
    if (playSound) playSound('click');
  };

  if (!isLoaded || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-2xl font-bold animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Sound Manager */}
      <SoundManager onSoundReady={handleSoundReady} />

      {/* Animated Background */}
      <AnimatedBackground />

      {/* Warning Banner */}
      <div className="relative z-10 bg-red-600 text-white py-4 px-6 text-center font-bold text-lg md:text-xl animate-glow">
        <AlertCircle className="inline-block mr-2 mb-1 animate-bounce" size={24} />
        🚨🚨 PENGUMUMAN PENTING 🚨🚨
      </div>

      {/* Visitor Counter - Top Right */}
      <div className="relative z-10 flex justify-end px-4 sm:px-6 lg:px-8 pt-6">
        <VisitorCounter />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Title */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 tracking-tight text-glow animate-float">
              DPO – DICARI PAKEK OTAK
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-red-600 via-red-500 to-red-600 mx-auto rounded-full animate-pulse"></div>
          </div>
        </ScrollReveal>

        {/* Hero Section */}
        <ScrollReveal delay={100}>
          <HeroSection data={data} />
        </ScrollReveal>

        {/* Voting System */}
        <ScrollReveal delay={100}>
          <VotingSystem playSound={playSound || (() => {})} />
        </ScrollReveal>

        {/* Physical Traits */}
        <ScrollReveal delay={200}>
          <PhysicalTraits data={data} />
        </ScrollReveal>

        {/* Game Traits */}
        <ScrollReveal delay={100}>
          <GameTraits data={data} />
        </ScrollReveal>

        {/* Skill Set */}
        <ScrollReveal delay={100}>
          <SkillSet data={data} />
        </ScrollReveal>

        {/* Online Identity */}
        <ScrollReveal delay={100}>
          <OnlineIdentity data={data} />
        </ScrollReveal>

        {/* Dangerous Habits */}
        <ScrollReveal delay={100}>
          <DangerousHabits data={data} />
        </ScrollReveal>

        {/* Reward */}
        <ScrollReveal delay={100}>
          <Reward data={data} />
        </ScrollReveal>

        {/* Procedure */}
        <ScrollReveal delay={100}>
          <Procedure data={data} />
        </ScrollReveal>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-black border-t border-gray-800 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400">
          <p className="text-sm">⚠️ Disclaimer: Ini adalah konten satir dan humor. Tidak ada maksud untuk menyinggung siapapun.</p>
          <p className="text-xs mt-2">© 2025 DPO Mobile Legends. All rights reserved.</p>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
};

export default Home;