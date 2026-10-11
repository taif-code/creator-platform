import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Phone, KeyRound, ArrowRight, CheckCircle2 } from 'lucide-react';

export const LoginModal: React.FC = () => {
  const { isLoginModalOpen, setIsLoginModalOpen, setIsRoleSelectModalOpen, showToast } = useApp();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('50 123 4567');
  const [otp, setOtp] = useState(['5', '8', '2', '4', '', '']);
  const [timer, setTimer] = useState(59);
  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  if (!isLoginModalOpen) return null;

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setStep('otp');
    setTimer(59);
    showToast(`تم إرسال رمز التحقق إلى +966 ${phone}`);
  };

  const handleOtpChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[index] = val.slice(-1);
    setOtp(newOtp);

    // Auto-advance
    if (val && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = () => {
    setIsLoginModalOpen(false);
    showToast('تم تسجيل الدخول بنجاح!');
    setIsRoleSelectModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-[28px] bg-[#121212] border border-white/[0.18] p-7 text-right shadow-[0_24px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(255,255,255,0.08)]">
        {/* Close Button */}
        <button
          onClick={() => setIsLoginModalOpen(false)}
          className="absolute top-6 left-6 w-9 h-9 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.12] text-white flex items-center justify-center transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex flex-col gap-2 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-white/[0.08] border border-white/[0.14] flex items-center justify-center text-white mb-2 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            {step === 'phone' ? <Phone className="w-6 h-6" /> : <KeyRound className="w-6 h-6" />}
          </div>
          <h2 className="text-xl font-bold text-white font-heading">
            {step === 'phone' ? 'تسجيل الدخول برقم الجوال' : 'أدخل رمز التحقق (OTP)'}
          </h2>
          <p className="text-xs text-[#A3A3A3]">
            {step === 'phone'
              ? 'سجل دخولك أو أنشئ حسابك الجديد للبدء في الربح من المشاهدات'
              : `أدخل الرمز المكون من 6 أرقام المرسل إلى +966 ${phone}`}
          </p>
        </div>

        {step === 'phone' ? (
          /* Phone Step */
          <form onSubmit={handlePhoneSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-white/80">رقم الجوال السعودي</label>
              <div className="relative flex items-center" dir="ltr">
                <span className="absolute left-3.5 text-xs font-semibold text-white/60 font-mono">
                  +966
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="50 123 4567"
                  className="w-full h-12 pl-16 pr-4 rounded-xl bg-white/[0.05] border border-white/[0.14] text-sm text-white font-mono placeholder-white/30 focus:outline-none focus:border-white/40 focus:bg-white/[0.08] transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 w-full py-3 px-6 rounded-full bg-white text-black font-bold text-sm shadow-[0_0_20px_rgba(255,255,255,0.35)] hover:shadow-[0_0_28px_rgba(255,255,255,0.65)] hover:bg-neutral-100 transition-all flex items-center justify-center gap-2"
            >
              <span>إرسال رمز التحقق</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* OTP Step */
          <div className="flex flex-col gap-5">
            {/* 6 Auto-advance OTP boxes */}
            <div className="flex items-center justify-between gap-2" dir="ltr">
              {[0, 1, 2, 3, 4, 5].map((idx) => (
                <input
                  key={idx}
                  ref={(el) => {
                    otpInputsRef.current[idx] = el;
                  }}
                  type="text"
                  maxLength={1}
                  value={otp[idx]}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className="w-12 h-14 rounded-xl bg-white/[0.06] border border-white/[0.16] text-center text-lg font-bold text-white font-mono focus:outline-none focus:border-white focus:bg-white/[0.1] focus:shadow-[0_0_16px_rgba(255,255,255,0.3)] transition-all"
                />
              ))}
            </div>

            {/* Resend Timer */}
            <div className="flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => setStep('phone')}
                className="text-white/60 hover:text-white transition-colors"
              >
                تغيير رقم الجوال
              </button>

              <span className="text-[#A3A3A3]">
                {timer > 0 ? (
                  `إعادة الإرسال بعد ${timer} ثانية`
                ) : (
                  <button
                    onClick={() => {
                      setTimer(59);
                      showToast('تمت إعادة إرسال الرمز');
                    }}
                    className="text-white underline font-semibold"
                  >
                    إعادة إرسال الرمز
                  </button>
                )}
              </span>
            </div>

            <button
              onClick={handleVerifyOtp}
              className="mt-2 w-full py-3 px-6 rounded-full bg-white text-black font-bold text-sm shadow-[0_0_20px_rgba(255,255,255,0.35)] hover:shadow-[0_0_28px_rgba(255,255,255,0.65)] hover:bg-neutral-100 transition-all flex items-center justify-center gap-2"
            >
              <span>تحقق ومتابعة</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
