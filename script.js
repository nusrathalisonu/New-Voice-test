document.getElementById('generate-button').addEventListener('click', async () => {
  const text = document.getElementById('text-input').value;
  const title = document.getElementById('audio-title').value;
  
  if (text.trim() === '') {
    alert('Please enter some text.');
    return;
  }
  
  const response = await fetch('/generate-audio', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text, title })
  });
  
  const data = await response.json();
  if (data.audioUrl) {
    document.getElementById('audio-title-display').innerText = title || 'Generated Audio';
    document.getElementById('audio').src = data.audioUrl;  // Make sure this line works
    document.getElementById('audio-player').style.display = 'block';
    document.getElementById('play-button').disabled = false;
  }
});
