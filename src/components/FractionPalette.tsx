import { PALETTE_FRACTIONS, FRACTION_COLORS, useManipulative } from '../context/ManipulativeContext';
import { fractionLabel } from '../utils/fractionMath';
import type { Fraction } from '../utils/fractionMath';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

const PALETTE_BASE = 200;

function DraggablePaletteBlock({ fraction, baseWidth }: { fraction: Fraction; baseWidth: number }) {
  const width = Math.max((fraction.numerator / fraction.denominator) * baseWidth, 44);
  const color = FRACTION_COLORS[fraction.denominator] || '#6B7280';
  const id = `palette-${fraction.numerator}-${fraction.denominator}`;

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    data: { fraction, source: 'palette' },
  });

  const style = {
    width: `${width}px`,
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
      className="h-12 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md touch-manipulation select-none"
      style={style}
    >
      {fractionLabel(fraction)}
    </div>
  );
}

export function FractionPalette({ baseWidth }: { baseWidth: number }) {
  return (
    <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-200">
      <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Fraction Box — Drag blocks down</p>
      <div className="flex flex-wrap gap-2">
        {PALETTE_FRACTIONS.map((f) => (
          <DraggablePaletteBlock
            key={`${f.numerator}-${f.denominator}`}
            fraction={f}
            baseWidth={PALETTE_BASE}
          />
        ))}
      </div>
    </div>
  );
}