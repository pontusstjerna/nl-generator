import generate, { getNextWord, createStringArray, learn } from "./generator";
import input from "../input";

//learn(lotsOfText.split(". "), 3);
learn(input.flatMap(i => i.split(". ")), 10);

/*const example1 = "hej där";
const example2 = "hej";

console.log(getNextWord(example1));
console.log(getNextWord(example2));*/

console.log(generate(200));
