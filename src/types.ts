export type Language = 'en' | 'mr';

export interface ServiceItem {
  id: string;
  name: string;
  nameMr: string;
  departmentId: string;
  departmentName: string;
  departmentNameMr: string;
  rtsDays: number;
  fee: number;
  iconName: string;
  description: string;
  descriptionMr: string;
  requiredDocuments: string[];
  requiredDocumentsMr: string[];
  eligibility: string;
  eligibilityMr: string;
  popular?: boolean;
}

export interface Department {
  id: string;
  name: string;
  nameMr: string;
  iconName: string;
  serviceCount: number;
  description: string;
  descriptionMr: string;
  services: ServiceItem[];
  category: 'Administration' | 'Welfare' | 'Transport' | 'Commerce' | 'Civic' | 'Education' | 'Agriculture';
}

export interface ApplicationRecord {
  id: string;
  trackingId: string;
  serviceId: string;
  serviceName: string;
  serviceNameMr: string;
  departmentName: string;
  applicantName: string;
  district: string;
  taluka: string;
  appliedDate: string;
  expectedDate: string;
  status: 'Submitted' | 'Under Scrutiny' | 'Field Verification' | 'Approved' | 'Rejected';
  statusMr: string;
  currentAuthority: string;
  remarks: string;
  certificateBarcode?: string;
  certificateUrl?: string;
  timeline: {
    step: string;
    stepMr: string;
    completed: boolean;
    date?: string;
    actor?: string;
  }[];
}

export interface CertificateVerification {
  barcode: string;
  certificateNo: string;
  serviceName: string;
  serviceNameMr: string;
  beneficiaryName: string;
  issueDate: string;
  issuingAuthority: string;
  district: string;
  validUntil: string;
  status: 'Valid' | 'Revoked' | 'Expired';
  qrHash: string;
}

export interface CitizenUser {
  name: string;
  nameMr: string;
  mobile: string;
  aadhaarLast4: string;
  email: string;
  district: string;
  role: string;
  avatar?: string;
  digiLockerLinked: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  titleMr: string;
  message: string;
  messageMr: string;
  timestamp: string;
  read: boolean;
  type: 'status' | 'alert' | 'service';
}
