import React, { useState } from 'react';
import axios from 'axios';
import HomePage from './pages/Home';
import { database } from './firebase';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Gallery } from './pages/Gallery';
import TShirtPage from './pages/TShirt';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tshirt-design" element={<TShirtPage />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
