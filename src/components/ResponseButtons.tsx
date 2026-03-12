import type { ButtonOption } from '../types/conversation';

interface Props {
  options: ButtonOption[];
  onSelect: (label: string, nextNodeId: string) => void;
}

export function ResponseButtons({ options, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2 justify-end p-4 border-t border-gray-100 bg-white shrink-0">
      {options.map((option) => (
        <button
          key={option.label}
          onClick={() => onSelect(option.label, option.nextNodeId)}
          className="px-5 py-3 bg-green-500 text-white font-semibold rounded-2xl text-base active:scale-95 transition-transform touch-manipulation"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}