import { Patient, ProviderProfile, SuperbillDraft } from './types';

const KEYS = {
  PROVIDER: 'billie_provider',
  PATIENTS: 'billie_patients',
  DRAFT: 'billie_draft',
};

export function getProvider(): ProviderProfile | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(KEYS.PROVIDER);
  return raw ? JSON.parse(raw) : null;
}

export function saveProvider(profile: ProviderProfile): void {
  localStorage.setItem(KEYS.PROVIDER, JSON.stringify(profile));
}

export function getPatients(): Patient[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(KEYS.PATIENTS);
  return raw ? JSON.parse(raw) : [];
}

export function savePatients(patients: Patient[]): void {
  localStorage.setItem(KEYS.PATIENTS, JSON.stringify(patients));
}

export function addPatient(patient: Patient): void {
  const patients = getPatients();
  savePatients([...patients, patient]);
}

export function updatePatient(updated: Patient): void {
  const patients = getPatients();
  savePatients(patients.map((p) => (p.id === updated.id ? updated : p)));
}

export function deletePatient(id: string): void {
  const patients = getPatients();
  savePatients(patients.filter((p) => p.id !== id));
}

export function getDraft(): SuperbillDraft | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(KEYS.DRAFT);
  return raw ? JSON.parse(raw) : null;
}

export function saveDraft(draft: SuperbillDraft): void {
  localStorage.setItem(KEYS.DRAFT, JSON.stringify(draft));
}

export function clearDraft(): void {
  localStorage.removeItem(KEYS.DRAFT);
}
