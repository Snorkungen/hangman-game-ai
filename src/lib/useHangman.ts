type options = {
    lives?: number;
}

const DEFAULT_OPTIONS: options = {
    lives: 10,
}

export const initHangmanGame = ({ lives }: options = {}) => {
    lives = lives || DEFAULT_OPTIONS.lives as number;

    const start = (hangmanWord: string) => {
        hangmanWord = hangmanWord.toUpperCase();

        const word: (string | null)[] = hangmanWord.split("").map(() => null);
        const guesses: string[] = [];


        return {
            word,
            get guesses() {
                return guesses
            },
            get livesLeft() {
                return Number(lives) - this.guesses.length;
            },
            get isWon() {
                return this.word.filter(Boolean).length === this.word.length;
            },
            guess(guess: string) {
                guess = guess.toUpperCase();
                if (guess === hangmanWord) {
                    this.word = this.word.map((_, i) => guess.at(i) || null);
                }
                else if (guess.length === 1 && hangmanWord.includes(guess)) {
                    this.word = this.word.map((letter, i) => hangmanWord.at(i) === guess ? guess : letter || null);
                } else {
                    guesses.push(guess);
                }
                return { ...this };
            }
        }
    };

    return { start };
}