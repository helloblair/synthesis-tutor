# Synthesis Tutor — Fraction Equivalence

A web-based math lesson that teaches fraction equivalence through a conversational tutor and interactive fraction manipulatives.

## Live Demo

https://synthesis-tutor.vercel.app

## Run Locally
```
git clone https://github.com/helloblair/synthesis-tutor.git
cd synthesis-tutor
npm install
npm run dev
```

## Technical Approach

Built with React, TypeScript, and Vite. The conversational tutor runs on a finite state machine (useReducer) that reads from a scripted lesson data structure. The fraction workspace uses dnd-kit for touch-first drag-and-drop, letting students drag proportionally-sized blocks, combine same-denominator blocks by tapping, and split blocks via double-tap. Styled with Tailwind CSS and Nunito font for a child-friendly experience.

**Stack:** React, TypeScript, Vite, Tailwind CSS, dnd-kit, Framer Motion

## Lesson Structure

1. **Exploration** — Students discover fraction blocks and compare sizes
2. **Guided Discovery** — Tutor walks through equivalence (1/2 = 2/4, 1/3 = 2/6) using manipulatives
3. **Assessment** — Three challenges testing understanding, ending with a celebration
