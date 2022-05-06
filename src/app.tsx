import { useCallback, useEffect, useState } from "preact/hooks";
import { initHangmanGame } from "./lib/useHangman";
import { initHangmanAi } from "./lib/useHangmanAI";
import { Awords } from "./data/Aword";
import { Bwords } from "./data/Bword";
import { Cwords } from "./data/Cword";
import { Zwords } from "./data/Zword";

const randomWord = (words: string[]) => words[Math.floor(Math.random() * words.length)]

export function App() {
  let wordList = Cwords

  const [hangmanWord, setHangmanword] = useState(randomWord(wordList))
  const { start } = initHangmanGame();
  const { getAIGuess } = initHangmanAi(wordList);
  const [hangmanGame, setHangmanGame] = useState(start(hangmanWord))

  useEffect(() => {
    console.log(hangmanWord)
    // console.log(hangmanGame.word)
  }, [hangmanGame])

  return (
    <div className="w-full h-full bg-slate-700 text-red-100">
      <header>
        <h1 className="text-center text-4xl p-2">Hangman</h1>
        <span>
          {JSON.stringify(hangmanGame.guesses)}
        </span>
      </header>
      <main>
        <div></div>
        <div className="flex justify-center gap-2">
          {hangmanGame.word.map((letter, i) => (
            <div key={`${letter}-${i}`} className="w-20 h-20 bg-slate-500 flex justify-center items-center text-4xl">
              <span>{letter}</span>
            </div>
          ))}
        </div>
        <div class="flex pt-4 justify-evenly">
          <button
            class="border-2 border-black bg-slate-400 text-slate-900 p-6 block mx-auto"
            onClick={() => {
              let g = String(prompt("GUESS Pls"));
              // if (g.length !== 1) return alert("Bad try again!")

              setHangmanGame(hangmanGame.guess(g));
            }}
          >Player</button>
          <button
            class="border-2 border-black bg-slate-400 text-slate-900 p-6 block mx-auto"
            onClick={() => {
              let g = getAIGuess(hangmanGame);
              setHangmanGame(hangmanGame.guess(g));
            }}
          >AI</button>
          </div>
        <button
          onClick={() => setHangmanGame(start(randomWord(wordList)))}
        >New Game</button>
      </main>
    </div>
  )
}
