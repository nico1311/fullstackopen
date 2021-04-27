import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Country = ({country, backButtonHandler}) => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    axios.get('http://api.weatherstack.com/current', {
      params: {
        access_key: import.meta.env.VITE_WEATHERSTACK_API_KEY,
        query: country.capital
      }
    }).then((res) => {
      setWeather(res.data.current)
    })
  }, []);

  return (
    <div>
      <h2>{country.name}</h2>
      <button onClick={backButtonHandler}>Go back</button>
      <ul>
        <li><b>Capital</b>: {country.capital}</li>
        <li><b>Region</b>: {country.region}</li>
        <li><b>Population</b>: {country.population}</li>
        <li><b>Country codes</b>: {country.callingCodes.map((code) => <span key={code}>+{code}</span>)}</li>
        <li><b>Timezones</b>: {country.timezones.join(', ')}</li>
        <li><b>Languages</b>:
          <ul>
            {
              country.languages.map((lang) => <li key={lang.iso639_1}>{lang.name}</li>)
            }
          </ul>
        </li>
      </ul>
      <img src={country.flag} width="200" />
      <br />
      {(Object.keys(weather).length > 0) ? 
        <div className="weather">
          <h3>Weather in {country.capital}</h3>
           {weather.weather_icons.map((icon, _index) => <img key={_index} src={icon} />)}
          <ul>
            <li><b>Weather</b>: {weather.weather_descriptions.join(', ')}</li>
            <li><b>Temperature</b>: {weather.temperature} Celsius</li>
            <li><b>Humidity</b>: {weather.humidity}%</li>
            <li><b>Wind</b>: {weather.wind_speed} mph direction {weather.wind_dir}</li>
          </ul>
        </div>:
        <span>Loading weather data...</span>
      }
    </div>
  )
}

function App() {
  const [countries, setCountries] = useState([]);
  const [matchingCountries, setMatchingCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [singleCountry, setSingleCountry] = useState(null);

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((res) => {
      setCountries(res.data);
    })
  }, []);

  const onSearchQueryUpdate = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    if (query.trim()) {
      const filtered = countries.filter((country) => country.name.toLowerCase().includes(query));
      setMatchingCountries(filtered);
    } else setMatchingCountries([]);

    if (singleCountry) setSingleCountry(null);
  }

  const showCountry = (country) => setSingleCountry(country);

  const renderResults = (countries) => {
    if (countries.length < 1) {
      return <span>No matching countries.</span>;
    }
    if (countries.length > 10) {
      return <span>Too many countries. Specify another filter.</span>;
    }

    return (
      <ul>
        {
          matchingCountries.map((country) => {
            return <li key={country.name}>{country.name} <button onClick={() => showCountry(country)}>Show</button></li>;
          })
        }
      </ul>
    )
  }

  const handleBackButton = () => setSingleCountry(null);

  return (
    <div className="App">
      <h2>Find countries:</h2>
      <input value={searchQuery} onChange={onSearchQueryUpdate} />
      <br />
        {singleCountry ? <Country country={singleCountry} backButtonHandler={handleBackButton} /> : renderResults(matchingCountries)}
    </div>
  )
}

export default App
