import React, { useState, useEffect } from 'react';
import './../Style/CurrencyConverter.css';

const CurrencyConverter = () => {
    const [monedaOne, setMonedaOne] = useState('USD');
    const [monedaTwo, setMonedaTwo] = useState('CLP');
    const [cantidadOne, setCantidadOne] = useState(1);
    const [cantidadTwo, setCantidadTwo] = useState(0);
    const [exchangeRate, setExchangeRate] = useState(null);
    const [fechaActualizacion, setFechaActualizacion] = useState('');
    const [opcionesMonedas, setOpcionesMonedas] = useState([]);

    useEffect(() => {
        fetch(`https://api.exchangerate-api.com/v4/latest/${monedaOne}`)
            .then(res => res.json())
            .then(data => {
                setExchangeRate(data.rates);
                setCantidadTwo((cantidadOne * data.rates[monedaTwo]).toFixed(2));
                setFechaActualizacion(data.date);
                setOpcionesMonedas(Object.keys(data.rates));
            });
    }, [monedaOne, monedaTwo, cantidadOne]);

    const handleSwap = () => {
        const temp = monedaOne;
        setMonedaOne(monedaTwo);
        setMonedaTwo(temp);
    };

    return (
        <div className="container">
            <div className="actualizacion">Actualización: {fechaActualizacion}</div>

            
            <div className="conversor d-flex flex-column flex-md-row align-items-center justify-content-center">
                <div className="d-flex align-items-center">
                    <input type="number" value={cantidadOne} onChange={e => setCantidadOne(e.target.value)} />
                    <select className="mx-2" value={monedaOne} onChange={e => setMonedaOne(e.target.value)}>
                        {opcionesMonedas.map(moneda => (
                            <option key={moneda} value={moneda}>{moneda}</option>
                        ))}
                    </select>
                </div>

                <div className="d-flex align-items-center my-2 my-md-0">
                    <button className="btn btn-primary mx-2" onClick={handleSwap}>&#8596;</button>
                </div>

                <div className="d-flex align-items-center">
                    <select className="mx-2" value={monedaTwo} onChange={e => setMonedaTwo(e.target.value)}>
                        {opcionesMonedas.map(moneda => (
                            <option key={moneda} value={moneda}>{moneda}</option>
                        ))}
                    </select>
                    <input type="number" value={cantidadTwo} disabled />
                </div>
            </div>

            <div className="divisas">
                <h2>Lista de divisas y sus cambios</h2>
                <div className="row">
                    {opcionesMonedas.map(moneda => (
                        <div key={moneda} className="col-lg-3 col-md-4 col-sm-6">
                            <div className="divisa-item">
                                <p>1 {monedaOne} = {exchangeRate && exchangeRate[moneda].toFixed(2)} {moneda}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CurrencyConverter;
