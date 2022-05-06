const {
    readFileSync,
    writeFileSync
} = require("node:fs");
const createFile = (letter) => new Promise((resolve) => {
    let data = readFileSync(`./${letter}word.csv`, {
        encoding: "utf-8"
    });

    writeFileSync(`./${letter}word.ts`, `export const ${letter}words = ${JSON.stringify([...new Set(data.split("\r\n").filter((word) => {
        if(!word) return false;
        return !/(\-|\/|\_|\'|\\|\s|\”|\#|\.|\?)/ig.test(word.trim())    
    }).map((c) => c.trim()))])};`);
});

for (let i = 0; i <= 25; i++) {
    let letter = String.fromCharCode(65 + i);
    createFile(letter)
}
