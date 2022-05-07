type options = {
    lives?: number;
}

const DEFAULT_OPTIONS: options = {
    lives: 10,
}

type eventTypes = "win" | "loss";

export const initHangmanGame = ({ lives }: options = {}) => {
    lives = lives || DEFAULT_OPTIONS.lives as number;

    const events: { [x in eventTypes]: Parameters<typeof on>[1][] } = {
        "loss": [],
        "win": []
    };

    const on = (key: eventTypes, cb: (hangmanWord: string, game: ReturnType<typeof start>) => void) => {
        events[key].push(cb);
        return;
    };

    class Game {
        private hangmanWord = "";
        private lives = Number(DEFAULT_OPTIONS.lives);
        public word: (string | null)[] = [];
        public guesses: string[] = [];

        constructor({
            hangmanWord, word, guesses
        }: { hangmanWord: string; word: (string | null)[]; guesses: string[]}) {
            this.hangmanWord = hangmanWord;

            this.word = word;
            this.guesses = guesses;
        };

        get livesLeft() {
            return this.lives - this.guesses.length;
        };
        get isWon() {
            return this.word.filter(Boolean).length === this.word.length;
        };
        guess(guess: string) {
            guess = guess.toUpperCase().trim();
            if (guess === this.hangmanWord) {
                this.word = this.word.map((_, i) => guess.at(i) || null);
            }
            else if (guess.length === 1 && this.hangmanWord.includes(guess)) {
                this.word = this.word.map((letter, i) => this.hangmanWord.at(i) === guess ? guess : letter || null);
            } else {
                this.guesses.push(guess);
            }

            if (this.isWon) this.dispatch("win", this.hangmanWord, { ...this });
            if (this.livesLeft === 0) this.dispatch("loss", this.hangmanWord, { ...this });

            return new Game({
                hangmanWord: this.hangmanWord,
                word: this.word,
                guesses: this.guesses,
            });
        }

        private dispatch(key: eventTypes, ...rest: Parameters<Parameters<typeof on>[1]>) {
            for (let cb of events[key]) {
                cb(...rest);
            };
        };
    }

    const start = (hangmanWord: string) => {
        hangmanWord = hangmanWord.toUpperCase();

        return new Game({
            hangmanWord,
            word: hangmanWord.split("").map(() => null),
            guesses: [],
        })
    };

    return { start, on };
}

