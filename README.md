# Using Deepgram for speech-to-text

Bekah Hawrot Weigel joins Nick to show how you can transcribe text using Deepgram's Node.js SDK. They go through the demo code all the way to building out an app with Express that allows you to submit a URL for transcription.

![Using Deepgram for speech-to-text with Bekah H. Weigel](https://camo.githubusercontent.com/9104dcf4a696a6002c20ed36510acefbc401feba24779a98dc5ed714dda805a8/68747470733a2f2f69312e7974696d672e636f6d2f76692f7448653279424c685f48632f687164656661756c742e6a7067)

## Installation

1. Create a Deepgram account and API key. See the [official docs](https://developers.deepgram.com/sdks-tools/sdks/node-sdk/) for this. Add the API key to `.env file`, e.g.

```
DEEPGRAM_API_KEY="YOUR_API_KEY"
```

2. Run `npm install` 2. Run `node src/server/server.js
3. Navigate to http://localhost:3000.
