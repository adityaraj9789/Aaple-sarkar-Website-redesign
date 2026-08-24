import React, { useState } from 'react';
import {
  X,
  Search,
  Grid,
  ChevronRight,
  ArrowRight,
  Clock,
  Coins,
  FileText,
  Landmark,
  HardHat,
  Car,
  Tractor,
  Building,
  School,
  ShieldAlert,
  Sprout,
  HeartHandshake,
  CheckCircle,
} from 'lucide-react';
import { Language, Department, ServiceItem } from '../types';

interface DepartmentDrawerModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  departments: Department[];
  selectedDepartment: Department | null;
  onSelectService: (service: ServiceItem) => void;
}

export const DepartmentDrawerModal: React.FC<DepartmentDrawerModalProps> = ({
  isOpen,
  onClose,
  language,
  departments,
  selectedDepartment,
  onSelectService,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentDept, setCurrentDept] = useState<Department | null>(selectedDepartment || departments[0]);

  // Sync when selectedDepartment prop changes
  React.useEffect(() => {
    if (selectedDepartment) {
      setCurrentDept(selectedDepartment);
    }
  }, [selectedDepartment]);

  if (!isOpen) return null;

  const categories = ['All', 'Administration', 'Welfare', 'Transport', 'Commerce', 'Civic', 'Education', 'Agriculture'];

  const filteredDepartments = departments.filter((d) => {
    const matchesCategory = activeCategory === 'All' || d.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.nameMr.includes(searchQuery) ||
      d.services.some(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.nameMr.includes(searchQuery)
      );
    return matchesCategory && matchesSearch;
  });

  const getDeptIcon = (id: string) => {
    switch (id) {
      case 'revenue':
        return Landmark;
      case 'labour':
        return HardHat;
      case 'transport':
        return Car;
      case 'rural':
        return Tractor;
      case 'urban':
        return Building;
      case 'education':
        return School;
      case 'social-justice':
        return HeartHandshake;
      case 'agriculture':
        return Sprout;
      default:
        return Landmark;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl border border-slate-200 relative flex flex-col">
        {/* Modal Header */}
        <div className="p-6 md:p-8 border-b border-slate-100 flex items-center justify-between bg-white/95 backdrop-blur-xs shrink-0">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-1">
              {language === 'en' ? 'Complete Maharashtra Services Directory' : 'महाराष्ट्र शासन संपूर्ण सेवा निर्देशिका'}
            </span>
            <h3 className="text-2xl font-bold text-slate-900">
              {language === 'en' ? 'Explore All 42 Government Departments' : 'सर्व ४२ शासकीय विभाग आणि ऑनलाइन सेवा'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="px-6 md:px-8 py-3.5 border-b border-slate-100 bg-slate-50/70 flex flex-col md:flex-row items-center justify-between gap-4 shrink-0">
          {/* Search Box */}
          <div className="w-full md:w-80 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'en' ? 'Filter departments or services...' : 'विभाग किंवा सेवा शोधा...'}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs md:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
            />
          </div>

          {/* Categories Pill List */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Split Body */}
        <div className="flex-grow grid grid-cols-1 md:grid-cols-12 overflow-hidden">
          {/* Left Column: Department List */}
          <div className="md:col-span-5 border-r border-slate-100 overflow-y-auto p-4 space-y-2 bg-slate-50/50">
            {filteredDepartments.map((dept) => {
              const Icon = getDeptIcon(dept.id);
              const isSelected = currentDept?.id === dept.id;
              return (
                <button
                  key={dept.id}
                  onClick={() => setCurrentDept(dept)}
                  className={`w-full p-3.5 rounded-xl text-left transition-all flex items-center justify-between group border cursor-pointer ${
                    isSelected
                      ? 'bg-white border-indigo-600 shadow-xs'
                      : 'bg-white/80 border-slate-200/80 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 text-slate-700 group-hover:bg-indigo-50 group-hover:text-indigo-600'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs md:text-sm text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {language === 'en' ? dept.name : dept.nameMr}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
                        {dept.serviceCount} {language === 'en' ? 'Online Services' : 'ऑनलाइन सेवा'}
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? 'text-indigo-600 translate-x-0.5' : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Selected Department Details & Services */}
          <div className="md:col-span-7 overflow-y-auto p-6 space-y-6 bg-white">
            {currentDept ? (
              <div className="space-y-6">
                {/* Department Info Header */}
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 uppercase tracking-wider mb-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 border border-indigo-100">
                      {currentDept.category}
                    </span>
                    <span className="text-slate-500 font-medium">• {currentDept.serviceCount} Services Notified under RTS Act 2015</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {language === 'en' ? currentDept.name : currentDept.nameMr}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {language === 'en' ? currentDept.description : currentDept.descriptionMr}
                  </p>
                </div>

                {/* Services List */}
                <div>
                  <h4 className="font-bold text-sm text-slate-900 mb-3 flex items-center justify-between">
                    <span>{language === 'en' ? 'Available Citizen Services' : 'उपलब्ध सेवा सूची व अर्ज'}</span>
                    <span className="text-xs text-slate-400 font-normal">Click service to apply</span>
                  </h4>

                  <div className="space-y-2.5">
                    {currentDept.services.map((service) => (
                      <div
                        key={service.id}
                        className="p-4 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 shadow-xs hover:shadow-sm transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-indigo-500 shrink-0" />
                            <h5 className="font-bold text-xs md:text-sm text-slate-900 group-hover:text-indigo-600 transition-colors">
                              {language === 'en' ? service.name : service.nameMr}
                            </h5>
                          </div>
                          <p className="text-xs text-slate-500 line-clamp-1 pl-6">
                            {language === 'en' ? service.description : service.descriptionMr}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 pl-6 pt-1 text-[11px] text-slate-500">
                            <span className="inline-flex items-center gap-1 font-medium bg-slate-100 px-2 py-0.5 rounded-md text-slate-700">
                              <Clock className="w-3 h-3 text-indigo-600" />
                              RTS Limit: <strong>{service.rtsDays} {language === 'en' ? 'Days' : 'दिवस'}</strong>
                            </span>
                            <span className="inline-flex items-center gap-1 font-medium bg-slate-100 px-2 py-0.5 rounded-md text-slate-700">
                              <Coins className="w-3 h-3 text-emerald-600" />
                              Fee: <strong>{service.fee === 0 ? 'Free' : `₹${service.fee}`}</strong>
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            onSelectService(service);
                            onClose();
                          }}
                          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shrink-0 shadow-xs cursor-pointer"
                        >
                          <span>{language === 'en' ? 'Apply Online' : 'अर्ज करा'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-slate-400">
                <p>Select a department from the left menu to view online services.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
