const Row = ({ guess, currentGuess, invalidWord }) => {
	if (invalidWord) {
		console.log('Row: invalidWord is true, currentGuess:', currentGuess);
	}

	if (guess) {
		return (
			<div className='row past'>
				{guess.map((l, i) => (
					<div key={i} className={l.color}>{l.key}</div>
				))}
			</div>
		)
	}

	if (currentGuess) {
		// split word in individual letters array
		let letters = currentGuess.split('')

		return (
			<div className="row current">
				{letters.map((letter, i) => (
					<div
						key={i}
						className={`filled ${invalidWord ? 'invalid' : ''}`}
					>
						{letter}
					</div>
				))}
				{[...Array(5 - letters.length)].map((_, i) => (
					<div
						key={`empty-${i}`}
						className={invalidWord ? 'invalid' : ''}
					>
					</div>
				))}
			</div>
		)
	}

	return (
		<>
			<div className="row">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</>
	)
}

export default Row
