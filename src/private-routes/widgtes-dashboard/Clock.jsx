import React, { useState, useEffect } from "react";
import { Clock, Sun, Moon } from "lucide-react";
import "./Clock.css";

const ClockWidget = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDayTime, setIsDayTime] = useState(true);
  const [greeting, setGreeting] = useState("Bom dia");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now);

      const hour = now.getHours();
      setIsDayTime(hour >= 6 && hour < 18);

      if (hour >= 5 && hour < 12) setGreeting("Bom dia");
      else if (hour >= 12 && hour < 18) setGreeting("Boa tarde");
      else if (hour >= 18 && hour < 24) setGreeting("Boa noite");
      else setGreeting("Boa madrugada");
    };

    updateTime();

    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  /*   const formatTime = (date) => {
    return date.toLocaleDateString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }; */

  /*   const formatDate = (date) => {
    return date.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }; */

  /*   const getTimeIcon = () => {
    return isDayTime ? (
      <Sun size={24} className="time-icon time-icon-day" />
    ) : (
      <Moon size={24} className="time-icon time-icon-night" />
    );
  }; */

  /*   const getTimeOfDayText = () => {
    const hour = currentTime.getHours();

    if (hour >= 5 && hour < 12) return "Bom dia";
    if (hour >= 12 && hour < 18) return "Boa tarde";
    if (hour >= 18 && hour < 22) return "Boa noite";
    return "Boa madrugada";
  }; */

  return (
    <div className="clock-widget">
      <div className="clock-header">
        <Clock size={20} className="clock-icon" />
        <span className="clock-label">Horário Local</span>
      </div>

      <div className="clock-time">
        {/* {getTimeIcon()} */}
        {isDayTime ? (
          <Sun size={24} className="time-icon time-icon-day" />
        ) : (
          <Moon size={24} className="time-icon time-icon-night" />
        )}
        <div className="time-display">
          {/* {formatTime(currentTime)}</div> */}
          {currentTime.toLocaleDateString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </div>
      </div>

      <div className="clock-date">
        {/* {formatDate(currentTime)}</div> */}
        {currentTime.toLocaleDateString("pt-BR", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </div>

      <div className="time-greeting">
        {/* {getTimeOfDayText()}! {isDayTime ? "☀️" : "🌙"} */}
        {greeting}! {isDayTime ? "☀️" : "🌙"}
      </div>

      <div className="daynight-indicator">
        <span className={`period ${isDayTime ? "active" : ""}`}>Dia</span>
        <span className="separator">|</span>
        <span className={`period ${!isDayTime ? "active" : ""}`}>Noite</span>
      </div>
    </div>
  );
};

export default ClockWidget;
