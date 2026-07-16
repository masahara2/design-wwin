import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Compass, Star, Camera, Coffee, ShoppingBag, Heart, Check, Sparkles, Printer } from 'lucide-react';
import { Stamp } from '../types';

interface StampTourProps {
  unlockedStamps: string[];
  onResetStamps: () => void;
}

export default function StampTour({ unlockedStamps, onResetStamps }: StampTourProps) {
  const [userName, setUserName] = useState('');
  const [isCertificateClaimed, setIsCertificateClaimed] = useState(false);

  const stamps: Stamp[] = [
    {
      id: 'sky_garden',
      name: '하늘마루 도장',
      description: '푸른 부산 앞바다와 오색 산마루를 함께 수놓는 전망대의 바람 스탬프',
      icon: '🏔️',
      isUnlocked: unlockedStamps.includes('sky_garden'),
      hint: '탐방 지도에서 "하늘마루 전망대"를 찾아 📍방문해 보세요.'
    },
    {
      id: 'little_prince',
      name: '어린왕자 도장',
      description: '어린왕자와 사막여우가 조용히 건네주는 깊고 따스한 어린 시절의 별빛 스탬프',
      icon: '👑',
      isUnlocked: unlockedStamps.includes('little_prince'),
      hint: '탐방 지도에서 "어린왕자와 사막여우 포토존"을 찾아 📍방문해 보세요.'
    },
    {
      id: 'gamcheon_cafe',
      name: '감성 카페 도장',
      description: '달콤한 소금 크림 커피와 따뜻한 주황 채광이 흘러넘치는 테이블 스탬프',
      icon: '☕',
      isUnlocked: unlockedStamps.includes('gamcheon_cafe'),
      hint: '탐방 지도에서 "전망 좋은 카페 \'하늘나루\'"를 찾아 📍방문해 보세요.'
    },
    {
      id: 'gamcheon_souvenir',
      name: '아기자기 소품 도장',
      description: '주민 예술가들의 따스한 정성과 작고 동글동글한 수공예품의 손길 스탬프',
      icon: '🎁',
      isUnlocked: unlockedStamps.includes('gamcheon_souvenir'),
      hint: '탐방 지도에서 "아기자기한 기념품점 \'소소함\'"을 찾아 📍방문해 보세요.'
    },
    {
      id: 'wish_stairs',
      name: '소망의 계단 도장',
      description: '148개의 소망 계단과 볕 아래서 낮잠을 청하는 길고양이들의 미소 스탬프',
      icon: '🐾',
      isUnlocked: unlockedStamps.includes('wish_stairs'),
      hint: '탐방 지도에서 "계단 위의 소망과 고양이 골목"을 찾아 📍방문해 보세요.'
    },
    {
      id: 'wish_wall',
      name: '소망 엽서 도장',
      description: '사랑하는 연인, 가족 혹은 나 자신을 향해 진심 어린 소원을 남겨둔 약속 스탬프',
      icon: '✉️',
      isUnlocked: unlockedStamps.includes('wish_wall'),
      hint: '아래 "감성 소망의 벽"에서 오색 파스텔 엽서를 남겨보세요.'
    }
  ];

  const unlockedCount = stamps.filter(s => s.isUnlocked).length;
  const isCompleted = unlockedCount === stamps.length;

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="stamp-tour" className="py-24 bg-gradient-to-b from-brand-bg to-[#FAF2E8]/40 relative">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-bg border border-brand-border text-brand-accent text-xs font-serif">
            <Award className="w-3.5 h-3.5 animate-pulse" />
            <span>오색 챌린지</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-brand-dark leading-tight">
            골목길 스탬프 투어
          </h2>
          <p className="text-brand-muted font-serif text-sm">
            감천마을 구석구석을 둘러보고 아기자기한 6개의 스탬프를 모두 완성해 보세요.<br />
            스탬프를 100% 가득 채우면 이웃 배려와 희망을 전하는 특별한 <strong>완주 인증서</strong>를 발급해 드립니다.
          </p>
        </div>

        {/* Status bar */}
        <div className="bg-white rounded-3xl p-6 border border-brand-border shadow-md max-w-xl mx-auto mb-12">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm font-serif font-semibold text-brand-dark">스탬프 모으기 현황</span>
            <span className="text-sm font-serif font-bold text-brand-accent">{unlockedCount} / {stamps.length} 개 완료</span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-[#EADDCB]/40 h-3.5 rounded-full overflow-hidden flex p-[2px]">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(unlockedCount / stamps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-brand-accent via-[#FF8A00] to-yellow-400 rounded-full"
            />
          </div>

          <div className="mt-3 text-center">
            {isCompleted ? (
              <span className="text-xs font-serif text-emerald-600 font-bold flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3 animate-spin" /> 축하합니다! 모든 골목 스탬프를 가득 채우셨습니다.
              </span>
            ) : (
              <span className="text-[11px] font-serif text-brand-muted">
                탐방 지도 명소에서 "방문하기"를 누르고, 소망의 벽에 소원을 남기면 획득할 수 있습니다.
              </span>
            )}
          </div>
        </div>

        {/* Stamps Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16">
          {stamps.map((stamp) => (
            <motion.div
              key={stamp.id}
              whileHover={stamp.isUnlocked ? { y: -5, scale: 1.02 } : {}}
              className={`relative p-5 rounded-2xl border text-center transition-all duration-300 ${
                stamp.isUnlocked
                  ? 'bg-white border-brand-accent/30 shadow-md shadow-brand-accent/10'
                  : 'bg-white/70 border-brand-border/60 text-brand-muted/70'
              }`}
            >
              {/* Stamp Circle Container */}
              <div className="flex justify-center mb-3">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl relative border-2 ${
                  stamp.isUnlocked
                    ? 'bg-gradient-to-br from-[#FFF5F2] to-[#FFEBE5] border-brand-accent text-brand-accent animate-gentle-wave'
                    : 'bg-[#F2EAE0]/50 border-brand-border text-brand-muted/40'
                }`}>
                  
                  {/* Digital Ink Stamp Look Overlay */}
                  {stamp.isUnlocked && (
                    <span className="absolute inset-1 rounded-full border border-dashed border-brand-accent/40 opacity-70 pointer-events-none" />
                  )}
                  
                  <span>{stamp.icon}</span>

                  {stamp.isUnlocked && (
                    <span className="absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full bg-brand-accent border border-white text-[10px] text-white flex items-center justify-center font-bold shadow-md">
                      ✓
                    </span>
                  )}
                </div>
              </div>

              <h4 className="text-xs sm:text-sm font-serif font-bold text-brand-dark mb-1">
                {stamp.name}
              </h4>
              <p className="text-[10px] sm:text-xs font-serif text-brand-muted leading-relaxed mb-3">
                {stamp.description}
              </p>

              {/* Unlock Hint if not completed */}
              {!stamp.isUnlocked && (
                <div className="text-[9px] sm:text-[10px] font-serif bg-brand-bg/50 border border-brand-border/40 p-2 rounded-lg text-brand-muted text-left leading-normal">
                  💡 {stamp.hint}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Interactive reward - Gamcheon Completion Certificate */}
        <AnimatePresence>
          {isCompleted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="bg-white border border-brand-border rounded-3xl p-6 sm:p-10 shadow-md max-w-2xl mx-auto text-center space-y-6 relative overflow-hidden"
            >
              {/* Celebration background sparkles */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brand-accent via-[#e6a38c] to-brand-border" />
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-bg rounded-full blur-2xl" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-bg rounded-full blur-2xl" />

              <div className="space-y-2">
                <span className="text-3xl">📜</span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-brand-dark">
                  감천문화마을 명예 주민 임명장
                </h3>
                <p className="text-xs sm:text-sm font-serif text-brand-muted leading-relaxed">
                  위 여행자는 이웃을 배려하며 일군 아름다운 예술 골목 감천의 6대 명소를 완벽히 여행하고,<br />
                  마을의 소중한 역사와 감동을 품에 고이 안은 공로가 크기에 이 증서를 드립니다.
                </p>
              </div>

              {!isCertificateClaimed ? (
                <div className="bg-brand-bg p-5 rounded-2xl border border-brand-border max-w-md mx-auto space-y-4">
                  <label className="block text-xs font-serif font-bold text-brand-dark text-left">
                    임명장에 각인될 당신의 고유한 이름을 적어주세요 :
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="예시: 어린왕자 여행자"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="flex-1 px-4 py-2 text-xs sm:text-sm font-serif rounded-xl border border-brand-border bg-white focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/15 text-brand-dark"
                    />
                    <button
                      id="claim-certificate-btn"
                      onClick={() => {
                        if (userName.trim()) setIsCertificateClaimed(true);
                      }}
                      className="px-4 py-2 rounded-xl bg-brand-accent hover:bg-[#c27a61] text-white font-serif text-xs font-bold shadow shadow-brand-accent/10 cursor-pointer transition-colors"
                    >
                      발급하기
                    </button>
                  </div>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Real Certificate display card */}
                  <div className="p-8 border-4 border-double border-brand-accent/30 rounded-2xl bg-gradient-to-br from-[#FFFDFB] to-[#FAF7F2] max-w-md mx-auto text-center shadow-inner relative space-y-6 print:border-8 print:p-12">
                    
                    {/* Retro Stamp Look icon overlay */}
                    <div className="absolute top-4 right-4 w-12 h-12 border-2 border-dashed border-brand-accent/30 rounded-full flex items-center justify-center transform rotate-12 opacity-80 select-none">
                      <span className="text-[9px] font-serif font-bold text-brand-accent text-center leading-none">완주<br />인증</span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-serif tracking-widest text-brand-muted">명예 골목 주민장 (제 2026-715호)</span>
                      <h4 className="text-xl font-serif font-bold text-brand-dark border-b border-brand-border pb-3">감천문화마을 명예주민</h4>
                    </div>

                    <div className="space-y-4 font-serif">
                      <p className="text-base text-brand-dark">
                        성명: <strong className="text-lg text-brand-accent underline decoration-brand-accent/30 decoration-wavy underline-offset-4">{userName}</strong>
                      </p>
                      <p className="text-xs text-brand-muted leading-relaxed text-center px-4">
                        "당신은 사막여우와 어린왕자가 바라보던 파스텔 하늘 아래에서 배려와 화합의 온기를 발견했습니다. 이 소중한 마을의 온기가 일상 속에서도 따뜻한 힘이 되어 주길 바랍니다."
                      </p>
                    </div>

                    <div className="space-y-1 font-serif pt-4 border-t border-brand-border">
                      <p className="text-[10px] text-brand-muted">발급일자: {new Date().toLocaleDateString('ko-KR')}</p>
                      <p className="text-xs font-bold text-brand-dark">부산광역시 사하구 감천문화마을 보존회</p>
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex justify-center gap-3 max-w-md mx-auto">
                    <button
                      id="print-cert-btn"
                      onClick={handlePrint}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-brand-border bg-white hover:bg-[#FAF5EF] text-brand-dark font-serif text-xs font-semibold cursor-pointer shadow-sm transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>인증서 인쇄 / PDF 저장</span>
                    </button>
                    <button
                      id="reset-tour-btn"
                      onClick={() => {
                        onResetStamps();
                        setIsCertificateClaimed(false);
                        setUserName('');
                      }}
                      className="px-4 py-2.5 rounded-xl border border-brand-accent/20 bg-brand-bg hover:bg-brand-bg/80 text-brand-accent font-serif text-xs font-semibold cursor-pointer transition-colors"
                    >
                      다시 도전
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
