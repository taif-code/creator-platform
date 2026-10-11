import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import RiyalSymbol from './RiyalSymbol';
import { CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';
import { Campaign } from '../types';

export const HeroCarousel: React.FC = () => {
  const { campaigns, navigateToCampaignDetail } = useApp();
  // Filter top high-paying featured campaigns
  const featured = campaigns.slice(0, 4);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featured.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, featured.length]);

  const currentCamp = featured[currentIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? featured.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % featured.length);
  };

  if (!currentCamp) return null;

  return (
    <div 
      className="relative w-full group select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Signature white spotlight / stage glow behind the active slide */}
      <div className="absolute -inset-2 bg-gradient-to-r from-white/[0.08] via-white/[0.15] to-transparent rounded-[36px] blur-2xl opacity-75 pointer-events-none" />

      {/* Main 21:9 Card Container */}
      <div 
        onClick={() => navigateToCampaignDetail(currentCamp)}
        className="relative aspect-[21/9] min-h-[320px] max-h-[420px] w-full rounded-[30px] overflow-hidden border border-white/[0.18] bg-neutral-950 shadow-[0_24px_60px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.25)] cursor-pointer"
      >
        {/* Full-bleed cover image with grayscale-to-color bloom */}
        <img
          src={currentCamp.coverImage}
          alt={currentCamp.title}
          referrerPolicy="no-referrer"
          className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-[1.03]"
        />

        {/* Cinematic dark gradient overlay from the bottom-right and edges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-transparent to-black/40" />

        {/* Top-Left: Glass Pill with Slide Dots (active dot is a long white bar) */}
        <div className="absolute top-5 left-6 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-xl border border-white/[0.15]">
          {featured.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(idx);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'w-7 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]'
                  : 'w-1.5 bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`شريحة ${idx + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows for manual slider */}
        <div className="absolute top-5 right-6 z-10 flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-xl border border-white/[0.15] flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all"
            aria-label="السابق"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-xl border border-white/[0.15] flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all"
            aria-label="التالي"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Content Container */}
        <div className="absolute inset-0 p-8 flex flex-col justify-end">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            {/* Bottom-Right: Brand + Title + Meta */}
            <div className="flex flex-col gap-2 max-w-2xl text-right">
              {/* Brand info */}
              <div className="flex items-center gap-2.5">
                <img
                  src={currentCamp.brandAvatar}
                  alt={currentCamp.brandName}
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-white/30 shrink-0"
                />
                <span className="text-sm font-semibold text-white/95">
                  {currentCamp.brandName}
                </span>
                {currentCamp.isVerified && (
                  <CheckCircle2 className="w-4 h-4 text-white fill-white/20" />
                )}
                <span className="px-2 py-0.5 rounded-full bg-white/[0.12] border border-white/[0.18] text-[11px] text-white/90">
                  حملة مميزة
                </span>
              </div>

              {/* Big Title */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug font-heading drop-shadow-md">
                {currentCamp.title}
              </h2>

              {/* Meta Line: Category · Rate · Budget */}
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-neutral-300">
                <span className="text-white/80">{currentCamp.category}</span>
                <span className="text-white/40">·</span>
                <div className="flex items-center gap-1 font-semibold text-white">
                  <span className="font-mono tabular-nums">{currentCamp.ratePer1k}</span>
                  <RiyalSymbol className="w-3.5 h-3.5 inline-block text-white" />
                  <span>لكل 1000 مشاهدة</span>
                </div>
                <span className="text-white/40">·</span>
                <div className="flex items-center gap-1 text-white/80">
                  <span>الميزانية</span>
                  <span className="font-mono tabular-nums font-bold text-white">
                    {currentCamp.totalBudget.toLocaleString()}
                  </span>
                  <RiyalSymbol className="w-3.5 h-3.5 inline-block text-white/80" />
                </div>
              </div>
            </div>

            {/* Bottom-Left: White Pill Button "شوف الحملة" */}
            <div className="shrink-0 pt-2 md:pt-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateToCampaignDetail(currentCamp);
                }}
                className="py-3 px-8 rounded-full bg-white text-black font-bold text-sm shadow-[0_0_24px_rgba(255,255,255,0.45)] hover:shadow-[0_0_36px_rgba(255,255,255,0.8)] hover:bg-neutral-100 transition-all flex items-center justify-center gap-2 group/btn"
              >
                <span>شوف الحملة</span>
                <ChevronLeft className="w-4 h-4 transition-transform group-hover/btn:-translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
