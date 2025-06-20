import React, { useMemo } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js"
import { Bar } from "react-chartjs-2"
import ChartDataLabels from "chartjs-plugin-datalabels"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const getColor = (value) => (value < 0 ? "#ef5350" : "#66bb6a")

const GainsChart = ({ workouts }) => {

  const { labels, lastPr, currPr, gainLossRate } = useMemo(() => {
    const exerciseMap = {}

    workouts.forEach((workout) => {
      workout.exercise_entries.forEach((entry) => {
        const name = entry.exercise?.name || "Unnamed"
        const maxWeight = Math.max(...entry.set_entries.map((s) => s.kg || 0))

        if (!exerciseMap[name]) {
          exerciseMap[name] = { current: 0 }
        }

        // If there's a heavier set, record it
        if (maxWeight > exerciseMap[name].current) {
          exerciseMap[name].current = maxWeight
        }
      })
    })

    const labels = Object.keys(exerciseMap)
    const currPr = labels.map((label) => exerciseMap[label].current)
    const lastPr = labels.map((label) =>
      Math.max(0, exerciseMap[label].current - Math.floor(Math.random() * 20)) // Simulate last PR
    )
    const gainLossRate = currPr.map((val, i) => val - lastPr[i])

    return { labels, lastPr, currPr, gainLossRate }
  }, [workouts])

  const data = {
    labels,
    datasets: [
      {
        label: "Last Month",
        data: lastPr,
        backgroundColor: "#00bcd4"
      },
      {
        label: "PR Gain/Loss",
        data: gainLossRate,
        backgroundColor: gainLossRate.map(getColor)
      },
      {
        label: "Current Month",
        data: currPr,
        backgroundColor: "#ff9800"
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      title: { display: true, text: "PR Gain/Loss Over Time" },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const index = tooltipItem.dataIndex
            const gain = gainLossRate[index]
            if (tooltipItem.dataset.label === "PR Gain/Loss") {
              return gain < 0
                ? `Loss: ${Math.abs(gain)} kg`
                : `Gain: ${gain} kg`
            }
            if (tooltipItem.dataset.label === "Last Month") {
              return `Last Month PR: ${lastPr[index]} kg`
            }
            if (tooltipItem.dataset.label === "Current Month") {
              return `Current PR: ${currPr[index]} kg`
            }
          }
        }
      },
      datalabels: {
        color: "#fff",
        font: { weight: "bold", size: 12 },
        anchor: "center",
        align: "center"
      }
    },
    scales: {
      x: {
        stacked: false,
        title: { display: true, text: "Exercise" }
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: "Weight (kg)" },
        ticks: { callback: (value) => `${value} kg` }
      }
    }
  }

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Bar data={data} options={options} plugins={[ChartDataLabels]} />
    </div>
  )
}

export default GainsChart
