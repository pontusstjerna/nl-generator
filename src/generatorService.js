import generate, { learn, hasLearned } from "./generator";
import fs from "fs";
import path from "path";
import {capitalizeSentences, removeLastSentence, replaceWeekdays} from "./stringUtils";

const setup = () => {
    if (hasLearned()) {
        console.log("Model has already learned, will not learn again!");
        return Promise.resolve();
    }

    // TODO: Allow multiple input files?
    const filePath = process.env.INPUT_FILE_PATH;

    return new Promise((resolve, reject) => {
        const data = fs
            .readFileSync(path.join(process.cwd(), filePath ? filePath : "."))
            .toString("utf8");

        learn(data.replace(/"/g, "").split("\n"), process.env.DIMENSIONS);
        resolve();
    });
};

const postProcess = input => {
    input = replaceWeekdays(input);
    input = capitalizeSentences(input);
    input = removeLastSentence(input);
    input = input.trim();
    return input;
};

export const printText = (wordCount, initiator = "") =>
    setup().then(() => {
        console.log("--- " + (initiator ? initiator : "<No initiator>") + " ---");
        console.log(generate(wordCount, initiator));
    });

export default (wordCount = 50, initiator = "") =>
    setup()
    .then(() => generate(wordCount, initiator))
    .then(postProcess);
