import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextInput } from 'flowbite-react';
import { getDatabase, ref as dbRef, set } from 'firebase/database';
import { getStorage, ref as strRef, uploadString, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { API_URL } from '../../globals/api';

function DesignImageGenerator() {

    const database = getDatabase();
    const storage = getStorage();

    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setPrompt(e.target.value);
    };

    const handleSubmit = async () => {
        const generationId = uuidv4();
        try {
            //save prompt to database
            const promptRef = dbRef(database, `generations/${generationId}/prompt`);
            set(promptRef, prompt);
        }
        catch (error) {
            console.error('Error saving prompt to database:', error);
        }
        try {
            // Send a POST request to your backend endpoint
            setLoading(true);
            const response = axios.post(`${API_URL}/generate-image`, { prompt }).then((response) => {
                console.log(response);
                // Make sure this matches the key sent from your backend

                const imageName = prompt.replace(/ /g, "-");
                const imageRef = strRef(storage, `images/${imageName}.png`);
                const uploadTask = uploadString(imageRef, response.data.url, 'base64')

                uploadTask.then((snapshot) => {
                    getDownloadURL(snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        setImageUrl(downloadURL);
                        const urlRef = dbRef(database, `generations/${generationId}/url`);
                        set(urlRef, downloadURL);
                        setLoading(false);
                    });
                }
                ).catch((error) => {
                    console.error('Error uploading image:', error);
                });



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
                    <img className='border rounded-xl' src={imageUrl} style={{ maxWidth: '100%' }} />
                ) : (
                    <img className='border rounded-xl' src={"https://placehold.co/512x512"} alt="Generated" style={{ maxWidth: '100%' }} />
                )}
            </div>
            <div className='flex w-full justify-center'>
                <div className='flex gap-4 justify-between py-8 w-[512px]'>
                    <TextInput className='flex flex-1' placeholder='A prompt for the image...' value={prompt} onChange={handleInputChange} />
                    <Button gradientMonochrome="info" isProcessing={loading} processingLabel='Generating...' onClick={handleSubmit}>Generate Image</Button>
                </div>
            </div>
        </div>
    );
}

export default DesignImageGenerator;
