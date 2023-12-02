import React from 'react'
import { Header, Footer } from '../components/layout';
import { getDatabase, ref as dbRef, onValue } from 'firebase/database';
import { GalleryImage } from '../components/gallery/GalleryImage';
import { Carousel, Select } from 'flowbite-react';

const galleryOptions = [
    { value: 'images', label: 'Images', ref: 'images'},
    { value: 'designs', label: 'T-shirt Designs', ref: 'tshirt-designs' },
];

export const Gallery = () => {
    const database = getDatabase();
    const [generations, setGenerations] = React.useState([]);
    const [shirtGenerations, setShirtGenerations] = React.useState(new Map());
    const [gallerySwitch, setGallerySwitch] = React.useState('images');


    React.useEffect(() => {
        if(gallerySwitch === 'images') {
            const generationsRef = dbRef(database, 'generations/images');
            onValue(generationsRef, (snapshot) => {
                const generations = [];
                snapshot.forEach((childSnapshot) => {
                    const childKey = childSnapshot.key;
                    const childData = childSnapshot.val();
                    generations.push({ id: childKey, ...childData });
                });
                setGenerations(generations);
            });
        }
        else if(gallerySwitch === 'designs') {
            const generationsRef = dbRef(database, 'generations/tshirt-designs');
            onValue(generationsRef, (snapshot) => {
                const tshirtGenerations = new Map();
                snapshot.forEach((generationSnapshot) => {
                    const prompt = generationSnapshot.child('prompt').val();
                    const designs = [];
                    generationSnapshot.child('designs').forEach((designSnapshot) => {
                        designs.push(designSnapshot.val());
                    });
                    tshirtGenerations.set(prompt, designs);
                });
                setShirtGenerations(tshirtGenerations);
            });
        }
    }, [database, gallerySwitch]);

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="flex pb-10">
                    <Select
                        sizing={'md'}              
                        onChange={(e) => {
                            console.log(e.target.value)
                            setGallerySwitch(e.target.value)
                        }}
                    >
                        {
                            galleryOptions.map((option) => (
                                <option value={option.value}>{option.label}</option>
                            ))
                        }
                    </Select>
                </div>
                {gallerySwitch === 'images' && <div>
                    {generations.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {generations.map((generation) => (
                                <GalleryImage imageUrl={generation.url} prompt={generation.prompt} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-800 text-2xl font-semibold">No generations yet</p>
                    )}
                </div>}
                {gallerySwitch === 'designs' && <div>
                    {shirtGenerations.size > 0 ? (
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                            {Array.from(shirtGenerations.keys()).map((prompt) => (
                                <div className='pb-6'>
                                    <div className='flex justify-start text-gray-800 text-xl font-semibold pb-4'>
                                        <p>{prompt}</p>
                                    </div>
                                    <div >
                                        <Carousel
                                            pauseOnHover
                                        >
                                            {shirtGenerations.get(prompt).map((design) => (
                                                <GalleryImage imageUrl={design} />
                                            ))}
                                        </Carousel>
                                        
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-800 text-2xl font-semibold">No generations yet</p>
                    )}
                </div>}
            </main>
            <Footer />
        </div>
    )
}