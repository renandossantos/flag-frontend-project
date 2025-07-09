import React from "react";

import "./Dashboard.css";
import WeatherWidget from "./widgtes-dashboard/Weather";
import ClockWidget from "./widgtes-dashboard/Clock";
import Treinos from "./treinos/Treinos";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1 className="dashboard-titulo">Treinos</h1>

      <aside className="sidebar-widgets">
        <div className="widget">
          <ClockWidget />
        </div>

        <div className="widget">
          <WeatherWidget />
        </div>
      </aside>

      <main className="widgets-main">
        <Treinos />
      </main>
    </div>
  );
};

export default Dashboard;
