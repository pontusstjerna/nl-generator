import express from "express";
import basicAuth from "express-basic-auth";
import cors from "cors"
import generate, { printText } from "./generatorService";
import { config } from "dotenv";

config();

const port = process.env.PORT ? process.env.PORT : 3000;
const app = express();

// Enable CORS support to allow calling on localhost 
app.use(cors());

app.post('/slack', (req, res) => {
    const wordCount = 100;
    const initiator = req.body.text;
    res.set('Content-Type', 'application/json');
    generate(wordCount, initiator).then(result => res.send(JSON.stringify({
        "response_type": "in_channel",
        "text": result
    })));
});

app.use(
    basicAuth({
        users: {
            [process.env.API_USER]: process.env.API_PASSWORD
        }
    })
);

app.get("/", (req, res) => {
    const { initiator, wordCount } = req.query;
    generate(wordCount, initiator)
        .then(result => res.send(result))
        .catch(err => {
            console.log(err);
            res.status(500).send(err.message);
        });
});

//printText(50, "För kräftan krävs det mycket energi");
//printText(100);

app.listen(port, () => console.log(`API listening at ${port} and using file ${process.env.INPUT_FILE_PATH}`));
