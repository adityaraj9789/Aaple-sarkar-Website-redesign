import React, { useState } from 'react';
import { Landmark, Phone, Mail, MapPin, X, ShieldCheck } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  language: Language;
  onOpenCallCenter: () => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onOpenCallCenter }) => {
  const [activeLegalModal, setActiveLegalModal] = useState<string | null>(null);

  return (
    <footer className="bg-slate-900 text-slate-400 w-full py-16 md:py-20 border-t border-slate-800">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Column: Brand & Legal */}
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Landmark className="w-4 h-4 text-white" />
            </div>
            <h4 className="text-xl font-bold text-white tracking-tight">
              {language === 'en' ? 'Aaple Sarkar' : 'आपले सरकार'}
            </h4>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {language === 'en'
              ? '© 2024 Aaple Sarkar Government of Maharashtra. All Rights Reserved.'
              : '© २०२४ आपले सरकार महाराष्ट्र शासन. सर्व हक्क राखीव.'}
          </p>
          <p className="text-[11px] text-slate-500 mt-1 font-medium">
            {language === 'en'
              ? 'Maharashtra Right to Public Services Act, 2015 Portal'
              : 'महाराष्ट्र लोकसेवा हक्क अधिनियम २०१५ अधिकृत नागरिक पोर्टल'}
          </p>
        </div>

        {/* Right Column: Footer Links */}
        <div className="flex flex-wrap md:justify-end gap-6 items-center text-xs font-semibold text-slate-400">
          <button
            onClick={() => setActiveLegalModal('privacy')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            {language === 'en' ? 'Privacy Policy' : 'गोपनीयता धोरण'}
          </button>
          <button
            onClick={() => setActiveLegalModal('terms')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            {language === 'en' ? 'Terms of Service' : 'सेवा नियम व अटी'}
          </button>
          <button
            onClick={onOpenCallCenter}
            className="hover:text-white transition-colors cursor-pointer"
          >
            {language === 'en' ? 'Help Desk' : 'सहाय्यता केंद्र'}
          </button>
          <button
            onClick={() => setActiveLegalModal('contact')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            {language === 'en' ? 'Contact Us' : 'संपर्क'}
          </button>
        </div>
      </div>

      {/* Legal & Info Modal */}
      {activeLegalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-slate-200 p-6 md:p-8 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="text-lg font-bold text-slate-900">
                {activeLegalModal === 'privacy' && (language === 'en' ? 'Privacy & Data Protection Policy' : 'गोपनीयता धोरण')}
                {activeLegalModal === 'terms' && (language === 'en' ? 'Terms of Service under RTS Act 2015' : 'सेवा नियम व अटी')}
                {activeLegalModal === 'contact' && (language === 'en' ? 'Government Contact Directory' : 'शासकीय संपर्क निर्देशिका')}
              </h4>
              <button
                onClick={() => setActiveLegalModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-slate-600 leading-relaxed space-y-3">
              {activeLegalModal === 'privacy' && (
                <>
                  <p>
                    Aaple Sarkar conforms to the Information Technology Act, 2000 and national data protection standards. All citizen submissions, Aadhaar e-KYC tokens, and uploaded certificates are stored in ISO 27001 certified Government Data Centers (GDC, Mumbai).
                  </p>
                  <p>
                    Data is strictly processed for the statutory issuance of citizen certificates and is never shared with unauthorized third parties.
                  </p>
                </>
              )}

              {activeLegalModal === 'terms' && (
                <>
                  <p>
                    All public services published on this portal are notified under the Maharashtra Right to Public Services Act, 2015. Every citizen has a statutory right to obtain the notified service within the specified timeframe.
                  </p>
                  <p>
                    Applicants must ensure truthfulness of self-declarations and uploaded documents. Furnishing false information is punishable under Section 199 of IPC.
                  </p>
                </>
              )}

              {activeLegalModal === 'contact' && (
                <div className="space-y-2 text-slate-800">
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-indigo-600" />
                    <span>24x7 Toll Free Helpline: <strong>1800 120 8040</strong></span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-indigo-600" />
                    <span>Email Support: <strong>support.aaplesarkar@maharashtra.gov.in</strong></span>
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-indigo-600" />
                    <span>General Administration Department (GAD), Mantralaya, Mumbai - 400032</span>
                  </p>
                </div>
              )}
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setActiveLegalModal(null)}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                {language === 'en' ? 'Close' : 'बंद करा'}
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
