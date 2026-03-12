import { useConversation } from '../context/ConversationContext';

export function CelebrationOverlay() {
  const { state } = useConversation();

  if (!state.isComplete) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-10 text-center max-w-md mx-4 shadow-2xl">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">You Crushed It!</h2>
        <p className="text-lg text-gray-600 mb-6">
          You learned that fractions can look different but mean the same thing. That's called <span className="font-bold text-blue-500">equivalence</span>!
        </p>
        <p className="text-gray-500 mb-6">1/2 = 2/4 · 1/3 = 2/6 · 3/4 = 6/8</p>
        <button
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-green-500 text-white font-bold rounded-2xl text-lg active:scale-95 transition-transform touch-manipulation"
        >
          Play Again!
        </button>
      </div>
    </div>
  );
}