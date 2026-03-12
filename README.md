# Synthesis Tutor — Fraction Equivalence

A web-based math lesson that teaches fraction equivalence through a conversational tutor ("Finn the Fraction Friend") and interactive fraction manipulatives.

## Live Demo

https://synthesis-tutor-two.vercel.app/

## Run Locally

```bash
git clone https://github.com/helloblair/synthesis-tutor.git
cd synthesis-tutor
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

## Scripts

| Command            | Description                        |
| ------------------ | ---------------------------------- |
| `npm run dev`      | Start development server           |
| `npm run build`    | TypeScript check + production build |
| `npm run preview`  | Preview production build locally   |
| `npm run lint`     | Run ESLint                         |

## Technical Approach

Built with React, TypeScript, and Vite. The conversational tutor runs on a finite state machine (useReducer) that reads from a scripted lesson JSON. The fraction workspace lets students add proportionally-sized blocks and check equivalence relationships. Styled with Tailwind CSS and Nunito font for a child-friendly experience.

**Stack:** React 19, TypeScript, Vite, Tailwind CSS, dnd-kit, Framer Motion

## How It Works

The app uses a two-panel layout:

- **Left panel** — Chat interface with Finn, response buttons, and a "Check My Answer" button
- **Right panel** — A fraction palette and workspace where students drag and arrange color-coded blocks

Fractions are color-coded by denominator so students can visually compare sizes and build equivalence relationships.

## Lesson Structure

1. **Exploration** — Students discover fraction blocks and compare sizes
2. **Guided Discovery** — Tutor walks students through equivalence (1/2 = 2/4, 1/3 = 2/6)
3. **Assessment** — Three challenges testing understanding, ending with a celebration

## Project Structure

```
src/
├── components/       # UI components (chat bubbles, blocks, palette, workspace)
├── context/          # React context providers (conversation FSM, manipulative state)
├── data/             # Lesson script and dialogue tree
├── hooks/            # Custom hooks (manipulative validation)
├── types/            # TypeScript interfaces
└── utils/            # Fraction math utilities
```

## Touch Support

Optimized for iPad with touch-specific CSS (no callout, no tap highlight, no overscroll bounce) and responsive press feedback on interactive elements.
