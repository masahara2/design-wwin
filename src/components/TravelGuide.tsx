import React from 'react';
import { Clock, HelpCircle, MapPin, Bus, Car, EyeOff, ShieldCheck, Heart } from 'lucide-react';
import { motion } from 'motion/react';

export default function TravelGuide() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80 } }
  };

  return (
    <section id="travel-guide" className="py-24 bg-white relative">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-bg border border-brand-border text-brand-accent text-xs font-serif">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>이용 안내 및 배려</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-brand-dark leading-tight">
            따뜻한 여행길을 위한 안내서
          </h2>
          <p className="text-brand-muted font-serif text-sm">
            감천문화마을은 실제 마을 주민들이 평화롭게 일상을 살아가는 삶의 터전입니다.<br />
            서로를 존중하고 예의를 지키는 배려 있는 발걸음으로 더 깊고 아름다운 여행을 함께 나누어 보세요.
          </p>
        </div>

        {/* Travel Information Bento Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          
          {/* Box 1: Operating Hours (5 cols) */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-5 p-6 rounded-2xl bg-gradient-to-br from-[#FAF5EF] to-white border border-brand-border shadow-sm space-y-4"
          >
            <div className="flex items-center gap-2.5 text-brand-accent">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                <Clock className="w-4 h-4" />
              </div>
              <h3 className="text-sm sm:text-base font-serif font-bold text-brand-dark">마을 탐방 운영 시간</h3>
            </div>
            <div className="space-y-2.5 font-serif text-xs sm:text-sm text-brand-text pl-1">
              <div className="flex justify-between pb-1.5 border-b border-brand-border">
                <span>🌸 하절기 (3월 ~ 10월)</span>
                <span className="font-bold text-brand-dark">09:00 ~ 18:00</span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-brand-border">
                <span>❄️ 동절기 (11월 ~ 2월)</span>
                <span className="font-bold text-brand-dark">09:00 ~ 17:00</span>
              </div>
              <p className="text-[10px] text-brand-accent leading-relaxed font-sans pt-1">
                ※ 실제 주민들이 거주하고 있는 주거지이므로 상기 운영 시간 외 야간 방문은 주민생활 보호 및 치안을 위해 통제되니 너른 양해 부탁드립니다.
              </p>
            </div>
          </motion.div>

          {/* Box 2: Admission Fees & Maps (7 cols) */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-7 p-6 rounded-2xl bg-gradient-to-br from-[#FFFDFB] to-[#FAF5EF] border border-brand-border shadow-sm space-y-4"
          >
            <div className="flex items-center gap-2.5 text-brand-accent">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-brand-border">
                <HelpCircle className="w-4 h-4" />
              </div>
              <h3 className="text-sm sm:text-base font-serif font-bold text-brand-dark">입장료 및 안내 지도</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-serif text-xs sm:text-sm text-brand-text">
              <div className="bg-brand-bg p-4 rounded-xl border border-brand-border">
                <p className="font-semibold text-brand-accent mb-1">🎟️ 마을 입장료</p>
                <p className="font-bold text-brand-dark text-sm">무료 (Free)</p>
                <p className="text-[10px] text-brand-muted mt-1 leading-normal">
                  누구나 아름다운 야외 골목길과 상점을 무료로 거닐 수 있습니다.
                </p>
              </div>
              <div className="bg-brand-bg p-4 rounded-xl border border-brand-border">
                <p className="font-semibold text-brand-accent mb-1">🗺️ 스탬프 투어 지도</p>
                <p className="font-bold text-brand-dark text-sm">2,000 원 (2,000 KRW)</p>
                <p className="text-[10px] text-brand-muted mt-1 leading-normal">
                  종이 지도의 모든 판매 수익금은 감천 주민들의 주거 복지와 마을 가꾸기 기금으로 전액 투명하게 환원됩니다.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Box 3: Public Transportation (8 cols) */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-8 p-6 rounded-2xl bg-gradient-to-br from-[#FFFDFB] to-[#FAF5EF] border border-brand-border shadow-sm space-y-4"
          >
            <div className="flex items-center gap-2.5 text-brand-accent">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                <Bus className="w-4 h-4" />
              </div>
              <h3 className="text-sm sm:text-base font-serif font-bold text-brand-dark">찾아오시는 길 (대중교통 강추)</h3>
            </div>
            <div className="space-y-3 font-serif text-xs sm:text-sm text-brand-text">
              <div className="flex gap-2 items-start">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand-accent/10 text-brand-accent text-[10px] font-bold mt-0.5 shrink-0">1</span>
                <div>
                  <p className="font-bold text-brand-dark">토성역(부산 지하철 1호선) 경유 노선</p>
                  <p className="text-brand-muted text-[11px] leading-relaxed mt-0.5">
                    <strong>토성역 6번 출구</strong>로 나와 도보 2분 거리인 부산대학교병원 암센터 버스정류장에서 마을버스 <strong>서구2, 서구2-2, 사하1-1</strong> 승차 후, <strong className="text-brand-accent">'감천문화마을'</strong> 정류장에서 하차합니다. (약 10분 소요)
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-start pt-1.5 border-t border-brand-border">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand-accent/10 text-brand-accent text-[10px] font-bold mt-0.5 shrink-0">2</span>
                <div>
                  <p className="font-bold text-brand-dark">괴정역(부산 지하철 1호선) 경유 노선</p>
                  <p className="text-brand-muted text-[11px] leading-relaxed mt-0.5">
                    <strong>괴정역 6번 출구</strong> 앞 정류장에서 마을버스 <strong>사하1, 사하1-1</strong> 승차 후, 동일하게 '감천문화마을' 정류장에서 하차합니다. (약 15분 소요)
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Box 4: Parking Info (4 cols) */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-4 p-6 rounded-2xl bg-gradient-to-br from-white to-[#FAF5EF] border border-brand-border shadow-sm space-y-4"
          >
            <div className="flex items-center gap-2.5 text-brand-accent">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                <Car className="w-4 h-4" />
              </div>
              <h3 className="text-sm sm:text-base font-serif font-bold text-brand-dark">자가용 및 주차 안내</h3>
            </div>
            <div className="space-y-2 font-serif text-xs sm:text-sm text-brand-text pl-1">
              <p className="text-brand-dark leading-normal">
                마을 진입 도로 및 언덕길이 매우 협소하고 가팔라 극심한 정체가 빈번하오니 대중교통 이용을 적극 권장합니다.
              </p>
              <div className="bg-[#FAF5EF] p-2.5 rounded-lg border border-brand-border text-[10px] text-brand-dark leading-normal">
                📍 <strong>공영 주차장 안내:</strong><br />
                • 감천문화마을 공영주차장<br />
                • 감천2동전통시장 공영주차장
              </div>
            </div>
          </motion.div>

          {/* Box 5: Etiquette Campaign (12 cols) */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-12 p-6 sm:p-8 rounded-3xl bg-brand-bg border border-brand-border shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
          >
            <div className="space-y-2.5 max-w-2xl">
              <h4 className="text-base sm:text-lg font-serif font-bold text-brand-accent flex items-center gap-2">
                <Heart className="w-5 h-5 fill-brand-accent/20 text-brand-accent animate-pulse" />
                <span>주민을 배려하는 사려 깊은 골목 여행 캠페인</span>
              </h4>
              <p className="text-xs sm:text-sm text-brand-muted font-serif leading-relaxed">
                마을을 지키는 힘은 여행자 여러분의 사소한 존중에서 피어납니다. 주택 내부를 가만히 들여다보거나, 활짝 열려 있는 대문 안 마당 쪽으로 카메라 렌즈를 향하는 것은 참아주세요. 쓰레기는 가방에 모아 되가져가고, 좁고 울림이 심한 골목길에서는 다정하게 소리를 낮춰 속삭이듯 말씀 나누어 주시길 고개 숙여 부탁드립니다.
              </p>
            </div>
            
            <div className="flex flex-row sm:flex-col gap-3 shrink-0">
              <div className="flex items-center gap-1.5 px-3 py-2 bg-white rounded-xl border border-brand-border shadow-sm text-[11px] font-semibold text-brand-accent font-serif">
                <EyeOff className="w-3.5 h-3.5 text-brand-accent" />
                <span>사생활 노출 보호</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-2 bg-white rounded-xl border border-brand-border shadow-sm text-[11px] font-semibold text-brand-accent font-serif">
                <span>🤫</span>
                <span>골목길 저소음 유지</span>
              </div>
            </div>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}
