import React from 'react';
import {
  ArrowRight,
  ChevronRight,
  FileText,
  Store,
  Briefcase,
  Factory,
  Hammer,
  IdCard,
  RotateCw,
  Truck,
  CreditCard,
  Baby,
  HeartCrack,
  Users,
  Grid,
  Landmark,
  HardHat,
  Car,
  Tractor,
} from 'lucide-react';
import { Language, Department, ServiceItem } from '../types';

interface ServicesGridProps {
  language: Language;
  departments: Department[];
  onSelectDepartment: (dept: Department) => void;
  onSelectService: (service: ServiceItem) => void;
  onOpenAllDepartments: () => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({
  language,
  departments,
  onSelectDepartment,
  onSelectService,
  onOpenAllDepartments,
}) => {
  const revenueDept = departments.find((d) => d.id === 'revenue');
  const labourDept = departments.find((d) => d.id === 'labour');
  const transportDept = departments.find((d) => d.id === 'transport');
  const ruralDept = departments.find((d) => d.id === 'rural');

  return (
    <section className="max-w-[1200px] mx-auto px-6 mb-20 md:mb-24" id="departments-section">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 tracking-tight">
            {language === 'en' ? 'Services Available Online' : 'ऑनलाइन उपलब्ध शासकीय सेवा'}
          </h2>
          <p className="text-base md:text-lg text-slate-500">
            {language === 'en'
              ? 'Access hundreds of government services from home.'
              : 'घरबसल्या शेकडो शासकीय सेवा आणि प्रमाणपत्रांचा लाभ घ्या.'}
          </p>
        </div>
        <button
          onClick={onOpenAllDepartments}
          className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors self-start md:self-auto group cursor-pointer"
        >
          <span>{language === 'en' ? 'View All Departments' : 'सर्व विभाग पहा'}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Department 1: Revenue */}
        {revenueDept && (
          <div
            className="bg-white rounded-2xl p-8 sleek-card sleek-card-hover flex flex-col h-full relative overflow-hidden group border border-slate-200/90 hover:border-slate-300"
            id="dept-revenue-card"
          >
            {/* Background Watermark Icon */}
            <div className="absolute top-4 right-4 text-slate-900 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
              <Landmark className="w-32 h-32" />
            </div>

            <div className="relative z-10 flex-grow">
              <h3 className="text-xl font-bold text-slate-900 mb-6 group-hover:text-indigo-600 transition-colors">
                {language === 'en' ? revenueDept.name : revenueDept.nameMr}
              </h3>
              <ul className="flex flex-col gap-3.5 text-sm text-slate-600">
                {revenueDept.services.slice(0, 4).map((service) => (
                  <li key={service.id}>
                    <button
                      onClick={() => onSelectService(service)}
                      className="text-left hover:text-indigo-600 flex items-center gap-2.5 transition-colors group/item cursor-pointer w-full"
                    >
                      <FileText className="w-4 h-4 text-indigo-500 shrink-0" />
                      <span className="leading-snug font-medium">
                        {language === 'en' ? service.name : service.nameMr}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => onSelectDepartment(revenueDept)}
              className="mt-8 text-xs font-bold text-slate-900 inline-flex items-center gap-1 hover:text-indigo-600 transition-colors relative z-10 self-start cursor-pointer"
            >
              <span>{language === 'en' ? `Explore ${revenueDept.serviceCount} Services` : `सर्व ${revenueDept.serviceCount} सेवा पहा`}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Department 2: Labour */}
        {labourDept && (
          <div
            className="bg-white rounded-2xl p-8 sleek-card sleek-card-hover flex flex-col h-full relative overflow-hidden group border border-slate-200/90 hover:border-slate-300"
            id="dept-labour-card"
          >
            <div className="absolute top-4 right-4 text-slate-900 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
              <HardHat className="w-32 h-32" />
            </div>

            <div className="relative z-10 flex-grow">
              <h3 className="text-xl font-bold text-slate-900 mb-6 group-hover:text-indigo-600 transition-colors">
                {language === 'en' ? labourDept.name : labourDept.nameMr}
              </h3>
              <ul className="flex flex-col gap-3.5 text-sm text-slate-600">
                {labourDept.services.slice(0, 4).map((service, index) => {
                  const icons = [Store, Briefcase, Factory, Hammer];
                  const Icon = icons[index % icons.length] || FileText;
                  return (
                    <li key={service.id}>
                      <button
                        onClick={() => onSelectService(service)}
                        className="text-left hover:text-indigo-600 flex items-center gap-2.5 transition-colors group/item cursor-pointer w-full"
                      >
                        <Icon className="w-4 h-4 text-indigo-500 shrink-0" />
                        <span className="leading-snug font-medium">
                          {language === 'en' ? service.name : service.nameMr}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <button
              onClick={() => onSelectDepartment(labourDept)}
              className="mt-8 text-xs font-bold text-slate-900 inline-flex items-center gap-1 hover:text-indigo-600 transition-colors relative z-10 self-start cursor-pointer"
            >
              <span>{language === 'en' ? `Explore ${labourDept.serviceCount} Services` : `सर्व ${labourDept.serviceCount} सेवा पहा`}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Department 3: Transport */}
        {transportDept && (
          <div
            className="bg-white rounded-2xl p-8 sleek-card sleek-card-hover flex flex-col h-full relative overflow-hidden group border border-slate-200/90 hover:border-slate-300"
            id="dept-transport-card"
          >
            <div className="absolute top-4 right-4 text-slate-900 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
              <Car className="w-32 h-32" />
            </div>

            <div className="relative z-10 flex-grow">
              <h3 className="text-xl font-bold text-slate-900 mb-6 group-hover:text-indigo-600 transition-colors">
                {language === 'en' ? transportDept.name : transportDept.nameMr}
              </h3>
              <ul className="flex flex-col gap-3.5 text-sm text-slate-600">
                {transportDept.services.slice(0, 4).map((service, index) => {
                  const icons = [IdCard, RotateCw, Truck, CreditCard];
                  const Icon = icons[index % icons.length] || FileText;
                  return (
                    <li key={service.id}>
                      <button
                        onClick={() => onSelectService(service)}
                        className="text-left hover:text-indigo-600 flex items-center gap-2.5 transition-colors group/item cursor-pointer w-full"
                      >
                        <Icon className="w-4 h-4 text-indigo-500 shrink-0" />
                        <span className="leading-snug font-medium">
                          {language === 'en' ? service.name : service.nameMr}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <button
              onClick={() => onSelectDepartment(transportDept)}
              className="mt-8 text-xs font-bold text-slate-900 inline-flex items-center gap-1 hover:text-indigo-600 transition-colors relative z-10 self-start cursor-pointer"
            >
              <span>{language === 'en' ? `Explore ${transportDept.serviceCount}+ Services` : `सर्व ${transportDept.serviceCount}+ सेवा पहा`}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Department 4: Rural Development */}
        {ruralDept && (
          <div
            className="bg-white rounded-2xl p-8 sleek-card sleek-card-hover flex flex-col h-full relative overflow-hidden group border border-slate-200/90 hover:border-slate-300"
            id="dept-rural-card"
          >
            <div className="absolute top-4 right-4 text-slate-900 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
              <Tractor className="w-32 h-32" />
            </div>

            <div className="relative z-10 flex-grow">
              <h3 className="text-xl font-bold text-slate-900 mb-6 group-hover:text-indigo-600 transition-colors">
                {language === 'en' ? ruralDept.name : ruralDept.nameMr}
              </h3>
              <ul className="flex flex-col gap-3.5 text-sm text-slate-600">
                {ruralDept.services.slice(0, 3).map((service, index) => {
                  const icons = [Baby, HeartCrack, Users];
                  const Icon = icons[index % icons.length] || FileText;
                  return (
                    <li key={service.id}>
                      <button
                        onClick={() => onSelectService(service)}
                        className="text-left hover:text-indigo-600 flex items-center gap-2.5 transition-colors group/item cursor-pointer w-full"
                      >
                        <Icon className="w-4 h-4 text-indigo-500 shrink-0" />
                        <span className="leading-snug font-medium">
                          {language === 'en' ? service.name : service.nameMr}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <button
              onClick={() => onSelectDepartment(ruralDept)}
              className="mt-8 text-xs font-bold text-slate-900 inline-flex items-center gap-1 hover:text-indigo-600 transition-colors relative z-10 self-start cursor-pointer"
            >
              <span>{language === 'en' ? `Explore ${ruralDept.serviceCount} Services` : `सर्व ${ruralDept.serviceCount} सेवा पहा`}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Explore More Card: Spans 2 columns */}
        <div
          onClick={onOpenAllDepartments}
          className="md:col-span-2 lg:col-span-2 rounded-2xl p-8 flex items-center justify-center border-2 border-dashed border-slate-200 hover:border-indigo-500 transition-all cursor-pointer group bg-white/80 hover:bg-white"
          id="explore-all-departments-card"
        >
          <div className="text-center max-w-md py-6">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-xs">
              <Grid className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
              {language === 'en' ? 'Explore All 42 Departments' : 'सर्व ४२ शासकीय विभाग एक्सप्लोर करा'}
            </h3>
            <p className="text-sm text-slate-500 mt-2">
              {language === 'en'
                ? 'Find services from Water Resources, Home, Industries, Agriculture, Higher Education, and more.'
                : 'जलसंपदा, गृह, उद्योग, कृषी, उच्च शिक्षण आणि इतर सर्व ४२ विभागांच्या ५००+ सेवांची माहिती व अर्ज.'}
            </p>
            <span className="inline-flex items-center gap-1.5 mt-5 text-xs font-bold text-indigo-700 bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all">
              <span>{language === 'en' ? 'Open Complete Directory' : 'संपूर्ण सेवा निर्देशिका उघडा'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </div>

      {/* Mobile view all departments button */}
      <div className="mt-8 text-center md:hidden">
        <button
          onClick={onOpenAllDepartments}
          className="bg-white text-slate-900 font-semibold text-sm px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 transition-colors w-full shadow-xs cursor-pointer"
        >
          {language === 'en' ? 'View All 42 Departments' : 'सर्व ४२ विभाग पहा'}
        </button>
      </div>
    </section>
  );
};
