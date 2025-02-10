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
    document.getElementById('audio').src = data.audioUrl;
    document.getElementById('audio-player').style.display = 'block';
    document.getElementById('play-button').disabled = false;
  }
});

document.getElementById('play-button').addEventListener('click', () => {
  const audio = document.getElementById('audio');
  audio.play();
  document.getElementById('pause-button').disabled = false;
});

document.getElementById('pause-button').addEventListener('click', () => {
  const audio = document.getElementById('audio');
  audio.pause();
  document.getElementById('pause-button').disabled = true;
});

document.getElementById('volume-control').addEventListener('input', (event) => {
  const audio = document.getElementById('audio');
  audio.volume = event.target.value / 100;
});

document.getElementById('download-button').addEventListener('click', () => {
  const audio = document.getElementById('audio');
  const link = document.createElement('a');
  link.href = audio.src;
  link.download = 'generated-audio.mp3';
  link.click();
});
