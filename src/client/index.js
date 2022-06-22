const generateButton = document.getElementById('generateTranscript');
const transcriptionArea = document.getElementById('transcript');

generateButton.addEventListener('click', async event => {
  event.preventDefault();

  const response = await fetch('/get-transcript');
  const { transcription } = await response.json();

  transcriptionArea.innerText = transcription;
})