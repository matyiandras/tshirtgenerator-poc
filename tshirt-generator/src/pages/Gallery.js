import React from 'react'
import { Header, Footer } from '../components/layout';
import { getDatabase, ref as dbRef, onValue } from 'firebase/database';
import { GalleryImage } from '../components/gallery/GalleryImage';

export const Gallery = () => {
    const database = getDatabase();
    const [generations, setGenerations] = React.useState([]);

    React.useEffect(() => {
        const generationsRef = dbRef(database, 'generations');
        onValue(generationsRef, (snapshot) => {
            const generations = [];
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                generations.push({ id: childKey, ...childData });
            });
            setGenerations(generations);
        });
    }, [database]);

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
                {generations.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {generations.map((generation) => (
                            <GalleryImage imageUrl={generation.url} prompt={generation.prompt} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-800 text-2xl font-semibold">No generations yet</p>
                )}
            </main>
            <Footer />
        </div>
    )
}