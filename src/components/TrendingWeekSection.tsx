import React, { useRef } from 'react';
import { useApp } from '../context/AppContext';
import RiyalSymbol from './RiyalSymbol';
import PlatformIcon from './PlatformIcon';
import { ChevronRight, ChevronLeft, TrendingUp } from 'lucide-react';

export const TrendingWeekSection: React.FC = () => {
  const { campaigns, navigateToCampaignDetail } = useApp();
  const trendingCampaigns = campaigns.filter(c => c.isTrending || c.trendingRank).slice(0, 5);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="flex flex-col gap-4 text-right">
      {/* Header with Title and Scroll Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-white font-heading tracking-tight flex items-center gap-2">
            <span>الترند هذا الأسبوع</span>
            <TrendingUp className="w-5 h-5 text-white/80" />
          </h2>
          <span className="px-2 py-0.5 rounded-full bg-white/[0.08] text-[11px] text-white/70">
            أعلى طلب ومشاركة
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => scroll('right')}
            className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.12] flex items-center justify-center text-white/80 hover:text-white hover:bg-white/[0.14] transition-all"
            aria-label="السابق"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('left')}
            className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.12] flex items-center justify-center text-white/80 hover:text-white hover:bg-white/[0.14] transition-all"
            aria-label="التالي"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Netflix Top-10 Style Scrolling Row */}
      <div 
        ref={scrollContainerRef}
        className="flex items-center gap-6 overflow-x-auto pb-4 pt-2 scrollbar-none select-none"
      >
        {trendingCampaigns.map((camp, index) => {
          const rank = index + 1;
          const isFirst = rank === 1;

          return (
            <div
              key={camp.id}
              onClick={() => navigateToCampaignDetail(camp)}
              className="relative flex items-center shrink-0 group cursor-pointer"
            >
              {/* HUGE Outlined Metallic Rank Numeral (Netflix Top 10 style) */}
              <div 
                className={`relative z-0 select-none text-[130px] sm:text-[160px] font-black leading-none tracking-tighter transition-transform duration-300 group-hover:scale-105 ${
                  isFirst
                    ? 'rank-numeral rank-numeral-glow text-white/20'
                    : 'rank-numeral text-white/10'
                }`}
                style={{
                  fontFamily: 'Alexandria, sans-serif',
                  marginLeft: '-25px',
                  marginRight: '-10px',
                }}
              >
                {rank}
              </div>

              {/* The Campaign Card sitting in front of / beside the numeral */}
              <div className="relative z-10 w-[240px] sm:w-[270px] rounded-[22px] bg-white/[0.05] backdrop-blur-2xl border border-white/[0.14] p-3 transition-all duration-300 group-hover:bg-white/[0.09] group-hover:border-white/[0.28] group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.8),0_0_24px_rgba(255,255,255,0.1)] group-hover:-translate-y-1">
                {/* 16:9 Cover Thumbnail */}
                <div className="relative aspect-[16/9] w-full rounded-[16px] overflow-hidden bg-neutral-900 mb-2.5">
                  <img
                    src={camp.coverImage}
                    alt={camp.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                  {/* Top-Right Badge */}
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[10px] font-bold text-white">
                    #{rank} في السعودية
                  </div>
                </div>

                {/* Brand & Platforms Row */}
                <div className="flex items-center justify-between gap-1 mb-1.5 px-0.5">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <img
                      src={camp.brandAvatar}
                      alt={camp.brandName}
                      referrerPolicy="no-referrer"
                      className="w-5 h-5 rounded-full object-cover ring-1 ring-white/20 shrink-0"
                    />
                    <span className="text-[11px] font-semibold text-white/90 truncate">
                      {camp.brandName}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    {camp.platforms.slice(0, 3).map((p) => (
                      <div
                        key={p}
                        className="w-4 h-4 rounded-full bg-white/[0.08] flex items-center justify-center text-white/80"
                      >
                        <PlatformIcon platform={p} size={9} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Title */}
                <h4 className="text-xs font-semibold text-white truncate px-0.5 mb-2 group-hover:text-white">
                  {camp.title}
                </h4>

                {/* Budget & Rate */}
                <div className="flex items-center justify-between text-[11px] px-0.5 pt-1.5 border-t border-white/[0.06]">
                  <div className="flex items-center gap-0.5 text-white/80 font-mono">
                    <span>{camp.totalBudget.toLocaleString()}</span>
                    <RiyalSymbol className="w-2.5 h-2.5 inline-block text-white/60" />
                  </div>

                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white text-black text-[10px] font-bold shadow-[0_0_10px_rgba(255,255,255,0.4)]">
                    <span>{camp.ratePer1k}</span>
                    <RiyalSymbol className="w-2.5 h-2.5 inline-block text-black" />
                    <span>/ 1K</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TrendingWeekSection;
