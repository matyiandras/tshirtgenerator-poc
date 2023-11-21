export const Header = () => {
    return (
        <header className="bg-cyan-800 text-white py-8 px-6">
            <div className="flex items-center">
                <p className='font-bold  text-3xl pr-32'>T-shirt generator POC</p>
                <div className="flex gap-8 items-center text-xl">
                    <a href="/" className="text-white hover:underline">Home</a>
                    <a href="/gallery" className="text-white hover:underline">Gallery</a>
                </div>
            </div>
        </header>
    )
}