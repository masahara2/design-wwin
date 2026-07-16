import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Heart, Sparkles, MapPin, Menu, X, Award, ChevronDown } from 'lucide-react';

import AboutSection from './components/AboutSection';
import InteractiveMap from './components/InteractiveMap';
import WishWall from './components/WishWall';
import StampTour from './components/StampTour';
import TravelGuide from './components/TravelGuide';
import SoundToggle from './components/SoundToggle';

export default function App() {
  const [unlockedStamps, setUnlockedStamps] = useState<string[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load stamps progress on load
  useEffect(() => {
    const saved = localStorage.getItem('gamcheon_stamps_progress');
    if (saved) {
      try {
        setUnlockedStamps(JSON.parse(saved));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  // Save stamps progress
  const saveStampsProgress = (stamps: string[]) => {
    setUnlockedStamps(stamps);
    localStorage.setItem('gamcheon_stamps_progress', JSON.stringify(stamps));
  };

  // Helper to trigger floating celebration toast
  const triggerToast = (message: string) => {
    setToastMessage(message);
    // Clear toast after 3 seconds
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleStampUnlocked = (stampId: string) => {
    if (!unlockedStamps.includes(stampId)) {
      const updated = [...unlockedStamps, stampId];
      saveStampsProgress(updated);
      
      const stampNames: { [key: string]: string } = {
        sky_garden: '하늘마루 도장',
        little_prince: '어린왕자 도장',
        gamcheon_cafe: '감성 카페 도장',
        gamcheon_souvenir: '아기자기 소품 도장',
        wish_stairs: '소망의 계단 도장',
        wish_wall: '소망 엽서 도장'
      };
      
      const name = stampNames[stampId] || '새 도장';
      triggerToast(`🎒 스탬프 획득! '${name}'이(가) 활성화되었습니다.`);
    }
  };

  const handleResetStamps = () => {
    saveStampsProgress([]);
    triggerToast('🔄 스탬프 탐방이 초기화되었습니다. 다시 도전해 보세요!');
  };

  const handleWishSubmitted = () => {
    handleStampUnlocked('wish_wall');
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const menuItems = [
    { name: '마을 이야기', id: 'about-section' },
    { name: '골목 지도', id: 'tour-map' },
    { name: '소망의 벽', id: 'wish-wall-section' },
    { name: '스탬프 투어', id: 'stamp-tour' },
    { name: '이용 가이드', id: 'travel-guide' }
  ];

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text antialiased font-sans selection:bg-rose-100 selection:text-brand-accent">
      
      {/* Floating Stamp Earned Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9, x: '-50%' }}
            animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
            exit={{ opacity: 0, y: -20, scale: 0.9, x: '-50%' }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3.5 bg-brand-accent text-white rounded-full font-serif text-xs sm:text-sm font-semibold shadow-lg shadow-brand-accent/30 flex items-center gap-2 border border-brand-accent/50"
          >
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Warm Ambient Soundtrack widget */}
      <SoundToggle />

      {/* Header Navigation */}
      <header className="fixed top-0 inset-x-0 z-40 bg-brand-bg/90 backdrop-blur-md border-b border-brand-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Logo / Brand Name */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="text-2xl font-serif italic tracking-tight font-bold text-brand-accent">
              Gamcheon.
            </div>
            <span className="text-xs font-serif font-semibold text-brand-muted tracking-widest uppercase hidden sm:inline ml-1 border-l border-brand-border pl-3">
              감천문화마을
            </span>
          </button>

          {/* Desktop Navigation Link Menu */}
          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-semibold">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-[11px] text-brand-muted hover:text-brand-accent cursor-pointer transition-colors duration-200"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Special Stamp Count Pill for header */}
          <div className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-text/20 text-brand-dark text-[11px] font-bold tracking-wider">
            <span>🎒 STAMP</span>
            <span className="bg-brand-accent text-white px-2 py-0.5 rounded-full text-[10px] font-mono font-bold leading-none">
              {unlockedStamps.length}
            </span>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-brand-text hover:text-brand-accent cursor-pointer transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden fixed top-16 inset-x-0 bg-brand-bg border-b border-brand-border z-35 shadow-md overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left py-2 text-sm font-serif text-brand-text hover:text-brand-accent cursor-pointer"
                >
                  • {item.name}
                </button>
              ))}
              <div className="pt-2 border-t border-brand-border flex items-center justify-between text-xs text-brand-accent font-serif">
                <span>🎒 획득한 골목 스탬프 개수</span>
                <span className="bg-brand-accent text-white px-2 py-1 rounded-full text-xs font-mono font-bold">
                  {unlockedStamps.length} / 6
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Banner Section */}
      <section id="hero-section" className="relative min-h-[95vh] sm:min-h-[85vh] flex items-center justify-center overflow-hidden pt-16">
        
        {/* Background Image with parallax style and subtle zoom */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/gamcheon_hero_1784108140571.jpg"
            alt="감천문화마을 전경"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover brightness-[0.93] scale-102 transform animate-[pulse_10s_ease-in-out_infinite]"
          />
          {/* Subtle warm, colorful pastel overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/20 to-black/30 pointer-events-none" />
        </div>

        {/* Hero Copy Content */}
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6 space-y-8 py-16">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0 }}
            className="space-y-4 sm:space-y-6"
          >
            
            {/* Soft subtle subtag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-bg/90 backdrop-blur-md rounded-full border border-brand-border text-brand-accent font-serif text-xs tracking-wider shadow-sm">
              <Compass className="w-3.5 h-3.5 animate-spin" />
              <span>부산 사하구 • 오색 찬란한 예술 산동네</span>
            </div>

            {/* Main Emotional Poetry Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-brand-dark tracking-tight leading-tight drop-shadow-sm">
              알록달록 파스텔 빛<br />
              <span className="text-brand-accent font-semibold underline decoration-brand-accent/50 decoration-wavy decoration-3 underline-offset-8">
                지붕들이 수놓는
              </span>{' '}
              치유의 골목길
            </h1>

            {/* Emotional Tagline Description */}
            <p className="text-sm sm:text-base md:text-lg font-serif text-brand-dark font-medium max-w-xl mx-auto leading-relaxed">
              가파른 산마루를 감싸 안은 오색빛깔 집들과, 골목길 귀퉁이마다 어린왕자가 조용히 머무는 마을. 배려와 희망으로 피어난 감천문화마을로 당신의 다정한 발걸음을 초대합니다.
            </p>

          </motion.div>

          {/* Action Call to scroll to map */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <button
              id="start-tour-btn"
              onClick={() => scrollToSection('tour-map')}
              className="px-6 py-3 rounded-full bg-brand-accent hover:bg-[#c27a61] text-white font-serif text-xs sm:text-sm font-bold shadow-md shadow-brand-accent/20 hover:shadow-lg hover:scale-103 transition-all cursor-pointer"
            >
              🗺️ 골목길 탐방지도 열기
            </button>
            <button
              id="scroll-to-about-btn"
              onClick={() => scrollToSection('about-section')}
              className="px-6 py-3 rounded-full bg-brand-bg/90 hover:bg-brand-bg border border-brand-border text-brand-muted hover:text-brand-accent font-serif text-xs sm:text-sm font-semibold shadow-sm hover:scale-103 transition-all cursor-pointer"
            >
              마을 이야기 읽기
            </button>
          </motion.div>

          {/* Bouncing Scroll Down Guide */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ delay: 1.0, repeat: Infinity, duration: 2.5 }}
            className="pt-10 flex flex-col items-center justify-center text-[10px] font-serif text-brand-muted pointer-events-none"
          >
            <span>아래로 천천히 걸어가기</span>
            <ChevronDown className="w-4 h-4 mt-1 animate-bounce" />
          </motion.div>

        </div>

      </section>

      {/* Main Structural Layout Modules */}
      <main className="relative z-20">
        {/* Module 1: History & Philosophy (About) */}
        <AboutSection />

        {/* Module 2: Interactive Tour Map with visited state callbacks */}
        <InteractiveMap 
          onStampUnlocked={handleStampUnlocked} 
          unlockedStamps={unlockedStamps} 
        />

        {/* Module 3: Emotional Postcards Wish Wall */}
        <WishWall onWishSubmitted={handleWishSubmitted} />

        {/* Module 4: Digital Gamified Stamp Tour (The Goal Tracker) */}
        <StampTour 
          unlockedStamps={unlockedStamps} 
          onResetStamps={handleResetStamps} 
        />

        {/* Module 5: Travel Guide, maps and rules (TravelGuide) */}
        <TravelGuide />
      </main>

      {/* Aesthetic Footer */}
      <footer className="py-16 bg-[#F3EDE6] border-t border-brand-border text-brand-muted font-serif text-xs">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-brand-border pb-10 mb-8">
            
            {/* Left Brand Area (5 cols) */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-brand-accent text-white flex items-center justify-center text-xs font-bold font-serif">감</div>
                <h4 className="text-sm font-bold text-brand-dark">감천문화마을 공식 소개 페이지</h4>
              </div>
              <p className="text-brand-muted leading-relaxed text-[11px] sm:text-xs">
                본 홈페이지는 따뜻하고 치유가 가득한 감천문화마을의 아름다운 풍광과 예술, 그리고 거주민들의 이웃 배려 정신을 전하기 위해 소중한 파스텔 동화 풍으로 제작되었습니다.
              </p>
            </div>

            {/* Middle Quick Links (3 cols) */}
            <div className="md:col-span-3 space-y-2">
              <h5 className="font-bold text-brand-dark text-[11px] sm:text-xs">탐방 명소 꿀팁</h5>
              <div className="flex flex-col gap-1.5 text-[11px] text-brand-muted">
                <button onClick={() => scrollToSection('tour-map')} className="text-left hover:text-brand-accent cursor-pointer transition-colors">어린왕자 & 사막여우</button>
                <button onClick={() => scrollToSection('tour-map')} className="text-left hover:text-brand-accent cursor-pointer transition-colors">하늘마루 전망대</button>
                <button onClick={() => scrollToSection('wish-wall-section')} className="text-left hover:text-brand-accent cursor-pointer transition-colors">소망의 계단 & 고양이골목</button>
              </div>
            </div>

            {/* Right Contact Info (4 cols) */}
            <div className="md:col-span-4 space-y-2 text-[11px] sm:text-xs leading-normal">
              <h5 className="font-bold text-brand-dark">감천문화마을 안내센터</h5>
              <p className="text-brand-muted">📍 주소: 부산광역시 사하구 감내2로 203 (감천동)</p>
              <p className="text-brand-muted">📞 전화: 051-204-1444</p>
              <p className="text-brand-muted">🌐 홈페이지 가이드: 화요일-일요일 (안내소 운영 기준)</p>
            </div>

          </div>

          {/* Legals & Credits */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-brand-muted">
            <p>© 2026 Gamcheon Culture Village. All rights reserved.</p>
            <div className="flex gap-4">
              <span className="hover:text-brand-accent transition-colors cursor-pointer">이용약관</span>
              <span className="hover:text-brand-accent transition-colors cursor-pointer">개인정보처리방침</span>
              <span className="hover:text-brand-accent transition-colors cursor-pointer">주민협동조합 안내</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
