import React from 'react';
import { CloudCheck, Fingerprint, WalletCards } from 'lucide-react';
import { Language } from '../types';

interface IntegrationsBannerProps {
  language: Language;
}

export const IntegrationsBanner: React.FC<IntegrationsBannerProps> = ({ language }) => {
  return (
    <section className="border-t border-slate-200/80 py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold text-slate-400 uppercase tracking-wider mb-6">
          {language === 'en' ? 'Seamless Government Ecosystem Integrations' : 'एकात्मिक शासकीय डिजिटल परिसंस्था'}
        </p>
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-75 hover:opacity-100 transition-opacity duration-300">
          {/* DigiLocker */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 shadow-2xs">
              <CloudCheck className="w-5 h-5 stroke-[2]" />
            </div>
            <span className="text-lg md:text-xl text-slate-900 font-bold tracking-tight">
              DigiLocker
            </span>
          </div>

          {/* Aadhaar */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center border border-slate-200 shadow-2xs">
              <Fingerprint className="w-5 h-5 stroke-[2]" />
            </div>
            <span className="text-lg md:text-xl text-slate-900 font-bold tracking-tight">
              Aadhaar e-KYC
            </span>
          </div>

          {/* Pay Gov India */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-2xs">
              <WalletCards className="w-5 h-5 stroke-[2]" />
            </div>
            <span className="text-lg md:text-xl text-slate-900 font-bold tracking-tight">
              Pay Gov India
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

