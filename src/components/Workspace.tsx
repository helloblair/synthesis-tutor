import { useManipulative } from '../context/ManipulativeContext';
import { useDroppable } from '@dnd-kit/core';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { fractionLabel } from '../utils/fractionMath';
import type { FractionBlock } from '../context/ManipulativeContext';

function DraggableWorkspaceBlock({ block, baseWidth }: { block: FractionBlock; baseWidth: number }) {
  const width = (block.fraction.numerator / block.fraction.denominator) * baseWidth;
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: block.id,
    data: { fraction: block.fraction, source: 'workspace', blockId: block.id },
  });

  const style = {
    width: `${Math.max(width, 40)}px`,
    backgroundColor: block.color,
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.7 : 1,
    zIndex: isDragging ? 50 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="h-14 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md touch-manipulation select-none cursor-grab active:cursor-grabbing"
      style={style}
    >
      {fractionLabel(block.fraction)}
    </div>
  );
}

export function Workspace({ baseWidth }: { baseWidth: number }) {
  const { state, clearWorkspace } = useManipulative();
  const { setNodeRef, isOver } = useDroppable({ id: 'workspace' });

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 rounded-xl border-2 border-dashed relative overflow-hidden min-h-[300px] transition-colors ${
        isOver ? 'bg-blue-50 border-blue-300' : 'bg-gray-100 border-gray-300'
      }`}
    >
      {state.workspaceBlocks.length === 0 && (
        <p className="absolute inset-0 flex items-center justify-center text-gray-400 text-lg">
          Drag blocks here!
        </p>
      )}
      <div className="flex flex-wrap gap-2 p-4 items-end">
        {state.workspaceBlocks.map((block) => (
          <DraggableWorkspaceBlock key={block.id} block={block} baseWidth={baseWidth} />
        ))}
      </div>
      {state.workspaceBlocks.length > 0 && (
        <button
          onClick={clearWorkspace}
          className="absolute bottom-3 right-3 px-3 py-2 bg-gray-400 text-white text-sm rounded-lg active:scale-95 transition-transform touch-manipulation"
        >
          Clear All
        </button>
      )}
    </div>
  );
}