import React from "react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js"
import "chartjs-adapter-date-fns" // Add this import for the date adapter

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
)

const WeightChart = ({ weights }) => {
  // Populate the axis data with the weight values
  const yData = weights.map((entry) => entry.value)
  const xData = weights.map((entry) => new Date(entry.date).toISOString())

  // Chart data
  const data = {
    labels: xData, // Set the X-axis labels to the days of the current month
    datasets: [
      {
        label: "Weight in kg",
        data: yData, // Use the generated Y-axis data
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.1,
      },
    ],
  }

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Weight in kg over the current Month",
      },
    },
    animations: {
      tension: {
        duration: 1000,
        easing: "linear",
        from: 0.5,
        to: 0.5,
        loop: true,
      },
    },
    scales: {
      x: {
        type: "time", // Use the time scale for the X-axis
        time: {
          unit: "day", // Set the unit to "day" to display days
          displayFormats: {
            day: "d", // Display just the day number on the X-axis
          },
        },
        title: {
          display: true,
          text: "Day of the Month",
        },
      },
      y: {
        title: {
          display: true,
          text: "Weight in kg",
        },
      },
    },
  }

  return <Line data={data} options={options} />
}

export default WeightChart
