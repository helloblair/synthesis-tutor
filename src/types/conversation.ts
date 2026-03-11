export type MessageSender = 'tutor' | 'student';

export type LessonPhase = 'exploration' | 'guided' | 'assessment';

export interface ButtonOption {
  label: string;
  nextNodeId: string;
  isCorrect: boolean;
}

export interface ManipulativeCheck {
  condition: string;
  correctNextId: string;
  incorrectNextId: string;
  hintMessage?: string;
}

export interface ConversationNode {
  id: string;
  tutorMessages: string[];
  expectedAction: 'button' | 'manipulative' | 'auto';
  options?: ButtonOption[];
  manipulativeCheck?: ManipulativeCheck;
  autoAdvanceDelay?: number;
  phase: LessonPhase;
}

export interface ChatMessage {
  id: string;
  sender: MessageSender;
  text: string;
  timestamp: number;
}

export interface ConversationState {
  currentNodeId: string;
  messageHistory: ChatMessage[];
  lessonPhase: LessonPhase;
  isComplete: boolean;
  showingOptions: boolean;
}