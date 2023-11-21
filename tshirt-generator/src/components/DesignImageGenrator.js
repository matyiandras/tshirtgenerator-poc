import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextInput } from 'flowbite-react';
import { database } from '../../firebase';

function DesignImageGenerator() {
    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setPrompt(e.target.value);
    };

    const handleSubmit = async () => {

        // Save the prompt to the database
        const promptRef = database.ref('prompts');
        promptRef.push(prompt);

        try {
            // Send a POST request to your backend endpoint
            setLoading(true);
            const response = axios.post('http://localhost:3001/generate-image', { prompt }).then((response) => {
                console.log(response);
                setImageUrl(response.data.image_url); // Make sure this matches the key sent from your backend
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                setLoading(false);
            });

        } catch (error) {
            console.error('Error fetching image:', error);
        }
    };

    return (
        <div>
            <div className='flex justify-center'>
                {imageUrl ? (
                    <img className='border rounded-xl' src={imageUrl} alt="Generated" style={{ maxWidth: '100%' }} />
                ) : (
                    <img className='border rounded-xl' src={"https://placehold.co/512x512"} alt="Generated" style={{ maxWidth: '100%' }} />
                )}
            </div>
            <div className='flex w-full justify-center'>
                <div className='flex gap-4 justify-between py-8 w-[512px]'>
                    <TextInput className='flex flex-1' value={prompt} onChange={handleInputChange} />
                    <Button gradientMonochrome="info" isProcessing={loading} processingLabel='Generating...' onClick={handleSubmit}>Generate Image</Button>
                </div>
            </div>
        </div>
    );
}

export default DesignImageGenerator;
