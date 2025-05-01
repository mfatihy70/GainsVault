import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Radar } from "react-chartjs-2";

// Register required components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, Title);

// Muscle groups
const labels = [
  "Chest",
  "Back",
  "Shoulders",
  "Biceps",
  "Triceps",
  "Abs",
  "Glutes",
  "Quads",
  "Hamstrings",
  "Calves",
];

// Example intensity per group (scale of 0-10)
const data = {
  labels,
  datasets: [
    {
      label: "Bench Press",
      data: [9, 2, 6, 1, 7, 1, 0, 0, 0, 0],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      pointBackgroundColor: "rgba(255, 99, 132, 1)",
    },
    {
      label: "Squat",
      data: [0, 1, 0, 0, 1, 2, 9, 9, 8, 5],
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
      pointBackgroundColor: "rgba(54, 162, 235, 1)",
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Muscle Group Engagement per Exercise",
    },
    tooltip: {
      callbacks: {
        label: (context) => `${context.label}: ${context.formattedValue}/10`,
      },
    },
  },
  scales: {
    r: {
      beginAtZero: true,
      max: 10,
    },
  },
};

const MuscleRadarChart = () => {
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Radar data={data} options={options} />
    </div>
  );
};

export default MuscleRadarChart;
