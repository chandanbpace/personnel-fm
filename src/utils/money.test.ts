import { formatMoney, paiseToRupeeString, rupeesToPaise } from './money';

describe('rupeesToPaise', () => {
  it.each([
    ['80000', 8_000_000],
    ['1,250.5', 125_050],
    ['0.1', 10],
    ['0.29', 29],
    [' 12.00 ', 1_200],
  ])('converts %p to %p paise without float error', (input, expected) => {
    expect(rupeesToPaise(input)).toBe(expected);
  });

  it.each(['', 'abc', '1.234', '-5', '1.2.3', '.5'])('rejects invalid input %p', (input) => {
    expect(rupeesToPaise(input)).toBeNull();
  });
});

describe('paiseToRupeeString', () => {
  it('round-trips with rupeesToPaise', () => {
    expect(paiseToRupeeString(125_050)).toBe('1250.50');
    expect(paiseToRupeeString(5)).toBe('0.05');
    expect(paiseToRupeeString(-1_000)).toBe('-10.00');
    expect(rupeesToPaise(paiseToRupeeString(987_654))).toBe(987_654);
  });
});

describe('formatMoney', () => {
  it('uses Indian digit grouping for INR', () => {
    expect(formatMoney(12_505_000)).toBe('₹1,25,050.00');
  });
});
