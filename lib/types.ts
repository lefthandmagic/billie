export interface ProviderProfile {
  fullName: string;
  credentials: string;
  npi: string;
  taxId: string;
  licenseNumber: string;
  licenseState: string;
  taxonomyCode: string;
  practiceName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
}

export interface Patient {
  id: string;
  fullName: string;
  dateOfBirth: string;
  insurancePayer: string;
  memberId: string;
  groupNumber: string;
  subscriberName: string;
  subscriberDob: string;
}

export interface Session {
  id: string;
  dateOfService: string;
  placeOfService: '11' | '02';
  cptCode: string;
  diagnosisCode: string;
  fee: string;
  units: string;
}

export interface SuperbillDraft {
  patientId: string;
  statementDate: string;
  sessions: Session[];
}
