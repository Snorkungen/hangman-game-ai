import { initHangmanGame } from "./useHangman"
import { getMostPrevelentLetters } from "./getMostPrevelantLetter";

type HangmanGameType = ReturnType<ReturnType<typeof initHangmanGame>["start"]>;
export const initHangmanAi = (words: string[]) => {
    let letters = [];
    let g_words = [];

    const getAIGuess = (game: HangmanGameType) => {
        const { word, guesses } = { ...game };
        g_words = words.filter((w) => {
            if (w.length !== word.length) return false;

            for (let prevGuess in guesses) {
                if (w.includes(prevGuess)) return false;
            }

            for (let i = 0; i < w.length; i++) {
                if (!word[i]) continue;
                if (guesses.includes(w[i])) return false;
                if (word.at(i)?.toUpperCase() !== w.at(i)?.toUpperCase()) return false;
                if (word.includes(w[i])) return false;
            }
            return true;
        })

        letters = getMostPrevelentLetters(g_words)

        console.log(g_words)

        if (g_words.length === 1) return g_words[0];

        for (let letter of letters) {
            if (guesses.includes(letter) || word.includes(letter)) continue;
            return letter;
        }
        return "";
    };

    return {
        getAIGuess
    };
};
