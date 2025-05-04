import React, { useEffect, useState } from "react"
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

const generateDatesForCurrentMonth = () => {
  const dates = []
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const lastDay = new Date(year, month + 1, 0).getDate()

  for (let day = 1; day <= lastDay; day++) {
    const date = new Date(year, month, day)
    dates.push(date.toISOString()) // Use ISO format for time scale
  }

  return dates
}

// Generate the labels for the X-axis (days of the current month)
const currentMonthDates = generateDatesForCurrentMonth()

// Example Y-axis data (randomized for demonstration)
const yData = currentMonthDates.map(() => Math.floor(Math.random() * 10) + 50) // Random data for the sake of example
// Chart data
const data = {
  labels: currentMonthDates, // Set the X-axis labels to the days of the current month
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

const WeightChart = () => (
  <div style={{ width: "100%", height: "400px" }}>
    <Line data={data} options={options} />
  </div>
)

export default WeightChart
