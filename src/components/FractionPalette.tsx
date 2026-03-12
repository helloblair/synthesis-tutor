import { PALETTE_FRACTIONS, FRACTION_COLORS, useManipulative } from '../context/ManipulativeContext';
import { fractionLabel } from '../utils/fractionMath';
import type { Fraction } from '../utils/fractionMath';

export function FractionPalette({ baseWidth }: { baseWidth: number }) {
  const { addBlock } = useManipulative();

  const handleTap = (fraction: Fraction) => {
    const x = 20 + Math.random() * 60;
    const y = 20 + Math.random() * 100;
    addBlock(fraction, { x, y });
  };

  return (
    <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-200">
      <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Fraction Box — Tap to add</p>
      <div className="flex flex-wrap gap-2">
        {PALETTE_FRACTIONS.map((f) => {
          const width = (f.numerator / f.denominator) * baseWidth;
          const color = FRACTION_COLORS[f.denominator] || '#6B7280';
          return (
            <button
              key={`${f.numerator}-${f.denominator}`}
              onClick={() => handleTap(f)}
              className="h-12 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md active:scale-95 transition-transform touch-manipulation"
              style={{ width: `${Math.max(width, 40)}px`, backgroundColor: color }}
            >
              {fractionLabel(f)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
