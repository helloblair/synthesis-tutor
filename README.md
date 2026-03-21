# Synthesis Tutor — Fraction Equivalence

A web-based math lesson that teaches fraction equivalence through a conversational tutor and interactive fraction manipulatives. Built as a 1-week prototype for the Superbuilders challenge (March 2026).

## Live Demo

**[https://synthesis-tutor.vercel.app](https://synthesis-tutor.vercel.app)**

## Run Locally
```
git clone https://github.com/helloblair/synthesis-tutor.git
cd synthesis-tutor
npm install
npm run dev
```

## Features

### Conversational Tutor
- Chat-style interface with a scripted tutor ("Finn the Fraction Friend") that guides the student through the lesson
- 20+ conversation nodes powered by a finite state machine (no LLM dependency)
- Branching logic — correct answers advance the lesson, incorrect answers trigger hints and encouragement
- Warm, encouraging tone throughout with natural typing delays and auto-scrolling
- Three student interaction types: multiple-choice buttons, manipulative tasks with validation, and auto-advancing dialogue

### Interactive Fraction Manipulative
- **Fraction Palette** with 9 block types: whole, 1/2, 1/3, 1/4, 1/5, 1/6, 1/8, 1/10, 1/12
- **Proportional sizing** — block height represents fraction value (a 1/2 block is literally half the height of a whole block), making equivalence visually obvious
- **Rainbow color coding** — each denomination has a distinct color for quick identification
- **Drag-and-drop** — drag blocks from the palette into the workspace (dnd-kit, touch-first)
- **Combine** — tap one block, then tap another of the same denominator to merge them (e.g., two 1/4 blocks combine into one 1/2 block)
- **Split** — double-tap a block to open a split menu (divide by 2, 3, or 4), creating equivalent smaller pieces
- **Workspace limit** — max 8 blocks with a friendly overflow warning
- **Clear All** button to reset the workspace

### Three-Phase Lesson Flow

1. **Exploration** — Free play with fraction blocks; low-stakes observation questions (e.g., "Which block is bigger?")
2. **Guided Discovery** — Directed tasks where the tutor asks students to build specific equivalences (1/2 = 2/4, 1/3 = 2/6) using the manipulative, with workspace validation via the "Check My Answer" button
3. **Assessment** — Three challenge problems mixing multiple-choice and manipulative-based questions, testing real understanding of fraction equivalence

### Validation System
The tutor checks workspace state against specific conditions (e.g., "has two quarter blocks", "shows an equivalent to 1/3") before advancing, ensuring the student genuinely built the correct answer rather than just guessing.

### Completion Experience
A celebration overlay summarizes what the student learned (key equivalences: 1/2 = 2/4, 1/3 = 2/6, 3/4 = 6/8) with a "Play Again" option to restart.

### iPad Compatibility
Touch-optimized with no-zoom viewport, disabled overscroll, and touch-native gestures (tap-to-select, double-tap-to-split). No hover dependencies. Full-screen fixed layout sized for iPad.

## Technical Approach

Built with React 19, TypeScript, and Vite. The conversational tutor runs on a finite state machine (useReducer) that reads from a scripted lesson data structure (`lessonScript.ts`). The fraction workspace uses dnd-kit for touch-first drag-and-drop, letting students drag proportionally-sized blocks, combine same-denominator blocks by tapping, and split blocks via double-tap. Workspace validation is decoupled via a `useManipulativeChecker` hook — the tutor defines a condition string, and the hook evaluates it against block state. Styled with Tailwind CSS and Nunito font for a child-friendly experience. Framer Motion handles layout transitions and animations. Fully client-side — no backend, no database, no LLM.

**Stack:** React 19, TypeScript, Vite, Tailwind CSS, dnd-kit, Framer Motion

**Deployed on Vercel** with auto-deploy on every push to main.
