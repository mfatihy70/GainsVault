import React, { useMemo, useState } from "react"
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
import {
  startOfMonth,
  subMonths,
  isSameMonth,
  isSameYear,
  isWithinInterval,
  parseISO
} from "date-fns"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const getColor = (value) => (value < 0 ? "#ef5350" : "#66bb6a")

const GainsChart = ({ workouts, width = 400, height = 400 }) => {

  const [mode, setMode] = useState("monthly") // "monthly" | "latest"
  const { labels, lastPr, currPr, gainLossRate } = useMemo(() => {
    const exerciseMap = {}

    const now = new Date()
    const currentMonth = startOfMonth(now)
    const previousMonth = startOfMonth(subMonths(now, 1))

    workouts.forEach((workout) => {
      const date = new Date(workout.start)

      workout.exercise_entries.forEach((entry) => {
        const name = entry.exercise?.name || "Unnamed"
        if (selectedExercise !== "All" && selectedExercise !== name) return

        const maxWeight = Math.max(...entry.set_entries.map((s) => s.kg || 0))
        if (!exerciseMap[name]) exerciseMap[name] = { history: [] }

        exerciseMap[name].history.push({ date, maxWeight })
      })
    })

    const labels = Object.keys(exerciseMap)
    const currPr = []
    const lastPr = []

    labels.forEach((label) => {
      const history = exerciseMap[label].history

      if (mode === "monthly") {
        const curr = history.filter(h =>
          isSameMonth(h.date, currentMonth) && isSameYear(h.date, currentMonth)
        ).map(h => h.maxWeight)

        const last = history.filter(h =>
          isSameMonth(h.date, previousMonth) && isSameYear(h.date, previousMonth)
        ).map(h => h.maxWeight)

        currPr.push(curr.length ? Math.max(...curr) : null)
        lastPr.push(last.length ? Math.max(...last) : null)
      }

      if (mode === "latest") {
        const sorted = [...history].sort((a, b) => b.date - a.date)
        currPr.push(sorted[0]?.maxWeight ?? null)
        lastPr.push(sorted[1]?.maxWeight ?? null)
      }
    })

    const gainLossRate = currPr.map((val, i) =>
      val != null && lastPr[i] != null ? val - lastPr[i] : null
    )

    return { labels, lastPr, currPr, gainLossRate }
  }, [workouts, mode])

  const data = {
    labels,
    datasets: [
      {
        label: mode === "monthly" ? "Last Month" : "Previous PR",
        data: lastPr,
        backgroundColor: "#00bcd4"
      },
      {
        label: mode === "monthly" ? "Current Month" : "Latest PR",
        data: currPr,
        backgroundColor: "#ff9800"
      },
      {
        label: "PR Gain/Loss",
        data: gainLossRate,
        backgroundColor: gainLossRate.map(getColor)
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
            if (tooltipItem.dataset.label === "Last Month" || tooltipItem.dataset.label === "Previous PR" || tooltipItem.dataset.label === "Range A") {
              return `Previous: ${lastPr[index]} kg`
            }
            if (tooltipItem.dataset.label === "Current Month" || tooltipItem.dataset.label === "Latest PR" || tooltipItem.dataset.label === "Range B") {
              return `Current: ${currPr[index]} kg`
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
    <div style={{ width: `${width}`, height: `${height}` }}>
      <div className="d-flex justify-content-center align-items-center mb-2">
        <label className="me-2 fw-bold text-light">Compare:</label>
        <select
          className="form-select w-auto bg-dark text-light border-warning"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
        >
          <option value="monthly">Current vs Last Month</option>
          <option value="latest">Latest vs Previous Exercise</option>
        </select>
      </div>
      <Bar data={data} options={options} plugins={[ChartDataLabels]} />
    </div>
  )
}

export default GainsChart
