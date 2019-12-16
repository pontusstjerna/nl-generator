import generate, { learn, hasLearned } from "./generator";
import fs from "fs";
import path from "path";

const setup = () => {
    if (hasLearned) {
        console.log("Model has already learned, will not learn again!");
        return Promise.resolve();
    }

    // TODO: Allow multiple input files?
    const filePath = process.env.INPUT_FILE_PATH;

    return new Promise((resolve, reject) => {
        const data = fs
            .readFileSync(path.join(process.cwd(), filePath ? filePath : "."))
            .toString("utf8");

        learn(data.split("\n").flatMap(i => i.split(". ")), 50);
        resolve();
    });
};

export const printText = (wordCount, initiator = "") =>
    setup().then(() => {
        console.log("--- " + (initiator ? initiator : "<No initiator>") + " ---");
        console.log(generate(wordCount, initiator));
    });

export default (wordCount = 50, initiator = "") => setup()
    .then(() => generate(wordCount, initiator));
