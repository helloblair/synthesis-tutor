import { useEffect } from 'react';
import { DndContext, TouchSensor, MouseSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
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

  useEffect(() => {
    startLesson();
  }, []);

  return (
    <div className="w-[35%] h-full bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-lg font-bold text-blue-500">Finn the Fraction Friend</h2>
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

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { distance: 5 },
  });
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 5 },
  });
  const sensors = useSensors(touchSensor, mouseSensor);

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
    <div className="w-[65%] h-full bg-gray-50 p-4 flex flex-col gap-4">
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <FractionPalette baseWidth={BASE_WIDTH} />
        <Workspace baseWidth={BASE_WIDTH} />
      </DndContext>
    </div>
  );
}

function App() {
  return (
    <ConversationProvider>
      <ManipulativeProvider>
        <div className="flex h-screen w-screen overflow-hidden">
          <TutorPanel />
          <ManipulativePanel />
          <CelebrationOverlay />
        </div>
      </ManipulativeProvider>
    </ConversationProvider>
  );
}

export default App;