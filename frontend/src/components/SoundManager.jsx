import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const SoundManager = ({ onSoundReady }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Audio refs
  const bgMusicRef = useRef(null);
  const clickSoundRef = useRef(null);
  const voteSoundRef = useRef(null);
  const successSoundRef = useRef(null);
  const errorSoundRef = useRef(null);
  const sirenSoundRef = useRef(null);

  useEffect(() => {
    // Check if user preference exists
    const mutedPreference = localStorage.getItem('soundMuted');
    if (mutedPreference === 'true') {
      setIsMuted(true);
    }

    // Initialize sounds on first user interaction
    const initSounds = () => {
      if (!isInitialized) {
        setIsInitialized(true);
        if (!isMuted && bgMusicRef.current) {
          bgMusicRef.current.play().catch(e => console.log('Autoplay prevented'));
        }
      }
    };

    document.addEventListener('click', initSounds, { once: true });
    document.addEventListener('touchstart', initSounds, { once: true });

    return () => {
      document.removeEventListener('click', initSounds);
      document.removeEventListener('touchstart', initSounds);
    };
  }, [isMuted, isInitialized]);

  const playSound = (soundType) => {
    if (isMuted || !isInitialized) return;

    let sound;
    switch(soundType) {
      case 'click':
        sound = clickSoundRef.current;
        break;
      case 'vote':
        sound = voteSoundRef.current;
        break;
      case 'success':
        sound = successSoundRef.current;
        break;
      case 'error':
        sound = errorSoundRef.current;
        break;
      case 'siren':
        sound = sirenSoundRef.current;
        break;
      default:
        return;
    }

    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(e => console.log('Sound play failed:', e));
    }
  };

  // Expose playSound function to parent
  useEffect(() => {
    if (onSoundReady) {
      onSoundReady(playSound);
    }
  }, [isMuted, isInitialized, onSoundReady]);

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    localStorage.setItem('soundMuted', newMutedState.toString());

    if (bgMusicRef.current) {
      if (newMutedState) {
        bgMusicRef.current.pause();
      } else {
        bgMusicRef.current.play().catch(e => console.log('Play failed:', e));
      }
    }
  };

  return (
    <>
      {/* Mute/Unmute Button */}
      <button
        onClick={toggleMute}
        className="fixed bottom-24 right-6 z-50 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 border-2 border-white"
        aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
        data-testid="sound-toggle-button"
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>

      {/* Audio Elements */}
      <audio ref={bgMusicRef} loop>
        <source src="https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3" type="audio/mpeg" />
      </audio>
      
      <audio ref={clickSoundRef}>
        <source src="https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3" type="audio/mpeg" />
      </audio>
      
      <audio ref={voteSoundRef}>
        <source src="https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.mp3" type="audio/mpeg" />
      </audio>
      
      <audio ref={successSoundRef}>
        <source src="https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3" type="audio/mpeg" />
      </audio>
      
      <audio ref={errorSoundRef}>
        <source src="https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-fail-notification-946.mp3" type="audio/mpeg" />
      </audio>
      
      <audio ref={sirenSoundRef} loop>
        <source src="https://assets.mixkit.co/sfx/preview/mixkit-security-facility-breach-alarm-994.mp3" type="audio/mpeg" />
      </audio>
    </>
  );
};

export default SoundManager;
