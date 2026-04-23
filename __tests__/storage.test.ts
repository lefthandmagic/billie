import { describe, it, expect, beforeEach } from 'vitest';

import {
  getProvider, saveProvider,
  getPatients, savePatients, addPatient, updatePatient, deletePatient,
  getDraft, saveDraft, clearDraft,
} from '@/lib/storage';
import { Patient, ProviderProfile, SuperbillDraft } from '@/lib/types';

const mockProvider: ProviderProfile = {
  fullName: 'Jane Smith', credentials: 'LCSW', npi: '1234567890',
  taxId: '12-3456789', licenseNumber: 'LIC123', licenseState: 'CA',
  taxonomyCode: '101YM0800X', practiceName: 'Smith Therapy',
  address: '123 Main St', city: 'San Francisco', state: 'CA',
  zip: '94102', phone: '415-555-0100', email: 'jane@example.com',
};

const mockPatient: Patient = {
  id: 'patient-1', fullName: 'John Doe', dateOfBirth: '1985-06-15',
  insurancePayer: 'Blue Cross', memberId: 'BC123456',
  groupNumber: 'GRP001', subscriberName: '', subscriberDob: '',
};

const mockDraft: SuperbillDraft = {
  patientId: 'patient-1',
  statementDate: '2026-04-23',
  sessions: [{
    id: 'session-1', dateOfService: '2026-04-23',
    placeOfService: '11', cptCode: '90837',
    diagnosisCode: 'F41.1', fee: '150', units: '1',
  }],
};

beforeEach(() => {
  localStorage.clear();
});

describe('Provider storage', () => {
  it('returns null when no provider is saved', () => {
    expect(getProvider()).toBeNull();
  });

  it('saves and retrieves a provider profile', () => {
    saveProvider(mockProvider);
    expect(getProvider()).toEqual(mockProvider);
  });

  it('overwrites existing provider on save', () => {
    saveProvider(mockProvider);
    const updated = { ...mockProvider, fullName: 'Jane Updated' };
    saveProvider(updated);
    expect(getProvider()?.fullName).toBe('Jane Updated');
  });
});

describe('Patient storage', () => {
  it('returns empty array when no patients saved', () => {
    expect(getPatients()).toEqual([]);
  });

  it('adds a patient and retrieves it', () => {
    addPatient(mockPatient);
    const patients = getPatients();
    expect(patients).toHaveLength(1);
    expect(patients[0]).toEqual(mockPatient);
  });

  it('adds multiple patients', () => {
    const patient2 = { ...mockPatient, id: 'patient-2', fullName: 'Jane Doe' };
    addPatient(mockPatient);
    addPatient(patient2);
    expect(getPatients()).toHaveLength(2);
  });

  it('updates an existing patient', () => {
    addPatient(mockPatient);
    const updated = { ...mockPatient, fullName: 'John Updated' };
    updatePatient(updated);
    expect(getPatients()[0].fullName).toBe('John Updated');
  });

  it('deletes a patient by id', () => {
    addPatient(mockPatient);
    deletePatient('patient-1');
    expect(getPatients()).toHaveLength(0);
  });

  it('deletes only the correct patient when multiple exist', () => {
    const patient2 = { ...mockPatient, id: 'patient-2', fullName: 'Jane Doe' };
    addPatient(mockPatient);
    addPatient(patient2);
    deletePatient('patient-1');
    const remaining = getPatients();
    expect(remaining).toHaveLength(1);
    expect(remaining[0].id).toBe('patient-2');
  });
});

describe('Draft storage', () => {
  it('returns null when no draft saved', () => {
    expect(getDraft()).toBeNull();
  });

  it('saves and retrieves a draft', () => {
    saveDraft(mockDraft);
    expect(getDraft()).toEqual(mockDraft);
  });

  it('clears the draft', () => {
    saveDraft(mockDraft);
    clearDraft();
    expect(getDraft()).toBeNull();
  });

  it('overwrites existing draft', () => {
    saveDraft(mockDraft);
    const updated = { ...mockDraft, statementDate: '2026-05-01' };
    saveDraft(updated);
    expect(getDraft()?.statementDate).toBe('2026-05-01');
  });
});
