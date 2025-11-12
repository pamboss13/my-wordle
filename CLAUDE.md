# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Start Commands

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:3000)
npm start

# Run tests in watch mode
npm test

# Build for production
npm run build

# Start JSON Server for data (runs on http://localhost:3001)
# Requires separate setup - see Backend section below
```

## Project Overview

This is a React-based implementation of the Wordle game, bootstrapped with Create React App. Players have 6 attempts to guess a 5-letter word, receiving color-coded feedback on each guess:
- **Green**: Correct letter in correct position
- **Yellow**: Correct letter in wrong position
- **Grey**: Letter not in word

## Architecture

### Data Flow
1. **Game Container** (`src/App.js`) → Renders the main Wordle component
2. **Wordle Component** (`src/components/Wordle.js`) → Orchestrates game UI and state
3. **useWordle Hook** (`src/hooks/useWordle.js`) → Manages all game logic and state
4. **UI Components** → Display game state (Grid, Keypad, Modal)

### Key Components

- **Wordle.js**: Main game orchestrator that manages keyboard listeners and shows modal on game end
- **Grid.js**: Renders 6 rows of guesses, with current row showing active guess
- **Row.js**: Renders individual letter tiles with color coding
- **Keypad.js**: Displays alphabet with color feedback for guessed letters
- **Modal.js**: Shows win/lose message after game ends

### Core Logic

**useWordle Hook** (`src/hooks/useWordle.js`):
- `handleKeyup()`: Processes keyboard input (letters, Enter, Backspace)
- `formatString()`: Colors letters based on position matching (green, yellow, grey)
- `addNewGuess()`: Updates game state with new guess, increments turn counter
- Validates words against backend API, prevents duplicates, enforces 5-letter constraint

### State Management

The hook maintains:
- `turn`: Current attempt number (0-5)
- `currentGuess`: Active word being typed
- `guesses`: Array of formatted guess objects with colors
- `history`: Previous guessed words
- `isCorrect`: Win condition
- `usedKeys`: Keyboard state for display
- `invalidWord`: Triggers animation for invalid words
- `animationKey`: Forces re-render for animation

## Backend Integration

The app requires a JSON Server running on `http://localhost:3001` that provides:

- **GET `/solutions`** - Returns array of valid word objects with `word` property
- **GET `/letters`** - Returns array of letter objects with `key` property (the alphabet)

The data is stored in `src/data/db.json` (very large file with word lists).

To start the JSON Server:
```bash
json-server --watch src/data/db.json --port 3001
```

## Styling

- Uses CSS Modules for component scoping
- Main styles in `src/index.css`
- Each component can have its own `.module.css` file
- Animation for invalid word shake effect (600ms) in useWordle hook

## Testing

- Uses React Testing Library for component tests
- Test configuration in `src/setupTests.js`
- ESLint config extends `react-app` preset

## Development Notes

- The app uses React 19.2.0 with Hooks for state management (no Redux/Context needed for this scope)
- Keyboard events are managed via native `keyup` listeners, cleaned up on unmount
- Word validation is asynchronous via fetch to JSON Server
- Game ends when player wins or uses all 6 turns
