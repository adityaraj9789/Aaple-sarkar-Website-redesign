import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  QrCode,
  CheckCircle,
  FileCheck2,
  AlertTriangle,
  Download,
  Printer,
  Sparkles,
  Search,
  ScanLine,
} from 'lucide-react';
import { Language, CertificateVerification } from '../types';

interface VerifyCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  certificates: CertificateVerification[];
  initialBarcode?: string;
}

export const VerifyCertificateModal: React.FC<VerifyCertificateModalProps> = ({
  isOpen,
  onClose,
  language,
  certificates,
  initialBarcode,
}) => {
  const [barcodeInput, setBarcodeInput] = useState(initialBarcode || 'MH202488419DOM');
  const [activeTab, setActiveTab] = useState<'barcode' | 'qr'>('barcode');
  const [scanning, setScanning] = useState(false);
  const [verifiedCert, setVerifiedCert] = useState<CertificateVerification | null>(null);
  const [searched, setSearched] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const verifyBarcode = (code?: string) => {
    const raw = (code || barcodeInput).trim().toUpperCase();
    setIsVerifying(true);
    setTimeout(() => {
      const match = certificates.find(
        (c) =>
          c.barcode.toUpperCase() === raw ||
          c.certificateNo.toUpperCase().includes(raw)
      );
      setVerifiedCert(match || null);
      setSearched(true);
      setIsVerifying(false);
    }, 400);
  };

  const simulateQrScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      const randomCert = certificates[0];
      setBarcodeInput(randomCert.barcode);
      verifyBarcode(randomCert.barcode);
      setActiveTab('barcode');
    }, 1200);
  };

  useEffect(() => {
    if (initialBarcode && isOpen) {
      setBarcodeInput(initialBarcode);
      verifyBarcode(initialBarcode);
    }
  }, [initialBarcode, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative flex flex-col">
        {/* Modal Header */}
        <div className="p-6 md:p-8 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-xs z-10">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-1">
              {language === 'en' ? 'Aaple Sarkar Verification Engine' : 'अधिकृत दाखला पडताळणी यंत्रणा'}
            </span>
            <h3 className="text-2xl font-bold text-slate-900">
              {language === 'en' ? 'Verify Authenticated Certificate' : 'प्रमाणित दाखल्याची सत्यता तपासा'}
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
          {/* Method Tabs */}
          <div className="flex bg-slate-100 p-1 rounded-xl w-fit">
            <button
              onClick={() => setActiveTab('barcode')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'barcode'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {language === 'en' ? 'Barcode / Token ID' : 'बारकोड / टोकन नंबर'}
            </button>
            <button
              onClick={() => setActiveTab('qr')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'qr'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Scan Document QR' : 'QR कोड स्कॅन करा'}</span>
            </button>
          </div>

          {activeTab === 'barcode' ? (
            <div className="space-y-4">
              {/* Input */}
              <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-2 focus-within:ring-2 focus-within:ring-indigo-500/30 focus-within:border-indigo-500 transition-all">
                <ShieldCheck className="w-5 h-5 text-indigo-600 ml-3 shrink-0" />
                <input
                  type="text"
                  value={barcodeInput}
                  onChange={(e) => setBarcodeInput(e.target.value)}
                  placeholder={language === 'en' ? 'Enter 15-digit Barcode (e.g. MH202488419DOM)' : '१५ अंकी बारकोड टाका'}
                  className="w-full py-2.5 px-2 bg-transparent text-slate-900 placeholder-slate-400 text-sm md:text-base focus:outline-none font-mono font-medium"
                />
                <button
                  onClick={() => verifyBarcode()}
                  disabled={isVerifying}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold text-xs transition-colors shrink-0 flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  {isVerifying && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                  <span>{language === 'en' ? 'Verify Authenticity' : 'सत्यता तपासा'}</span>
                </button>
              </div>

              {/* Demo Sample Barcodes */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-500 font-medium">
                  {language === 'en' ? 'Sample Valid Barcodes:' : 'चाचणीसाठी नमुना बारकोड:'}
                </span>
                {certificates.map((cert) => (
                  <button
                    key={cert.barcode}
                    onClick={() => {
                      setBarcodeInput(cert.barcode);
                      verifyBarcode(cert.barcode);
                    }}
                    className={`px-3 py-1 rounded-lg border transition-all font-mono font-medium cursor-pointer ${
                      verifiedCert?.barcode === cert.barcode
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {cert.barcode}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* QR Scan Simulation */
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 text-center space-y-4">
              <div className="w-48 h-48 mx-auto border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center p-4 bg-white relative overflow-hidden">
                {scanning ? (
                  <div className="absolute inset-x-0 h-1 bg-emerald-500 shadow-[0_0_15px_#10b981] animate-bounce" />
                ) : null}
                <QrCode className="w-16 h-16 text-slate-400" />
                <p className="text-xs text-slate-500 mt-3 font-medium">
                  {scanning
                    ? (language === 'en' ? 'Scanning Digital Seal...' : 'डिजिटल सील स्कॅन होत आहे...')
                    : (language === 'en' ? 'Point Camera at Certificate QR Code' : 'दाखल्यावरील QR कोड समोर धरा')}
                </p>
              </div>

              <button
                onClick={simulateQrScan}
                disabled={scanning}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-semibold text-xs transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <ScanLine className="w-4 h-4" />
                <span>{scanning ? (language === 'en' ? 'Reading Seal...' : 'वाचत आहे...') : (language === 'en' ? 'Simulate QR Camera Scan' : 'कॅमेरा स्कॅन सुरू करा')}</span>
              </button>
            </div>
          )}

          {/* Verification Result Card */}
          {verifiedCert ? (
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-emerald-200 shadow-sm space-y-6">
              {/* Authenticity Badge */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <div className="flex items-center gap-3 text-center sm:text-left">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-900 text-base">
                      {language === 'en' ? '100% Genuine & Digitally Sealed' : '१००% अधिकृत व डिजिटल स्वाक्षरीने प्रमाणित'}
                    </h4>
                    <p className="text-xs text-emerald-700">
                      {language === 'en'
                        ? 'Issued by Government of Maharashtra with Cryptographic Hash Seal.'
                        : 'महाराष्ट्र शासनाच्या अधिकृत डिजिटल स्वाक्षरीने सुरक्षित व वैध.'}
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider">
                  {verifiedCert.status}
                </span>
              </div>

              {/* Certificate Details Table */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-xs text-slate-500 block font-medium">{language === 'en' ? 'Document / Service' : 'दाखल्याचा प्रकार'}</span>
                  <span className="font-bold text-slate-900 text-sm mt-1 block">
                    {language === 'en' ? verifiedCert.serviceName : verifiedCert.serviceNameMr}
                  </span>
                  <span className="text-xs font-mono text-slate-500 mt-1 block">
                    No: {verifiedCert.certificateNo}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-xs text-slate-500 block font-medium">{language === 'en' ? 'Beneficiary Name' : 'लाभार्थी नाव'}</span>
                  <span className="font-bold text-slate-900 text-sm mt-1 block">
                    {verifiedCert.beneficiaryName}
                  </span>
                  <span className="text-xs text-slate-500 mt-1 block">
                    District: {verifiedCert.district}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-xs text-slate-500 block font-medium">{language === 'en' ? 'Issuing Officer & Authority' : 'प्रमाणपत्र जारी करणारे अधिकारी'}</span>
                  <span className="font-semibold text-slate-800 text-xs mt-1 block">
                    {verifiedCert.issuingAuthority}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-xs text-slate-500 block font-medium">{language === 'en' ? 'Issue Date & Validity' : 'जारी दिनांक व मुदत'}</span>
                  <span className="font-semibold text-slate-800 text-xs mt-1 block">
                    {verifiedCert.issueDate} • <span className="text-emerald-700 font-bold">{verifiedCert.validUntil}</span>
                  </span>
                </div>
              </div>

              {/* Hash seal string */}
              <div className="p-3 bg-slate-100 rounded-xl text-[11px] font-mono text-slate-600 break-all border border-slate-200">
                <strong>Digital Signature Hash: </strong> {verifiedCert.qrHash}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => alert(`Official e-Certificate ${verifiedCert.certificateNo} sent to download queue.`)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{language === 'en' ? 'Download Authenticated PDF' : 'अधिकृत PDF डाउनलोड करा'}</span>
                </button>
              </div>
            </div>
          ) : searched ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-rose-200">
              <AlertTriangle className="w-10 h-10 text-rose-500 mx-auto mb-3" />
              <h4 className="font-bold text-base text-slate-900">
                {language === 'en' ? 'Invalid Barcode / Certificate Not Found' : 'अवैध बारकोड / दाखला सापडला नाही'}
              </h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                {language === 'en'
                  ? `Barcode "${barcodeInput}" is not recognized in the state Aaple Sarkar registry.`
                  : `बारकोड "${barcodeInput}" शासकीय डेटाबेसमध्ये आढळला नाही. कृपया क्रमांक तपासून पुन्हा प्रयत्न करा.`}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
