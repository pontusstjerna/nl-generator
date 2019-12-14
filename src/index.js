import generate, { getNextWord, createStringArray, learn } from "./generator";

const fs = require("fs"),
  path = require("path");

const data = fs
  .readFileSync(path.join(__dirname, "../ml-data/blog-posts.txt"))
  .toString("utf8");
learn(data.split("\n").flatMap(i => i.split(". ")), 10);

const printText = (letterCount, initiator = "") => {
  console.log("--- " + initiator + " ---");
  console.log(generate(letterCount, initiator));
};

printText(200, "Ekonomi");
printText(200, "Kärlek");
