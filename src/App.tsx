import { useEffect } from 'react';
import { DndContext, PointerSensor, TouchSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { ConversationProvider, useConversation } from './context/ConversationContext';
import { ManipulativeProvider, useManipulative } from './context/ManipulativeContext';
import { MessageList } from './components/MessageList';
import { ResponseButtons } from './components/ResponseButtons';
import { CheckAnswerButton } from './components/CheckAnswerButton';
import { FractionPalette } from './components/FractionPalette';
import { Workspace } from './components/Workspace';
import { CelebrationOverlay } from './components/CelebrationOverlay';
import { lessonScript } from './data/lessonScript';
import './App.css';

const BASE_WIDTH = 280;

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

function ManipulativePanel() {
  const { addBlock } = useManipulative();

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 5 },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { distance: 5 },
  });
  const sensors = useSensors(pointerSensor, touchSensor);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || over.id !== 'workspace') return;

    const data = active.data.current;
    if (!data) return;

    if (data.source === 'palette') {
      addBlock(data.fraction, { x: 0, y: 0 });
    }
  };

  return (
    <div className="w-[55%] h-full p-4 flex flex-row gap-4 overflow-hidden" style={{ backgroundColor: '#FAFAF8' }}>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <FractionPalette />
        <Workspace baseWidth={BASE_WIDTH} />
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