import React from 'react';
import DesignImageGenerator from '../components/DesignImageGenrator';

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-cyan-800 text-white text-3xl py-8 px-6">
        <p className='font-bold'>T-shirt generator POC</p>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <DesignImageGenerator />
      </main>
      <footer className="bg-cyan-800 text-white text-center py-4">
        <p>© 2023 T-shirt Generator POC, András Mátyás.</p>
      </footer>
    </div>
  );
}

export default HomePage;
