import React from 'react';
import { Crosshair, ShieldCheck, Headphones, ArrowRight } from 'lucide-react';
import { Language } from '../types';

interface QuickActionsProps {
  language: Language;
  onOpenTrack: () => void;
  onOpenVerify: () => void;
  onOpenCallCenter: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  language,
  onOpenTrack,
  onOpenVerify,
  onOpenCallCenter,
}) => {
  return (
    <section className="max-w-[1200px] mx-auto px-6 -mt-10 relative z-20 mb-16 md:mb-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Action Card 1: Track Application */}
        <div
          onClick={onOpenTrack}
          className="bg-white p-8 rounded-2xl sleek-card sleek-card-hover transition-all duration-300 flex flex-col items-start gap-4 group cursor-pointer border border-slate-200/90 hover:border-indigo-300"
          id="action-track-card"
        >
          <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300 shadow-xs">
            <Crosshair className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors flex items-center justify-between">
              <span>{language === 'en' ? 'Track your Application' : 'आपला अर्ज ट्रॅक करा'}</span>
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {language === 'en'
                ? 'Check the real-time status of your submitted service requests.'
                : 'आपल्या सादर केलेल्या अर्जाची सद्यस्थिती आणि टप्पे त्वरित तपासा.'}
            </p>
          </div>
          <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors pt-2">
            <span>{language === 'en' ? 'Track with Token ID' : 'टोकन क्रमांकाने शोधा'}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>

        {/* Action Card 2: Verify Authenticated Certificate */}
        <div
          onClick={onOpenVerify}
          className="bg-white p-8 rounded-2xl sleek-card sleek-card-hover transition-all duration-300 flex flex-col items-start gap-4 group cursor-pointer border border-slate-200/90 hover:border-emerald-300"
          id="action-verify-card"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 shadow-xs">
            <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors flex items-center justify-between">
              <span>{language === 'en' ? 'Verify Your Certificate' : 'प्रमाणित दाखल्याची वैधता तपासा'}</span>
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {language === 'en'
                ? 'Validate documents securely using unique barcode values.'
                : 'बारकोड आणि डिजिटल स्वाक्षरीद्वारे दाखल्याची कायदेशीर सत्यता तपासा.'}
            </p>
          </div>
          <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:text-emerald-600 transition-colors pt-2">
            <span>{language === 'en' ? 'Verify Barcode & Seal' : 'बारकोड व सील तपासा'}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>

        {/* Action Card 3: Call Center 24x7 */}
        <div
          onClick={onOpenCallCenter}
          className="bg-white p-8 rounded-2xl sleek-card sleek-card-hover transition-all duration-300 flex flex-col items-start gap-4 group cursor-pointer border border-slate-200/90 hover:border-amber-300"
          id="action-callcenter-card"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300 shadow-xs">
            <Headphones className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors flex items-center justify-between">
              <span>{language === 'en' ? 'Call Center' : 'कॉल सेंटर व तक्रार'}</span>
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {language === 'en'
                ? '24×7 assistance for queries related to Right to Services Act 2015.'
                : 'लोकसेवा हक्क अधिनियम २०१५ संदर्भातील शंका व तक्रारींसाठी २४×७ मदत.'}
            </p>
          </div>
          <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:text-amber-600 transition-colors pt-2">
            <span>{language === 'en' ? 'Toll Free: 1800 120 8040' : 'टोल फ्री: १८०० १२० ८०४०'}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </section>
  );
};
