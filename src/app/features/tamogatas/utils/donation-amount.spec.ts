import { describe, expect, it } from 'vitest';
import { caretAfterDigits, formatDonationAmount, parseDonationAmount } from './donation-amount';

describe('donation amount editing', () => {
  it('accepts spaces and non-breaking spaces while keeping an integer value', () => {
    expect(parseDonationAmount('1 234\u00a0567')).toEqual({ valid: true, value: 1234567 });
    expect(formatDonationAmount(1234567)).toBe('1 234 567');
  });

  it('keeps empty input distinct from zero', () => {
    expect(parseDonationAmount('')).toEqual({ valid: true, value: null });
    expect(parseDonationAmount('0')).toEqual({ valid: true, value: 0 });
    expect(formatDonationAmount(null)).toBe('');
  });

  it.each(['12.5', '-500', '1e3', 'hello', '9007199254740992'])(
    'rejects %s instead of silently changing its value',
    (raw) => {
      expect(parseDonationAmount(raw).valid).toBe(false);
    },
  );

  it('restores the cursor by digit position after inserting separators', () => {
    expect(caretAfterDigits('1 934 567', 2)).toBe(3);
    expect(caretAfterDigits('1 934 567', 0)).toBe(0);
    expect(caretAfterDigits('1 934 567', 20)).toBe(9);
  });
});
