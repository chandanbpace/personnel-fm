/**
 * Central money helpers. Amounts are integer paise (₹1 = 100 paise) everywhere;
 * conversion from user input is done on strings so no binary floating-point is involved.
 */

const AMOUNT_PATTERN = /^\d+(\.\d{1,2})?$/;

/** Parses a user-entered rupee amount ("1,250.5") into integer paise. Returns null for invalid input. */
export function rupeesToPaise(input: string): number | null {
  const normalised = input.replace(/,/g, '').trim();
  if (!AMOUNT_PATTERN.test(normalised)) return null;

  const [whole = '0', fraction = ''] = normalised.split('.');
  const paise = Number(whole) * 100 + Number(fraction.padEnd(2, '0'));
  return Number.isSafeInteger(paise) ? paise : null;
}

/** Formats paise for editing in an input, e.g. 125050 -> "1250.50". */
export function paiseToRupeeString(paise: number): string {
  const sign = paise < 0 ? '-' : '';
  const abs = Math.abs(paise);
  return `${sign}${Math.trunc(abs / 100)}.${String(abs % 100).padStart(2, '0')}`;
}

const formatters = new Map<string, Intl.NumberFormat>();

/** Formats paise for display, e.g. 12505000 -> "₹1,25,050.00" (en-IN grouping for INR). */
export function formatMoney(paise: number, currency = 'INR'): string {
  const locale = currency === 'INR' ? 'en-IN' : undefined;
  const key = `${locale}:${currency}`;
  let formatter = formatters.get(key);
  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, { style: 'currency', currency, minimumFractionDigits: 2 });
    formatters.set(key, formatter);
  }
  // Display only: dividing an integer by 100 is exact enough for rendering two decimals.
  return formatter.format(paise / 100);
}
