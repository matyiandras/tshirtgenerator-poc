import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleInputChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      // Send a POST request to your backend endpoint
      const response = await axios.post('http://localhost:3001/generate-image', { prompt });
      
      // The backend returns the URL of the generated image
      setImageUrl(response.data.image_url); // Make sure this matches the key sent from your backend
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  return (
    <div>
      <input type="text" value={prompt} onChange={handleInputChange} />
      <button onClick={handleSubmit}>Generate Image</button>
      {imageUrl && <img src={imageUrl} alt="Generated" style={{ maxWidth: '100%' }} />}
    </div>
  );
}

export default App;
