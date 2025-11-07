import styles from './App.module.css';
import Game from './components/Game';

function App() {
	return (
		<div className={styles.App}>
			<h1>My Wordle Game</h1>
			<Game />
		</div>
	);
}

export default App;
