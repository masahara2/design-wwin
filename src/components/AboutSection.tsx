import React from 'react';
import { motion } from 'motion/react';
import { Compass, Sparkles, Heart, Eye } from 'lucide-react';

export default function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring', stiffness: 60, damping: 15 } 
    }
  };

  return (
    <section id="about-section" className="py-24 bg-brand-bg relative overflow-hidden">
      {/* Soft decorative background circles */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-border/20 rounded-full blur-3xl translate-x-1/2 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Beautiful Intro Copy */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-bg border border-brand-border text-brand-accent text-xs font-serif">
                <Sparkles className="w-3 h-3 animate-spin" />
                <span>마을의 이야기, 숨겨진 온기</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-serif text-brand-dark leading-tight">
                산자락을 따라 들어선<br />
                <span className="text-brand-accent font-semibold">
                  알록달록한 파스텔 동화
                </span>
              </h2>
              
              <p className="text-brand-text leading-relaxed font-serif text-sm sm:text-base">
                부산 사하구의 가파른 산자락에 위치한 감천문화마을은 1950년대 한국전쟁 시절, 피난민들이 모여 힘겨운 삶을 일구었던 터전에서 시작되었습니다. 가파른 계단식 주거 양식은 서로의 조망권을 가리지 않도록 이웃을 배려하며 차곡차곡 쌓아 올려졌습니다.
              </p>
              
              <p className="text-brand-text leading-relaxed font-serif text-sm sm:text-base">
                2009년, 지역 예술가들과 주민들이 힘을 모은 미술 프로젝트를 통해 낡고 허름했던 골목은 따뜻하고 화사한 파스텔 톤의 예술 마을로 새롭게 태어났습니다. 이제는 전 세계 여행객들이 아름다운 추억과 위로를 얻어가는 글로벌 문화 관광명소가 되었습니다.
              </p>
            </motion.div>
          </div>

          {/* Right Column - Sensory Elements Cards Grid */}
          <div className="lg:col-span-7">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              
              {/* Card 1: Colors */}
              <motion.div 
                variants={itemVariants}
                className="p-6 bg-[#FFEBE5]/60 hover:bg-[#FFEBE5] rounded-2xl border border-[#FFC7B8] shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-[#FFC7B8] flex items-center justify-center text-rose-500 mb-4 group-hover:scale-110 transition-transform shadow-sm">
                  <Heart className="w-5 h-5 fill-rose-500/10" />
                </div>
                <h3 className="text-lg font-serif font-semibold text-brand-dark mb-2">
                  따스한 치유의 파스텔 톤
                </h3>
                <p className="text-xs sm:text-sm text-brand-text font-serif leading-relaxed">
                  하늘빛 파랑, 벚꽃빛 분홍, 레몬빛 노랑의 파스텔 컬러가 어우러져 지친 마음에 동화 같은 평온함과 위로를 선물합니다.
                </p>
              </motion.div>

              {/* Card 2: Layout */}
              <motion.div 
                variants={itemVariants}
                className="p-6 bg-[#FFF9E6]/60 hover:bg-[#FFF9E6] rounded-2xl border border-[#FFE08C] shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-[#FFE08C] flex items-center justify-center text-amber-600 mb-4 group-hover:scale-110 transition-transform shadow-sm">
                  <Eye className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-serif font-semibold text-brand-dark mb-2">
                  눈부신 계단식 건축 미학
                </h3>
                <p className="text-xs sm:text-sm text-brand-text font-serif leading-relaxed">
                  뒷집이 앞집을 가리지 않는 계단식 주택 배열로, 모든 집이 따스한 햇살을 나누어 받는 배려와 나눔의 지혜가 깃들어 있습니다.
                </p>
              </motion.div>

              {/* Card 3: Art */}
              <motion.div 
                variants={itemVariants}
                className="p-6 bg-[#E5F6FD]/60 hover:bg-[#E5F6FD] rounded-2xl border border-[#B2E3FF] shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-[#B2E3FF] flex items-center justify-center text-[#035388] mb-4 group-hover:scale-110 transition-transform shadow-sm">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-serif font-semibold text-brand-dark mb-2">
                  골목마다 숨쉬는 생활 예술
                </h3>
                <p className="text-xs sm:text-sm text-brand-text font-serif leading-relaxed">
                  미로 같은 골목 모퉁이마다 예술 설치물, 벽화, 조각상이 가득하여 한 발자국 뗄 때마다 새로운 설렘을 선사합니다.
                </p>
              </motion.div>

              {/* Card 4: Community */}
              <motion.div 
                variants={itemVariants}
                className="p-6 bg-[#EAFCEE]/60 hover:bg-[#EAFCEE] rounded-2xl border border-[#A8F2B5] shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-[#A8F2B5] flex items-center justify-center text-[#086326] mb-4 group-hover:scale-110 transition-transform shadow-sm">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-serif font-semibold text-brand-dark mb-2">
                  상생하는 주민공동체
                </h3>
                <p className="text-xs sm:text-sm text-brand-text font-serif leading-relaxed">
                  마을 주민들이 직접 협동조합과 주민 쉼터를 운영하며 여행자들과 온기를 나누고, 지속가능한 생활 보존을 함께 가꿔갑니다.
                </p>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
