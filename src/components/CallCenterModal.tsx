import React, { useState } from 'react';
import {
  X,
  PhoneCall,
  Headphones,
  ShieldAlert,
  Send,
  MessageSquare,
  FileQuestion,
  CheckCircle2,
  Clock,
  Scale,
  Award,
  Sparkles,
} from 'lucide-react';
import { Language } from '../types';

interface CallCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const CallCenterModal: React.FC<CallCenterModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [activeTab, setActiveTab] = useState<'helpline' | 'chat' | 'grievance'>('helpline');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string }>>([
    {
      sender: 'bot',
      text:
        language === 'en'
          ? 'Namaskar! I am Aaple Mitra, your RTS Virtual Assistant. How can I help you with Maharashtra government certificates, required documents, or RTS timelines today?'
          : 'नमस्कार! मी आपले मित्र, आपला लोकसेवा हक्क सहाय्यक. दाखले, आवश्यक कागदपत्रे किंवा मुदतीबाबत मी आपणास कशी मदत करू शकतो?',
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  
  // Grievance form state
  const [grievanceForm, setGrievanceForm] = useState({
    name: '',
    mobile: '',
    district: 'Pune',
    token: '',
    category: 'Delay in Service',
    description: '',
  });
  const [grievanceSubmitted, setGrievanceSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput.trim();
    const newMessages = [...chatMessages, { sender: 'user' as const, text: userText }];
    setChatMessages(newMessages);
    setChatInput('');

    // Generate smart response based on keywords
    setTimeout(() => {
      let botReply = '';
      const lower = userText.toLowerCase();

      if (lower.includes('domicile') || lower.includes('अधिवास')) {
        botReply =
          language === 'en'
            ? 'For Domicile Certificate: 15 days RTS limit. Fee: ₹33.60. Required: 15 years residence proof in MH (Ration Card/Electricity Bill), School Leaving Certificate, and Aadhaar Card.'
            : 'अधिवास दाखल्यासाठी: कमाल १५ दिवस मुदत. शुल्क: ₹३३.६०. आवश्यक कागदपत्रे: १५ वर्षे रहिवासी पुरावा (रेशन कार्ड/वीज बिल), शाळा सोडल्याचा दाखला व आधार कार्ड.';
      } else if (lower.includes('income') || lower.includes('उत्पन्न')) {
        botReply =
          language === 'en'
            ? 'For Income Certificate: 15 days RTS limit. Issued by Tehsildar. Required: Salary Slip / Form 16 / Talathi Income verification report, Ration Card, and Aadhaar.'
            : 'उत्पन्न दाखल्यासाठी: १५ दिवस मुदत. तहसीलदार कार्यालयाकडून जारी होतो. आवश्यक: पगार पावती / तलाठी अहवाल, रेशन कार्ड आणि आधार कार्ड.';
      } else if (lower.includes('gumasta') || lower.includes('shop') || lower.includes('दुकान')) {
        botReply =
          language === 'en'
            ? 'For Shop & Establishment (Gumasta): 7 days RTS limit. Required: Shop photo with Marathi Nameboard, Address proof of premises, and Owner Aadhaar/PAN.'
            : 'गुमास्ता (दुकान नोंदणी) साठी: ७ दिवस मुदत. आवश्यक: मराठी नामफलकासह दुकानाचा फोटो, जागेचा मालकी/भाडे करार व मालकाचा आधार/पॅन.';
      } else if (lower.includes('delay') || lower.includes('appeal') || lower.includes('तक्रार') || lower.includes('उशीर')) {
        botReply =
          language === 'en'
            ? 'If your service exceeds the RTS statutory deadline, you can file a 1st Appeal to the Sub-Divisional Magistrate (SDO) or call Toll-Free 1800 120 8040.'
            : 'अर्जाची मुदत संपल्यास आपण उपविभागीय अधिकारी (SDO) यांच्याकडे प्रथम अपील करू शकता किंवा १८०० १२० ८०४० या टोल-फ्री क्रमांकावर संपर्क साधा.';
      } else {
        botReply =
          language === 'en'
            ? 'Under Maharashtra RTS Act 2015, all 500+ notified services have fixed time limits. You can apply directly through the portal, track with Token ID, or dial 1800 120 8040 (24x7).'
            : 'महाराष्ट्र लोकसेवा हक्क अधिनियम २०१५ अंतर्गत सर्व सेवांसाठी कायदेशीर मुदत निश्चित आहे. अधिक माहितीसाठी २४×७ टोल-फ्री १८०० १२० ८०४० वर संपर्क करू शकता.';
      }

      setChatMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
    }, 600);
  };

  const handleGrievanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGrievanceSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative flex flex-col">
        {/* Modal Header */}
        <div className="p-6 md:p-8 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-xs z-10">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-1">
              {language === 'en' ? 'Maharashtra RTS 2015 Support Desk' : 'लोकसेवा हमी २४×७ सहाय्यता केंद्र'}
            </span>
            <h3 className="text-2xl font-bold text-slate-900">
              {language === 'en' ? 'Citizen Call Center & Help Desk' : 'कॉल सेंटर व लोकसेवा तक्रार निवारण'}
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
          {/* Navigation Tabs */}
          <div className="flex flex-wrap bg-slate-100 p-1 rounded-xl gap-1">
            <button
              onClick={() => setActiveTab('helpline')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'helpline'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{language === 'en' ? '24x7 Helplines' : 'हेल्पलाईन क्रमांक'}</span>
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'chat'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Aaple Mitra AI Chat' : 'आपले मित्र AI चॅट'}</span>
            </button>
            <button
              onClick={() => setActiveTab('grievance')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'grievance'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Lodge RTS Grievance' : 'तक्रार नोंदवा'}</span>
            </button>
          </div>

          {/* TAB 1: Helpline & RTS Act Charters */}
          {activeTab === 'helpline' && (
            <div className="space-y-6">
              {/* Primary Helpline Banner */}
              <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-sm relative overflow-hidden border border-slate-800">
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2 border border-indigo-500/30">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{language === 'en' ? '24 Hours × 7 Days Active' : '२४ तास × ७ दिवस अविरत'}</span>
                    </div>
                    <h4 className="text-2xl md:text-3xl font-bold tracking-tight">
                      1800 120 8040
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      {language === 'en'
                        ? 'Toll-free Citizen Call Center for all Maharashtra Right to Public Services Act inquiries.'
                        : 'महाराष्ट्र लोकसेवा हक्क अधिनियमांतर्गत सर्व शासकीय सेवांसाठी टोल-फ्री क्रमांक.'}
                    </p>
                  </div>
                  <a
                    href="tel:18001208040"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl text-xs transition-colors shadow-xs flex items-center gap-2 shrink-0 cursor-pointer"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>{language === 'en' ? 'Call Toll Free Now' : 'कॉल करा'}</span>
                  </a>
                </div>
              </div>

              {/* 3 Pillars of RTS Act */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h5 className="font-bold text-slate-900 text-sm mb-1">
                    {language === 'en' ? 'Time-Bound Guarantee' : 'वेळेत सेवेची हमी'}
                  </h5>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {language === 'en'
                      ? 'Every citizen has legal right to get services within notified 1 to 30 days.'
                      : 'प्रत्येक नागरिकाला विहित मुदतीत दाखला मिळणे हा कायदेशीर अधिकार आहे.'}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
                    <Scale className="w-5 h-5" />
                  </div>
                  <h5 className="font-bold text-slate-900 text-sm mb-1">
                    {language === 'en' ? '3-Tier RTS Appeals' : '३ टप्प्यांत अपील तरतूद'}
                  </h5>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {language === 'en'
                      ? '1st Appeal to SDO, 2nd Appeal to Collector, and 3rd to State RTS Commission.'
                      : 'उशीर झाल्यास उपविभागीय अधिकारी, जिल्हाधिकारी व राज्य आयोगाकडे दाद मागण्याची सोय.'}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                    <Award className="w-5 h-5" />
                  </div>
                  <h5 className="font-bold text-slate-900 text-sm mb-1">
                    {language === 'en' ? 'Officer Accountability' : 'अधिकारी उत्तरदायित्व'}
                  </h5>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {language === 'en'
                      ? 'Strict daily penalties up to ₹5,000 imposed on defaulting officials for unexplained delay.'
                      : 'अवाजवी दिरंगाई केल्यास संबंधित अधिकाऱ्यावर दंड आकारणीची कायदेशीर तरतूद.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Aaple Mitra AI Chat */}
          {activeTab === 'chat' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col h-[400px]">
              {/* Chat Message Stream */}
              <div className="flex-grow overflow-y-auto space-y-3 p-2">
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3.5 rounded-2xl text-xs md:text-sm leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-indigo-600 text-white rounded-tr-xs'
                          : 'bg-slate-100 text-slate-800 border border-slate-200/80 rounded-tl-xs shadow-xs'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="pt-3 border-t border-slate-100 flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder={
                    language === 'en'
                      ? 'Ask about document list, fees, or RTS deadlines...'
                      : 'कागदपत्रे, शुल्क किंवा मुदतीबाबत प्रश्न विचारा...'
                  }
                  className="flex-grow px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs md:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{language === 'en' ? 'Send' : 'पाठवा'}</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: Lodge RTS Grievance */}
          {activeTab === 'grievance' && (
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs">
              {grievanceSubmitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">
                    {language === 'en' ? 'RTS Grievance Registered Successfully!' : 'लोकसेवा तक्रार यशस्वीरित्या नोंदवली गेली!'}
                  </h4>
                  <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                    {language === 'en'
                      ? 'Grievance Docket ID: #MH-GRV-2024-9102. An official enquiry has been marked to the Sub-Divisional Officer. You will receive an SMS update on your mobile.'
                      : 'तक्रार क्रमांक: #MH-GRV-2024-9102. उपविभागीय अधिकारी कार्यालयाकडे तात्काळ चौकशी नोंदवण्यात आली असून मोबाईलवर एसएमएस प्राप्त होईल.'}
                  </p>
                  <button
                    onClick={() => {
                      setGrievanceSubmitted(false);
                      setActiveTab('helpline');
                    }}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                  >
                    {language === 'en' ? 'Done' : 'पूर्ण झाले'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleGrievanceSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {language === 'en' ? 'Citizen Full Name' : 'नागरिकाचे पूर्ण नाव'}
                      </label>
                      <input
                        required
                        type="text"
                        value={grievanceForm.name}
                        onChange={(e) => setGrievanceForm({ ...grievanceForm, name: e.target.value })}
                        placeholder="e.g. Ramesh Patil"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {language === 'en' ? 'Mobile Number for SMS updates' : 'मोबाईल नंबर'}
                      </label>
                      <input
                        required
                        type="tel"
                        value={grievanceForm.mobile}
                        onChange={(e) => setGrievanceForm({ ...grievanceForm, mobile: e.target.value })}
                        placeholder="10-digit mobile number"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {language === 'en' ? 'Application Token ID (If any)' : 'अर्ज टोकन क्रमांक (असल्यास)'}
                      </label>
                      <input
                        type="text"
                        value={grievanceForm.token}
                        onChange={(e) => setGrievanceForm({ ...grievanceForm, token: e.target.value })}
                        placeholder="MH-REV-2024-..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {language === 'en' ? 'Grievance Type' : 'तक्रारीचा प्रकार'}
                      </label>
                      <select
                        value={grievanceForm.category}
                        onChange={(e) => setGrievanceForm({ ...grievanceForm, category: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
                      >
                        <option value="Delay in Service">Delay Beyond RTS Statutory Days</option>
                        <option value="Unjustified Rejection">Unjustified Application Rejection</option>
                        <option value="Staff Misbehavior">Demanding Unofficial Documents / Misbehavior</option>
                        <option value="Technical Issue">Payment / Download Portal Error</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {language === 'en' ? 'Describe the issue in detail' : 'तक्रारीचा सविस्तर तपशील'}
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={grievanceForm.description}
                      onChange={(e) => setGrievanceForm({ ...grievanceForm, description: e.target.value })}
                      placeholder={
                        language === 'en'
                          ? 'Please mention office name, officer met, and exact delay period...'
                          : 'कार्यालयाचे नाव, भेटलेले अधिकारी व विलंबाचा कालावधी नमूद करा...'
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold text-xs transition-colors shadow-xs cursor-pointer"
                  >
                    {language === 'en' ? 'Submit Official RTS Grievance' : 'अधिकृत लोकसेवा तक्रार सादर करा'}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
