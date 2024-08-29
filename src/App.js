import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './pages/Header'; // Adjust the path if necessary
import Home from './pages/Home'; // Adjust the path if necessary
import Shop from './pages/Shop';
import About from './pages/About'; 
import Contact from './pages/Contact';// Adjust the path if necessary
import Cart from './Cart'; // Create a Cart component to view cart items
import { CartProvider } from './CartContext'; // Import CartProvider
import './index.css';
import Footer from './pages/Footer';

const App = () => (
  <CartProvider>
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} /> {/* Add route for Cart */}
        </Routes>
      </main>
      <Footer/>
    </div>
  </CartProvider>
);

export default App;
