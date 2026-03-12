import { useEffect } from 'react';
import { ConversationProvider, useConversation } from './context/ConversationContext';
import { ManipulativeProvider } from './context/ManipulativeContext';
import { MessageList } from './components/MessageList';
import { ResponseButtons } from './components/ResponseButtons';
import { CheckAnswerButton } from './components/CheckAnswerButton';
import { FractionPalette } from './components/FractionPalette';
import { Workspace } from './components/Workspace';
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
  return (
    <div className="w-[65%] h-full bg-gray-50 p-4 flex flex-col gap-4">
      <FractionPalette baseWidth={BASE_WIDTH} />
      <Workspace baseWidth={BASE_WIDTH} />
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
        </div>
      </ManipulativeProvider>
    </ConversationProvider>
  );
}

export default App;