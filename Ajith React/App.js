import React, { useState } from "react";
import "./App.css";

const WORDS = ["Ajith", "Reddy", "Vanja", "five1", "sigma"];
const TARGET_WORD = WORDS[Math.floor(Math.random() * WORDS.length)];

const App = () => {
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const maxAttempts = 6;

  const checkGuess = (guess) => {
    return guess.split("").map((letter, index) => {
      if (TARGET_WORD[index] === letter) return { letter, color: "correct" };
      if (TARGET_WORD.includes(letter)) return { letter, color: "present" };
      return { letter, color: "absent" };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentGuess.length !== 5 || guesses.length >= maxAttempts || gameOver) return;
    
    const result = checkGuess(currentGuess);
    setGuesses([...guesses, result]);
    setCurrentGuess("");
    
    if (currentGuess === TARGET_WORD) setGameOver(true);
    if (guesses.length + 1 >= maxAttempts) setGameOver(true);
  };
const newGame=() =>{
  setGameOver(false)
  
  

}
  return (
    <div className="container">
      <h1 className="title">Wordle Clone</h1>
      <div className="grid">
        {guesses.map((guess, i) => (
          <div key={i} className="row">
            {guess.map(({ letter, color }, j) => (
              <span key={j} className={`cell ${color}`}>{letter}</span>
            ))}
          </div>
        ))}
      </div>
      {!gameOver && (
        <form onSubmit={handleSubmit} className="input-form">
          <input
            type="text"
            value={currentGuess}
            onChange={(e) => setCurrentGuess(e.target.value.toLowerCase())}
            maxLength={5}
            className="input-box"
          />
          <button type="submit" className="submit-button">Guess</button>
        </form>
      )}
      {gameOver && 
      <div><p className="game-over">Game Over! The word was {TARGET_WORD.toUpperCase()}</p> 
      <button onClick={newGame}>Next Game</button>
      </div>
      }
    </div>
  );
};

export default App;
