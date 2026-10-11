import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import CampaignCard from '../../components/CampaignCard';
import FloatingDock from '../../components/FloatingDock';
import {
  Search
} from 'lucide-react';

export const CampaignsListView: React.FC = () => {
  const { campaigns, searchQuery, setSearchQuery } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'open' | 'application'>('all');

  const filtered = campaigns.filter((c) => {
    if (activeTab === 'open' && c.requiresApplication) return false;
    if (activeTab === 'application' && !c.requiresApplication) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = c.title.toLowerCase().includes(q) || c.brandName.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="relative pb-36 px-6 pt-6 flex flex-col gap-8 max-w-[1440px] mx-auto text-right select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white font-heading">جميع الحملات</h1>
          <p className="text-xs text-[#A3A3A3] mt-1">تصفح كافة الحملات النشطة والمفتوحة لاستقبال مقاطع صناع المحتوى</p>
        </div>

        {/* Tab filters */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/[0.06] border border-white/[0.1] w-fit">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'all' ? 'bg-white text-black shadow-sm' : 'text-white/60 hover:text-white'
            }`}
          >
            الكل ({campaigns.length})
          </button>
          <button
            onClick={() => setActiveTab('open')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'open' ? 'bg-white text-black shadow-sm' : 'text-white/60 hover:text-white'
            }`}
          >
            مفتوحة للجميع
          </button>
          <button
            onClick={() => setActiveTab('application')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'application' ? 'bg-white text-black shadow-sm' : 'text-white/60 hover:text-white'
            }`}
          >
            بطلب وموافقة
          </button>
        </div>
      </div>

      {/* Grid of Campaign Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((camp) => (
          <CampaignCard key={camp.id} campaign={camp} />
        ))}
      </div>

      <FloatingDock />
    </div>
  );
};

export default CampaignsListView;
