const generateButton = document.getElementById("generateTranscript");
const transcriptionArea = document.querySelector(".transcript");
const urlToTranscribe = document.getElementById("urlToTranscribe");

generateButton.addEventListener("click", async (event) => {
  event.preventDefault();
  const file = encodeURIComponent(urlToTranscribe.value);
  const response = await fetch(`/get-transcript?file=${file}`);
  const { transcription } = await response.json();

  transcriptionArea.innerText = transcription;
});
