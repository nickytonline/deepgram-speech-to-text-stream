// Example filename: index.js
require('dotenv').config();

const fs = require("fs");
const {DEEPGRAM_API_KEY} = process.env;
const { Deepgram } = require("@deepgram/sdk");

// Location of the file you want to transcribe. Should include filename and extension.
// Example of a local file: ../../Audio/life-moves-pretty-fast.wav
// Example of a remote file: https://static.deepgram.com/examples/interview_speech-analytics.wav
const file = "https://static.deepgram.com/examples/interview_speech-analytics.wav";

// Mimetype for the file you want to transcribe
// Only necessary if transcribing a local file
// Example: audio/wav
const mimetype = "audio/wav";

// Initialize the Deepgram SDK
const deepgram = new Deepgram(DEEPGRAM_API_KEY);

// Check whether requested file is local or remote, and prepare accordingly
if (file.startsWith("http")) {
  // File is remote
  // Set the source
  source = {
    url: file,
  };
} else {
  // File is local
  // Open the audio file
  const audio = fs.readFileSync(file);

  // Set the source
  source = {
    buffer: audio,
    mimetype: mimetype,
  };
}

const path = require('path');
const Bundler = require('parcel-bundler');
const express = require('express');
const app = express();
const port = 3000;

const options = {}; // See options section of api docs, for the possibilities
const entryFiles = path.join(__dirname, '../client/index.html');

// Initialize a new bundler using a file and options
const bundler = new Bundler(entryFiles, options);

async function getTranscription() {
  // Send the audio to Deepgram and get the response
  const response = await deepgram.transcription
  .preRecorded(source, {
    punctuate: true,
    language: "en-US",
  })

  const { transcript } = response.results.channels[0].alternatives[0];

  return transcript;
}

app.get('/get-transcript', async (req, res) => {
  const transcription = await getTranscription()

  res.send(JSON.stringify({transcription}));
})

// Let express use the bundler middleware, this will let Parcel handle every request over your express server
app.use(bundler.middleware());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
