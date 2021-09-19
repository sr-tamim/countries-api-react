
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <div style={{ textAlign: 'center' }}>
        <h1>Countries API <sub style={{ fontSize: '16px', fontWeight: 'normal' }}>made using React.js</sub></h1>
        <input type="text" id="searchInput" placeholder="type country name here" />
        <input type="button" value="Search" id="searchBut" />
      </div>
      <div className="container">
        <Countries></Countries>
      </div>
    </div>
  );
}



const Countries = () => {
  const [countries, setCountries] = useState([]);

  useEffect(getCountries, []);

  setTimeout(() => {
    { document.getElementById('searchBut').addEventListener('click', getCountries) };
    { document.getElementById('searchInput').addEventListener('change', getCountries) };
  }, 1000)

  function getCountries() {
    setCountries([]);
    let searched = document.getElementById('searchInput').value;
    if (searched === '') { searched = 'Bangladesh' };
    const url = `https://restcountries.eu/rest/v2/name/${searched}`;
    fetch(url).then(r => r.json()).then(d => setCountries(d));
  }

  if (countries.length > 0) {
    return (
      countries.map(country => {
        return (
          <div className="country">
            <img src={country.flag} />
            <h3 style={{ margin: '10px 0' }}>
              {country.name} ({country.nativeName})
            </h3>
            <p style={{ margin: '0', fontSize: '17px' }}>
              <b>Region:</b> {country.region} <br />
              <b>Sub-region:</b> {country.subregion} <br />
              <b>Capital:</b> {country.capital} <br />
              <b>Population:</b> {country.population} <br />
              <b>Languages:</b> {country.languages.map(lg => lg.name).join(', ')} <br />
              <b>Currencies:</b> {country.currencies.map(currency => currency.name + '(' + currency.code + ')').join(', ')} <br />
              <b>Calling-codes:</b> {country.callingCodes.join(', ')}
            </p>
          </div>
        )
      })
    )
  } else if (countries.length === 0) { return <h2>Loading...</h2> }
  else if (countries.status === 404) { return <h2>Nothing found..!</h2> }
}

export default App;
