import { useManipulative } from '../context/ManipulativeContext';
import { FractionBlockDisplay } from './FractionBlock';

export function Workspace({ baseWidth }: { baseWidth: number }) {
  const { state, removeBlock, clearWorkspace } = useManipulative();

  return (
    <div className="flex-1 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 relative overflow-hidden min-h-[300px]">
      {state.workspaceBlocks.length === 0 && (
        <p className="absolute inset-0 flex items-center justify-center text-gray-400 text-lg">
          Tap blocks above to add them here!
        </p>
      )}
      <div className="flex flex-wrap gap-2 p-4 items-end">
        {state.workspaceBlocks.map((block) => (
          <div key={block.id} className="relative group">
            <FractionBlockDisplay
              fraction={block.fraction}
              baseWidth={baseWidth}
              id={block.id}
            />
            <button
              onClick={() => removeBlock(block.id)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-400 text-white rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 active:opacity-100 transition-opacity"
            >
              ×
            </button>
          </div>
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