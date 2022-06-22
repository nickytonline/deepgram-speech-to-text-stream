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

// Send the audio to Deepgram and get the response
deepgram.transcription
  .preRecorded(source, {
    punctuate: true,
    language: "en-US",
  })
  .then((response) => {
    // Write the response to the console
    // console.dir(response, { depth: null });

    // Write only the transcript to the console
    console.dir(response.results.channels[0].alternatives[0].transcript, { depth: null });
  })
  .catch((err) => {
    console.log(err);
  });
