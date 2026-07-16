import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Send, Info, Eye } from 'lucide-react';
import { WishPostcard } from '../types';

interface WishWallProps {
  onWishSubmitted?: () => void;
}

const PASTEL_PALETTES = [
  { id: 'pink', name: '벚꽃 분홍', bg: 'bg-[#FFEBE5]/95 hover:bg-[#FFEBE5]', border: 'border-[#FFC7B8]', text: 'text-[#8C2C16]', dot: 'bg-[#FF5A36]' },
  { id: 'yellow', name: '레몬 노랑', bg: 'bg-[#FFF9E6]/95 hover:bg-[#FFF9E6]', border: 'border-[#FFE08C]', text: 'text-[#825C05]', dot: 'bg-[#F59E0B]' },
  { id: 'blue', name: '하늘 파랑', bg: 'bg-[#E5F6FD]/95 hover:bg-[#E5F6FD]', border: 'border-[#B2E3FF]', text: 'text-[#035388]', dot: 'bg-[#0EA5E9]' },
  { id: 'mint', name: '메론 민트', bg: 'bg-[#EAFCEE]/95 hover:bg-[#EAFCEE]', border: 'border-[#A8F2B5]', text: 'text-[#086326]', dot: 'bg-[#10B981]' },
  { id: 'purple', name: '라벤더 보라', bg: 'bg-[#F6EFFF]/95 hover:bg-[#F6EFFF]', border: 'border-[#DFCCFF]', text: 'text-[#4F2099]', dot: 'bg-[#8B5CF6]' },
];

const DEFAULT_WISHES: WishPostcard[] = [
  {
    id: 'default-1',
    sender: '어린왕자 👑',
    message: '중요한 것은 눈에 보이지 않아. 이곳 감천마을 골목길에서 소중한 친구인 여우를 다시 만나 먼 바다를 바라보는 매 순간이 기적 같아. 다들 마음에 소중한 장미를 잃지 마세요.',
    bgColor: 'pink',
    textColor: 'text-[#8C2C16]',
    createdAt: '2026. 07. 15'
  },
  {
    id: 'default-2',
    sender: '사막여우 🦊',
    message: '누군가에게 길들여진다는 것은 눈물 흘릴 일이 생길 수도 있다는 뜻이지만, 이 아름다운 감천의 노을 빛을 보면 언제나 네 금빛 머리칼이 떠올라 가슴이 설렌단다. 고마워 내 친구.',
    bgColor: 'yellow',
    textColor: 'text-[#825C05]',
    createdAt: '2026. 07. 15'
  },
  {
    id: 'default-3',
    sender: '지친 임용고시생 🎒',
    message: '148개의 가파른 소망 계단을 한 걸음씩 숨차게 오르며 다짐했습니다. 언젠가 다가올 나의 봄날에는 내가 꿈꾸는 교단 위에서 아이들과 함께 따스한 눈을 나눌 수 있게 되기를...',
    bgColor: 'blue',
    textColor: 'text-[#035388]',
    createdAt: '2026. 07. 14'
  },
  {
    id: 'default-4',
    sender: '40주년 부부 💍',
    message: '사랑하는 안 사람의 손을 꼭 쥐고 감천동 골목길을 걸었습니다. 피난길 고단했던 그 시절에도 우린 참 찬란했지. 남은 세월도 파스텔 빛 집들처럼 다정하고 평화롭게 걸어갑시다.',
    bgColor: 'mint',
    textColor: 'text-[#086326]',
    createdAt: '2026. 07. 12'
  }
];

export default function WishWall({ onWishSubmitted }: WishWallProps) {
  const [wishes, setWishes] = useState<WishPostcard[]>([]);
  const [sender, setSender] = useState('');
  const [message, setMessage] = useState('');
  const [selectedColor, setSelectedColor] = useState('pink');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Load from local storage or set default
  useEffect(() => {
    const stored = localStorage.getItem('gamcheon_wishes');
    if (stored) {
      try {
        setWishes(JSON.parse(stored));
      } catch (e) {
        setWishes(DEFAULT_WISHES);
      }
    } else {
      setWishes(DEFAULT_WISHES);
    }
  }, []);

  const saveWishes = (newWishes: WishPostcard[]) => {
    setWishes(newWishes);
    localStorage.setItem('gamcheon_wishes', JSON.stringify(newWishes));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!sender.trim()) {
      setError('이름이나 닉네임을 적어주세요.');
      return;
    }
    if (!message.trim()) {
      setError('남겨놓을 따스한 메시지를 적어주세요.');
      return;
    }
    if (message.length < 5) {
      setError('메시지는 최소 5자 이상 적어주세요.');
      return;
    }

    const matchedPalette = PASTEL_PALETTES.find(p => p.id === selectedColor) || PASTEL_PALETTES[0];

    const newWish: WishPostcard = {
      id: `wish-${Date.now()}`,
      sender: sender.trim(),
      message: message.trim(),
      bgColor: selectedColor,
      textColor: matchedPalette.text,
      createdAt: new Date().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).replace(/\s/g, '').slice(0, -1) // format like: 2026.07.15
    };

    const updated = [newWish, ...wishes];
    saveWishes(updated);
    
    // Clear inputs
    setSender('');
    setMessage('');
    setSuccess(true);

    // Call callback to unlock stamp
    if (onWishSubmitted) {
      onWishSubmitted();
    }

    // Auto clear success banner
    setTimeout(() => {
      setSuccess(false);
    }, 4000);
  };

  const handleRemoveWish = (id: string) => {
    // Only allow user to remove non-default ones
    if (id.startsWith('default-')) return;
    const filtered = wishes.filter(w => w.id !== id);
    saveWishes(filtered);
  };

  return (
    <section id="wish-wall-section" className="py-24 bg-brand-bg relative overflow-hidden">
      {/* Decorative floral elements */}
      <div className="absolute top-10 right-0 w-80 h-80 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-brand-border/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-bg border border-brand-border text-brand-accent text-xs font-serif">
            <Heart className="w-3.5 h-3.5 text-brand-accent animate-pulse" />
            <span>감성 소망의 벽</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-brand-dark leading-tight">
            오색 소망 엽서 남기기
          </h2>
          <p className="text-brand-muted font-serif text-sm">
            감천의 골목길 끝자락, 서로가 서로에게 건네는 따사롭고 진솔한 응원의 이야기들입니다.<br />
            나만의 고유한 파스텔 색상 엽서를 선택해 마음속 깊이 품은 작은 희망을 벽에 다정히 걸어두세요.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Interactive Write Postcard Form (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-brand-border shadow-sm sticky top-24">
            
            <div className="mb-6 space-y-2">
              <h3 className="text-lg font-serif font-bold text-brand-dark flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-accent animate-spin" />
                <span>나만의 소망 엽서 쓰기</span>
              </h3>
              <p className="text-xs text-brand-muted font-serif leading-relaxed">
                당신의 소원이 골목의 불빛이 됩니다. 따듯한 단어들로 소중한 소망을 자유롭게 들려주세요.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Color Selection Palette */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-brand-dark font-serif">엽서 색상 선택</label>
                <div className="flex gap-2.5">
                  {PASTEL_PALETTES.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedColor(p.id)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 relative cursor-pointer ${
                        selectedColor === p.id 
                          ? 'border-brand-dark scale-110 shadow-sm' 
                          : 'border-brand-border hover:scale-105'
                      } ${p.bg.split(' ')[0]}`}
                      title={p.name}
                    >
                      {selectedColor === p.id && (
                        <span className="w-2 h-2 rounded-full bg-brand-dark" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sender input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-brand-dark font-serif">작성자 (이름 / 닉네임)</label>
                <input
                  type="text"
                  placeholder="예: 바람개비 여행자"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  maxLength={15}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm font-serif rounded-xl border border-brand-border bg-white focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/20 text-brand-dark"
                />
              </div>

              {/* Message input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-brand-dark font-serif">소망의 메시지</label>
                <textarea
                  placeholder="당신의 마음속에 숨겨둔 희망 찬 꿈이나, 감천마을에 온 후 느낀 감동의 물결을 적어주세요..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={200}
                  rows={4}
                  className="w-full px-4 py-3 text-xs sm:text-sm font-serif rounded-xl border border-brand-border bg-white focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/20 text-brand-dark resize-none leading-relaxed"
                />
                <div className="text-right text-[10px] text-brand-muted font-mono">
                  {message.length} / 200 자
                </div>
              </div>

              {/* Feedback messages */}
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-serif border border-red-100"
                  >
                    ⚠️ {error}
                  </motion.div>
                )}
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="p-3 bg-emerald-50 text-emerald-600 rounded-xl text-xs font-serif border border-emerald-100 flex items-center gap-1"
                  >
                    💌 소중한 소망 엽서가 벽에 곱게 걸려졌습니다! <strong>스탬프 획득!</strong>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-accent hover:bg-[#c27a61] text-white font-serif text-xs font-bold shadow-md shadow-brand-accent/15 cursor-pointer transition-all duration-300"
              >
                <Send className="w-3.5 h-3.5" />
                <span>나의 오색 소망 걸어두기</span>
              </button>

            </form>

            <div className="mt-4 flex items-start gap-1.5 p-2.5 bg-brand-accent/5 border border-brand-accent/10 rounded-xl text-[10px] sm:text-xs text-brand-text font-serif leading-relaxed">
              <Info className="w-3.5 h-3.5 text-brand-accent shrink-0 mt-0.5" />
              <span>작성한 엽서는 브라우저에 소중히 로컬 저장되어 언제든지 다시 보실 수 있습니다.</span>
            </div>

          </div>

          {/* Right: Wall displaying Wishes cards (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="flex items-center justify-between border-b border-brand-border pb-3">
              <h3 className="text-sm font-serif font-bold text-brand-dark flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-brand-muted" />
                <span>현재 걸려있는 오색 엽서 ({wishes.length}개)</span>
              </h3>
              <span className="text-[10px] text-brand-muted font-serif">마을 지붕 위처럼 겹겹이 고이 수놓아졌습니다</span>
            </div>

            {/* Wishes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[640px] overflow-y-auto pr-1">
              <AnimatePresence initial={false}>
                {wishes.map((w) => {
                  const palette = PASTEL_PALETTES.find(p => p.id === w.bgColor) || PASTEL_PALETTES[0];
                  const isDefault = w.id.startsWith('default-');
                  
                  return (
                    <motion.div
                      key={w.id}
                      initial={{ opacity: 0, scale: 0.9, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: -15 }}
                      whileHover={{ scale: 1.03, rotate: Math.random() > 0.5 ? 1 : -1 }}
                      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                      className={`p-5 rounded-2xl border flex flex-col justify-between shadow-sm transition-shadow duration-300 relative ${palette.bg} ${palette.border}`}
                    >
                      {/* String clip pin effect at top center */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 flex flex-col items-center pointer-events-none">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-dark/80" />
                        <div className="w-0.5 h-2.5 bg-brand-dark/20" />
                      </div>

                      {/* Header with name & date */}
                      <div className="flex justify-between items-start mb-3 border-b border-black/5 pb-1.5">
                        <span className={`text-xs font-serif font-bold ${palette.text} flex items-center gap-1.5`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${palette.dot}`} />
                          {w.sender}
                        </span>
                        <span className="text-[9px] font-mono opacity-65">{w.createdAt}</span>
                      </div>

                      {/* Body Message */}
                      <p className={`text-xs font-serif leading-relaxed italic ${palette.text} opacity-90 flex-1 mb-4`}>
                        "{w.message}"
                      </p>

                      {/* Footer with Delete / Info */}
                      <div className="flex justify-between items-center text-[9px] font-serif opacity-60">
                        <span>🏷️ 감천소망엽서</span>
                        {!isDefault && (
                          <button
                            onClick={() => handleRemoveWish(w.id)}
                            className="text-red-500 hover:text-red-700 hover:underline cursor-pointer"
                          >
                            내리기 ×
                          </button>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {wishes.length === 0 && (
              <div className="text-center py-16 border-2 border-dashed border-brand-border rounded-3xl p-6 text-brand-muted text-xs font-serif leading-relaxed">
                벽이 조용히 비어 있습니다.<br />첫 번째 따사로운 엽서의 주인공이 되어주세요.
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
