import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { QuickActions } from './components/QuickActions';
import { ServicesGrid } from './components/ServicesGrid';
import { TrackApplicationModal } from './components/TrackApplicationModal';
import { VerifyCertificateModal } from './components/VerifyCertificateModal';
import { CallCenterModal } from './components/CallCenterModal';
import { DepartmentDrawerModal } from './components/DepartmentDrawerModal';
import { ServiceApplicationModal } from './components/ServiceApplicationModal';
import { CitizenLoginModal } from './components/CitizenLoginModal';
import { CitizenDashboardModal } from './components/CitizenDashboardModal';
import { IntegrationsBanner } from './components/IntegrationsBanner';
import { Footer } from './components/Footer';

import {
  DEPARTMENTS_DATA,
  DEMO_APPLICATIONS,
  DEMO_CERTIFICATES,
  DEMO_USERS,
  DEMO_NOTIFICATIONS,
} from './data/portalData';
import { Language, Department, ServiceItem, CitizenUser, ApplicationRecord, NotificationItem } from './types';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [currentUser, setCurrentUser] = useState<CitizenUser | null>(null); // Starts logged out with "Citizen Login" prompt
  const [applications, setApplications] = useState<ApplicationRecord[]>(DEMO_APPLICATIONS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(DEMO_NOTIFICATIONS);

  // Modal Visibility States
  const [trackModalOpen, setTrackModalOpen] = useState(false);
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);
  const [verifyBarcodeInitial, setVerifyBarcodeInitial] = useState<string>('MH202488419DOM');
  const [callCenterModalOpen, setCallCenterModalOpen] = useState(false);
  
  const [allDepartmentsOpen, setAllDepartmentsOpen] = useState(false);
  const [selectedDeptForDrawer, setSelectedDeptForDrawer] = useState<Department | null>(null);

  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedServiceForApply, setSelectedServiceForApply] = useState<ServiceItem | null>(null);

  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [dashboardModalOpen, setDashboardModalOpen] = useState(false);

  // Gather all services flattened for global search
  const allServices: ServiceItem[] = DEPARTMENTS_DATA.flatMap((d) => d.services);

  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'mr' : 'en'));
  };

  const handleSelectService = (service: ServiceItem) => {
    setSelectedServiceForApply(service);
    setApplyModalOpen(true);
  };

  const handleSelectDepartment = (dept: Department) => {
    setSelectedDeptForDrawer(dept);
    setAllDepartmentsOpen(true);
  };

  const handleOpenVerifyWithBarcode = (barcode: string) => {
    setVerifyBarcodeInitial(barcode);
    setTrackModalOpen(false);
    setVerifyModalOpen(true);
  };

  const handleOpenTrackWithId = (trackingId: string) => {
    setTrackModalOpen(true);
  };

  const handleApplicationCreated = (newApp: ApplicationRecord) => {
    setApplications((prev) => [newApp, ...prev]);
    // Also push a real-time notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `Application Filed: ${newApp.serviceName}`,
      titleMr: `अर्ज दाखल झाला: ${newApp.serviceNameMr}`,
      message: `Token #${newApp.trackingId} generated. Forwarded for field scrutiny under RTS Act.`,
      messageMr: `टोकन #${newApp.trackingId} जारी झाला. लोकसेवा हमी कायद्यानुसार पडताळणी सुरू.`,
      timestamp: 'Just now',
      read: false,
      type: 'status',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const handleMarkNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleNavigateSection = (sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'departments') {
      const el = document.getElementById('departments-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'about') {
      setCallCenterModalOpen(true);
    }
  };

  return (
    <div className="bg-[#F8FAFC] text-[#0F172A] font-sans antialiased min-h-screen flex flex-col selection:bg-indigo-500/20 selection:text-indigo-900">
      {/* Top Navigation Bar */}
      <Navbar
        language={language}
        onToggleLanguage={handleToggleLanguage}
        currentUser={currentUser}
        onOpenLogin={() => setLoginModalOpen(true)}
        onOpenDashboard={() => setDashboardModalOpen(true)}
        onLogout={() => setCurrentUser(null)}
        onNavigateSection={handleNavigateSection}
        onOpenTrack={() => setTrackModalOpen(true)}
        onOpenAllDepartments={() => {
          setSelectedDeptForDrawer(null);
          setAllDepartmentsOpen(true);
        }}
        notifications={notifications}
        onMarkNotificationRead={handleMarkNotificationRead}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* Hero Section with Live Search & Background */}
        <HeroSection
          language={language}
          onSelectService={handleSelectService}
          allServices={allServices}
        />

        {/* 3 Prominent Quick Action Cards */}
        <QuickActions
          language={language}
          onOpenTrack={() => setTrackModalOpen(true)}
          onOpenVerify={() => {
            setVerifyBarcodeInitial('MH202488419DOM');
            setVerifyModalOpen(true);
          }}
          onOpenCallCenter={() => setCallCenterModalOpen(true)}
        />

        {/* Services Bento Grid */}
        <ServicesGrid
          language={language}
          departments={DEPARTMENTS_DATA}
          onSelectDepartment={handleSelectDepartment}
          onSelectService={handleSelectService}
          onOpenAllDepartments={() => {
            setSelectedDeptForDrawer(null);
            setAllDepartmentsOpen(true);
          }}
        />

        {/* Official Integrations Trust Banner */}
        <IntegrationsBanner language={language} />
      </main>

      {/* Footer */}
      <Footer
        language={language}
        onOpenCallCenter={() => setCallCenterModalOpen(true)}
      />

      {/* MODALS */}
      {/* 1. Track Application Modal */}
      <TrackApplicationModal
        isOpen={trackModalOpen}
        onClose={() => setTrackModalOpen(false)}
        language={language}
        applications={applications}
        onOpenVerifyWithBarcode={handleOpenVerifyWithBarcode}
      />

      {/* 2. Verify Authenticated Certificate Modal */}
      <VerifyCertificateModal
        isOpen={verifyModalOpen}
        onClose={() => setVerifyModalOpen(false)}
        language={language}
        certificates={DEMO_CERTIFICATES}
        initialBarcode={verifyBarcodeInitial}
      />

      {/* 3. 24x7 Call Center & RTS Desk Modal */}
      <CallCenterModal
        isOpen={callCenterModalOpen}
        onClose={() => setCallCenterModalOpen(false)}
        language={language}
      />

      {/* 4. Complete 42 Departments Explorer Modal */}
      <DepartmentDrawerModal
        isOpen={allDepartmentsOpen}
        onClose={() => setAllDepartmentsOpen(false)}
        language={language}
        departments={DEPARTMENTS_DATA}
        selectedDepartment={selectedDeptForDrawer}
        onSelectService={handleSelectService}
      />

      {/* 5. Service Application Multi-Step Modal */}
      <ServiceApplicationModal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        language={language}
        service={selectedServiceForApply}
        currentUser={currentUser}
        onApplicationCreated={handleApplicationCreated}
        onTrackNewApplication={(token) => {
          setTrackModalOpen(true);
        }}
      />

      {/* 6. Citizen Login / Switcher Modal */}
      <CitizenLoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        language={language}
        onLogin={(user) => setCurrentUser(user)}
        demoUsers={DEMO_USERS}
      />

      {/* 7. Citizen Dashboard & Vault Modal */}
      {currentUser && (
        <CitizenDashboardModal
          isOpen={dashboardModalOpen}
          onClose={() => setDashboardModalOpen(false)}
          language={language}
          user={currentUser}
          applications={applications}
          onOpenTrackWithId={handleOpenTrackWithId}
          onOpenNewService={() => {
            setSelectedDeptForDrawer(null);
            setAllDepartmentsOpen(true);
          }}
        />
      )}
    </div>
  );
}
