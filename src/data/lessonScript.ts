import { ConversationNode } from '../types/conversation';

export const lessonScript: Record<string, ConversationNode> = {
  // ============ PHASE 1: EXPLORATION ============
  welcome: {
    id: 'welcome',
    tutorMessages: [
      "Hey there! I'm Finn, your fraction friend! 🎉",
      "Today we're going on a fraction adventure together. Ready?"
    ],
    expectedAction: 'button',
    options: [
      { label: "Let's go!", nextNodeId: 'intro_blocks', isCorrect: true },
      { label: "What are fractions?", nextNodeId: 'what_are_fractions', isCorrect: true }
    ],
    phase: 'exploration'
  },

  what_are_fractions: {
    id: 'what_are_fractions',
    tutorMessages: [
      "Great question! Fractions are pieces of a whole thing.",
      "Like if you cut a pizza into 2 equal slices, each slice is 1/2 of the pizza!",
      "Let me show you something cool..."
    ],
    expectedAction: 'auto',
    autoAdvanceDelay: 3000,
    phase: 'exploration'
  },

  intro_blocks: {
    id: 'intro_blocks',
    tutorMessages: [
      "See those colorful blocks on the right? Each one represents a fraction — a piece of something!",
      "The big block is a WHOLE. The smaller ones are pieces of that whole.",
      "Try dragging some blocks into the workspace! Just play around and see what you notice about their sizes."
    ],
    expectedAction: 'auto',
    autoAdvanceDelay: 8000,
    phase: 'exploration'
  },

  observe_sizes: {
    id: 'observe_sizes',
    tutorMessages: [
      "Nice exploring! Here's a question for you:",
      "Which block is bigger — the 1/2 block or the 1/4 block?"
    ],
    expectedAction: 'button',
    options: [
      { label: "The 1/2 block", nextNodeId: 'correct_bigger', isCorrect: true },
      { label: "The 1/4 block", nextNodeId: 'incorrect_bigger', isCorrect: false },
      { label: "They're the same", nextNodeId: 'incorrect_bigger', isCorrect: false }
    ],
    phase: 'exploration'
  },

  correct_bigger: {
    id: 'correct_bigger',
    tutorMessages: [
      "You got it! 🌟 The 1/2 block IS bigger!",
      "That's because when you cut something into fewer pieces, each piece is bigger.",
      "2 pieces means bigger slices than 4 pieces. Makes sense, right?"
    ],
    expectedAction: 'auto',
    autoAdvanceDelay: 4000,
    phase: 'exploration'
  },

  incorrect_bigger: {
    id: 'incorrect_bigger',
    tutorMessages: [
      "Hmm, not quite! Look at the blocks carefully — compare their widths.",
      "The 1/2 block is bigger because cutting something into 2 pieces gives you bigger pieces than cutting into 4.",
      "Let's keep going — this will make more sense soon!"
    ],
    expectedAction: 'auto',
    autoAdvanceDelay: 4000,
    phase: 'exploration'
  },

  // ============ PHASE 2: GUIDED DISCOVERY ============
  intro_equivalence: {
    id: 'intro_equivalence',
    tutorMessages: [
      "Now here's where it gets really cool. 🤯",
      "Sometimes two DIFFERENT fractions are actually the SAME amount!",
      "Let me show you. First, drag a 1/2 block into the workspace."
    ],
    expectedAction: 'manipulative',
    manipulativeCheck: {
      condition: 'has_half_block',
      correctNextId: 'find_match_for_half',
      incorrectNextId: 'intro_equivalence_hint',
      hintMessage: "Drag the 1/2 block (the red one) into the workspace!"
    },
    phase: 'guided'
  },

  intro_equivalence_hint: {
    id: 'intro_equivalence_hint',
    tutorMessages: [
      "Look for the red block labeled 1/2 in the fraction box. Drag it down into the workspace!"
    ],
    expectedAction: 'manipulative',
    manipulativeCheck: {
      condition: 'has_half_block',
      correctNextId: 'find_match_for_half',
      incorrectNextId: 'intro_equivalence_hint',
      hintMessage: "You're looking for the 1/2 block — it's the red one!"
    },
    phase: 'guided'
  },

  find_match_for_half: {
    id: 'find_match_for_half',
    tutorMessages: [
      "Perfect! Now here's the challenge:",
      "Can you drag out TWO 1/4 blocks and line them up next to the 1/2 block?",
      "What do you notice about their size?"
    ],
    expectedAction: 'manipulative',
    manipulativeCheck: {
      condition: 'has_two_quarters',
      correctNextId: 'celebrate_half_quarters',
      incorrectNextId: 'find_match_hint',
      hintMessage: "Drag out two of the yellow 1/4 blocks into the workspace!"
    },
    phase: 'guided'
  },

  find_match_hint: {
    id: 'find_match_hint',
    tutorMessages: [
      "You need two 1/4 blocks — the yellow ones! Drag two of them into the workspace next to your 1/2 block."
    ],
    expectedAction: 'manipulative',
    manipulativeCheck: {
      condition: 'has_two_quarters',
      correctNextId: 'celebrate_half_quarters',
      incorrectNextId: 'find_match_hint',
      hintMessage: "Keep trying! Drag two yellow 1/4 blocks out."
    },
    phase: 'guided'
  },

  celebrate_half_quarters: {
    id: 'celebrate_half_quarters',
    tutorMessages: [
      "YES! 🎉 Look at that!",
      "Two 1/4 blocks are the EXACT same size as one 1/2 block!",
      "That means 1/2 = 2/4. They look different, but they're the same amount!",
      "This is called EQUIVALENCE. Pretty cool, huh?"
    ],
    expectedAction: 'button',
    options: [
      { label: "Whoa, cool!", nextNodeId: 'second_example', isCorrect: true },
      { label: "Show me more!", nextNodeId: 'second_example', isCorrect: true }
    ],
    phase: 'guided'
  },

  second_example: {
    id: 'second_example',
    tutorMessages: [
      "Let's try another one! Clear the workspace and this time...",
      "Can you figure out how many 1/6 blocks it takes to equal 1/3?",
      "Drag out a 1/3 block and some 1/6 blocks to find out!"
    ],
    expectedAction: 'manipulative',
    manipulativeCheck: {
      condition: 'shows_third_sixths',
      correctNextId: 'celebrate_third_sixths',
      incorrectNextId: 'second_example_hint',
      hintMessage: "Drag out one 1/3 block (orange) and try placing 1/6 blocks (dark green) next to it!"
    },
    phase: 'guided'
  },

  second_example_hint: {
    id: 'second_example_hint',
    tutorMessages: [
      "You need a 1/3 block and some 1/6 blocks. How many 1/6 blocks match the length of 1/3?"
    ],
    expectedAction: 'manipulative',
    manipulativeCheck: {
      condition: 'shows_third_sixths',
      correctNextId: 'celebrate_third_sixths',
      incorrectNextId: 'second_example_hint',
      hintMessage: "Try two 1/6 blocks next to the 1/3 block — are they the same size?"
    },
    phase: 'guided'
  },

  celebrate_third_sixths: {
    id: 'celebrate_third_sixths',
    tutorMessages: [
      "You're a natural! 🌟",
      "Two 1/6 blocks = one 1/3 block. So 1/3 = 2/6!",
      "See the pattern? When you split pieces into smaller pieces, you get more of them — but the total amount stays the same!"
    ],
    expectedAction: 'auto',
    autoAdvanceDelay: 5000,
    phase: 'guided'
  },

  // ============ PHASE 3: ASSESSMENT ============
  assessment_intro: {
    id: 'assessment_intro',
    tutorMessages: [
      "Alright, you're doing AMAZING! 💪",
      "Time for a few quick challenges to show what you've learned.",
      "Ready?"
    ],
    expectedAction: 'button',
    options: [
      { label: "Bring it on!", nextNodeId: 'challenge_1', isCorrect: true },
      { label: "I'm ready!", nextNodeId: 'challenge_1', isCorrect: true }
    ],
    phase: 'assessment'
  },

  challenge_1: {
    id: 'challenge_1',
    tutorMessages: [
      "Challenge 1: Which fraction is equivalent to 1/2?"
    ],
    expectedAction: 'button',
    options: [
      { label: "2/4", nextNodeId: 'challenge_1_correct', isCorrect: true },
      { label: "1/3", nextNodeId: 'challenge_1_incorrect', isCorrect: false },
      { label: "3/5", nextNodeId: 'challenge_1_incorrect', isCorrect: false }
    ],
    phase: 'assessment'
  },

  challenge_1_correct: {
    id: 'challenge_1_correct',
    tutorMessages: [
      "Nailed it! ✅ 1/2 = 2/4. You proved that with the blocks earlier!"
    ],
    expectedAction: 'auto',
    autoAdvanceDelay: 2500,
    phase: 'assessment'
  },

  challenge_1_incorrect: {
    id: 'challenge_1_incorrect',
    tutorMessages: [
      "Not quite! Remember what we saw with the blocks — two 1/4 pieces made one 1/2.",
      "So 1/2 = 2/4! Let's try the next one."
    ],
    expectedAction: 'auto',
    autoAdvanceDelay: 3000,
    phase: 'assessment'
  },

  challenge_2: {
    id: 'challenge_2',
    tutorMessages: [
      "Challenge 2: Use the blocks to show me a fraction that equals 1/3!",
      "Drag blocks into the workspace to prove it."
    ],
    expectedAction: 'manipulative',
    manipulativeCheck: {
      condition: 'equivalent_to_third',
      correctNextId: 'challenge_2_correct',
      incorrectNextId: 'challenge_2_hint',
      hintMessage: "Think about what we discovered earlier — how many 1/6 blocks equal 1/3?"
    },
    phase: 'assessment'
  },

  challenge_2_hint: {
    id: 'challenge_2_hint',
    tutorMessages: [
      "Remember: two 1/6 blocks are the same as one 1/3 block. Try dragging those out!"
    ],
    expectedAction: 'manipulative',
    manipulativeCheck: {
      condition: 'equivalent_to_third',
      correctNextId: 'challenge_2_correct',
      incorrectNextId: 'challenge_2_hint',
      hintMessage: "You're so close! Try two 1/6 blocks."
    },
    phase: 'assessment'
  },

  challenge_2_correct: {
    id: 'challenge_2_correct',
    tutorMessages: [
      "Brilliant! 🎯 You showed that 2/6 = 1/3. Equivalent fractions master!"
    ],
    expectedAction: 'auto',
    autoAdvanceDelay: 2500,
    phase: 'assessment'
  },

  challenge_3: {
    id: 'challenge_3',
    tutorMessages: [
      "Last challenge! True or False:",
      "3/4 is the same as 6/8."
    ],
    expectedAction: 'button',
    options: [
      { label: "True", nextNodeId: 'challenge_3_correct', isCorrect: true },
      { label: "False", nextNodeId: 'challenge_3_incorrect', isCorrect: false }
    ],
    phase: 'assessment'
  },

  challenge_3_correct: {
    id: 'challenge_3_correct',
    tutorMessages: [
      "YES! ✅ 3/4 = 6/8. If you split each fourth into two pieces, you get eighths — and 3 fourths becomes 6 eighths!"
    ],
    expectedAction: 'auto',
    autoAdvanceDelay: 3000,
    phase: 'assessment'
  },

  challenge_3_incorrect: {
    id: 'challenge_3_incorrect',
    tutorMessages: [
      "Actually, it's true! 3/4 does equal 6/8.",
      "Think of it this way: if you split each 1/4 piece in half, each one becomes two 1/8 pieces. Three 1/4s become six 1/8s!"
    ],
    expectedAction: 'auto',
    autoAdvanceDelay: 4000,
    phase: 'assessment'
  },

  lesson_complete: {
    id: 'lesson_complete',
    tutorMessages: [
      "YOU CRUSHED IT! 🎉🎉🎉",
      "You just learned that fractions can look different but mean the SAME thing. That's called equivalence!",
      "1/2 = 2/4, 1/3 = 2/6, 3/4 = 6/8 — different numbers, same amount.",
      "You're officially a fraction explorer. I'm so proud of you! 🌟"
    ],
    expectedAction: 'auto',
    autoAdvanceDelay: 0,
    phase: 'assessment'
  }
};

// Define the flow for auto-advance nodes (which node comes next)
export const autoAdvanceMap: Record<string, string> = {
  what_are_fractions: 'intro_blocks',
  intro_blocks: 'observe_sizes',
  correct_bigger: 'intro_equivalence',
  incorrect_bigger: 'intro_equivalence',
  celebrate_third_sixths: 'assessment_intro',
  challenge_1_correct: 'challenge_2',
  challenge_1_incorrect: 'challenge_2',
  challenge_2_correct: 'challenge_3',
  challenge_3_correct: 'lesson_complete',
  challenge_3_incorrect: 'lesson_complete',
};

export const FIRST_NODE_ID = 'welcome';