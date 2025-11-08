export default function Modal({ isCorrect, turn, solution }) {
	return (
		<div className="modal">
			{isCorrect && (
				<div>
					<h1>You Win!</h1>
					<p className="solution">{solution}</p>
					<p>You found the solution in {} guesses :)</p>
				</div>
			)}
			{!isCorrect && (
				<div>
					<h1>You Lose :(</h1>
					<p>Better luck next time!</p>
				</div>
			)}
		</div>
	)
}
