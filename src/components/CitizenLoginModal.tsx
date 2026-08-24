import React, { useState } from 'react';
import { X, User, Phone, ShieldCheck, CheckCircle2, Sparkles, KeyRound } from 'lucide-react';
import { Language, CitizenUser } from '../types';

interface CitizenLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onLogin: (user: CitizenUser) => void;
  demoUsers: CitizenUser[];
}

export const CitizenLoginModal: React.FC<CitizenLoginModalProps> = ({
  isOpen,
  onClose,
  language,
  onLogin,
  demoUsers,
}) => {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile.length >= 10) {
      setOtpSent(true);
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: CitizenUser = {
      name: 'Aditya Mhaske',
      nameMr: 'आदित्य म्हस्के',
      mobile: mobile || '9970123456',
      aadhaarLast4: '7721',
      email: 'adityamhaske046@gmail.com',
      district: 'Mumbai',
      role: 'Citizen',
      digiLockerLinked: true,
    };
    onLogin(newUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-slate-200 relative flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-1">
              {language === 'en' ? 'Aaple Sarkar SSO' : 'नागरिक एकल प्रवेश'}
            </span>
            <h3 className="text-xl font-bold text-slate-900">
              {language === 'en' ? 'Citizen Login' : 'नागरिक लॉगिन'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white text-slate-500 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Quick 1-Click Demo Profiles */}
          <div>
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2.5">
              {language === 'en' ? 'Quick 1-Click Citizen Profiles:' : 'त्वरित १-क्लिक डेमो प्रोफाईल:'}
            </span>
            <div className="space-y-2">
              {demoUsers.map((user) => (
                <button
                  key={user.mobile}
                  onClick={() => {
                    onLogin(user);
                    onClose();
                  }}
                  className="w-full p-3 rounded-xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-indigo-300 text-left flex items-center justify-between transition-all group shadow-2xs hover:shadow-xs cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-xs text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {language === 'en' ? user.name : user.nameMr}
                      </p>
                      <p className="text-[11px] text-slate-500 font-medium">
                        {user.role} • {user.district}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 group-hover:bg-indigo-600 group-hover:text-white px-2.5 py-1 rounded-lg border border-indigo-100 transition-colors">
                    {language === 'en' ? 'Select' : 'निवडा'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="shrink-0 mx-3 text-xs text-slate-400 uppercase font-bold">
              {language === 'en' ? 'Or Login with Mobile' : 'किंवा मोबाईलने लॉगिन करा'}
            </span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {/* OTP Form */}
          {!otpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {language === 'en' ? '10-Digit Mobile Number' : '१० अंकी मोबाईल नंबर'}
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="98XXXXXXXX"
                    className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 font-medium"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl font-semibold text-xs transition-colors shadow-xs cursor-pointer"
              >
                {language === 'en' ? 'Send OTP' : 'OTP मिळवा'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {language === 'en' ? 'Enter 6-Digit OTP (Demo: 123456)' : '६ अंकी OTP टाका (डेमो: 123456)'}
                </label>
                <input
                  type="text"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="123456"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 text-center tracking-widest font-mono text-base font-bold"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl font-semibold text-xs transition-colors shadow-xs cursor-pointer"
              >
                {language === 'en' ? 'Verify & Sign In' : 'प्रमाणीकृत करून लॉगिन करा'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
