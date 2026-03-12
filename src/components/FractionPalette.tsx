import { PALETTE_FRACTIONS, FRACTION_COLORS } from '../context/ManipulativeContext';
import { fractionLabel } from '../utils/fractionMath';
import type { Fraction } from '../utils/fractionMath';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

function DraggablePaletteBlock({ fraction }: { fraction: Fraction }) {
  const height = Math.max((fraction.numerator / fraction.denominator) * 400, 36);
  const color = FRACTION_COLORS[fraction.denominator] || '#6B7280';
  const id = `palette-${fraction.numerator}-${fraction.denominator}`;

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    data: { fraction, source: 'palette' },
  });

  const style = {
    height: `${height}px`,
    backgroundColor: color,
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="w-16 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md touch-manipulation select-none"
      style={style}
    >
      {fractionLabel(fraction)}
    </div>
  );
}

export function FractionPalette() {
  return (
    <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-200 overflow-y-auto shrink-0 flex flex-col gap-2 items-center">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide text-center">Fraction Box</p>
      {PALETTE_FRACTIONS.map((f) => (
        <DraggablePaletteBlock
          key={`${f.numerator}-${f.denominator}`}
          fraction={f}
        />
      ))}
    </div>
  );
}