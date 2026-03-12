import { useState, useRef } from 'react';
import { useManipulative } from '../context/ManipulativeContext';
import { useDroppable } from '@dnd-kit/core';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { fractionLabel, simplify } from '../utils/fractionMath';
import type { FractionBlock } from '../context/ManipulativeContext';

function DraggableWorkspaceBlock({
  block,
  baseWidth,
  isSelected,
  onTap,
  onDoubleTap,
}: {
  block: FractionBlock;
  baseWidth: number;
  isSelected: boolean;
  onTap: () => void;
  onDoubleTap: () => void;
}) {
  const width = (block.fraction.numerator / block.fraction.denominator) * baseWidth;
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: block.id,
    data: { fraction: block.fraction, source: 'workspace', blockId: block.id },
  });
  const lastTapRef = useRef(0);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      onDoubleTap();
    } else {
      onTap();
    }
    lastTapRef.current = now;
  };

  const style = {
    width: `${Math.max(width, 40)}px`,
    backgroundColor: block.color,
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.7 : 1,
    zIndex: isDragging ? 50 : 1,
    outline: isSelected ? '3px solid #3B82F6' : 'none',
    outlineOffset: '2px',
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={handleClick}
      className="h-14 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md touch-manipulation select-none cursor-grab active:cursor-grabbing"
      style={style}
    >
      {fractionLabel(block.fraction)}
    </div>
  );
}

export function Workspace({ baseWidth }: { baseWidth: number }) {
  const { state, removeBlock, clearWorkspace, addBlock, splitBlock } = useManipulative();
  const { setNodeRef, isOver } = useDroppable({ id: 'workspace' });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showSplitMenu, setShowSplitMenu] = useState<string | null>(null);

  const handleTap = (blockId: string) => {
    setShowSplitMenu(null);

    if (!selectedId) {
      setSelectedId(blockId);
      return;
    }

    if (selectedId === blockId) {
      setSelectedId(null);
      return;
    }

    const blockA = state.workspaceBlocks.find((b) => b.id === selectedId);
    const blockB = state.workspaceBlocks.find((b) => b.id === blockId);

    if (blockA && blockB && blockA.fraction.denominator === blockB.fraction.denominator) {
      const newNumerator = blockA.fraction.numerator + blockB.fraction.numerator;
      const newDenominator = blockA.fraction.denominator;
      const combined = simplify({ numerator: newNumerator, denominator: newDenominator });

      removeBlock(blockA.id);
      removeBlock(blockB.id);
      addBlock(combined, { x: 0, y: 0 });
    }

    setSelectedId(null);
  };

  const handleDoubleTap = (blockId: string) => {
    setSelectedId(null);
    setShowSplitMenu(blockId);
  };

  const handleSplit = (blockId: string, parts: number) => {
    splitBlock(blockId, parts);
    setShowSplitMenu(null);
  };

  return (
    <div
      ref={setNodeRef}
      onClick={() => { setSelectedId(null); setShowSplitMenu(null); }}
      className={`flex-1 rounded-xl border-2 border-dashed relative overflow-hidden min-h-[300px] transition-colors ${
        isOver ? 'bg-blue-50 border-blue-300' : 'bg-gray-100 border-gray-300'
      }`}
    >
      {state.workspaceBlocks.length === 0 && (
        <p className="absolute inset-0 flex items-center justify-center text-gray-400 text-lg">
          Drag blocks here!
        </p>
      )}
      {selectedId && (
        <p className="absolute top-2 left-3 text-xs text-blue-500 font-semibold">
          Tap another same-denominator block to combine · Double-tap to split
        </p>
      )}
      <div className="flex flex-wrap gap-2 p-4 pt-8 items-end">
        {state.workspaceBlocks.map((block) => (
          <div key={block.id} className="relative">
            <DraggableWorkspaceBlock
              block={block}
              baseWidth={baseWidth}
              isSelected={block.id === selectedId}
              onTap={() => handleTap(block.id)}
              onDoubleTap={() => handleDoubleTap(block.id)}
            />
            {showSplitMenu === block.id && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute -top-12 left-0 bg-white rounded-lg shadow-lg border border-gray-200 flex gap-1 p-1 z-50"
              >
                {[2, 3, 4].map((parts) => (
                  <button
                    key={parts}
                    onClick={() => handleSplit(block.id, parts)}
                    className="px-3 py-1 text-sm font-bold bg-gray-100 rounded hover:bg-blue-100 active:bg-blue-200 touch-manipulation"
                  >
                    ÷{parts}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {state.workspaceBlocks.length > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); clearWorkspace(); setSelectedId(null); setShowSplitMenu(null); }}
          className="absolute bottom-3 right-3 px-3 py-2 bg-gray-400 text-white text-sm rounded-lg active:scale-95 transition-transform touch-manipulation"
        >
          Clear All
        </button>
      )}
    </div>
  );
}