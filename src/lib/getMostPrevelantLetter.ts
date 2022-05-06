export const getMostPrevelentLetters = (words: string[]) => {
    const letters = [];
    const chars: { [x: string]: number | undefined } = {};


    for (let word of words) {
        for (let letter of word) {
            letter = letter.toUpperCase();
            chars[letter] = (chars[letter] || 0) + 1
        }
    }


    for (let key in chars) {
        letters.push(key)
    }
    return letters.sort((a, b) => (chars[b] || 0) - (chars[a] || 0));
};