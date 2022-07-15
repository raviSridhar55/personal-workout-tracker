import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const LineCharts = () => {
  const [lineData] = useState({
    labels: ["Day-1", "Day-2", "Day-3", "Day-4", "Day-5", "Day-6"],
    datasets: [
      {
        label: "Daily Stats",
        data: [25, 35, 30, 45, 60, 42],
      },
    ],
  });
  return (
    <div className="chart card-desc">
      <Line
        data={lineData}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};

export default LineCharts;
