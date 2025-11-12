# Agent Guidelines for my-wordle

## Commands
- **Dev**: `npm start` (opens http://localhost:3000)
- **API Server**: `json-server --watch src/data/db.json --port 3001` (required for game to work)
- **Test**: `npm test` (interactive watch mode)
- **Test single file**: `npm test -- App.test.js --watchAll=false` or `npm test -- --testNamePattern="test name"`
- **Build**: `npm run build`
- **Lint**: Uses react-app ESLint config (enforced on build)

## Code Style
- **Language**: JavaScript (not TypeScript), use `.js` for most files, `.jsx` for components with heavy JSX
- **Framework**: React 19 with Create React App
- **Imports**: React imports at top, then third-party, then local components, then hooks, then utils (CSS last)
- **Components**: Functional components only (no class components)
- **Naming**: PascalCase for components, camelCase for functions/variables/hooks
- **CSS**: Global CSS in `index.css` (not CSS Modules) - use plain `className` strings
- **Animations**: Use CSS `@keyframes` with descriptive names (flip, pop, invalid, etc.)
- **Formatting**: **TAB indentation** (not spaces), single quotes for JSX attributes
- **Error handling**: Use console.error for errors, console.log for user feedback, avoid silent failures
- **Exports**: Default export for components and hooks

## Project Structure
- Components in `src/components/` (Game.jsx, Wordle.js, Grid.js, Row.js, Keypad.js, Modal.js)
- Custom hooks in `src/hooks/` (useWordle.js - handles game logic and state)
- Utility functions in `src/utils/` (functions.js - validation helpers)
- Data files in `src/data/` (db.json - 5,758 valid 5-letter words as solutions array)
- Global styles in `src/index.css`
- Tests colocated as `*.test.js`

## Key Features
- Word validation against db.json via fetch to http://localhost:3001/solutions
- Invalid word animation: red color + scale effect with staggered delays
- State managed in useWordle hook: turn, guesses, currentGuess, history, isCorrect, usedKeys, invalidWord
