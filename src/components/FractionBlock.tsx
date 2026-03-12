import { fractionLabel, type Fraction } from '../utils/fractionMath';
import { FRACTION_COLORS } from '../context/ManipulativeContext';

interface Props {
  fraction: Fraction;
  baseWidth: number;
  id?: string;
}

export function FractionBlockDisplay({ fraction, baseWidth, id }: Props) {
  const width = (fraction.numerator / fraction.denominator) * baseWidth;
  const color = FRACTION_COLORS[fraction.denominator] || '#6B7280';

  return (
    <div
      id={id}
      className="h-14 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md select-none touch-manipulation"
      style={{ width: `${width}px`, backgroundColor: color, minWidth: '40px' }}
    >
      {fractionLabel(fraction)}
    </div>
  );
}