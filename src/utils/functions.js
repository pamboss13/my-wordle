// Check if a word is valid by fetching from the solutions list
export const isValidWord = async (word) => {
	try {
		const response = await fetch('http://localhost:3001/solutions');
		const solutions = await response.json();
		return solutions.some(solution => solution.word === word.toLowerCase());
	} catch (error) {
		console.error('Error validating word:', error);
		return false;
	}
};
