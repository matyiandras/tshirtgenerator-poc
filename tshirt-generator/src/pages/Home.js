import React from 'react';
import DesignImageGenerator from '../components/home/DesignImageGenrator';
import { Header, Footer } from '../components/layout';

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <DesignImageGenerator />
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
