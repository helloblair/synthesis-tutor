import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { Fraction } from '../utils/fractionMath';

// --- Block Types ---
export interface FractionBlock {
  id: string;
  fraction: Fraction;
  color: string;
  position: { x: number; y: number };
}

export const FRACTION_COLORS: Record<number, string> = {
  1: '#374151',   // whole - dark gray
  2: '#EF4444',   // halves - red
  3: '#F97316',   // thirds - orange
  4: '#EAB308',   // fourths - yellow
  5: '#22C55E',   // fifths - green
  6: '#15803D',   // sixths - dark green
  8: '#3B82F6',   // eighths - blue
  10: '#8B5CF6',  // tenths - purple
  12: '#EC4899',  // twelfths - pink
};

export const PALETTE_FRACTIONS: Fraction[] = [
  { numerator: 1, denominator: 1 },
  { numerator: 1, denominator: 2 },
  { numerator: 1, denominator: 3 },
  { numerator: 1, denominator: 4 },
  { numerator: 1, denominator: 5 },
  { numerator: 1, denominator: 6 },
  { numerator: 1, denominator: 8 },
  { numerator: 1, denominator: 10 },
  { numerator: 1, denominator: 12 },
];

// --- State ---
interface ManipulativeState {
  workspaceBlocks: FractionBlock[];
  nextBlockId: number;
}

const initialState: ManipulativeState = {
  workspaceBlocks: [],
  nextBlockId: 1,
};

// --- Actions ---
type ManipulativeAction =
  | { type: 'ADD_BLOCK'; fraction: Fraction; position: { x: number; y: number } }
  | { type: 'MOVE_BLOCK'; id: string; position: { x: number; y: number } }
  | { type: 'REMOVE_BLOCK'; id: string }
  | { type: 'CLEAR_WORKSPACE' };

function manipulativeReducer(state: ManipulativeState, action: ManipulativeAction): ManipulativeState {
  switch (action.type) {
    case 'ADD_BLOCK': {
      const color = FRACTION_COLORS[action.fraction.denominator] || '#6B7280';
      const newBlock: FractionBlock = {
        id: `block-${state.nextBlockId}`,
        fraction: action.fraction,
        color,
        position: action.position,
      };
      return {
        ...state,
        workspaceBlocks: [...state.workspaceBlocks, newBlock],
        nextBlockId: state.nextBlockId + 1,
      };
    }
    case 'MOVE_BLOCK':
      return {
        ...state,
        workspaceBlocks: state.workspaceBlocks.map((b) =>
          b.id === action.id ? { ...b, position: action.position } : b
        ),
      };
    case 'REMOVE_BLOCK':
      return {
        ...state,
        workspaceBlocks: state.workspaceBlocks.filter((b) => b.id !== action.id),
      };
    case 'CLEAR_WORKSPACE':
      return { ...state, workspaceBlocks: [], nextBlockId: 1 };
    default:
      return state;
  }
}

// --- Context ---
interface ManipulativeContextType {
  state: ManipulativeState;
  addBlock: (fraction: Fraction, position: { x: number; y: number }) => void;
  moveBlock: (id: string, position: { x: number; y: number }) => void;
  removeBlock: (id: string) => void;
  clearWorkspace: () => void;
}

const ManipulativeContext = createContext<ManipulativeContextType | null>(null);

export function ManipulativeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(manipulativeReducer, initialState);

  const addBlock = (fraction: Fraction, position: { x: number; y: number }) =>
    dispatch({ type: 'ADD_BLOCK', fraction, position });

  const moveBlock = (id: string, position: { x: number; y: number }) =>
    dispatch({ type: 'MOVE_BLOCK', id, position });

  const removeBlock = (id: string) =>
    dispatch({ type: 'REMOVE_BLOCK', id });

  const clearWorkspace = () =>
    dispatch({ type: 'CLEAR_WORKSPACE' });

  return (
    <ManipulativeContext.Provider value={{ state, addBlock, moveBlock, removeBlock, clearWorkspace }}>
      {children}
    </ManipulativeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useManipulative() {
  const context = useContext(ManipulativeContext);
  if (!context) throw new Error('useManipulative must be used within ManipulativeProvider');
  return context;
}