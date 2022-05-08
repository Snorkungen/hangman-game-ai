import { FunctionComponent, JSX } from "preact";
import { useEffect, useState } from "preact/hooks";
import { initHangmanGame } from "./lib/useHangman";
import { initHangmanAi } from "./lib/useHangmanAI";
import { Awords } from "./data/Aword";
import { Bwords } from "./data/Bword";
import { Cwords } from "./data/Cword";
import { Zwords } from "./data/Zword";

const randomWord = (words: string[]) => words[Math.floor(Math.random() * words.length)]

let hangmanLines = [
  <line x1={25} x2={25} y1={80} y2={10} />,
  <line x1={15} x2={25} y1={80} y2={70} />,
  <line x1={35} x2={25} y1={80} y2={70} />,
  <line x1={25} x2={60} y1={10} y2={10} />,
  <line x1={25} x2={35} y1={20} y2={10} />,
  <line x1={60} x2={60} y1={10} y2={15} />,
  <circle r={10} cx={60} cy={25} fill="none" />,
  <line x1={60} x2={60} y1={35} y2={55} />,
  <line x1={60} x2={50} y1={55} y2={70} />,
  <line x1={60} x2={70} y1={55} y2={70} />,
  <line x1={60} x2={45} y1={40} y2={30} />,
  <line x1={60} x2={75} y1={40} y2={30} />,
];

export function App() {
  let wordList = [...Cwords, ...Awords, ...Bwords, ...Zwords]
  
  const { start, on } = initHangmanGame({ lives: hangmanLines.length });
  const { getAIGuess } = initHangmanAi(wordList);

  const [message, setMessage] = useState<null | JSX.Element>(null);
  const [hangmanGame, setHangmanGame] = useState(start(randomWord(wordList)))

  useEffect(() => {
    on("win", (w, game) => {
      setMessage(<div>
        <span >Game won!</span>
        <Button
          onClick={() => {
            setHangmanGame(start(randomWord(wordList)));
            setMessage(null);
          }}
        >New Game</Button>
      </div>)
    });
    on("loss", (w, game) => {
      setMessage(<div>
        <span >Game lost! The word was is {w}.</span>
        <Button
          onClick={() => {
            setHangmanGame(start(randomWord(wordList)));
            setMessage(null);
          }}
        >New Game</Button>
      </div>)
    });

  }, []);

  return (
    <div className="w-full h-full bg-slate-700 text-red-100">
      <header>
        <h1 className="text-center text-4xl p-2">Hangman</h1>
        <div className="w-full flex justify-center">
          {message}
        </div>
        <span>
        </span>
      </header>
      <main>
        <div>
          <svg className="font-mono stroke-slate-50 fill-slate-50" width={300} viewBox="0 0 100 100" >
            {hangmanLines.slice(0, hangmanGame.guesses.length)}
            <line x1="0" x2="100" y1="80" y2="80" />
            <text y={95} style="color : inherit;">
              {hangmanGame.guesses.map((v, i) => (
                <tspan x={i * 10} stroke="none" fontSize={40} >{v[0]}</tspan>
              ))}
            </text>
          </svg>
        </div>
        <div className="flex justify-center gap-2">
          {hangmanGame.word.map((letter, i) => (
            <div key={`${letter}-${i}`} className="w-20 h-20 bg-slate-500 flex justify-center items-center text-4xl">
              <span>{letter}</span>
            </div>
          ))}
        </div>
        <div class="flex pt-4 justify-evenly">
          <Button
            onClick={() => {
              let g = String(prompt("GUESS Pls"));
              setHangmanGame(hangmanGame.guess(g));
            }}
          >Player</Button>
          <Button
            onClick={() => {
              let g = getAIGuess(hangmanGame);
              setHangmanGame(hangmanGame.guess(g));
            }}
          >AI</Button>
        </div>
      </main>
    </div>
  )
}


const Button: FunctionComponent<JSX.HTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => (
  <button
    className="border-2 border-green-900 text-slate-50 mx-2 p-2 rounded-md bg-slate-600"
    {...props}
  >{children}</button>
);