import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, UploadCloud, Film, MessageCircle, Send, CheckCircle2 } from 'lucide-react';

export const UploadDraftModal: React.FC = () => {
  const {
    isUploadDraftModalOpen,
    setIsUploadDraftModalOpen,
    selectedCampaign,
    addDraft,
    showToast,
  } = useApp();

  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [isDropped, setIsDropped] = useState(false);

  if (!isUploadDraftModalOpen || !selectedCampaign) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    addDraft({
      campaignId: selectedCampaign.id,
      campaignTitle: selectedCampaign.title,
      brandName: selectedCampaign.brandName,
      title,
      notes,
      platform: 'tiktok',
    });

    setIsUploadDraftModalOpen(false);
    setTitle('');
    setNotes('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-[28px] bg-[#121212] border border-white/[0.18] p-7 text-right shadow-[0_24px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(255,255,255,0.08)]">
        {/* Close Button */}
        <button
          onClick={() => setIsUploadDraftModalOpen(false)}
          className="absolute top-6 left-6 w-9 h-9 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.12] text-white flex items-center justify-center transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex flex-col gap-1.5 mb-5">
          <span className="text-xs font-semibold text-white/50">{selectedCampaign.brandName}</span>
          <h2 className="text-xl font-bold text-white font-heading">
            رفع مسودة للموافقة المسبقة
          </h2>
          <p className="text-xs text-[#A3A3A3]">
            راجع المحتوى مع البراند قبل النشر على حسابك لضمان استحقاق الأرباح
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Drag & Drop Video Upload Box */}
          <div
            onClick={() => setIsDropped(true)}
            className={`border-2 border-dashed rounded-2xl p-6 text-center flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
              isDropped
                ? 'border-emerald-400 bg-emerald-500/10'
                : 'border-white/20 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/40'
            }`}
          >
            {isDropped ? (
              <>
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                <span className="text-xs font-bold text-white">تم اختيار ملف الفيديو (draft_final_v1.mp4)</span>
                <span className="text-[10px] text-white/50">الحجم: 24.8 ميجابايت · دقة 4K 60fps</span>
              </>
            ) : (
              <>
                <div className="w-10 h-10 rounded-full bg-white/[0.08] flex items-center justify-center text-white">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-white">اسحب ملف الفيديو هنا أو اضغط للاختيار</span>
                <span className="text-[10px] text-white/40">صيغ MP4, MOV بحد أقصى 500 ميجابايت</span>
              </>
            )}
          </div>

          {/* Draft Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-white/80">عنوان المسودة أو الفكرة</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثال: فكرة فتح صندوق العطر مع رد فعل عفوي"
              className="w-full h-11 px-4 rounded-xl bg-white/[0.05] border border-white/[0.14] text-xs text-white placeholder-white/30 focus:outline-none focus:border-white/40"
              required
            />
          </div>

          {/* Notes for Brand */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-white/80">ملاحظاتك للبراند</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="وضّح للبراند أسلوب المونتاج أو الاستفسار عن كود الخصم والموسيقى المستخدمة..."
              className="w-full p-3 rounded-xl bg-white/[0.05] border border-white/[0.14] text-xs text-white placeholder-white/30 focus:outline-none focus:border-white/40 resize-none leading-relaxed"
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full py-3 px-6 rounded-full bg-white text-black font-bold text-sm shadow-[0_0_20px_rgba(255,255,255,0.35)] hover:bg-neutral-100 transition-all text-center"
          >
            إرسال المسودة للمراجعة
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadDraftModal;
