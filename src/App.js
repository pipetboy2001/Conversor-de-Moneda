import React from 'react';
import Header from './Components/Header';
import CurrencyConverter from './Components/CurrencyInput';
import Footer from './Components/Footer';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <CurrencyConverter />
      <Footer />
    </div>
  );
}

export default App;
