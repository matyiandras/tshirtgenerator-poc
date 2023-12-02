import React from 'react';
import TShirtGenerator from '../components/tshirt-generator/TShirtGenerator';
import { Header, Footer } from '../components/layout';

function TShirtPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <TShirtGenerator />
      </main>
      <Footer />
    </div>
  );
}

export default TShirtPage;
