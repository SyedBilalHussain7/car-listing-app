import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PostCar from './pages/PostCar';
import CarDetail from './pages/CarDetail';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<PostCar />} />
        <Route path="/car/:id" element={<CarDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;