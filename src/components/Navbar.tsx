import React, { useState } from 'react';
import { Globe, Bell, User, LogOut, CheckCircle2, ChevronRight, Menu, X, Landmark, FileText } from 'lucide-react';
import { Language, CitizenUser, NotificationItem } from '../types';

interface NavbarProps {
  language: Language;
  onToggleLanguage: () => void;
  currentUser: CitizenUser | null;
  onOpenLogin: () => void;
  onOpenDashboard: () => void;
  onLogout: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenTrack: () => void;
  onOpenAllDepartments: () => void;
  notifications: NotificationItem[];
  onMarkNotificationRead: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onToggleLanguage,
  currentUser,
  onOpenLogin,
  onOpenDashboard,
  onLogout,
  onNavigateSection,
  onOpenTrack,
  onOpenAllDepartments,
  notifications,
  onMarkNotificationRead,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <nav className="bg-white/95 backdrop-blur-md w-full top-0 sticky z-50 border-b border-slate-200/80 transition-colors shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]">
      <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateSection('hero')}
            className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <Landmark className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-2xl text-slate-900 tracking-tight block leading-tight">
                {language === 'en' ? 'Aaple Sarkar' : 'आपले सरकार'}
              </span>
              <span className="text-[11px] text-slate-500 font-semibold tracking-wider uppercase block">
                {language === 'en' ? 'Govt. of Maharashtra' : 'महाराष्ट्र शासन'}
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => onNavigateSection('departments')}
            className="text-[15px] text-indigo-600 font-bold border-b-2 border-indigo-600 py-1 transition-all cursor-pointer"
          >
            {language === 'en' ? 'Departments' : 'विभाग'}
          </button>
          <button
            onClick={onOpenTrack}
            className="text-[15px] text-slate-600 hover:text-slate-900 transition-colors py-1 font-medium cursor-pointer"
          >
            {language === 'en' ? 'Track' : 'अर्ज ट्रॅक करा'}
          </button>
          <button
            onClick={onOpenAllDepartments}
            className="text-[15px] text-slate-600 hover:text-slate-900 transition-colors py-1 font-medium cursor-pointer"
          >
            {language === 'en' ? 'Services' : 'सेवा सूची'}
          </button>
          <button
            onClick={() => onNavigateSection('about')}
            className="text-[15px] text-slate-600 hover:text-slate-900 transition-colors py-1 font-medium cursor-pointer"
          >
            {language === 'en' ? 'About RTS' : 'हक्क कायदा'}
          </button>
        </div>

        {/* Right Controls: Language, Notifications, Citizen Login */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <button
            onClick={onToggleLanguage}
            title={language === 'en' ? 'मराठी मध्ये बदला' : 'Switch to English'}
            className="text-slate-600 hover:text-slate-900 transition-colors flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl hover:bg-slate-100 text-sm font-semibold border border-slate-200/80 cursor-pointer"
          >
            <Globe className="w-4 h-4 text-indigo-600" />
            <span>{language === 'en' ? 'मराठी' : 'English'}</span>
          </button>

          {/* Notifications Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="text-slate-600 hover:text-slate-900 transition-colors flex items-center justify-center p-2.5 rounded-xl hover:bg-slate-100 border border-slate-200/80 relative cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white" />
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl p-4 shadow-xl border border-slate-200 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-indigo-600" />
                    <span className="font-semibold text-sm text-slate-900">
                      {language === 'en' ? 'Citizen Alerts & Updates' : 'नागरिक सूचना व अपडेट्स'}
                    </span>
                  </div>
                  {unreadCount > 0 && (
                    <span className="text-[11px] bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded-full border border-indigo-100">
                      {unreadCount} {language === 'en' ? 'new' : 'नवीन'}
                    </span>
                  )}
                </div>

                <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                  {notifications.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => onMarkNotificationRead(item.id)}
                      className={`p-3 rounded-xl cursor-pointer text-left transition-all border ${
                        item.read
                          ? 'bg-slate-50 border-transparent opacity-75'
                          : 'bg-white border-indigo-100 shadow-xs hover:border-indigo-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h5 className="font-semibold text-xs text-slate-900 leading-snug">
                          {language === 'en' ? item.title : item.titleMr}
                        </h5>
                        {!item.read && <span className="w-2 h-2 rounded-full bg-indigo-600 mt-1 shrink-0" />}
                      </div>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                        {language === 'en' ? item.message : item.messageMr}
                      </p>
                      <span className="text-[10px] text-slate-400 mt-1.5 block">{item.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Citizen Login or User Menu */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl hover:bg-slate-800 transition-all text-sm font-medium shadow-xs cursor-pointer"
              >
                <div className="w-6 h-6 rounded-lg bg-indigo-500 text-white flex items-center justify-center font-bold text-xs">
                  {currentUser.name.charAt(0)}
                </div>
                <span className="hidden sm:inline font-semibold">{currentUser.name.split(' ')[0]}</span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl p-4 shadow-xl border border-slate-200 z-50">
                  <div className="pb-3 border-b border-slate-100 mb-3">
                    <p className="font-bold text-sm text-slate-900">{currentUser.name}</p>
                    <p className="text-xs text-indigo-600 font-medium">{currentUser.role}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Aadhaar: •••• •••• {currentUser.aadhaarLast4} ({currentUser.district})
                    </p>
                  </div>
                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        onOpenDashboard();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 flex items-center justify-between cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-indigo-600" />
                        {language === 'en' ? 'My Applications & Vault' : 'माझे अर्ज व दाखले'}
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        onLogout();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      {language === 'en' ? 'Log Out' : 'लॉग आउट'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="bg-indigo-600 text-white font-medium text-sm px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <User className="w-4 h-4 text-indigo-100" />
              <span>{language === 'en' ? 'Citizen Login' : 'नागरिक लॉगिन'}</span>
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-600 p-2 hover:bg-slate-100 rounded-xl"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-3">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigateSection('departments');
            }}
            className="w-full text-left py-2 text-base font-semibold text-slate-900"
          >
            {language === 'en' ? 'Departments' : 'विभाग'}
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenTrack();
            }}
            className="w-full text-left py-2 text-base font-semibold text-slate-600"
          >
            {language === 'en' ? 'Track Application' : 'अर्ज ट्रॅक करा'}
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAllDepartments();
            }}
            className="w-full text-left py-2 text-base font-semibold text-slate-600"
          >
            {language === 'en' ? 'Explore 42 Departments' : 'सर्व ४२ विभाग सूची'}
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigateSection('about');
            }}
            className="w-full text-left py-2 text-base font-semibold text-slate-600"
          >
            {language === 'en' ? 'About RTS Act 2015' : 'लोकसेवा हमी कायदा २०१५'}
          </button>
        </div>
      )}
    </nav>
  );
};
