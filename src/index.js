import express from "express";
import basicAuth from "express-basic-auth";
import generate, { printText } from "./generatorService";

const port = process.env.PORT ? process.env.PORT : 3000;
const app = express();

app.use(basicAuth({
    users: {
        [process.env.USER]: process.env.PASSWORD
    }
}));

app.get("/", (req, res) => {
    const { initiator, wordCount } = req.query;
    generate(wordCount, initiator).then(result => res.send(result));
});

//printText(50, "För kräftan krävs det mycket energi");
//printText(100);

app.listen(port, () => console.log(`API listening at ${port} and using file ${process.env.INPUT_FILE_PATH}`));