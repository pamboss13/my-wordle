import { useState, useEffect } from 'react';
import Wordle from './Wordle';

const Game = () => {
	const [solution, setSolution] = useState(null);

	useEffect(() => {
		fetch('http://localhost:3001/solutions')
			.then(res => res.json())
			.then(json => {
				// generate random integer for our 15 solutions
				const randomSolution = json[Math.floor(Math.random() * json.length)];
				setSolution(randomSolution.word);
				console.log('Solution: ', randomSolution.word);
			})
	}, [setSolution]);

	return (
		<div>
			{solution && <Wordle solution={solution} />}
		</div>
	)

}

export default Game;
