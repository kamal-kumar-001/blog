// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const { Configuration, OpenAIApi } = require("openai");


// const app = express();

// app.use(bodyParser.json());
// app.use(cors());

// const configuration = new Configuration({
//     organization: "org-X4uchG1oNNo7lafnMLetFXP9",
//     apiKey: "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",
// });

// const openai = new OpenAIApi(configuration);

// app.post("/", async (req, res) => {
//     try {
//         const response = await openai.createCompletion({
//             model: "text-davinci-003",
//             prompt: `Act as a chatbot for www.upscprep.com website and you provide working and with content not any random articles link from upscprep.com and your name is UPSCPREP Bot . 
//             UPSCPREP Bot: How may I Help You ?
//             User: I want a article on How to prepare for Prelims and Mains together? 
//             UPSCPREP Bot: I found a article for you https://www.upscprep.com/prepare-for-prelims-and-mains-together/
//             user: ${req.body.prompt}?
//             UPSCPREP Bot: `,
//             // max_tokens: 100,
//             // temperature: 0.5,
//             temperature: 0.9,
//             max_tokens: 150,
//             top_p: 1,
//             frequency_penalty: 0.0,
//             presence_penalty: 0.6,
//             stop: [" Human:", " AI:"],
//         });
//         // res.json({
//         //     data: response.data.choices[0].text,
//         // });
//         res.send(response.data.choices[0].text);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send("Internal Server Error");
//     }
// });



// app.listen(5000, () => {
//     console.log('Server is running on port 5000');
// });
// import { IncomingMessage, ServerResponse } from 'http';
import { Configuration, OpenAIApi } from 'openai';
// import { NextApiRequest, NextApiResponse } from 'next';

const configuration = new Configuration({
    organization: 'org-X4uchG1oNNo7lafnMLetFXP9',
    apiKey: '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',
});

const openai = new OpenAIApi(configuration);

export default async (req, res ) => {
    try {
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `Act as a chatbot for www.upscprep.com website and you provide working and with content not any random articles link from upscprep.com and your name is UPSCPREP Bot . 
            UPSCPREP Bot: How may I Help You ?
            User: I want a article on How to prepare for Prelims and Mains together? 
            UPSCPREP Bot: I found a article for you https://www.upscprep.com/prepare-for-prelims-and-mains-together/
            user: ${req.body.prompt}?
            UPSCPREP Bot: `,
            temperature: 0.9,
            max_tokens: 150,
            top_p: 1,
            frequency_penalty: 0.0,
            presence_penalty: 0.6,
            stop: [' Human:', ' AI:'],
        });
        res.send(response.data.choices[0].text);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};
