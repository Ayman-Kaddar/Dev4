import './App.css';
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation'
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from "./services/weatherService";
import { useEffect, useState } from "react";
import { data } from 'autoprefixer';


function App() {

  const [query, setQuery] = useState({ q: "reus" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [lang, setLang] = useState("es");
  // const lang = { lang: "es" }


  useEffect(() => {
    const fetchWeater = async () => {
      await getFormattedWeatherData({ ...query, units, lang }).then(
        (data) => {
          setWeather(data);
        });
    }
    fetchWeater();
  }, [query, units]);


  return (
    <div className="mx-auto max-w-screen-md mt-3 py-5 px-16 bg-gradient-to-br from-cyan-800 to-blue-800 h-fir shadow-xl shadow-gray-500">
      {/* <TopButtons setQuery={setQuery} /> */}
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

      {weather && (
        <div>
          <TimeAndLocation weather={weather} />
          <TemperatureAndDetails weather={weather} />

          <Forecast title="Pronóstico por Hora" items={weather.hourly} />
          <Forecast title="Pronóstico diario" items={weather.daily} />
        </div>
      )}

    </div>
  );
}

export default App;
