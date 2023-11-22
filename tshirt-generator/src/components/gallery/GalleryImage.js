import React from 'react';
import { getDatabase, ref as dbRef, onValue } from 'firebase/database';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

export const GalleryImage = ({ imageUrl, prompt }) => {
        return (
            <div className="flex flex-col items-center">
                <div className="w-64 h-64 bg-gray-200 rounded-lg overflow-hidden">
                    <Zoom>
                        <img src={imageUrl} alt={prompt} className="w-full h-full object-cover" />
                    </Zoom>
                </div>
                <p className="text-gray-800 text-lg font-semibold mt-4">{prompt}</p>
            </div>
        )
};