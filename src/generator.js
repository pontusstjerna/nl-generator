// every word has k-1 previous words, even if they are undefined
let k = 5;
const deterministic = false;
let tree = [];

export const createStringArray = input => {
    const split = input.split(" ");
    let entry = [];
    for (let j = split.length - k + 1; j <= split.length; j++) {
        entry.push(split[j] ? split[j] : undefined);
    }
    return entry;
};

const createStringTree = (input, dimensions = 5) => {
    k = dimensions;
    const split = input.split(" ");
    return split.map((word, i) => {
        let entry = [];
        for (let j = i - k + 1; j <= i; j++) {
            entry.push(split[j]);
        }
        return entry;
    });
};

export const learn = inputStrings => {
    tree = inputStrings.flatMap(input => createStringTree(input));
};

const getMatch = (entryA, entryB) => {
    let sum = 0;
    for (let i = 0; i < k - 1; i++) {
        if (entryA[i] === entryB[i]) {
            sum++;
        }
    }

    return sum;
};

const getClosestPoint = entry => {
    let closest = [tree[0]];
    let bestScore = getMatch(entry, closest);
    tree.forEach(element => {
        const score = getMatch(entry, element);
        if (score > bestScore) {
            closest = [element];
            bestScore = score;

            // we want words of equal probability to be randomized to not be deterministic (can be turned off)
        } else if (score === bestScore) {
            closest.push(element);
        }
    });

    return closest[
        deterministic ? 0 : Math.floor(Math.random() * closest.length)
    ];
};

export const getNextWord = input =>
    getClosestPoint(createStringArray(input))[k - 1];

// TODO: take for example source-tree as argument, or maybe something more abstract like category
// TODO: Make another function with possibility to use a starting sentence
export default (numberWords = 50, initiator = "") => {
    let output = initiator;
    for (let i = 0; i < numberWords; i++) {
        output = output + " " + getNextWord(output);
    }

    return output;
};
