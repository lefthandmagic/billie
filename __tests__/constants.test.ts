import { describe, it, expect } from 'vitest';
import { CPT_CODES, ICD10_CODES, PLACE_OF_SERVICE, CREDENTIALS, US_STATES, TAXONOMY_CODES } from '@/lib/constants';

describe('CPT_CODES', () => {
  it('every code has a code and description', () => {
    CPT_CODES.forEach((c) => {
      expect(c.code).toBeTruthy();
      expect(c.description).toBeTruthy();
    });
  });

  it('contains the most common therapy codes', () => {
    const codes = CPT_CODES.map((c) => c.code);
    expect(codes).toContain('90837'); // 60-min individual therapy
    expect(codes).toContain('90834'); // 45-min individual therapy
    expect(codes).toContain('90791'); // Diagnostic evaluation
    expect(codes).toContain('90847'); // Family therapy with patient
  });

  it('all codes are 5 digits', () => {
    CPT_CODES.forEach((c) => {
      expect(c.code).toMatch(/^\d{5}$/);
    });
  });
});

describe('ICD10_CODES', () => {
  it('every code has a code and description', () => {
    ICD10_CODES.forEach((c) => {
      expect(c.code).toBeTruthy();
      expect(c.description).toBeTruthy();
    });
  });

  it('contains the most common therapy diagnoses', () => {
    const codes = ICD10_CODES.map((c) => c.code);
    expect(codes).toContain('F41.1');  // GAD
    expect(codes).toContain('F32.9');  // MDD unspecified
    expect(codes).toContain('F43.10'); // PTSD
    expect(codes).toContain('F90.0');  // ADHD
  });

  it('all codes match ICD-10 format', () => {
    ICD10_CODES.forEach((c) => {
      expect(c.code).toMatch(/^[A-Z]\d{2}(\.\d{1,2})?$/);
    });
  });

  it('has at least 15 codes for comprehensive coverage', () => {
    expect(ICD10_CODES.length).toBeGreaterThanOrEqual(15);
  });
});

describe('PLACE_OF_SERVICE', () => {
  it('contains office and telehealth options', () => {
    const codes = PLACE_OF_SERVICE.map((p) => p.code);
    expect(codes).toContain('11'); // Office
    expect(codes).toContain('02'); // Telehealth
  });

  it('every entry has a code and description', () => {
    PLACE_OF_SERVICE.forEach((p) => {
      expect(p.code).toBeTruthy();
      expect(p.description).toBeTruthy();
    });
  });
});

describe('CREDENTIALS', () => {
  it('contains the primary therapy credentials', () => {
    expect(CREDENTIALS).toContain('LCSW');
    expect(CREDENTIALS).toContain('LMFT');
    expect(CREDENTIALS).toContain('LPC');
    expect(CREDENTIALS).toContain('PhD');
    expect(CREDENTIALS).toContain('PsyD');
  });
});

describe('US_STATES', () => {
  it('contains all 50 states plus DC', () => {
    expect(US_STATES.length).toBe(51);
  });

  it('contains key states', () => {
    expect(US_STATES).toContain('CA');
    expect(US_STATES).toContain('NY');
    expect(US_STATES).toContain('TX');
    expect(US_STATES).toContain('DC');
  });

  it('all entries are 2-character codes', () => {
    US_STATES.forEach((s) => {
      expect(s).toMatch(/^[A-Z]{2}$/);
    });
  });
});
