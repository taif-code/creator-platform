import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import RiyalSymbol from '../RiyalSymbol';
import PlatformIcon from '../PlatformIcon';
import { X, Heart, MessageSquare, Share2, Play, Pause, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const VideoReelModal: React.FC = () => {
  const { selectedClip, setSelectedClip, navigateToCampaignDetail, campaigns } = useApp();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  if (!selectedClip) return null;

  const targetCampaign = campaigns.find(c => c.id === selectedClip.campaignId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      {/* Close button */}
      <button
        onClick={() => setSelectedClip(null)}
        className="absolute top-6 left-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all z-50 cursor-pointer"
        aria-label="إغلاق"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Reel Card Container (vertical 9:16 layout) */}
      <div className="relative w-full max-w-sm aspect-[9/16] max-h-[85vh] rounded-[28px] overflow-hidden bg-neutral-950 border border-white/[0.2] shadow-[0_24px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(255,255,255,0.1)] flex flex-col justify-between">
        {/* Background Visual */}
        <img
          src={selectedClip.thumbnail}
          alt={selectedClip.creatorName}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient Scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/60 pointer-events-none" />

        {/* Top Bar inside Reel */}
        <div className="relative z-10 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
              <PlatformIcon platform={selectedClip.platform} size={15} />
            </div>
            <div className="flex flex-col text-right">
              <span className="text-xs font-bold text-white truncate max-w-[150px]">
                {selectedClip.brandName}
              </span>
              <span className="text-[10px] text-white/60">
                {selectedClip.postedTimeAgo}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-semibold text-white">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-mono">Bot Score: {selectedClip.botScore || 2}%</span>
          </div>
        </div>

        {/* Center Tap to Play/Pause simulation */}
        <div
          onClick={() => setIsPlaying(!isPlaying)}
          className="relative z-10 flex-1 flex items-center justify-center cursor-pointer"
        >
          {!isPlaying && (
            <div className="w-16 h-16 rounded-full bg-white/90 text-black flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.9)]">
              <Play className="w-7 h-7 fill-black mr-1" />
            </div>
          )}
        </div>

        {/* Floating Side Action Icons */}
        <div className="absolute left-3 bottom-24 z-20 flex flex-col items-center gap-4">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="flex flex-col items-center gap-1 text-white group"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border transition-all ${
              isLiked ? 'bg-rose-500/80 border-rose-400' : 'bg-black/50 border-white/20 group-hover:bg-white/20'
            }`}>
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-white text-white' : 'text-white'}`} />
            </div>
            <span className="text-[11px] font-mono text-white/80">{selectedClip.likes}</span>
          </button>

          <div className="flex flex-col items-center gap-1 text-white">
            <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <span className="text-[11px] font-mono text-white/80">{selectedClip.comments}</span>
          </div>

          <div className="flex flex-col items-center gap-1 text-white">
            <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center">
              <Share2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-[10px] text-white/70">مشاركة</span>
          </div>
        </div>

        {/* Bottom Metadata & Join CTA */}
        <div className="relative z-10 p-5 flex flex-col gap-3 text-right">
          {/* Creator handle */}
          <div className="flex items-center gap-2">
            <img
              src={selectedClip.creatorAvatar}
              alt={selectedClip.creatorName}
              referrerPolicy="no-referrer"
              className="w-7 h-7 rounded-full object-cover ring-1 ring-white/30"
            />
            <span className="text-xs font-bold text-white">
              {selectedClip.creatorName}
            </span>
            <CheckCircle2 className="w-3.5 h-3.5 text-white/80" />
          </div>

          <p className="text-xs text-white/90 leading-relaxed">
            {selectedClip.campaignTitle}
          </p>

          {/* Stats Bar */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.08] backdrop-blur-xl border border-white/[0.12]">
            <div className="flex flex-col">
              <span className="text-[10px] text-white/60">المشاهدات المعتمدة</span>
              <span className="text-sm font-bold text-white font-mono">{selectedClip.viewsFormatted}</span>
            </div>

            <div className="flex flex-col text-left">
              <span className="text-[10px] text-white/60">الأرباح المحققة</span>
              <div className="flex items-baseline gap-1 text-sm font-bold text-white font-mono">
                <span>{selectedClip.earnings.toLocaleString()}</span>
                <RiyalSymbol className="w-3 h-3 text-white inline-block" />
              </div>
            </div>
          </div>

          {/* CTA: Go to campaign */}
          {targetCampaign && (
            <button
              onClick={() => {
                setSelectedClip(null);
                navigateToCampaignDetail(targetCampaign);
              }}
              className="w-full py-2.5 rounded-full bg-white text-black text-xs font-bold shadow-[0_0_16px_rgba(255,255,255,0.4)] hover:bg-neutral-100 transition-all text-center"
            >
              عرض تفاصيل الحملة
            </button>
          )}

          {/* Animated playback scrubber line */}
          <div className="h-1 w-full rounded-full bg-white/20 overflow-hidden mt-1">
            <div className="h-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] w-2/3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoReelModal;
