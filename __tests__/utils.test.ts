import { describe, it, expect } from 'vitest';
import { formatCurrency, formatDate, generateId } from '@/lib/utils';

describe('formatCurrency', () => {
  it('formats positive amounts correctly', () => {
    expect(formatCurrency(150)).toBe('$150.00');
    expect(formatCurrency(1234.5)).toBe('$1,234.50');
    expect(formatCurrency(0)).toBe('$0.00');
  });

  it('formats decimal amounts correctly', () => {
    expect(formatCurrency(99.99)).toBe('$99.99');
    expect(formatCurrency(200.1)).toBe('$200.10');
  });
});

describe('formatDate', () => {
  it('formats ISO date strings to readable format', () => {
    expect(formatDate('2026-04-23')).toBe('April 23, 2026');
    expect(formatDate('2026-01-01')).toBe('January 1, 2026');
    expect(formatDate('2026-12-31')).toBe('December 31, 2026');
  });

  it('returns empty string for empty input', () => {
    expect(formatDate('')).toBe('');
  });

  it('handles all 12 months correctly', () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
    months.forEach((month, i) => {
      const mm = String(i + 1).padStart(2, '0');
      expect(formatDate(`2026-${mm}-15`)).toBe(`${month} 15, 2026`);
    });
  });
});

describe('generateId', () => {
  it('generates a non-empty string', () => {
    expect(generateId()).toBeTruthy();
    expect(typeof generateId()).toBe('string');
  });

  it('generates unique ids', () => {
    const ids = new Set(Array.from({ length: 100 }, () => generateId()));
    expect(ids.size).toBe(100);
  });
});
