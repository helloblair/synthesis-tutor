import { useEffect, useState, useCallback } from 'react';
import { DndContext, DragOverlay, PointerSensor, TouchSensor, useSensor, useSensors, type DragStartEvent, type DragEndEvent } from '@dnd-kit/core';
import { ConversationProvider, useConversation } from './context/ConversationContext';
import { ManipulativeProvider, useManipulative } from './context/ManipulativeContext';
import { FRACTION_COLORS } from './context/ManipulativeContext';
import { MessageList } from './components/MessageList';
import { ResponseButtons } from './components/ResponseButtons';
import { CheckAnswerButton } from './components/CheckAnswerButton';
import { FractionPalette } from './components/FractionPalette';
import { Workspace } from './components/Workspace';
import { CelebrationOverlay } from './components/CelebrationOverlay';
import { lessonScript } from './data/lessonScript';
import { fractionLabel } from './utils/fractionMath';
import type { Fraction } from './utils/fractionMath';
import './App.css';

const MAX_BLOCKS = 8;

function TutorPanel() {
  const { state, startLesson, selectOption } = useConversation();
  const currentNode = lessonScript[state.currentNodeId];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { startLesson(); }, []);

  return (
    <div className="w-[45%] min-w-[400px] h-full bg-white flex flex-col">
      <div className="p-4 bg-blue-500">
        <h2 className="text-lg font-bold text-white">Finn the Fraction Friend</h2>
      </div>
      <MessageList messages={state.messageHistory} />
      {state.showingOptions && currentNode?.options && (
        <ResponseButtons options={currentNode.options} onSelect={selectOption} />
      )}
      <CheckAnswerButton />
    </div>
  );
}

function DragOverlayBlock({ fraction }: { fraction: Fraction }) {
  const height = Math.max((fraction.numerator / fraction.denominator) * 400, 36);
  const color = FRACTION_COLORS[fraction.denominator] || '#6B7280';

  return (
    <div
      className="w-16 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-xl touch-manipulation select-none"
      style={{ height: `${height}px`, backgroundColor: color, opacity: 0.9 }}
    >
      {fractionLabel(fraction)}
    </div>
  );
}

function ManipulativePanel() {
  const { addBlock, state } = useManipulative();
  const [activeFraction, setActiveFraction] = useState<Fraction | null>(null);
  const [triggerWarning, setTriggerWarning] = useState(0);

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 5 },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { distance: 5 },
  });
  const sensors = useSensors(pointerSensor, touchSensor);

  const handleDragStart = (event: DragStartEvent) => {
    const data = event.active.data.current;
    if (data?.fraction) {
      setActiveFraction(data.fraction);
    }
  };

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    setActiveFraction(null);
    const { active, over } = event;
    if (!over || over.id !== 'workspace') return;

    const data = active.data.current;
    if (!data) return;

    if (data.source === 'palette') {
      if (state.workspaceBlocks.length >= MAX_BLOCKS) {
        setTriggerWarning((n) => n + 1);
        return;
      }
      addBlock(data.fraction, { x: 0, y: 0 });
    }
  }, [addBlock, state.workspaceBlocks.length]);

  return (
    <div className="w-[55%] h-full p-4 flex flex-row gap-4" style={{ backgroundColor: '#FAFAF8' }}>
      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <FractionPalette />
        <Workspace triggerWarning={triggerWarning} />
        <DragOverlay dropAnimation={null}>
          {activeFraction ? <DragOverlayBlock fraction={activeFraction} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

function App() {
  return (
    <ConversationProvider>
      <ManipulativeProvider>
        <div className="flex h-[100dvh] w-screen overflow-hidden">
          <TutorPanel />
          <ManipulativePanel />
          <CelebrationOverlay />
        </div>
      </ManipulativeProvider>
    </ConversationProvider>
  );
}

export default App;