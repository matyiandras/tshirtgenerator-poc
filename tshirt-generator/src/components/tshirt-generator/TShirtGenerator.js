import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextInput } from 'flowbite-react';
import { getDatabase, ref as dbRef, set, push } from 'firebase/database';
import { getStorage, ref as strRef, uploadString, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { API_URL, API_URL_LOCAL} from '../../globals/api';
import { Image } from '../layout/Image';

function TShirtGenerator() {

    const database = getDatabase();
    const storage = getStorage();

    const promptTemplate = 'An abstract design of ';
    const [imageUrls, setImageUrls] = useState([]);
    const [loading, setLoading] = useState(false);
    const [theme, setTheme] = useState();

    const handleInputChange = (e) => {
        setTheme(e.target.value);
    };

    const handleSubmit = async () => {
        const prompt = promptTemplate + theme;
        console.log(prompt);
        setImageUrls([]);
        const generationId = uuidv4();
        try {
            //save prompt to database
            const promptRef = dbRef(database, `generations/tshirt-designs/${generationId}/prompt`);
            set(promptRef, prompt);
        }
        catch (error) {
            console.error('Error saving prompt to database:', error);
        }
        try {
            // Send a POST request to your backend endpoint
            setLoading(true);
            
            const response = axios.post(`${API_URL}/generate-tshirt-designs`, {prompt}).then((response) => {
                console.log(response);
                // Make sure this matches the key sent from your backend

                const imagesName = prompt.replace(/ /g, "-");

                response.data.urls.forEach((url, index) => {
                    const imageRef = strRef(storage, `images/${imagesName}-${index}.png`);
                    const uploadTask = uploadString(imageRef, url, 'base64')

                    uploadTask.then((snapshot) => {
                        getDownloadURL(snapshot.ref).then((downloadURL) => {
                            console.log('File available at', downloadURL);
                            setImageUrls((imageUrls) => [...imageUrls, downloadURL]);
                            const urlRef = dbRef(database, `generations/tshirt-designs/${generationId}/designs`);
                            push(urlRef, downloadURL);
                            setLoading(false);
                        });
                    }
                    ).catch((error) => {
                        console.error('Error uploading image:', error);
                    });
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
                {
                    (
                        imageUrls.length > 0
                    ) ? (
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                            {imageUrls.map((imageUrl, index) => {
                                return (
                                    
                                        <Image imageURL={imageUrl} size='512x512' />
                                    
                                )
                            })}
                        </div>
                    ) : (
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                            <Image imageURL={null} size='512x512' />
                            <Image imageURL={null} size='512x512' />
                            <Image imageURL={null} size='512x512' />
                            <Image imageURL={null} size='512x512' />
                        </div>
                    )
                }
            </div>
            <div className='flex w-full justify-center'>
                <div className='w-full flex flex-col gap-4 justify-between py-8 md:flex-row lg:w-3/5'>
                    <TextInput className='flex-auto w-full' value={theme} placeholder='A theme for the designs...' onChange={handleInputChange} />
                    <Button className='flex-auto md:w-64' gradientMonochrome="info" isProcessing={loading} processingLabel='Generating...' onClick={handleSubmit}>Generate Designs</Button>
                </div>
            </div>
        </div>
    );
}

export default TShirtGenerator;
