import type { ChatMessage } from '../types/conversation';

export function MessageBubble({ message }: { message: ChatMessage }) {
  const isTutor = message.sender === 'tutor';

  return (
    <div className={`flex ${isTutor ? 'justify-start' : 'justify-end'} mb-3`}>
      {isTutor && (
        <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white text-sm font-bold mr-2 shrink-0 mt-1">
          F
        </div>
      )}
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl text-base leading-relaxed ${
          isTutor
            ? 'bg-blue-50 text-gray-800 rounded-tl-sm'
            : 'bg-green-100 text-gray-800 rounded-tr-sm'
        }`}
      >
        {message.text}
      </div>
    </div>
  );
}
