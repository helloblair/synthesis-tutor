import { useEffect } from 'react';
import { ConversationProvider, useConversation } from './context/ConversationContext';
import { MessageList } from './components/MessageList';
import { ResponseButtons } from './components/ResponseButtons';
import { lessonScript } from './data/lessonScript';
import './App.css';

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
    </div>
  );
}

function ManipulativePanel() {
  return (
    <div className="w-[65%] h-full bg-gray-50 p-4">
      <h2 className="text-xl font-bold text-gray-700">Workspace</h2>
      <p className="text-gray-400 mt-4">Fraction blocks coming soon...</p>
    </div>
  );
}

function App() {
  return (
    <ConversationProvider>
      <div className="flex h-screen w-screen overflow-hidden">
        <TutorPanel />
        <ManipulativePanel />
      </div>
    </ConversationProvider>
  );
}

export default App;