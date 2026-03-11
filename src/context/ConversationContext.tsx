import { createContext, useContext, useReducer, useCallback, useRef, type ReactNode } from 'react';
import type { ConversationState, LessonPhase } from '../types/conversation';
import { lessonScript, autoAdvanceMap, FIRST_NODE_ID } from '../data/lessonScript';

// --- Actions ---
type ConversationAction =
  | { type: 'ADD_TUTOR_MESSAGE'; text: string }
  | { type: 'ADD_STUDENT_MESSAGE'; text: string }
  | { type: 'SET_NODE'; nodeId: string }
  | { type: 'SET_PHASE'; phase: LessonPhase }
  | { type: 'SET_SHOWING_OPTIONS'; showing: boolean }
  | { type: 'SET_COMPLETE' }
  | { type: 'RESET' };

const initialState: ConversationState = {
  currentNodeId: FIRST_NODE_ID,
  messageHistory: [],
  lessonPhase: 'exploration',
  isComplete: false,
  showingOptions: false,
};

function conversationReducer(state: ConversationState, action: ConversationAction): ConversationState {
  switch (action.type) {
    case 'ADD_TUTOR_MESSAGE':
      return {
        ...state,
        messageHistory: [...state.messageHistory, {
          id: `msg-${Date.now()}-${Math.random()}`,
          sender: 'tutor',
          text: action.text,
          timestamp: Date.now(),
        }],
      };
    case 'ADD_STUDENT_MESSAGE':
      return {
        ...state,
        messageHistory: [...state.messageHistory, {
          id: `msg-${Date.now()}-${Math.random()}`,
          sender: 'student',
          text: action.text,
          timestamp: Date.now(),
        }],
      };
    case 'SET_NODE':
      return { ...state, currentNodeId: action.nodeId };
    case 'SET_PHASE':
      return { ...state, lessonPhase: action.phase };
    case 'SET_SHOWING_OPTIONS':
      return { ...state, showingOptions: action.showing };
    case 'SET_COMPLETE':
      return { ...state, isComplete: true };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

// --- Context ---
interface ConversationContextType {
  state: ConversationState;
  startLesson: () => void;
  selectOption: (label: string, nextNodeId: string) => void;
  checkManipulative: (conditionMet: boolean) => void;
}

const ConversationContext = createContext<ConversationContextType | null>(null);

// --- Provider ---
export function ConversationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(conversationReducer, initialState);
  const isPlayingRef = useRef(false);

  const playTutorMessages = useCallback(async (nodeId: string) => {
    if (isPlayingRef.current) return;
    isPlayingRef.current = true;

    const node = lessonScript[nodeId];
    if (!node) { isPlayingRef.current = false; return; }

    dispatch({ type: 'SET_NODE', nodeId });
    dispatch({ type: 'SET_PHASE', phase: node.phase });
    dispatch({ type: 'SET_SHOWING_OPTIONS', showing: false });

    // Play each tutor message with a delay
    for (let i = 0; i < node.tutorMessages.length; i++) {
      await new Promise(r => setTimeout(r, i === 0 ? 500 : 1200));
      dispatch({ type: 'ADD_TUTOR_MESSAGE', text: node.tutorMessages[i] });
    }

    // After messages, handle the expected action
    if (node.expectedAction === 'button' && node.options) {
      await new Promise(r => setTimeout(r, 500));
      dispatch({ type: 'SET_SHOWING_OPTIONS', showing: true });
    } else if (node.expectedAction === 'manipulative') {
      dispatch({ type: 'SET_SHOWING_OPTIONS', showing: false });
    } else if (node.expectedAction === 'auto') {
      const nextNodeId = autoAdvanceMap[nodeId];
      if (nextNodeId) {
        await new Promise(r => setTimeout(r, node.autoAdvanceDelay || 3000));
        isPlayingRef.current = false;
        playTutorMessages(nextNodeId);
        return;
      } else {
        // End of lesson
        dispatch({ type: 'SET_COMPLETE' });
      }
    }

    isPlayingRef.current = false;
  }, []);

  const startLesson = useCallback(() => {
    playTutorMessages(FIRST_NODE_ID);
  }, [playTutorMessages]);

  const selectOption = useCallback((label: string, nextNodeId: string) => {
    dispatch({ type: 'ADD_STUDENT_MESSAGE', text: label });
    dispatch({ type: 'SET_SHOWING_OPTIONS', showing: false });
    playTutorMessages(nextNodeId);
  }, [playTutorMessages]);

  const checkManipulative = useCallback((conditionMet: boolean) => {
    const node = lessonScript[state.currentNodeId];
    if (!node?.manipulativeCheck) return;

    if (conditionMet) {
      dispatch({ type: 'ADD_STUDENT_MESSAGE', text: '✅ (showed it with blocks)' });
      playTutorMessages(node.manipulativeCheck.correctNextId);
    } else {
      if (node.manipulativeCheck.hintMessage) {
        dispatch({ type: 'ADD_TUTOR_MESSAGE', text: node.manipulativeCheck.hintMessage });
      }
    }
  }, [state.currentNodeId, playTutorMessages]);

  return (
    <ConversationContext.Provider value={{ state, startLesson, selectOption, checkManipulative }}>
      {children}
    </ConversationContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useConversation() {
  const context = useContext(ConversationContext);
  if (!context) throw new Error('useConversation must be used within ConversationProvider');
  return context;
}