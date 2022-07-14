import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

const Charts = () => {
  // const [datas, setDatas] = useState([]);
  // useEffect(() => {
  //   setDatas([avgCals, calories]);
  // }, [avgCals, calories]);
  // console.log(datas);
  const [data, setData] = useState({
    labels: ["Average Calories Burnt", "Your calories"],
    datasets: [
      {
        label: "Daily Stats",
        data: [25, 10],
        backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)"],
      },
    ],
  });
  return (
    <div className="chart card-desc">
      <Bar
        data={data}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};

export default Charts;
