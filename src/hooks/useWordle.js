import { useState } from 'react';
import { isValidWord } from '../utils/functions';

const useWordle = (solution) => {
	const [turn, setTurn] = useState(0);
	const [currentGuess, setCurrentGuess] = useState('');
	const [guesses, setGuesses] = useState([...Array(6)]);
	const [history, setHistory] = useState([]);
	const [isCorrect, setIsCorrect] = useState(false);
	const [usedKeys, setUsedKeys] = useState({});
	const [invalidWord, setInvalidWord] = useState(false);
	const [animationKey, setAnimationKey] = useState(0);

	const formatString = () => {
		let solutionArray = [...solution]
		let formattedGuess = [...currentGuess].map((letter) => {
			return { key: letter, color: 'grey' }
		})

		// find any letters that are green (right position)
		formattedGuess.forEach((l, i) => {
			if (solutionArray[i] === l.key) {
				formattedGuess[i].color = 'green'
				solutionArray[i] = null
			}
		})

		// find any yellow letters
		formattedGuess.forEach((l, i) => {
			if (solutionArray.includes(l.key) && l.color !== 'green') {
				formattedGuess[i].color = 'yellow'
				solutionArray[solutionArray.indexOf(l.key)] = null
			}
		})

		return formattedGuess;

	}
	const addNewGuess = (formattedGuess) => {
		if (currentGuess === solution) {
			setIsCorrect(true)
		}

		setGuesses((prevGuesses) => {
			let newGuesses = [...prevGuesses]
			newGuesses[turn] = formattedGuess
			return newGuesses
		})

		setHistory((prevHistory) => {
			return [...prevHistory, currentGuess]
		})

		setTurn((prevTurn) => {
			return prevTurn + 1
		})
		setUsedKeys((prevUsedKeys) => {
			let newKeys = { ...prevUsedKeys }

			formattedGuess.forEach((l) => {
				const currentColor = newKeys[l.key]

				if (l.color === 'green') {
					newKeys[l.key] = 'green'
					return
				}

				if (l.color === 'yellow' && currentColor !== 'green') {
					newKeys[l.key] = 'yellow'
					return
				}

				if (l.color === 'grey' && currentColor !== 'green' && currentColor !== 'yellow') {
					newKeys[l.key] = 'grey'
					return
				}
			})

			return newKeys
		})
		setCurrentGuess('')
	}

	const handleKeyup = ({ key }) => {
		if (key === 'Enter') {
			// only add guess if turn is less than 5
			if (turn > 5) {
				console.log('you used all your guesses')
				return;
			}
			// do not allow duplicate words
			if (history.includes(currentGuess)) {
				console.log('you already tried that word!');
				return;
			}
			// check word is 5 char log
			if (currentGuess.length !== 5) {
				console.log('word must be 5 chars long');
				return;
			}
			// check if word is valid
			isValidWord(currentGuess).then(valid => {
				if (!valid) {
					console.log('word is not in the word list, triggering invalid animation for:', currentGuess);
					setInvalidWord(true);
					setAnimationKey(prev => prev + 1);
					// reset invalid state after animation and clear guess
					setTimeout(() => {
						console.log('animation complete, resetting');
						setInvalidWord(false);
					}, 600);
					return;
				}
				console.log('valid word:', currentGuess);
				const formatted = formatString()
				addNewGuess(formatted)
			});
		}

		if (key === 'Backspace') {
			setCurrentGuess((prev) => {
				return prev.slice(0, -1)
			})
			return;
		}

		if (/^[A-Za-z]$/.test(key)) {
			if (currentGuess.length < 5) {
				setCurrentGuess((prev) => {
					return prev + key
				})
			}
		}
	}

	return { turn, guesses, currentGuess, handleKeyup, isCorrect, usedKeys, invalidWord, animationKey };

}

export default useWordle;
