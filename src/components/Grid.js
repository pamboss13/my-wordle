import Row from './Row';

const Grid = ({ currentGuess, guesses, turn, invalidWord, animationKey }) => {
	return (
		<>
			<div>{guesses.map((g, i) => {
				if (turn === i) {
					return <Row key={`${i}-${animationKey}`} currentGuess={currentGuess} invalidWord={invalidWord} />
				}
				return <Row key={i} guess={g} />
			})}</div>
		</>
	)
}

export default Grid
