import { useConversation } from '../context/ConversationContext';
import { useManipulativeChecker } from '../hooks/useManipulativeChecker';
import { lessonScript } from '../data/lessonScript';

export function CheckAnswerButton() {
  const { state, checkManipulative } = useConversation();
  const { checkCondition } = useManipulativeChecker();
  const currentNode = lessonScript[state.currentNodeId];

  if (currentNode?.expectedAction !== 'manipulative' || !currentNode.manipulativeCheck) {
    return null;
  }

  const handleCheck = () => {
    const result = checkCondition(currentNode.manipulativeCheck!.condition);
    checkManipulative(result);
  };

  return (
    <div className="p-3 border-t border-gray-100">
      <button
        onClick={handleCheck}
        className="w-full py-3 bg-blue-500 text-white font-bold rounded-2xl text-base active:scale-95 transition-transform touch-manipulation"
      >
        Check My Answer!
      </button>
    </div>
  );
}