import React, { useState } from 'react';
import {
  X,
  Search,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  Building,
  User,
  Download,
  AlertCircle,
  FileCheck,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { Language, ApplicationRecord } from '../types';

interface TrackApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  applications: ApplicationRecord[];
  onOpenVerifyWithBarcode: (barcode: string) => void;
}

export const TrackApplicationModal: React.FC<TrackApplicationModalProps> = ({
  isOpen,
  onClose,
  language,
  applications,
  onOpenVerifyWithBarcode,
}) => {
  const [searchId, setSearchId] = useState('MH-REV-2024-88419');
  const [searchedRecord, setSearchedRecord] = useState<ApplicationRecord | null>(
    applications.find((a) => a.trackingId === 'MH-REV-2024-88419') || applications[0]
  );
  const [searched, setSearched] = useState(true);
  const [appealSubmitted, setAppealSubmitted] = useState(false);
  const [showCertificateView, setShowCertificateView] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (token?: string) => {
    const idToSearch = (token || searchId).trim().toUpperCase();
    const found = applications.find(
      (a) =>
        a.trackingId.toUpperCase() === idToSearch ||
        a.id.toUpperCase() === idToSearch ||
        (a.certificateBarcode && a.certificateBarcode.toUpperCase() === idToSearch)
    );
    setSearchedRecord(found || null);
    setSearched(true);
    setAppealSubmitted(false);
    setShowCertificateView(false);
  };

  const getStatusColor = (status: ApplicationRecord['status']) => {
    switch (status) {
      case 'Approved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Field Verification':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Under Scrutiny':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative flex flex-col">
        {/* Modal Header */}
        <div className="p-6 md:p-8 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-xs z-10">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-1">
              {language === 'en' ? 'Real-Time RTS Service Tracker' : 'लोकसेवा हक्क थेट स्थिती ट्रॅकर'}
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900">
              {language === 'en' ? 'Track your Application' : 'आपल्या अर्जाची सद्यस्थिती'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Search Input */}
          <div className="bg-slate-50 p-1.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-2 focus-within:ring-2 focus-within:ring-indigo-500/30 focus-within:border-indigo-500 focus-within:bg-white transition-all">
            <Search className="w-4 h-4 text-slate-400 ml-3 shrink-0" />
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder={language === 'en' ? 'Enter Application ID (e.g. MH-REV-2024-88419)' : 'अर्ज क्रमांक टाका (उदा. MH-REV-2024-88419)'}
              className="w-full py-2.5 px-2 bg-transparent text-slate-900 placeholder-slate-400 text-xs md:text-sm focus:outline-none font-mono font-medium"
            />
            <button
              onClick={() => handleSearch()}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold text-xs transition-colors shrink-0 shadow-xs cursor-pointer"
            >
              {language === 'en' ? 'Track Now' : 'शोधा'}
            </button>
          </div>

          {/* Quick Demo ID suggestions */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">
              {language === 'en' ? 'Quick Test IDs:' : 'चाचणीसाठी नमुना क्रमांक:'}
            </span>
            {applications.map((app) => (
              <button
                key={app.id}
                onClick={() => {
                  setSearchId(app.trackingId);
                  handleSearch(app.trackingId);
                }}
                className={`px-3 py-1 rounded-lg border text-xs transition-all font-mono font-medium cursor-pointer ${
                  searchedRecord?.trackingId === app.trackingId
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {app.trackingId} ({app.status})
              </button>
            ))}
          </div>

          {/* Record Details View */}
          {searchedRecord ? (
            <div className="space-y-6">
              {/* Application Summary Card */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-200">
                  <div>
                    <span className="text-xs font-mono font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
                      {searchedRecord.trackingId}
                    </span>
                    <h4 className="text-lg font-bold text-slate-900 mt-2">
                      {language === 'en' ? searchedRecord.serviceName : searchedRecord.serviceNameMr}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {searchedRecord.departmentName}
                    </p>
                  </div>
                  <div className="flex flex-col sm:items-end gap-1.5">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(
                        searchedRecord.status
                      )}`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {language === 'en' ? searchedRecord.status : searchedRecord.statusMr}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {language === 'en' ? 'Applied On:' : 'अर्ज दिनांक:'} {searchedRecord.appliedDate}
                    </span>
                  </div>
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs">
                  <div>
                    <span className="text-slate-400 block">{language === 'en' ? 'Applicant' : 'अर्जदार'}</span>
                    <span className="font-semibold text-slate-900 mt-0.5 block">{searchedRecord.applicantName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">{language === 'en' ? 'District / Taluka' : 'जिल्हा / तालुका'}</span>
                    <span className="font-semibold text-slate-900 mt-0.5 block">{searchedRecord.district}, {searchedRecord.taluka}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">{language === 'en' ? 'RTS Target Date' : 'हमी अंतिम मुदत'}</span>
                    <span className="font-semibold text-indigo-600 mt-0.5 block">{searchedRecord.expectedDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">{language === 'en' ? 'Current Office' : 'सध्याचे कार्यालय'}</span>
                    <span className="font-semibold text-slate-900 mt-0.5 block truncate" title={searchedRecord.currentAuthority}>
                      {searchedRecord.currentAuthority}
                    </span>
                  </div>
                </div>

                {/* Remarks */}
                <div className="mt-4 p-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">{language === 'en' ? 'Official Note:' : 'अधिकारी शेरा:'} </strong>
                    {searchedRecord.remarks}
                  </div>
                </div>
              </div>

              {/* Certificate Download Action if Approved */}
              {searchedRecord.status === 'Approved' && searchedRecord.certificateBarcode && (
                <div className="bg-emerald-50/80 rounded-2xl p-5 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <FileCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-900 text-sm md:text-base">
                        {language === 'en' ? 'Digitally Signed Certificate Ready!' : 'डिजिटल स्वाक्षरी दाखला तयार आहे!'}
                      </h5>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Barcode: <span className="font-mono font-bold text-slate-800">{searchedRecord.certificateBarcode}</span> • QR Authenticated
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => setShowCertificateView(!showCertificateView)}
                      className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-white border border-emerald-300 text-slate-800 text-xs font-semibold hover:bg-emerald-50 transition-colors flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>{showCertificateView ? (language === 'en' ? 'Hide Certificate' : 'लपवा') : (language === 'en' ? 'View Certificate' : 'प्रमाणपत्र पहा')}</span>
                    </button>
                    <button
                      onClick={() => onOpenVerifyWithBarcode(searchedRecord.certificateBarcode!)}
                      className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>{language === 'en' ? 'Verify & Download' : 'तपासा व डाउनलोड'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Certificate Preview Card */}
              {showCertificateView && searchedRecord.status === 'Approved' && (
                <div className="bg-white rounded-2xl p-6 border border-slate-300 shadow-sm text-slate-800 animate-in zoom-in-95 duration-200">
                  <div className="text-center border-b border-slate-200 pb-4 mb-4">
                    <p className="text-[11px] font-sans tracking-widest text-indigo-600 font-bold uppercase">Government of Maharashtra</p>
                    <h4 className="text-xl font-bold text-slate-900 mt-0.5">Aaple Sarkar e-Certificate</h4>
                    <p className="text-xs text-slate-400 font-sans mt-0.5">Issued under Maharashtra Right to Public Services Act, 2015</p>
                  </div>
                  <div className="space-y-3 text-xs md:text-sm">
                    <p className="text-slate-700">
                      This is to certify that <strong className="text-slate-900">{searchedRecord.applicantName}</strong>, resident of <strong className="text-slate-900">{searchedRecord.taluka}, {searchedRecord.district}</strong>, has been granted:
                    </p>
                    <div className="p-3.5 bg-slate-50 rounded-xl text-center border border-slate-200">
                      <span className="font-bold text-sm md:text-base text-slate-900 block">{searchedRecord.serviceName}</span>
                      <span className="text-xs text-slate-500 font-mono mt-0.5 block">Certificate Token: {searchedRecord.certificateBarcode}</span>
                    </div>
                    <div className="flex justify-between items-end pt-4 text-xs font-sans text-slate-500">
                      <div>
                        <p>Date of Issue: {searchedRecord.expectedDate}</p>
                        <p>Authority: {searchedRecord.currentAuthority}</p>
                      </div>
                      <div className="text-right">
                        <div className="inline-block p-1 bg-white border border-slate-300 rounded-lg mb-1 shadow-2xs">
                          <div className="w-14 h-14 bg-slate-900 text-white flex items-center justify-center font-mono text-[8px] text-center p-1 rounded">
                            QR SEAL OK
                          </div>
                        </div>
                        <p className="text-[10px] font-bold text-emerald-600">Digitally Signed & Verified</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Progress Timeline */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                <h5 className="font-bold text-sm text-slate-900 mb-5 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  <span>{language === 'en' ? 'Step-by-Step Processing Timeline' : 'अर्ज मंजुरीचे टप्पे व प्रगती'}</span>
                </h5>

                <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {searchedRecord.timeline.map((step, index) => (
                    <div key={index} className="relative flex items-start gap-4">
                      {/* Timeline Dot */}
                      <div
                        className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-white ring-4 ring-white ${
                          step.completed ? 'bg-emerald-500' : 'bg-slate-300'
                        }`}
                      >
                        {step.completed ? <CheckCircle2 className="w-3.5 h-3.5" /> : <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>

                      <div className="flex-grow">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <p className={`text-xs md:text-sm font-semibold ${step.completed ? 'text-slate-900' : 'text-slate-400'}`}>
                            {language === 'en' ? step.step : step.stepMr}
                          </p>
                          {step.date && (
                            <span className="text-[11px] font-mono text-slate-400">{step.date}</span>
                          )}
                        </div>
                        {step.actor && (
                          <p className="text-xs text-slate-500 mt-0.5">
                            {language === 'en' ? 'Action by:' : 'कारवाई अधिकारी:'} {step.actor}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RTS First Appeal button */}
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="text-center sm:text-left">
                  <p className="font-bold text-slate-900">
                    {language === 'en' ? 'Experiencing unreasonable delay?' : 'अर्जास विहित मुदतीपेक्षा जास्त वेळ लागत आहे?'}
                  </p>
                  <p className="text-slate-500 mt-0.5">
                    {language === 'en'
                      ? 'You have legal right under RTS Act 2015 to file 1st Appeal to Sub-Divisional Officer.'
                      : 'लोकसेवा हमी कायद्यानुसार आपण उपविभागीय अधिकारी (SDO) यांच्याकडे प्रथम अपील करू शकता.'}
                  </p>
                </div>
                {appealSubmitted ? (
                  <span className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-semibold flex items-center gap-1.5 shadow-xs">
                    <CheckCircle2 className="w-4 h-4" />
                    {language === 'en' ? 'Appeal Logged (RTS-AP-992)' : 'अपील दाखल झाले (RTS-AP-992)'}
                  </span>
                ) : (
                  <button
                    onClick={() => setAppealSubmitted(true)}
                    className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-colors shrink-0 shadow-xs cursor-pointer"
                  >
                    {language === 'en' ? 'File RTS 1st Appeal' : 'प्रथम अपील दाखल करा'}
                  </button>
                )}
              </div>
            </div>
          ) : searched ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
              <AlertCircle className="w-10 h-10 text-rose-500 mx-auto mb-3" />
              <h4 className="font-bold text-base text-slate-900">
                {language === 'en' ? 'No Application Found' : 'कोणताही अर्ज सापडला नाही'}
              </h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                {language === 'en'
                  ? `Please verify your token ID "${searchId}". You can also click on the demo IDs above.`
                  : `कृपया आपला टोकन क्रमांक तपासा किंवा वरील नमुना आयडीवर क्लिक करा.`}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
