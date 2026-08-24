import React from 'react';
import {
  X,
  User,
  FileText,
  Clock,
  Download,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  FolderCheck,
} from 'lucide-react';
import { Language, CitizenUser, ApplicationRecord } from '../types';

interface CitizenDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  user: CitizenUser;
  applications: ApplicationRecord[];
  onOpenTrackWithId: (id: string) => void;
  onOpenNewService: () => void;
}

export const CitizenDashboardModal: React.FC<CitizenDashboardModalProps> = ({
  isOpen,
  onClose,
  language,
  user,
  applications,
  onOpenTrackWithId,
  onOpenNewService,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative flex flex-col">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-xs z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-base shadow-xs">
              {user.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                {language === 'en' ? `Citizen Dashboard - ${user.name}` : `नागरिक डॅशबोर्ड - ${user.nameMr}`}
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {user.role} • Aadhaar: •••• •••• {user.aadhaarLast4} • {user.district} District
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs">
              <span className="text-xs text-slate-500 font-medium block">Active Applications</span>
              <span className="text-3xl font-bold text-slate-900 mt-1 block">
                {applications.filter((a) => a.status !== 'Approved').length}
              </span>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs">
              <span className="text-xs text-slate-500 font-medium block">Approved & Downloadable</span>
              <span className="text-3xl font-bold text-emerald-600 mt-1 block">
                {applications.filter((a) => a.status === 'Approved').length}
              </span>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 font-medium block">DigiLocker Sync</span>
                <span className="text-sm font-bold text-slate-900 mt-1 block">Active (3 Docs)</span>
              </div>
              <FolderCheck className="w-7 h-7 text-emerald-600" />
            </div>
          </div>

          {/* Applications Table */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm md:text-base text-slate-900">
                {language === 'en' ? 'My Submitted Applications' : 'माझे सादर केलेले अर्ज'}
              </h4>
              <button
                onClick={() => {
                  onClose();
                  onOpenNewService();
                }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3.5 py-2 rounded-xl border border-indigo-100 transition-colors cursor-pointer"
              >
                <PlusCircle className="w-4 h-4 text-indigo-600" />
                <span>{language === 'en' ? 'Apply for New Service' : 'नवीन सेवेसाठी अर्ज करा'}</span>
              </button>
            </div>

            <div className="space-y-3">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {app.trackingId}
                      </span>
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                          app.status === 'Approved'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {app.status}
                      </span>
                    </div>
                    <h5 className="font-bold text-sm text-slate-900 mt-1.5">{app.serviceName}</h5>
                    <p className="text-xs text-slate-500">
                      Applied: {app.appliedDate} • Expected: {app.expectedDate}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        onClose();
                        onOpenTrackWithId(app.trackingId);
                      }}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                    >
                      {language === 'en' ? 'View Timeline' : 'टप्पे पहा'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
