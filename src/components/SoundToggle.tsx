import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function SoundToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const synthIntervalRef = useRef<number | null>(null);
  const padOscRef = useRef<OscillatorNode | null>(null);
  const padGainRef = useRef<GainNode | null>(null);

  // Stop sounds on unmount
  useEffect(() => {
    return () => {
      stopAmbience();
    };
  }, []);

  const startAmbience = () => {
    try {
      // Create audio context
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.15, ctx.currentTime);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // --- 1. Warm Background Pad (Hum) ---
      const padOsc = ctx.createOscillator();
      const padGain = ctx.createGain();
      
      padOsc.type = 'triangle';
      padOsc.frequency.setValueAtTime(110, ctx.currentTime); // A2 note
      
      // Warm detuned second voice
      const padOsc2 = ctx.createOscillator();
      padOsc2.type = 'sine';
      padOsc2.frequency.setValueAtTime(110.5, ctx.currentTime);

      padGain.gain.setValueAtTime(0, ctx.currentTime);
      padGain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 3.0); // Slow fade-in

      padOsc.connect(padGain);
      padOsc2.connect(padGain);
      padGain.connect(masterGain);

      padOsc.start();
      padOsc2.start();

      padOscRef.current = padOsc;
      padGainRef.current = padGain;

      // --- 2. Random Gentle Wind Chimes (Pentatonic Scale) ---
      const pentatonicScale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25]; // C major pentatonic
      
      const playChime = () => {
        if (!ctx || ctx.state === 'suspended') return;
        
        const freq = pentatonicScale[Math.floor(Math.random() * pentatonicScale.length)];
        
        // Oscillators for physical metallic modeling
        const osc = ctx.createOscillator();
        const chimeGain = ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        
        // Add metallic overtones
        const overtone = ctx.createOscillator();
        overtone.type = 'sine';
        overtone.frequency.setValueAtTime(freq * 2.51, ctx.currentTime);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2000, ctx.currentTime);

        chimeGain.gain.setValueAtTime(0, ctx.currentTime);
        chimeGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.05);
        chimeGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 4.0); // Long decay

        osc.connect(filter);
        overtone.connect(filter);
        filter.connect(chimeGain);
        chimeGain.connect(masterGain);

        osc.start();
        overtone.start();
        
        // Stop oscillators after decay
        osc.stop(ctx.currentTime + 4.2);
        overtone.stop(ctx.currentTime + 4.2);
      };

      // Play chimes periodically
      const scheduleNextChime = () => {
        const delay = 1500 + Math.random() * 2500; // Every 1.5 - 4 seconds
        synthIntervalRef.current = window.setTimeout(() => {
          playChime();
          scheduleNextChime();
        }, delay);
      };
      
      scheduleNextChime();
      setIsPlaying(true);
      
      // Auto-hide tooltip after activation
      setShowTooltip(false);
    } catch (e) {
      console.error("Failed to start audio: ", e);
    }
  };

  const stopAmbience = () => {
    if (synthIntervalRef.current) {
      clearTimeout(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }

    if (padGainRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      padGainRef.current.gain.cancelScheduledValues(ctx.currentTime);
      padGainRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5); // Fast fade out
    }

    setTimeout(() => {
      try {
        if (padOscRef.current) {
          padOscRef.current.stop();
          padOscRef.current = null;
        }
        if (audioCtxRef.current) {
          audioCtxRef.current.close();
          audioCtxRef.current = null;
        }
      } catch (e) {
        // ignore
      }
      setIsPlaying(false);
    }, 600);
  };

  const handleToggle = () => {
    if (isPlaying) {
      stopAmbience();
    } else {
      startAmbience();
    }
  };

  // Show a welcome tooltip to prompt sound on start
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="mb-3 mr-1 max-w-xs rounded-xl bg-white/90 backdrop-blur-md px-4 py-2.5 text-xs text-rose-500 font-serif border border-rose-100/50 shadow-lg shadow-rose-100/30 flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse shrink-0" />
            <span>바람 소리와 따스한 멜로디를 들어보세요.</span>
            <button 
              onClick={() => setShowTooltip(false)}
              className="ml-2 hover:text-rose-700 font-sans font-bold"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        id="bg-sound-toggle-btn"
        onClick={handleToggle}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 border ${
          isPlaying 
            ? 'bg-rose-100 text-rose-500 border-rose-200 shadow-rose-100/50' 
            : 'bg-white/80 backdrop-blur-md text-slate-400 border-slate-100 hover:text-rose-400'
        }`}
        title="배경 음악 켜기/끄기"
      >
        {isPlaying ? (
          <div className="relative">
            <Volume2 className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
          </div>
        ) : (
          <VolumeX className="w-5 h-5" />
        )}
      </motion.button>
    </div>
  );
}
