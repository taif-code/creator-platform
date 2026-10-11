import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  ArrowRight,
  ArrowLeft,
  Building2,
  Target,
  CheckCircle2
} from 'lucide-react';

export const BrandOnboardingView: React.FC = () => {
  const { isBrandOnboardingOpen, setIsBrandOnboardingOpen, setBrandView, showToast } = useApp();
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const [name, setName] = useState('دخون العشب');
  const [website, setWebsite] = useState('https://dkhoon.sa');
  const [description, setDescription] = useState('علامة تجارية سعودية للعطور الفاخرة والعود');
  const [mainGoal, setMainGoal] = useState<'reach' | 'sales' | 'library' | 'community'>('reach');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'تتبع تلقائي للمشاهدات عبر الذكاء الاصطناعي',
    'فحص الروبوتات Bot Score',
  ]);

  if (!isBrandOnboardingOpen) return null;

  const features = [
    'تتبع تلقائي للمشاهدات عبر الذكاء الاصطناعي',
    'فحص الروبوتات والزيارات الوهمية (Bot Score)',
    'نظام الموافقة المسبقة على مسودات الفيديو',
    'تقارير تفصيلية لتكلفة الـ CPM والمبيعات',
    'صناع محتوى حصريين بعقود ريتينر شهرية',
  ];

  const toggleFeature = (f: string) => {
    setSelectedFeatures(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);
  };

  const handleFinish = () => {
    setIsBrandOnboardingOpen(false);
    setBrandView('dashboard');
    showToast('تم تهيئة ملف المنظمة بنجاح! يمكنك الآن إطلاق أول حملة تسويقية');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-[32px] bg-[#0E0E0E] border border-white/[0.18] p-8 text-right shadow-[0_24px_80px_rgba(0,0,0,0.95)]">
        <button
          onClick={() => setIsBrandOnboardingOpen(false)}
          className="absolute top-6 left-6 w-9 h-9 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.12] text-white flex items-center justify-center transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Progress Bar */}
        <div className="flex flex-col gap-2 mb-8">
          <div className="flex items-center justify-between text-xs text-white/50">
            <span>الخطوة {step} من {totalSteps}</span>
            <span>تهيئة حساب المنظمة والبراند</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Info */}
        {step === 1 && (
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="text-xl font-bold text-white font-heading">معلومات المنظمة والعلامة التجارية</h2>
              <p className="text-xs text-[#A3A3A3] mt-1">كيف يتعرف عليك صناع المحتوى في صفحة الحملات؟</p>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-white/80">اسم البراند / الشركة</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-white/[0.05] border border-white/[0.14] text-xs text-white"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-white/80">الموقع الإلكتروني أو رابط المتجر</label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-white/[0.05] border border-white/[0.14] text-xs text-white font-mono"
                dir="ltr"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-white/80">وصف مختصر للبراند</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/[0.05] border border-white/[0.14] text-xs text-white resize-none"
              />
            </div>
          </div>
        )}

        {/* Step 2: Main Goal */}
        {step === 2 && (
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="text-xl font-bold text-white font-heading">ما هو هدفك التسويقي الأساسي؟</h2>
              <p className="text-xs text-[#A3A3A3] mt-1">سنخصص لوحة التحكم والمقاييس بناءً على أولويتك</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'reach', title: 'انتشار البراند والوصول الفيروسي', desc: 'ملايين المشاهدات على تيك توك وسناب شات بأقل تكلفة' },
                { id: 'sales', title: 'زيادة المبيعات المباشرة', desc: 'استخدام أكواد الخصم وروابط التتبع للمتجر الإلكتروني' },
                { id: 'library', title: 'مكتبة محتوى UGC متجددة', desc: 'تجميع مئات الفيديوهات الإبداعية لاستخدامها كإعلانات ممولة' },
                { id: 'community', title: 'تنمية مجتمع وجمهور وفي', desc: 'علاقات مستدامة مع أبرز المؤثرين والكليبرز المتخصصين' },
              ].map((g) => (
                <div
                  key={g.id}
                  onClick={() => setMainGoal(g.id as any)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    mainGoal === g.id
                      ? 'bg-white/[0.12] border-white text-white shadow-md'
                      : 'bg-white/[0.03] border-white/[0.08] text-white/70 hover:bg-white/[0.06]'
                  }`}
                >
                  <span className="text-xs font-bold text-white block mb-1">{g.title}</span>
                  <span className="text-[11px] text-[#A3A3A3] leading-relaxed">{g.desc}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Features of Interest */}
        {step === 3 && (
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="text-xl font-bold text-white font-heading">الميزات التي تود تفعيلها</h2>
              <p className="text-xs text-[#A3A3A3] mt-1">اختر الأدوات التي تحتاجها لإدارة حملاتك بنجاح</p>
            </div>

            <div className="flex flex-col gap-2.5">
              {features.map((feat) => {
                const isSelected = selectedFeatures.includes(feat);
                return (
                  <div
                    key={feat}
                    onClick={() => toggleFeature(feat)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-white/[0.1] border-white text-white font-semibold'
                        : 'bg-white/[0.03] border-white/[0.08] text-white/70'
                    }`}
                  >
                    <span className="text-xs">{feat}</span>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      isSelected ? 'bg-white text-black' : 'border border-white/20'
                    }`}>
                      {isSelected && <CheckCircle2 className="w-4 h-4 fill-black text-white" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 pt-5 border-t border-white/[0.08] flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(s => s - 1)}
              className="px-5 py-2.5 rounded-full bg-white/[0.06] text-xs font-semibold text-white"
            >
              رجوع
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={() => {
              if (step < totalSteps) setStep(s => s + 1);
              else handleFinish();
            }}
            className="px-7 py-2.5 rounded-full bg-white text-black font-bold text-xs shadow-[0_0_20px_rgba(255,255,255,0.35)] hover:bg-neutral-100 transition-all flex items-center gap-2"
          >
            <span>{step === totalSteps ? 'أنشئ المنظمة وابدأ' : 'متابعة'}</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandOnboardingView;
