import React, { useState, useRef, useEffect } from 'react';
import { Search, ArrowRight, Sparkles, Clock, FileCheck, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { Language, ServiceItem } from '../types';

interface HeroSectionProps {
  language: Language;
  onSelectService: (service: ServiceItem) => void;
  allServices: ServiceItem[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  onSelectService,
  allServices,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter services based on search query in English or Marathi
  const searchResults = searchTerm.trim() === ''
    ? []
    : allServices.filter(
        (s) =>
          s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.nameMr.includes(searchTerm) ||
          s.departmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.departmentNameMr.includes(searchTerm) ||
          s.description.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 6);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const popularQuickQueries = [
    { label: 'Domicile Certificate', labelMr: 'अधिवास दाखला', serviceId: 'rev-domicile' },
    { label: 'Income Certificate', labelMr: 'उत्पन्न दाखला', serviceId: 'rev-income' },
    { label: 'Shop Act (Gumasta)', labelMr: 'गुमास्ता परवाना', serviceId: 'lab-gumasta' },
    { label: "Learner's License", labelMr: 'लर्निंग लायसन्स', serviceId: 'trans-ll' },
    { label: 'Birth Certificate', labelMr: 'जन्म दाखला', serviceId: 'rur-birth' },
  ];

  return (
    <section className="w-full relative bg-white overflow-hidden border-b border-slate-200/80">
      {/* Decorative abstract geometric background */}
      <div
        className="absolute inset-0 opacity-25 bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDFdhZUeGpkbMHHkxClDuNBj_uA0g0-iIMxDFrvUXBKJ08h0YcQoUq6a1GHXTExRUKVoiDRCMIBi9qbgDp_PICd_O2r-kNXa-8ksfztOaTXZvbN9Dq0sII_3TzpTUUGYckeWKhdQBsOCmyzLFakWi7cOVX6i8qvP07IBGJH49WP_56-r3tPaXtaw84nZazRRsZIw8cWNYb_xdLt9qninyOTTBc_Af9BMeEUSYwxudtosyroxuPDqYJL')`,
        }}
      />
      
      {/* Sleek cool overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 via-white/70 to-slate-50/90 pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto px-6 py-20 md:py-24 flex flex-col items-center text-center z-10">
        {/* Right to Public Services Act Banner Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/80 mb-5 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span className="text-[13px] font-semibold text-indigo-700 uppercase tracking-wider">
            {language === 'en'
              ? 'Maharashtra Right to Public Services Act'
              : 'महाराष्ट्र लोकसेवा हक्क अधिनियम २०१५'}
          </span>
        </div>

        {/* Display Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-[48px] font-extrabold text-slate-900 tracking-tight leading-tight md:leading-[56px] mb-8 max-w-3xl">
          {language === 'en' ? 'Your Service is Our Duty' : 'आपली सेवा हेच आमचे कर्तव्य'}
        </h1>

        {/* Global Search Box */}
        <div className="w-full max-w-2xl relative" ref={dropdownRef}>
          <div className="w-full relative rounded-2xl bg-white shadow-[0_4px_20px_rgba(15,23,42,0.06)] transition-all duration-300 border border-slate-200/90 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/15 focus-within:-translate-y-0.5">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsFocused(true)}
              placeholder={
                language === 'en'
                  ? 'Search here online service (e.g. Domicile, Income, Gumasta, License)...'
                  : 'येथे ऑनलाइन सेवा शोधा (उदा. अधिवास, उत्पन्न, गुमास्ता, परवाना)...'
              }
              className="w-full pl-15 pr-12 py-4.5 bg-transparent border-none rounded-2xl text-base md:text-lg text-slate-900 placeholder-slate-400 focus:outline-none"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Live Search Suggestions Dropdown */}
          {isFocused && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 text-left overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
              {searchResults.length > 0 ? (
                <div className="p-2 space-y-1">
                  <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {language === 'en' ? 'Matching Government Services' : 'उपलब्ध शासकीय सेवा'}
                  </div>
                  {searchResults.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => {
                        onSelectService(service);
                        setIsFocused(false);
                        setSearchTerm('');
                      }}
                      className="w-full p-3.5 rounded-xl hover:bg-slate-50 flex items-center justify-between text-left transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                          <FileCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors">
                            {language === 'en' ? service.name : service.nameMr}
                          </p>
                          <p className="text-xs text-slate-500">
                            {language === 'en' ? service.departmentName : service.departmentNameMr}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="hidden sm:inline-flex items-center gap-1 text-xs text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                          <Clock className="w-3 h-3 text-indigo-600" />
                          {service.rtsDays} {language === 'en' ? 'Days' : 'दिवस'}
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-indigo-600 transition-all" />
                      </div>
                    </button>
                  ))}
                </div>
              ) : searchTerm.trim() !== '' ? (
                <div className="p-8 text-center text-slate-600">
                  <p className="font-medium text-sm">
                    {language === 'en'
                      ? `No services found matching "${searchTerm}"`
                      : `"${searchTerm}" साठी कोणतीही सेवा सापडली नाही`}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {language === 'en'
                      ? 'Try searching by department name or general term like "certificate", "license", "tax"'
                      : 'कृपया विभाग नाव किंवा "प्रमाणपत्र", "परवाना", "कर" असे शब्द वापरून शोधा'}
                  </p>
                </div>
              ) : (
                <div className="p-4">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
                    {language === 'en' ? 'Frequently Applied Services' : 'सर्वाधिक अर्ज केल्या जाणाऱ्या सेवा'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {popularQuickQueries.map((q) => {
                      const matched = allServices.find((s) => s.id === q.serviceId);
                      return (
                        <button
                          key={q.serviceId}
                          onClick={() => {
                            if (matched) {
                              onSelectService(matched);
                              setIsFocused(false);
                            }
                          }}
                          className="px-3.5 py-1.5 rounded-lg bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 text-xs font-medium text-slate-700 border border-slate-200 transition-all cursor-pointer"
                        >
                          {language === 'en' ? q.label : q.labelMr}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-5 text-xs">
          <span className="text-slate-500 font-medium">
            {language === 'en' ? 'Popular Services:' : 'लोकप्रिय सेवा:'}
          </span>
          {popularQuickQueries.slice(0, 4).map((q) => {
            const matched = allServices.find((s) => s.id === q.serviceId);
            return (
              <button
                key={q.serviceId}
                onClick={() => matched && onSelectService(matched)}
                className="text-slate-700 hover:text-indigo-600 hover:underline underline-offset-2 transition-colors font-medium cursor-pointer"
              >
                {language === 'en' ? q.label : q.labelMr}
                {q !== popularQuickQueries[3] && ' •'}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
