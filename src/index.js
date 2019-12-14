import generate, { learn } from "./generator";
import fs from "fs";
import path from "path";
import { config } from "dotenv";

config();

// TODO: Allow multiple input files?
const filePath = process.env.INPUT_FILE_PATH;
const data = fs
  .readFileSync(path.join(process.cwd(), filePath ? filePath : "."))
  .toString("utf8");

learn(data.split("\n").flatMap(i => i.split(". ")), 10);

const printText = (letterCount, initiator = "") => {
  console.log("--- " + initiator + " ---");
  console.log(generate(letterCount, initiator));
};

printText(200, "Ekonomi");
printText(200, "Kärlek");
