import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Camera, Coffee, ShoppingBag, Info, Award, Heart, Sparkles, Clock, Compass } from 'lucide-react';
import { MapSpot } from '../types';

interface InteractiveMapProps {
  onStampUnlocked?: (stampId: string) => void;
  unlockedStamps: string[];
}

export default function InteractiveMap({ onStampUnlocked, unlockedStamps }: InteractiveMapProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedSpot, setSelectedSpot] = useState<MapSpot | null>(null);

  const spots: MapSpot[] = [
    {
      id: 'little_prince',
      name: '어린왕자와 사막여우 포토존',
      category: 'photo',
      description: '마을 전체가 한눈에 내려다보이는 난간에 나란히 걸터앉아 감천의 파스텔빛 풍경을 감상하는 어린왕자와 사막여우입니다. 감천문화마을을 대표하는 최고의 인생샷 장소로, 전 세계 여행자들의 사랑을 듬뿍 받고 있는 시그니처 명소입니다.',
      imageUrl: '/src/assets/images/little_prince_closeup_1784108158322.jpg',
      x: 32,
      y: 45,
      tips: [
        '뒤돌아 앉아서 어린왕자와 나란히 먼바다와 어우러진 알록달록 마을을 배경으로 촬영하는 구도가 정석입니다.',
        '주말에는 대기시간이 길 수 있으니 한적한 오전 9시 이전이나 늦은 오후 황금빛 노을 시간대에 찾아오시면 여유롭게 즐길 수 있어요.'
      ],
      recommendedTime: '17:00 ~ 18:30 (황금빛 노을 시간)'
    },
    {
      id: 'gamcheon_cafe',
      name: '전망 좋은 카페 \'하늘나루\'',
      category: 'cafe',
      description: '통유리창 너머로 탁 트인 남항대교 푸른 바다와 산자락을 따라 펼쳐진 오색 빛깔 집들을 느긋하게 조망할 수 있는 아늑한 감성 공간입니다. 시원한 크림 에이드와 매일 아침 구워내는 수제 쿠키를 맛볼 수 있습니다.',
      imageUrl: '/src/assets/images/gamcheon_cafe_1784108173694.jpg',
      x: 52,
      y: 35,
      tips: [
        '창가 쪽 좌석에 자리를 잡고 달콤한 소금 크림 커피를 마시며 여유롭게 셔터를 눌러보세요. 풍경과 디저트가 함께 담겨 감성적인 사진이 나옵니다.',
        '2층 루프탑에서는 가슴이 뻥 뚫리는 360도 파노라마 뷰를 배경으로 야외 스냅 촬영도 가능합니다.'
      ],
      recommendedTime: '13:00 ~ 15:00 (눈부신 오후 채광)'
    },
    {
      id: 'gamcheon_souvenir',
      name: '아기자기한 기념품점 \'소소함\'',
      category: 'souvenir',
      description: '마을 예술가들이 감천의 고즈넉한 감성을 듬뿍 담아 손수 구운 작은 점토 집 미니어처, 따스한 손글씨 엽서, 레진 아트로 수놓은 조그마한 바다 키링 등을 만날 수 있는 소박하고 귀여운 수공예 공방형 상점입니다.',
      imageUrl: '/src/assets/images/gamcheon_souvenir_1784108187949.jpg',
      x: 68,
      y: 60,
      tips: [
        '직접 채색해볼 수 있는 단 하나뿐인 나만의 미니 점토집 그리기 체험이 인기가 많습니다.',
        '구입한 감천 엽서에 진심어린 소망이나 편지를 적어 소망의 벽에 걸어둘 수도 있습니다.'
      ],
      recommendedTime: '11:00 ~ 17:30 (공방 체험 운영 시간)'
    },
    {
      id: 'sky_garden',
      name: '하늘마루 전망대',
      category: 'landmark',
      description: '오래된 주택의 뼈대와 지붕을 그대로 보존하면서, 옥상 위 공간을 탁 트인 전망대로 탈바꿈한 주민 자치 쉼터입니다. 용두산 부산타워와 자갈치 시장, 그리고 멀리 남항대교까지 바다와 육지가 빚어내는 부산 최고의 하모니를 내려다볼 수 있습니다.',
      imageUrl: 'https://images.unsplash.com/photo-1621516082260-eb5555c91be8?auto=format&fit=crop&w=800&q=80',
      x: 18,
      y: 28,
      tips: [
        '안내소에서 감천의 공식 종이 스탬프 지도를 구매할 수 있습니다.',
        '이곳 옥상에서 소중한 사람에게 엽서를 작성하면 1년 뒤에 배달되는 \'느린 우체통\' 서비스를 꼭 체험해 보세요.'
      ],
      recommendedTime: '09:00 ~ 11:30 (가장 공기가 맑고 선명한 오전)'
    },
    {
      id: 'wish_stairs',
      name: '계단 위의 소망과 고양이 골목',
      category: 'rest',
      description: '마을의 가파른 산동네를 아래위로 이어주는 148개의 나선형 돌계단입니다. 무거운 등짐을 지고 이 가파른 계단을 한 칸씩 딛고 오르며 자신의 건강과 소중한 가족을 위해 간절한 마음으로 소원을 빌었다고 전해져 소망의 계단이라고 부릅니다.',
      imageUrl: 'https://images.unsplash.com/photo-1542820229-081e0c12af0b?auto=format&fit=crop&w=800&q=80',
      x: 82,
      y: 48,
      tips: [
        '계단 아래에서 위를 올려다보는 구도로 세로 사진을 촬영하면 골목의 엄청난 경사감과 입체감이 한 폭의 그림처럼 담깁니다.',
        '계단 틈새에서 얌전히 졸고 있는 귀여운 동네 길고양이들을 만나면 조용히 눈인사를 건네보세요.'
      ],
      recommendedTime: '15:30 ~ 17:00 (고양이들이 볕을 쬐러 나오는 시간)'
    }
  ];

  // Set default spot to the Little Prince on load
  React.useEffect(() => {
    if (!selectedSpot) {
      setSelectedSpot(spots[0]);
    }
  }, []);

  const categories = [
    { id: 'all', name: '전체 보기', icon: Compass, color: 'bg-brand-bg text-brand-accent border-brand-border' },
    { id: 'landmark', name: '인생 명소', icon: Award, color: 'bg-brand-bg text-brand-dark border-brand-border' },
    { id: 'photo', name: '인생샷 포토존', icon: Camera, color: 'bg-brand-bg text-brand-accent border-brand-border' },
    { id: 'souvenir', name: '아기자기 소품샵', icon: ShoppingBag, color: 'bg-brand-bg text-brand-dark border-brand-border' },
    { id: 'cafe', name: '감성 카페', icon: Coffee, color: 'bg-brand-bg text-brand-accent border-brand-border' },
    { id: 'rest', name: '편안한 휴식공간', icon: Heart, color: 'bg-brand-bg text-brand-muted border-brand-border' }
  ];

  const filteredSpots = activeCategory === 'all' 
    ? spots 
    : spots.filter(spot => spot.category === activeCategory);

  const getPinColor = (category: string, isSelected: boolean) => {
    if (isSelected) return 'bg-brand-accent border-white ring-4 ring-brand-accent/25 scale-125 z-30';
    switch (category) {
      case 'landmark': return 'bg-emerald-500 border-white hover:scale-115 text-white';
      case 'photo': return 'bg-rose-500 border-white hover:scale-115 text-white';
      case 'souvenir': return 'bg-amber-500 border-white hover:scale-115 text-white';
      case 'cafe': return 'bg-sky-500 border-white hover:scale-115 text-white';
      default: return 'bg-purple-500 border-white hover:scale-115 text-white';
    }
  };

  const handleVisit = (spot: MapSpot) => {
    if (onStampUnlocked) {
      onStampUnlocked(spot.id);
    }
  };

  return (
    <section id="tour-map" className="py-24 bg-gradient-to-b from-[#FAF2E8]/40 to-brand-bg relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-bg border border-brand-border text-brand-accent text-xs font-serif">
            <Compass className="w-3.5 h-3.5 animate-spin" />
            <span>감성 골목 탐방</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-brand-dark leading-tight">
            어디로 발걸음을 옮겨볼까요?
          </h2>
          <p className="text-brand-muted font-serif text-sm">
            파스텔빛 언덕 골목길 속에 소중히 보물처럼 숨어있는 인생 쉼터와 즐길 거리들입니다.<br />
            지도의 핀을 눌러 감성 명소의 꿀팁을 확인하고 가상 방문 스탬프도 모아보세요.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  // Auto select first spot in that category
                  const found = spots.find(s => cat.id === 'all' || s.category === cat.id);
                  if (found) setSelectedSpot(found);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-serif transition-all duration-300 border cursor-pointer ${
                  isSelected 
                    ? 'bg-brand-accent text-white border-brand-accent shadow-sm shadow-brand-accent/20' 
                    : 'bg-white text-brand-muted border-brand-border hover:border-brand-accent hover:text-brand-accent'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Map Layout Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Interactive Map Canvas (7 cols) */}
          <div className="lg:col-span-7 relative bg-white border border-brand-border rounded-3xl p-4 sm:p-6 shadow-sm overflow-hidden aspect-[4/3] sm:aspect-[16/11]">
            
            {/* Illustrated Backdrop Pattern */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#E0F2FE]/70 via-[#FEF08A]/25 to-[#FEE2E2]/60" />
            
            {/* Hand-drawn style streets outline */}
            <svg className="absolute inset-0 w-full h-full text-brand-accent/25 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 0 100 Q 150 150 250 250 T 600 350 T 1000 400" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeDasharray="5,10" />
              <path d="M 100 0 Q 200 180 350 280 T 800 500" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeDasharray="4,8" />
              <path d="M 500 50 Q 550 250 850 300 T 1000 200" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
            </svg>

            {/* Stylized Pastel Houses Illustration Icons scattered */}
            <div className="absolute top-[15%] left-[25%] w-8 h-8 rounded-lg bg-[#E0F2FE] border border-sky-200 flex items-center justify-center transform rotate-6 pointer-events-none text-[10px] shadow-sm">🏠</div>
            <div className="absolute top-[45%] left-[75%] w-10 h-10 rounded-lg bg-[#FEE2E2] border border-rose-200 flex items-center justify-center transform -rotate-12 pointer-events-none text-xs shadow-sm">🏡</div>
            <div className="absolute top-[70%] left-[15%] w-9 h-9 rounded-lg bg-[#FEF08A]/40 border border-yellow-200 flex items-center justify-center transform rotate-12 pointer-events-none text-xs shadow-sm">🏠</div>
            <div className="absolute top-[25%] left-[80%] w-8 h-8 rounded-lg bg-[#DCFCE7] border border-emerald-200 flex items-center justify-center transform -rotate-6 pointer-events-none text-[10px] shadow-sm">🏡</div>

            {/* Glowing Map Hotspots */}
            <AnimatePresence>
              {filteredSpots.map((spot) => {
                const isSelected = selectedSpot?.id === spot.id;
                const isUnlocked = unlockedStamps.includes(spot.id);
                return (
                  <button
                    key={spot.id}
                    id={`map-pin-${spot.id}`}
                    onClick={() => setSelectedSpot(spot)}
                    className="absolute cursor-pointer transition-all duration-300 flex flex-col items-center group z-10"
                    style={{ left: `${spot.x}%`, top: `${spot.y}%`, transform: 'translate(-50%, -50%)' }}
                  >
                    <div className="relative">
                      {/* Pulse effect if selected */}
                      {isSelected && (
                        <span className="absolute -inset-2 rounded-full bg-brand-accent/20 animate-ping opacity-60" />
                      )}
                      
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shadow-md transition-all duration-300 ${getPinColor(spot.category, isSelected)}`}>
                        {spot.category === 'photo' && <Camera className="w-3.5 h-3.5 text-white" />}
                        {spot.category === 'cafe' && <Coffee className="w-3.5 h-3.5 text-white" />}
                        {spot.category === 'souvenir' && <ShoppingBag className="w-3.5 h-3.5 text-white" />}
                        {spot.category === 'landmark' && <Award className="w-3.5 h-3.5 text-white" />}
                        {spot.category === 'rest' && <Heart className="w-3.5 h-3.5 text-white" />}
                      </div>

                      {/* Small Stamp Unlocked Indicator */}
                      {isUnlocked && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-600 border border-white rounded-full flex items-center justify-center shadow">
                          <span className="text-[7px] text-white font-bold">✓</span>
                        </span>
                      )}
                    </div>

                    {/* Miniature Hover Label */}
                    <div className={`mt-1.5 px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-serif whitespace-nowrap border transition-all duration-300 shadow-sm ${
                      isSelected 
                        ? 'bg-brand-accent text-white border-brand-accent scale-105 font-bold' 
                        : 'bg-white/95 text-brand-muted border-brand-border group-hover:bg-brand-bg group-hover:text-brand-accent'
                    }`}>
                      {spot.name.split(' ')[0]}
                    </div>
                  </button>
                );
              })}
            </AnimatePresence>

            {/* Instruction Banner at the bottom of the map */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-3 border border-brand-border flex items-center justify-between text-xs text-brand-muted shadow-sm font-serif">
              <span className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-brand-accent animate-bounce" />
                지도의 아이콘을 눌러 각 장소를 구경해 보세요.
              </span>
              <span className="hidden sm:inline text-brand-accent/80 font-bold">Busan Gamcheon Village Map</span>
            </div>

          </div>

          {/* Right: Detailed Attraction Board (5 cols) */}
          <div className="lg:col-span-5 h-full">
            <AnimatePresence mode="wait">
              {selectedSpot ? (
                <motion.div
                  key={selectedSpot.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-3xl border border-brand-border overflow-hidden shadow-sm flex flex-col h-full"
                >
                  
                  {/* Aspect Ratio 4:3 image header */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-brand-bg">
                    <img 
                      src={selectedSpot.imageUrl} 
                      alt={selectedSpot.name} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-semibold text-brand-accent shadow-sm border border-brand-border font-serif">
                        {selectedSpot.category === 'photo' && <Camera className="w-3.5 h-3.5" />}
                        {selectedSpot.category === 'cafe' && <Coffee className="w-3.5 h-3.5" />}
                        {selectedSpot.category === 'souvenir' && <ShoppingBag className="w-3.5 h-3.5" />}
                        {selectedSpot.category === 'landmark' && <Award className="w-3.5 h-3.5" />}
                        {selectedSpot.category === 'rest' && <Heart className="w-3.5 h-3.5" />}
                        {categories.find(c => c.id === selectedSpot.category)?.name}
                      </span>
                    </div>

                    <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-lg sm:text-xl font-serif font-bold text-white leading-tight">
                        {selectedSpot.name}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
                    
                    <div className="space-y-4">
                      {/* Description */}
                      <p className="text-brand-text text-xs sm:text-sm leading-relaxed font-serif">
                        {selectedSpot.description}
                      </p>

                      {/* Recommended Time badge */}
                      <div className="flex items-center gap-2 px-3 py-2 bg-brand-bg border border-brand-border rounded-xl">
                        <Clock className="w-4 h-4 text-brand-accent shrink-0" />
                        <div className="text-[11px] sm:text-xs font-serif text-brand-text">
                          <span className="font-semibold text-brand-accent mr-1">추천 방문 시간 :</span>
                          {selectedSpot.recommendedTime}
                        </div>
                      </div>

                      {/* Travel Tips with Bullet points */}
                      {selectedSpot.tips && selectedSpot.tips.length > 0 && (
                        <div className="space-y-2 pt-2 border-t border-brand-border">
                          <h4 className="text-xs sm:text-sm font-semibold text-brand-dark font-serif flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-brand-accent animate-pulse" />
                            <span>현지 골목 꿀팁</span>
                          </h4>
                          <ul className="space-y-1.5">
                            {selectedSpot.tips.map((tip, idx) => (
                              <li key={idx} className="flex items-start gap-1.5 text-[11px] sm:text-xs text-brand-muted font-serif leading-relaxed">
                                <span className="text-brand-accent mt-0.5 shrink-0">•</span>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Interactivity: Stamp Collection Visit Button */}
                    <div className="pt-4 mt-auto">
                      {unlockedStamps.includes(selectedSpot.id) ? (
                        <div className="w-full flex items-center justify-center gap-1.5 py-3 rounded-xl bg-brand-bg border border-brand-border text-brand-accent font-serif text-xs font-semibold shadow-sm">
                          <span className="text-base">🎒</span>
                          <span>방문 완료! 스탬프가 활성화되었습니다</span>
                        </div>
                      ) : (
                        <button
                          id={`visit-button-${selectedSpot.id}`}
                          onClick={() => handleVisit(selectedSpot)}
                          className="w-full group/btn relative overflow-hidden flex items-center justify-center gap-1.5 py-3 rounded-xl bg-brand-accent hover:bg-[#c27a61] text-white font-serif text-xs font-semibold shadow-md shadow-brand-accent/20 transition-all duration-300 cursor-pointer"
                        >
                          <span>📍</span>
                          <span>가상으로 방문하고 스탬프 모으기</span>
                          <span className="absolute right-3 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all">
                            →
                          </span>
                        </button>
                      )}
                    </div>

                  </div>

                </motion.div>
              ) : (
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-brand-border rounded-3xl p-6 text-center text-brand-muted font-serif text-xs">
                  지도의 아이콘을 눌러주시면<br />해당 장소의 상세 이야기가 펼쳐집니다.
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
