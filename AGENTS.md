# Agent Guidelines for my-wordle

## Commands
- **Dev**: `npm start` (opens http://localhost:3000)
- **Test**: `npm test` (interactive watch mode)
- **Test single file**: `npm test -- App.test.js` or `npm test -- --testNamePattern="test name"`
- **Build**: `npm run build`
- **Lint**: Uses react-app ESLint config (enforced on build)

## Code Style
- **Language**: JavaScript (not TypeScript), use `.js` for most files, `.jsx` for components with heavy JSX
- **Framework**: React 19 with Create React App
- **Imports**: React imports at top, then third-party, then local components, then hooks, then utils (CSS last)
- **Components**: Functional components only (no class components)
- **Naming**: PascalCase for components, camelCase for functions/variables/hooks
- **CSS**: CSS Modules (`.module.css`) - import as `styles` and use `className={styles.ClassName}`
- **Formatting**: **TAB indentation** (not spaces), single quotes for JSX attributes
- **Error handling**: Use console.error for errors, avoid silent failures
- **Exports**: Default export for components and hooks

## Project Structure
- Components in `src/components/` (Game.jsx, Wordle.js, etc.)
- Custom hooks in `src/hooks/` (useWordle.js)
- Utility functions in `src/utils/` (functions.js)
- Data files in `src/data/` (db.json)
- CSS Modules colocated with components or in `src/` root
- Tests colocated as `*.test.js`
