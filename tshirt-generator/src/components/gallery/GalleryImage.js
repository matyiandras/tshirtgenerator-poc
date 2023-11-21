import React from 'react';
import { getDatabase, ref as dbRef, onValue } from 'firebase/database';

export const GalleryImage = ({ imageUrl, prompt }) => {
        return (
            <div className="flex flex-col items-center">
                <div className="w-64 h-64 bg-gray-200 rounded-lg overflow-hidden">
                    <img src={imageUrl} alt={prompt} className="w-full h-full object-cover" />
                </div>
                <p className="text-gray-800 text-lg font-semibold mt-4">{prompt}</p>
            </div>
        )
};