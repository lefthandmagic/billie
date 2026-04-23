import { describe, it, expect } from 'vitest';
import { Session } from '@/lib/types';

function calculateTotal(sessions: Pick<Session, 'fee' | 'units'>[]): number {
  return sessions.reduce(
    (sum, s) => sum + (parseFloat(s.fee) || 0) * (parseFloat(s.units) || 1),
    0,
  );
}

describe('Superbill total calculation', () => {
  it('calculates total for a single session', () => {
    expect(calculateTotal([{ fee: '150', units: '1' }])).toBe(150);
  });

  it('calculates total for multiple sessions', () => {
    expect(calculateTotal([
      { fee: '150', units: '1' },
      { fee: '200', units: '1' },
      { fee: '175', units: '1' },
    ])).toBe(525);
  });

  it('multiplies fee by units correctly', () => {
    expect(calculateTotal([{ fee: '100', units: '2' }])).toBe(200);
  });

  it('handles empty sessions array', () => {
    expect(calculateTotal([])).toBe(0);
  });

  it('handles empty fee gracefully', () => {
    expect(calculateTotal([{ fee: '', units: '1' }])).toBe(0);
  });

  it('handles decimal fees correctly', () => {
    expect(calculateTotal([{ fee: '175.50', units: '2' }])).toBeCloseTo(351);
  });

  it('calculates total for a real monthly superbill', () => {
    const monthlySessions = Array.from({ length: 4 }, () => ({ fee: '175', units: '1' }));
    expect(calculateTotal(monthlySessions)).toBe(700);
  });
});
