export interface Fraction {
  numerator: number;
  denominator: number;
}

export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
}

export function simplify(f: Fraction): Fraction {
  const d = gcd(f.numerator, f.denominator);
  return { numerator: f.numerator / d, denominator: f.denominator / d };
}

export function areEquivalent(f1: Fraction, f2: Fraction): boolean {
  return f1.numerator * f2.denominator === f2.numerator * f1.denominator;
}

export function toDecimal(f: Fraction): number {
  return f.numerator / f.denominator;
}

export function fractionToWidth(f: Fraction, baseWidth: number): number {
  return (f.numerator / f.denominator) * baseWidth;
}

export function fractionLabel(f: Fraction): string {
  if (f.numerator === f.denominator) return '1';
  return `${f.numerator}/${f.denominator}`;
}