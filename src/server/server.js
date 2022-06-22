// Example filename: index.js
require("dotenv").config();

const fs = require("fs");
const { DEEPGRAM_API_KEY } = process.env;
const { Deepgram } = require("@deepgram/sdk");

// Initialize the Deepgram SDK
const deepgram = new Deepgram(DEEPGRAM_API_KEY);
const path = require("path");
const Bundler = require("parcel-bundler");
const express = require("express");
const app = express();
const port = 3000;

const options = {}; // See options section of api docs, for the possibilities
const entryFiles = path.join(__dirname, "../client/index.html");

// Initialize a new bundler using a file and options
const bundler = new Bundler(entryFiles, options);

async function getTranscription(source) {
  // Send the audio to Deepgram and get the response
  const response = await deepgram.transcription.preRecorded(source, {
    punctuate: true,
    language: "en-US",
  });

  const { transcript } = response.results.channels[0].alternatives[0];

  return transcript;
}

app.get("/get-transcript", async (req, res) => {
  const { file } = req.query;
  const source = {
    url: file,
  };
  const transcription = await getTranscription(source);

  res.send(JSON.stringify({ transcription }));
});

// Let express use the bundler middleware, this will let Parcel handle every request over your express server
app.use(bundler.middleware());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
