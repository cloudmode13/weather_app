import React, { useEffect, useState } from 'react';
import '../Styles/Weather_Dashboard.css';
import Current from './Current';
import Forecast from './Forecast';
import IconCircleUser from './Icon';
import Dropdown from 'react-bootstrap/Dropdown';

function Weather_Dashboard() {
  const [city, setCity] = useState('');
  const [citySuggestion, setCitySuggestion] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [current, setCurrent] = useState();
  const [forecast, setForecast] = useState();
  const [location, setLocation] = useState();
  const [user, setUser] = useState('');

  const searchAPI =
    'https://api.weatherapi.com/v1/search.json?key=04d0b26a9b8945a28ed93506241806&q=';

  const weatherURL = (city) =>
    `https://api.weatherapi.com/v1/forecast.json?key=04d0b26a9b8945a28ed93506241806&q=${city}&days=7&aqi=no&alerts=no`;

  const handleClick = async (curCity) => {
    setCity(curCity);
    setClicked(true);
    const resp = await fetch(weatherURL(city));
    const data = await resp.json();
    setCurrent(data?.current);
    setForecast(data?.forecast);
    const locationName = data?.location?.name;
    setLocation(locationName);
  };

  const handleUser = (user) => {
    setUser(user);
  };

  function getCurrentHour() {
    const now = new Date();
    return now.getHours();
  }
  const currentHour = getCurrentHour();
  const startHour = Math.floor(currentHour / 4) * 4;

  useEffect(() => {
    const getDataTimeout = setTimeout(() => {
      const fetchCitySuggestion = async () => {
        const resp = await fetch(searchAPI + city);
        const data = await resp.json();
        const citySuggestData = data.map(
          (e) => `${e.name}, ${e.region}, ${e.country}`,
        );
        setCitySuggestion(citySuggestData);
      };
      if (!clicked && city?.length > 2) {
        fetchCitySuggestion();
      } else {
        setCitySuggestion([]);
        setClicked(false);
      }
    }, 10);
    return () => clearTimeout(getDataTimeout);
  }, [city]);

  useEffect(() => {
    if (city === '') {
      setCurrent();
      setForecast();
    }
  }, [city]);

  return (
    <div className={`dashboard-container ${city ? 'dasboard-height' : ''}`}>
      {/* <div className="dashboard-container"> */}
      <div className="cont-top">
        <h1>Weather Dashboard</h1>
        <Dropdown>
          <Dropdown.Toggle
            variant="primary"
            id="dropdown-basic"
            className="icon-toggle"
          >
            <IconCircleUser className="icon-circle" />
          </Dropdown.Toggle>

          <Dropdown.Menu className="dropdown">
            <Dropdown.Item onClick={() => handleUser('former')}>
              Former
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleUser('traveller')}>
              Traveller
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleUser('event')}>
              Event Handler
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="cont-bottom">
        <input
          type="text"
          className="citytextbox"
          placeholder="enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        {citySuggestion.length > 0 && (
          <div className="suggestion-wrapper">
            {citySuggestion.map((curCity) => (
              <div className="suggestion" onClick={() => handleClick(curCity)}>
                {curCity}
              </div>
            ))}
          </div>
        )}

        {
          <div>
            {user === 'former' ? (
              <div>
                <h1>Former</h1>
              </div>
            ) : user === 'traveller' ? (
              <div>
                <h1>Traveller</h1>
              </div>
            ) : (
              user === 'event' && (
                <div>
                  <h1>Event Handler</h1>
                </div>
              )
            )}
          </div>
        }
        <div className="flex-div">
          {current && <Current current={current} city={location} />}
          {forecast && <Forecast forecast={forecast} city={location} />}
        </div>
      </div>
    </div>
  );
}

export default Weather_Dashboard;
