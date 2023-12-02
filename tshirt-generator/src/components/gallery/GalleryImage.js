import React from 'react';
import { getDatabase, ref as dbRef, onValue } from 'firebase/database';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { Button, Tooltip } from 'flowbite-react';
import { ArrowDownIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline';

export const GalleryImage = ({ imageUrl, prompt }) => {

    const handleDelete = () => {
        console.log('delete');
    }

    return (
        <div className="flex flex-col items-center bg-white p-2 rounded-xl shadow-lg">
            <div className="bg-gray-200 rounded-lg overflow-hidden">
                <Zoom>
                    <img src={imageUrl} alt={prompt} className="w-full h-full object-cover" style={{ maxWidth: '100%' }} />
                </Zoom>
            </div>
            <div className='flex justify-between w-full mt-4'>
                <p className="text-gray-800 text-lg font-semibold">{prompt}</p>
                <Tooltip
                    trigger='click'
                    style='light'
                    arrow={false}
                    placement='bottom'
                    content={
                        <div className='flex flex-col gap-2 text-lg'>
                            <div className='flex items-center'>
                                <a className='text-gray-600' href={imageUrl} download>Download</a>
                            </div>
                            {/* <hr />
                            <div className='flex items-center cursor-pointer' onClick={handleDelete}>
                                <p className='text-red-600'>Delete</p>
                            </div> */}
                        </div>
                    }
                >
                    <EllipsisHorizontalIcon className='h-8 w-8 text-gray-800' />
                </Tooltip>
            </div>

        </div>
    )
};