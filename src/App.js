import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDashboard from './components/ProductDashboard';
import ProductDetails from './components/ProductDetails';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        {/* Main product dashboard */}
        <Routes>
          <Route path="/" element={<ProductDashboard />} />
          {/* Product details route */}
          <Route path="/product/:productId" element={<ProductDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
