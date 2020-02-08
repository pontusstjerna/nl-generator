import "core-js/features/array/flat-map";

// every word has k-1 previous words, even if they are undefined
let k = 5;
const deterministic = false;
let tree = [];

export const createStringEntry = input => {
    const split = input.split(" ");
    let entry = [];
    for (let j = split.length - k; j < split.length; j++) {
        entry.push(split[j] ? split[j] : undefined);
    }

    return entry;
};

export const hasLearned = () => tree.length > 0;

export const learn = (input, dimensions = 50) => {
    console.log("Model learning....");
    k = dimensions;
    tree = input.split(" ").map(word => word === "undefined" ? undefined : word);
    console.log(`Model has learned! KD-tree has ${tree.length} entries and using ${k} dimensions.`);
};

const getMatchConstant = (entry, searchIndex) => {
    const lastWord = entry[entry.length - 1];
    const wordIndex = tree.indexOf(lastWord, searchIndex);
    if (wordIndex === -1) {
        return { index: -1, score: 0 };
    }

    let sum = 0;
    for (let i = 0; i < entry.length - 1; i++) {
        if (entry[i] === tree[wordIndex - entry.length + i]) {
            sum ++;
        }
    }
    return { index: wordIndex, score: sum };
};

// Matches two entries and returns the matching score
// The matching word is rewarded higher score if it is closer to the last
const getMatchLinear = (entry, searchIndex) => {
    const lastWord = entry[entry.length - 1];
    const wordIndex = tree.indexOf(lastWord, searchIndex);
    if (wordIndex === -1 ) {
        return { index: -1, score: 0 };
    }

    let sum = 0;
    for (let i = 0; i < entry.length - 1; i++) {
        const treeWord = tree[wordIndex - entry.length + i];
        if (entry[i] === treeWord) {
            sum += (i + 1);
        }
    }
    return { index: wordIndex, score: sum };
};

// Matches two entries and returns the matching score
// The matching word is rewarded higher score if it is closer to the last
const getMatchExponential = (entry, searchIndex) => {
    const lastWord = entry[entry.length - 1];
    const wordIndex = tree.indexOf(lastWord, searchIndex);
    if (wordIndex === -1) {
        return { index: -1, score: 0 };
    }

    let sum = 0;
    for (let i = 0; i < entry.length - 1; i++) {
        if (entry[i] === tree[wordIndex - entry.length + i]) {
            sum += (i * i);
        }
    }
    return { index: wordIndex, score: sum };
};

const getBestMatchedWordIndex = entry => {
    let bestResult = { index: Math.floor(Math.random() * tree.length - 1), score: 1 };
    let index = bestResult.index;
    while (true) {
        const result = getMatchLinear(entry, index + 1);

        if (result.index === -1) {
            return bestResult.index;
        }
        index = result.index;

        if (result.score > bestResult.score) {
            bestResult = result;
        }
    }
};

export const getNextWord = input =>
    tree[getBestMatchedWordIndex(createStringEntry(input)) + 1];

export default (numberWords = 50, initiator = "") => {
    let output = initiator;
    for (let i = 0; i < numberWords; i++) {
        output = output + " " + getNextWord(output);
    }

    return output;
};
