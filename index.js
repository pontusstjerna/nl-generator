
// every word has k-1 previous words, even if they are undefined
const k = 5;
const deterministic = false;
let tree = [];

const createStringArray = input => {
    const split = input.split(" ");
    let entry = [];
    for (let j = split.length - k + 1; j <= split.length; j++) {
        entry.push(split[j]);
    }
    return entry;
};

const createStringTree = input => {
    const split = input.split(" ");
    return split.map((word, i) => {
        let entry = [];
        for (let j = i - k + 1; j <= i; j++) {
            entry.push(split[j]);
        }
        return entry;
    });
};

const learn = inputStrings => {
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

    return closest[deterministic ? 0 : Math.floor(Math.random() * closest.length)];
};

const getNextWord = input => getClosestPoint(createStringArray(input))[k - 1];

/* EXECUTION */

const examples = [
    "hej mitt namn är karin och jag tycker om kaniner",
    "i varje stad finns det minst två hus",
    "hej där jag gillar inte kött kakor",
    "hejsan jag heter bert och jag tycker om matlagning",
];

learn(examples);
console.log(JSON.stringify(tree));

const example1 = "hej där";
const example2 = "hej";

console.log(getNextWord(example1));
console.log(getNextWord(example2));