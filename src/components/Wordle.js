import { useState, useEffect } from 'react';
import useWordle from '../hooks/useWordle';
import Grid from './Grid';
import Keypad from './Keypad';
import Modal from './Modal';

const Wordle = ({ solution }) => {
	const { currentGuess, guesses, turn, isCorrect, handleKeyup, usedKeys, invalidWord, animationKey } = useWordle(solution);
	const [showModal, setShowModal] = useState(false)
	useEffect(() => {
		window.addEventListener('keyup', handleKeyup);

		if (isCorrect) {
			setTimeout(() => setShowModal(true), 2000)
			window.removeEventListener('keyup', handleKeyup);
		}
		if (turn > 5) {
			setTimeout(() => setShowModal(true), 2000)
			window.removeEventListener('keyup', handleKeyup);
		}
		return () => window.removeEventListener('keyup', handleKeyup);
	}, [isCorrect, handleKeyup, turn])

	return (
		<>
			<Grid currentGuess={currentGuess} guesses={guesses} turn={turn} invalidWord={invalidWord} animationKey={animationKey} />
			<Keypad usedKeys={usedKeys} />
			{showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution} />}
		</>
	)
}

export default Wordle;
