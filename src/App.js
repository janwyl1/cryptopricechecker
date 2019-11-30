import './App.css';
import React, { useState, useEffect } from 'react';
import {PriceChart, MarketCapChart, GainersChart, LosersChart} from './Chart';
import {Table} from './Table';

// api docs - https://financialmodelingprep.com/developer/docs/#Cryptocurrencies
const API = 'https://financialmodelingprep.com/api/v3/cryptocurrencies';
// const API = 'http://localhost:3000/dummy/cryptocurrencies.json';


/**
    App - fetches currency data
*/
function App() {
    const [currencies, setCurrencies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    async function fetchData(apiUrl) {
        const res = await fetch(apiUrl);
        if (!res.ok) {
            setIsLoading(false);
            setError({ error: { message: 'Unable to load currency data...' } });
            return false;
        }
        const data = await res.json()
        setCurrencies(data.cryptocurrenciesList);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchData(API) 
    }, []) // empty array tells it to run only once (called skipping effects)

    if (isLoading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>Error: {error.message ? error.message : " Something went wrong..."}</p>
    }

    return (
        <>
        <div className="App-header"> 
            <div className="container">
            <h1>Cryptocurrency Prices</h1>
            <p>Price info for 100 of the most popular cryptocurrencies. Data via Financial Modelling Prep API</p>
            </div>
        </div>
        <div className="container">
        <div className="charts">
            <div className="chart-row">
                <MarketCapChart currencies={currencies}/>
                <PriceChart currencies={currencies}/>
            </div>
            <div className="chart-row">
                <GainersChart currencies={currencies}/>
                <LosersChart currencies={currencies} />
            </div>
        </div>
        <Table currencies={currencies} />
        </div>
        </>
    )
}

export default App;