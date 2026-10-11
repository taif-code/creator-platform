import React, { useRef } from 'react';
import { useApp } from '../../context/AppContext';
import FeaturedBentoGrid from '../../components/FeaturedBentoGrid';
import CampaignCard from '../../components/CampaignCard';
import TopClipsSection from '../../components/TopClipsSection';
import TrendingWeekSection from '../../components/TrendingWeekSection';
import FloatingDock from '../../components/FloatingDock';
import {
  ChevronRight,
  ChevronLeft,
  Flame,
  Clock
} from 'lucide-react';

export const DiscoverView: React.FC = () => {
  const { campaigns, setCreatorView, typeFilter, platformFilter, categoryFilter, sortOption, searchQuery } = useApp();
  const forYouScrollRef = useRef<HTMLDivElement>(null);
  const newScrollRef = useRef<HTMLDivElement>(null);

  // Filter campaigns based on floating dock state
  const filteredCampaigns = campaigns.filter((camp) => {
    // Type filter
    if (typeFilter === 'clipping' && !camp.allowedTypes.some(t => t.toLowerCase().includes('clip') || t.includes('قص'))) {
      return false;
    }
    if (typeFilter === 'ugc' && !camp.allowedTypes.some(t => t.toLowerCase().includes('ugc'))) {
      return false;
    }
    // Platform filter
    if (platformFilter !== 'all' && !camp.platforms.includes(platformFilter)) {
      return false;
    }
    // Category filter
    if (categoryFilter !== 'all' && camp.category !== categoryFilter) {
      return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = camp.title.toLowerCase().includes(q) || 
                    camp.brandName.toLowerCase().includes(q) || 
                    camp.category.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  // Sort campaigns
  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    if (sortOption === 'highest_cpm') return b.ratePer1k - a.ratePer1k;
    if (sortOption === 'budget_left') return (b.totalBudget - b.spentBudget) - (a.totalBudget - a.spentBudget);
    if (sortOption === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
    return b.participantsCount - a.participantsCount; // popular default
  });

  const scrollContainer = (ref: React.RefObject<HTMLDivElement | null>, dir: 'left' | 'right') => {
    if (ref.current) {
      const offset = dir === 'left' ? -360 : 360;
      ref.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const newCampaigns = sortedCampaigns.filter(c => c.isNew || c.timeAgo.includes('ساعات') || c.timeAgo.includes('جديد'));

  return (
    <div className="relative pb-36 px-6 pt-6 flex flex-col gap-10 max-w-[1440px] mx-auto text-right select-none">
      {/* 1. Featured Bento Grid (4-column, 2-row RTL bento with living tiles) */}
      <FeaturedBentoGrid />

      {/* 2. Section "حملات لأجلك" with arrow leading to full grid */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCreatorView('campaigns-for-you')}
              className="group flex items-center gap-1.5 text-xl font-bold text-white font-heading hover:text-white/80 transition-colors"
            >
              <span>حملات لأجلك</span>
              <span className="text-white/60 group-hover:-translate-x-1 transition-transform">‹</span>
            </button>
            <span className="px-2 py-0.5 rounded-full bg-white/[0.08] text-[11px] text-white/70">
              مختارة بناءً على حساباتك وتفاعلك
            </span>
          </div>

          {/* Prev / Next round glass arrow buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollContainer(forYouScrollRef, 'right')}
              className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.12] flex items-center justify-center text-white/80 hover:text-white hover:bg-white/[0.14] transition-all"
              aria-label="السابق"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollContainer(forYouScrollRef, 'left')}
              className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.12] flex items-center justify-center text-white/80 hover:text-white hover:bg-white/[0.14] transition-all"
              aria-label="التالي"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal row of Campaign Cards (4 visible + one peeking) */}
        <div
          ref={forYouScrollRef}
          className="flex items-stretch gap-4 overflow-x-auto pb-3 pt-1 scrollbar-none"
        >
          {sortedCampaigns.map((camp) => (
            <div key={camp.id} className="w-[280px] sm:w-[320px] shrink-0">
              <CampaignCard campaign={camp} />
            </div>
          ))}
        </div>
      </section>

      {/* 3. Section "أفضل المقاطع" (Top Clips feature card + 9:16 vertical stories strip) */}
      <TopClipsSection />

      {/* 4. Section "الترند هذا الأسبوع" (Netflix Top 10 with giant metallic numerals) */}
      <TrendingWeekSection />

      {/* 5. Section "حملات جديدة" with "جديد" tags */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white font-heading tracking-tight flex items-center gap-1.5">
              <span>حملات جديدة</span>
              <Clock className="w-4 h-4 text-white/70" />
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-white/[0.08] text-[11px] text-white/70">
              انطلقت مؤخراً بميزانيات طازجة
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollContainer(newScrollRef, 'right')}
              className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.12] flex items-center justify-center text-white/80 hover:text-white hover:bg-white/[0.14] transition-all"
              aria-label="السابق"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollContainer(newScrollRef, 'left')}
              className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.12] flex items-center justify-center text-white/80 hover:text-white hover:bg-white/[0.14] transition-all"
              aria-label="التالي"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          ref={newScrollRef}
          className="flex items-stretch gap-4 overflow-x-auto pb-3 pt-1 scrollbar-none"
        >
          {newCampaigns.concat(sortedCampaigns.slice(0, 3)).map((camp, idx) => (
            <div key={`${camp.id}-${idx}`} className="w-[280px] sm:w-[320px] shrink-0">
              <CampaignCard campaign={camp} showNewBadge={true} />
            </div>
          ))}
        </div>
      </section>

      {/* 6. Floating Bottom Glass Dock with AI Search & Filters */}
      <FloatingDock />
    </div>
  );
};

export default DiscoverView;
