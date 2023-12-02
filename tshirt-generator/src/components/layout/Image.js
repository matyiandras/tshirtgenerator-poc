import Zoom from 'react-medium-image-zoom'

export const Image = ({ imageURL, size }) => {
    return (
        <div>
            {imageURL ? (
                <Zoom>
                    <img className='border rounded-xl' src={imageURL} style={{ maxWidth: '100%' }} />
                </Zoom>

            ) : (
                <img className='border rounded-xl' src={`https://placehold.co/${size}`} alt="Generated" style={{ maxWidth: '100%' }} />
            )}
        </div>
    )
}