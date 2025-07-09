import React, { useState, useEffect } from "react";
import { Sun, Cloud, CloudRain, MapPin } from "lucide-react";
import "./Weather.css";

const WeatherWidget = ({ isDayTime }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentIsDayTime, setCurrentIsDayTime] = useState(true);

  const API_KEY = "c8b06bae68a57b282bfb66daebd9a896";
  const BASE_URL = "https://api.openweathermap.org/data/2.5";

  useEffect(() => {
    getLocationAndWeather();
  }, []);

  useEffect(() => {
    const checkDayTime = () => {
      const now = new Date();
      const hour = now.getHours();
      const calculatedIsDayTime = hour >= 6 && hour < 18;
      setCurrentIsDayTime(calculatedIsDayTime);
    };

    if (isDayTime === undefined) {
      checkDayTime();
      const interval = setInterval(checkDayTime, 60000);
      return () => clearInterval(interval);
    } else {
      setCurrentIsDayTime(isDayTime);
    }
  }, [isDayTime]);

  const getLocationAndWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        (error) => {
          console.log("Erro de geolocalização:", error);
          // Fallback para Lisboa como padrão
          fetchWeatherByCity("Lisboa");
        }
      );
    } else {
      // Fallback para Lisboa se geolocalização não for suportada
      fetchWeatherByCity("Lisboa");
    }
  };

  const transformWeatherData = (data) => {
    return {
      location: { name: data.name },
      current: {
        temp_c: data.main.temp,
        feelslike_c: data.main.feels_like,
        condition: { text: data.weather[0].description },
        humidity: data.main.humidity,
        wind_kph: data.wind.speed * 3.6,
      },
    };
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt`
      );

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const data = await response.json();
      setWeather(transformWeatherData(data));
      setLoading(false);
    } catch (err) {
      console.error("Erro ao buscar dados do clima:", err);
      setError("Erro ao buscar dados do clima. Tente novamente mais tarde.");
      setLoading(false);
    }
  };

  const fetchWeatherByCity = async (city) => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pt`
      );

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const data = await response.json();
      setWeather(transformWeatherData(data));
      setLoading(false);
    } catch (err) {
      console.error("Erro ao buscar dados do clima:", err);
      setError("Erro ao buscar dados do clima. Tente novamente mais tarde.");
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition) => {
    const conditionLower = condition.toLowerCase();
    if (
      conditionLower.includes("sol") ||
      conditionLower.includes("clear") ||
      conditionLower.includes("céu limpo")
    ) {
      return <Sun size={32} className="weather-icon weather-icon-sun" />;
    } else if (
      conditionLower.includes("chuva") ||
      conditionLower.includes("rain") ||
      conditionLower.includes("chuvoso")
    ) {
      return <CloudRain size={32} className="weather-icon weather-icon-rain" />;
    } else {
      return <Cloud size={32} className="weather-icon weather-icon-cloud" />;
    }
  };

  const getTrainingTip = (temperature) => {
    const baseMessage =
      temperature > 25
        ? "Temperatura alta! Leve bastante água e evite as horas mais quentes."
        : temperature < 15
        ? "Temperatura baixa! Use roupas adequadas para aquecimento."
        : "Temperatura ideal para treinar! Aproveite!";

    // Adiciona dica baseada no período do dia
    const timeMessage = currentIsDayTime
      ? " Melhor período para treinar ao ar livre."
      : " Considere treinar em local coberto ou com boa iluminação.";

    return baseMessage + timeMessage;
  };

  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard-titulo">Carregando clima...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <div className="error">{error}</div>
        <button onClick={getLocationAndWeather} className="retry-button">
          Tente novamente
        </button>
      </div>
    );
  }

  return (
    <div className="weather-dashboard">
      {weather && (
        <div className="weather-widget">
          {/* Localização */}
          <div className="weather-location">
            <MapPin size={18} className="location-icon" />
            <span>{weather.location.name}</span>
          </div>

          {/* Ícone e Temperatura Principal */}
          <div className="weather-main">
            {getWeatherIcon(weather.current.condition.text)}
            <div className="temperature-main">
              {Math.round(weather.current.temp_c)}°C
            </div>
            {/* Indicador de período do dia */}
            <div className="day-night-indicator">
              {currentIsDayTime ? "☀️ Dia" : "🌙 Noite"}
            </div>
          </div>

          {/* Sensação Térmica */}
          <div className="feels-like">
            <strong>
              Sensação: {Math.round(weather.current.feelslike_c)}°C
            </strong>
          </div>

          {/* Condição */}
          <p className="weather-condition">{weather.current.condition.text}</p>

          {/* Informações adicionais */}
          <div className="weather-details">
            <div className="detail-item">
              <span className="detail-label">Umidade:</span>
              <span className="detail-value">{weather.current.humidity}%</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Vento:</span>
              <span className="detail-value">
                {Math.round(weather.current.wind_kph)} km/h
              </span>
            </div>
          </div>

          {/* Dica para treino */}
          <div className="training-tip">
            <strong>💡 Dica para treino:</strong>
            <br />
            {getTrainingTip(weather.current.temp_c)}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
