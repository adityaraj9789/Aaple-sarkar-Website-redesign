import React, { useState } from 'react';
import {
  X,
  Clock,
  Coins,
  CheckCircle2,
  FileText,
  Upload,
  CreditCard,
  QrCode,
  ShieldCheck,
  Building,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Download,
  AlertCircle,
  FolderSync,
} from 'lucide-react';
import { Language, ServiceItem, CitizenUser, ApplicationRecord } from '../types';

interface ServiceApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  service: ServiceItem | null;
  currentUser: CitizenUser | null;
  onApplicationCreated: (newApp: ApplicationRecord) => void;
  onTrackNewApplication: (trackingId: string) => void;
}

export const ServiceApplicationModal: React.FC<ServiceApplicationModalProps> = ({
  isOpen,
  onClose,
  language,
  service,
  currentUser,
  onApplicationCreated,
  onTrackNewApplication,
}) => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    applicantName: currentUser?.name || 'Aditya Suresh Mhaske',
    mobile: currentUser?.mobile || '9970123456',
    aadhaar: currentUser?.aadhaarLast4 ? `XXXX-XXXX-${currentUser.aadhaarLast4}` : 'XXXX-XXXX-7721',
    district: currentUser?.district || 'Pune',
    taluka: 'Haveli',
    address: 'Flat 402, Shivneri Residency, Kothrud',
    rationCardNo: 'RC-MH-2019-99410',
    purpose: 'Higher Education Admission / Scholarship',
  });

  const [uploadedDocs, setUploadedDocs] = useState<Record<string, boolean>>({
    'doc-0': true,
    'doc-1': true,
  });

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [createdTrackingId, setCreatedTrackingId] = useState<string>('');

  if (!isOpen || !service) return null;

  const handleDigiLockerFetchAll = () => {
    const allFetched: Record<string, boolean> = {};
    service.requiredDocuments.forEach((_, idx) => {
      allFetched[`doc-${idx}`] = true;
    });
    setUploadedDocs(allFetched);
  };

  const handlePayAndSubmit = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      const randomNum = Math.floor(10000 + Math.random() * 90000);
      const prefix = service.departmentId.substring(0, 3).toUpperCase();
      const generatedId = `MH-${prefix}-2024-${randomNum}`;
      setCreatedTrackingId(generatedId);

      const newRecord: ApplicationRecord = {
        id: `app-${Date.now()}`,
        trackingId: generatedId,
        serviceId: service.id,
        serviceName: service.name,
        serviceNameMr: service.nameMr,
        departmentName: service.departmentName,
        applicantName: formData.applicantName,
        district: formData.district,
        taluka: formData.taluka,
        appliedDate: 'Today (Just now)',
        expectedDate: `${service.rtsDays} days under RTS Act`,
        status: 'Submitted',
        statusMr: 'अर्ज सादर झाला (Submitted)',
        currentAuthority: `${service.departmentName}, ${formData.district}`,
        remarks: 'Application received online. Forwarded to verifying officer.',
        timeline: [
          {
            step: 'Application Submitted Online & Fee Paid',
            stepMr: 'अर्ज सादर व शुल्क भरणा पूर्ण',
            completed: true,
            date: 'Just now',
            actor: 'Citizen Self Portal',
          },
          {
            step: 'Scrutiny & Document Check by Clerk',
            stepMr: 'लिपिकाद्वारे कागदपत्र पडताळणी',
            completed: false,
          },
          {
            step: 'Field Report & Inquiry',
            stepMr: 'स्थळ पाहणी व अहवाल',
            completed: false,
          },
          {
            step: 'Final Approval & Digital Seal',
            stepMr: 'अंतिम मंजुरी व डिजिटल स्वाक्षरी',
            completed: false,
          },
        ],
      };

      onApplicationCreated(newRecord);
      setStep(5);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative flex flex-col">
        {/* Modal Header */}
        <div className="p-6 md:p-8 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-xs z-10">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-1">
              {service.departmentName} • {language === 'en' ? 'Online Application' : 'ऑनलाइन अर्ज'}
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900">
              {language === 'en' ? service.name : service.nameMr}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress Bar */}
        {step < 5 && (
          <div className="px-6 md:px-8 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                  step >= 1 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'
                }`}
              >
                1
              </span>
              <span className="font-semibold text-slate-800 hidden sm:inline">Overview & RTS</span>
            </div>
            <div className="w-8 h-0.5 bg-slate-200" />
            <div className="flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                  step >= 2 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'
                }`}
              >
                2
              </span>
              <span className="font-semibold text-slate-800 hidden sm:inline">Applicant Info</span>
            </div>
            <div className="w-8 h-0.5 bg-slate-200" />
            <div className="flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                  step >= 3 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'
                }`}
              >
                3
              </span>
              <span className="font-semibold text-slate-800 hidden sm:inline">DigiLocker / Docs</span>
            </div>
            <div className="w-8 h-0.5 bg-slate-200" />
            <div className="flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                  step >= 4 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'
                }`}
              >
                4
              </span>
              <span className="font-semibold text-slate-800 hidden sm:inline">Pay Gov</span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 md:p-8 space-y-6">
          {/* STEP 1: Overview, RTS Guarantee & Checklist */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Highlight cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">
                    <Clock className="w-4 h-4" />
                    <span>{language === 'en' ? 'Statutory RTS Delivery' : 'हमी विहित मुदत'}</span>
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900">
                    {service.rtsDays} {language === 'en' ? 'Working Days' : 'कामकाजाचे दिवस'}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    {language === 'en'
                      ? 'Guaranteed under Maharashtra Right to Public Services Act 2015.'
                      : 'लोकसेवा हमी कायद्यानुसार वेळेत दाखला मिळण्याची कायदेशीर हमी.'}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">
                    <Coins className="w-4 h-4" />
                    <span>{language === 'en' ? 'Government & Portal Fee' : 'शासकीय शुल्क'}</span>
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900">
                    {service.fee === 0 ? '₹0 (Free)' : `₹${service.fee.toFixed(2)}`}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    {language === 'en'
                      ? 'Payable via UPI, NetBanking, Debit/Credit Card on Pay Gov India.'
                      : 'पे गव्ह इंडियाद्वारे सुरक्षित ऑनलाइन भरणा.'}
                  </p>
                </div>
              </div>

              {/* Eligibility & Documents */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div>
                  <h5 className="font-bold text-sm text-slate-900 mb-1">
                    {language === 'en' ? 'Eligibility Criteria:' : 'पात्रता निकष:'}
                  </h5>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {language === 'en' ? service.eligibility : service.eligibilityMr}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <h5 className="font-bold text-sm text-slate-900 mb-3">
                    {language === 'en' ? 'Mandatory Documents Required:' : 'आवश्यक कागदपत्रे सूची:'}
                  </h5>
                  <ul className="space-y-2">
                    {(language === 'en' ? service.requiredDocuments : service.requiredDocumentsMr).map(
                      (doc, index) => (
                        <li key={index} className="flex items-center gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>{doc}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <span>{language === 'en' ? 'Continue to Applicant Details' : 'अर्जदार माहिती भरण्यासाठी पुढे जा'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: Applicant Information */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {language === 'en' ? 'Applicant Full Name (As on Aadhaar)' : 'अर्जदाराचे नाव'}
                    </label>
                    <input
                      type="text"
                      value={formData.applicantName}
                      onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {language === 'en' ? 'Mobile Number (Linked with Aadhaar)' : 'मोबाईल नंबर'}
                    </label>
                    <input
                      type="tel"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {language === 'en' ? 'District' : 'जिल्हा'}
                    </label>
                    <select
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
                    >
                      <option value="Pune">Pune (पुणे)</option>
                      <option value="Mumbai">Mumbai (मुंबई)</option>
                      <option value="Nashik">Nashik (नाशिक)</option>
                      <option value="Nagpur">Nagpur (नागपूर)</option>
                      <option value="Chhatrapati Sambhajinagar">Chhatrapati Sambhajinagar</option>
                      <option value="Kolhapur">Kolhapur (कोल्हापूर)</option>
                      <option value="Thane">Thane (ठाणे)</option>
                      <option value="Solapur">Solapur (सोलापूर)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {language === 'en' ? 'Taluka' : 'तालुका'}
                    </label>
                    <input
                      type="text"
                      value={formData.taluka}
                      onChange={(e) => setFormData({ ...formData, taluka: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {language === 'en' ? 'Aadhaar e-KYC' : 'आधार ई-केवायसी'}
                    </label>
                    <input
                      disabled
                      type="text"
                      value={formData.aadhaar}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-xs font-mono text-slate-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {language === 'en' ? 'Residential Address' : 'रहिवासी पत्ता'}
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {language === 'en' ? 'Purpose of Certificate' : 'दाखल्याचा उद्देश'}
                  </label>
                  <input
                    type="text"
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{language === 'en' ? 'Back' : 'मागे'}</span>
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-grow bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <span>{language === 'en' ? 'Proceed to Document Upload' : 'कागदपत्रे अपलोडसाठी पुढे जा'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: DigiLocker Fetch & Document Upload */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* DigiLocker 1-Click Banner */}
              <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h5 className="font-bold text-slate-900 text-xs md:text-sm flex items-center gap-2">
                    <FolderSync className="w-4 h-4 text-indigo-600" />
                    <span>{language === 'en' ? 'Fast-Track with DigiLocker' : 'डिजीलॉकरद्वारे थेट कागदपत्रे जोडा'}</span>
                  </h5>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {language === 'en'
                      ? 'Instantly attach verified Aadhaar, Ration card, and Marksheets from DigiLocker without scanning.'
                      : 'स्कॅन न करता थेट अधिकृत कागदपत्रे संलग्न करा.'}
                  </p>
                </div>
                <button
                  onClick={handleDigiLockerFetchAll}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shrink-0 shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{language === 'en' ? 'Fetch from DigiLocker' : 'डिजीलॉकरवरून जोडा'}</span>
                </button>
              </div>

              {/* Document List with status */}
              <div className="space-y-2.5">
                {service.requiredDocuments.map((docName, idx) => {
                  const isUploaded = uploadedDocs[`doc-${idx}`];
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                            isUploaded ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-semibold text-xs md:text-sm text-slate-900">{docName}</p>
                          <p className="text-[11px] text-slate-400">
                            {isUploaded ? 'Verified via DigiLocker / Attached' : 'PDF/JPG up to 2MB'}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          setUploadedDocs({
                            ...uploadedDocs,
                            [`doc-${idx}`]: !isUploaded,
                          })
                        }
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                          isUploaded
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                        }`}
                      >
                        {isUploaded ? (language === 'en' ? 'Attached ✓' : 'संलग्न ✓') : (language === 'en' ? 'Upload' : 'अपलोड')}
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{language === 'en' ? 'Back' : 'मागे'}</span>
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="flex-grow bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <span>{language === 'en' ? 'Proceed to Fee Payment' : 'शुल्क भरण्यासाठी पुढे जा'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Pay Gov India Payment Gateway */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-medium text-slate-500">Pay Gov India Gateway</span>
                    <h5 className="font-bold text-sm md:text-base text-slate-900">{service.name}</h5>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Total Amount</span>
                    <span className="text-xl md:text-2xl font-bold text-slate-900">
                      {service.fee === 0 ? '₹0.00' : `₹${service.fee.toFixed(2)}`}
                    </span>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700 block">Select Payment Mode:</span>
                  <div className="grid grid-cols-3 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-3 rounded-xl border text-center text-xs font-semibold transition-all cursor-pointer ${
                        paymentMethod === 'upi'
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-xs'
                          : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      UPI / QR
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-xl border text-center text-xs font-semibold transition-all cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-xs'
                          : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      Card
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('netbanking')}
                      className={`p-3 rounded-xl border text-center text-xs font-semibold transition-all cursor-pointer ${
                        paymentMethod === 'netbanking'
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-xs'
                          : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      Net Banking
                    </button>
                  </div>
                </div>

                {/* QR Box for UPI */}
                {paymentMethod === 'upi' && (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center gap-4 text-center">
                    <div className="w-18 h-18 bg-white p-2 rounded-xl border border-slate-200 flex items-center justify-center shadow-xs">
                      <QrCode className="w-14 h-14 text-slate-900" />
                    </div>
                    <div className="text-left text-xs">
                      <p className="font-bold text-slate-900">Scan with Any UPI App</p>
                      <p className="text-slate-500 mt-0.5">UPI ID: paygov.mhgov@sbi</p>
                      <p className="text-[10px] text-emerald-600 font-bold mt-1">256-Bit SSL Encrypted</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{language === 'en' ? 'Back' : 'मागे'}</span>
                </button>
                <button
                  onClick={handlePayAndSubmit}
                  disabled={isProcessingPayment}
                  className="flex-grow bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  {isProcessingPayment ? (
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  ) : (
                    <ShieldCheck className="w-4 h-4" />
                  )}
                  <span>
                    {isProcessingPayment
                      ? (language === 'en' ? 'Securing Transaction...' : 'व्यवहार प्रक्रिया सुरू आहे...')
                      : (language === 'en' ? `Pay ₹${service.fee.toFixed(2)} & Submit Application` : `शुल्क भरून अर्ज सादर करा`)}
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Success Receipt & Acknowledgment */}
          {step === 5 && (
            <div className="space-y-6 text-center animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-2xl font-bold text-slate-900">
                  {language === 'en' ? 'Application Submitted Successfully!' : 'आपला अर्ज यशस्वीरित्या सादर झाला!'}
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  {language === 'en'
                    ? 'An official acknowledgment SMS has been sent to your registered mobile.'
                    : 'अधिकृत पावती व एसएमएस आपल्या नोंदणीकृत मोबाईलवर पाठवला गेला आहे.'}
                </p>
              </div>

              {/* Receipt Card */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-xs text-left font-mono text-xs space-y-2.5 max-w-lg mx-auto">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-sans">Application Token:</span>
                  <span className="font-bold text-slate-900 text-xs">{createdTrackingId}</span>
                </div>
                <div className="flex justify-between font-sans">
                  <span className="text-slate-500">Service:</span>
                  <span className="font-semibold text-slate-900">{service.name}</span>
                </div>
                <div className="flex justify-between font-sans">
                  <span className="text-slate-500">Applicant:</span>
                  <span className="font-semibold text-slate-900">{formData.applicantName}</span>
                </div>
                <div className="flex justify-between font-sans">
                  <span className="text-slate-500">District:</span>
                  <span className="font-semibold text-slate-900">{formData.district}</span>
                </div>
                <div className="flex justify-between font-sans">
                  <span className="text-slate-500">RTS Target Timeline:</span>
                  <span className="font-bold text-indigo-600">{service.rtsDays} Working Days</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onTrackNewApplication(createdTrackingId);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <span>{language === 'en' ? 'Track Real-Time Status' : 'सद्यस्थिती ट्रॅक करा'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  {language === 'en' ? 'Close' : 'बंद करा'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
