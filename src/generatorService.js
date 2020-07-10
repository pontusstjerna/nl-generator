import generate, { learn, hasLearned } from "./generator";
import fs from "fs";
import path from "path";
import { capitalizeSentences, removeLastSentence, replaceWeekdays } from "./stringUtils";

const setup = () => {
    if (hasLearned()) {
        console.log("Model has already learned, will not learn again!");
        return Promise.resolve();
    }

    const filePaths = process.env.INPUT_FILE_PATH.split(';');

    return new Promise((resolve, reject) => {
        const data = filePaths.map(filePath => fs
            .readFileSync(path.join(process.cwd(), filePath ? filePath : "."))
            .toString("utf8")).join('\n\n')

        const dimensions = process.env.DIMENSIONS || 50;

        // To easier find new entries
        const processedData = data.split("\n\n\n").map(part => {
            let prePart = "";
            for (let i = 0; i < dimensions - 1; i++) {
                prePart += "undefined ";
            }

            return prePart + part;
        }).join("\n\n\n")
            .replace(/"/g, "");

        learn(processedData, dimensions);
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


export default (wordCount = 50, initiator = "") => {
    const timeBefore = new Date().getTime();
    return setup()
        .then(() => generate(wordCount, initiator))
        .then(postProcess)
        .then(result => {
            const timeAfter = new Date().getTime();
            console.log("Time for request was " + (timeAfter - timeBefore) + "ms.");
            return result;
        });
}
