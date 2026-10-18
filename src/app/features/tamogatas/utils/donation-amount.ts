export type ParsedDonationAmount =
  { valid: true; value: number | null } | { valid: false; error: string };

export function parseDonationAmount(raw: string): ParsedDonationAmount {
  const digits = raw.replace(/\s/g, '');
  const value = digits === '' ? null : Number(digits);
  if (!/^[\d\s]*$/.test(raw) || (value !== null && !Number.isSafeInteger(value))) {
    return {
      valid: false,
      error: 'Kérjük, egész forintösszeget adj meg, csak számjegyekkel.',
    };
  }
  return { valid: true, value };
}

export function formatDonationAmount(value: number | null): string {
  return value === null ? '' : value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export function caretAfterDigits(formatted: string, digitCount: number): number {
  let position = 0;
  let seen = 0;
  while (position < formatted.length && seen < digitCount) {
    if (/\d/.test(formatted[position])) seen++;
    position++;
  }
  return position;
}
