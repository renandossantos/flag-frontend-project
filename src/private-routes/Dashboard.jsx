import React from "react";

import "./Dashboard.css";
import WeatherWidget from "./widgtes-dashboard/Weather";
import ClockWidget from "./widgtes-dashboard/Clock";
import Treinos from "./treinos/Treinos";
import StreakWidget from "./widgtes-dashboard/Streak";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1 className="dashboard-titulo">Treinos</h1>

      <aside className="sidebar-widgets">
        {/* <div className="widget">
          <StreakWidget />
        </div> */}

        <div className="widget">
          <ClockWidget />
        </div>

        <div className="widget">
          <WeatherWidget />
        </div>
      </aside>

      <main className="widgets-main">
        <StreakWidget />
        <Treinos />
      </main>
    </div>
  );
};

export default Dashboard;
