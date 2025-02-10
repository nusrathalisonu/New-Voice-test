const express = require('express');
const bodyParser = require('body-parser');
const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Google Cloud client setup
const client = new textToSpeech.TextToSpeechClient();

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Endpoint to generate audio from text
app.post('/generate-audio', async (req, res) => {
  const { text, title } = req.body;

  const request = {
    input: { text: text },
    voice: { languageCode: 'en-US', ssmlGender: 'MALE' },
    audioConfig: { audioEncoding: 'MP3' },
  };

  try {
    console.log('Requesting speech synthesis...');
    const [response] = await client.synthesizeSpeech(request);
    console.log('Audio content generated');
    
    const audioFilePath = path.join(__dirname, 'public', 'generated-audio.mp3');
    
    // Save the generated audio file to the public folder
    fs.writeFileSync(audioFilePath, response.audioContent, 'binary');
    console.log('Audio file saved at:', audioFilePath);
    
    res.json({ audioUrl: '/generated-audio.mp3' });
  } catch (error) {
    console.error('Error generating speech:', error);
    res.status(500).send('Failed to generate speech');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
