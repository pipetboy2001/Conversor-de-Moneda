import React, { useState, useEffect } from 'react';

const CurrencyConverter = () => {
  const [monedaOne, setMonedaOne] = useState('USD');
  const [monedaTwo, setMonedaTwo] = useState('EUR');
  const [cantidadOne, setCantidadOne] = useState(1);
  const [cantidadTwo, setCantidadTwo] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(null);

  useEffect(() => {
    calculate();
  }, [monedaOne, monedaTwo, cantidadOne]);

  const calculate = () => {
    fetch(`https://api.exchangerate-api.com/v4/latest/${monedaOne}`)
      .then(res => res.json())
      .then(data => {
        const taza = data.rates[monedaTwo];
        setExchangeRate(taza);
        setCantidadTwo((cantidadOne * taza).toFixed(2));
      });
  };

  const handleSwap = () => {
    const temp = monedaOne;
    setMonedaOne(monedaTwo);
    setMonedaTwo(temp);
  };

  return (
    <div className="container">
      
      
      <div className="moneda">
        <select value={monedaOne} onChange={e => setMonedaOne(e.target.value)}>
          <option value="AED">AED</option>
          <option value="ARS">ARS</option>
          {/* Agrega el resto de las opciones aquí */}
        </select>
        <input type="number" value={cantidadOne} onChange={e => setCantidadOne(e.target.value)} />
      </div>

      <div className="taza-cambio-container">
        <button className="btn" onClick={handleSwap}>
          Cambio
        </button>
        <div className="cambio">1 {monedaOne} = {exchangeRate} {monedaTwo}</div>
      </div>

      <div className="moneda">
        <select value={monedaTwo} onChange={e => setMonedaTwo(e.target.value)}>
            <option value="AED">AED</option>
            <option value="ARS">ARS</option>
        </select>
        <input type="number" value={cantidadTwo} readOnly />
      </div>
    </div>
  );
};

export default CurrencyConverter;
