import React, { useMemo, useState, useEffect } from "react"
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
import "chartjs-adapter-date-fns"
import { subWeeks, subMonths, subYears, isAfter } from "date-fns"

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

const WorkoutProgressChart = ({ workouts, width = "500px", height = "100%" }) => {
  const exerciseNames = useMemo(() => {
    const names = new Set()
    workouts.forEach(w =>
      w.exercise_entries.forEach(e => {
        if (e.exercise?.name) names.add(e.exercise.name)
      })
    )
    return Array.from(names)
  }, [workouts])

  const [selectedExercise, setSelectedExercise] = useState("")
  const [timeframe, setTimeframe] = useState("month") // default to month filter

  // Set default selected exercise to first in list once exerciseNames changes
  useEffect(() => {
    if (exerciseNames.length > 0) {
      setSelectedExercise(exerciseNames[0])
    } else {
      setSelectedExercise("")
    }
  }, [exerciseNames])

  // Calculate cutoff date based on timeframe
  const cutoffDate = useMemo(() => {
    const now = new Date()
    switch (timeframe) {
      case "week":
        return subWeeks(now, 1)
      case "month":
        return subMonths(now, 1)
      case "year":
        return subYears(now, 1)
      default:
        return new Date(0) // no filter, show all
    }
  }, [timeframe])

  // Compute PR (max weight in single set) per workout day, filtered by exercise and timeframe
  const chartDataPoints = useMemo(() => {
    return workouts
      .filter(workout => isAfter(new Date(workout.start), cutoffDate))
      .map(workout => {
        let maxWeight = 0
        workout.exercise_entries.forEach(entry => {
          if (entry.exercise?.name !== selectedExercise) return
          entry.set_entries.forEach(set => {
            const kg = Number(set.kg || 0)
            maxWeight = Math.max(maxWeight, kg)
          })
        })
        return maxWeight > 0
          ? { x: new Date(workout.start), y: maxWeight }
          : null
      })
      .filter(Boolean)
  }, [workouts, selectedExercise, cutoffDate])

  const data = {
    datasets: [
      {
        label: selectedExercise
          ? `PR Weight (${selectedExercise})`
          : "No exercise selected",
        data: chartDataPoints,
        borderColor: "#ffc107",
        backgroundColor: "rgba(255, 193, 7, 0.2)",
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: "#ffc107" },
      },
      title: {
        display: true,
        text: "Workout PR Progress Over Time",
        color: "#ffc107",
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
        ticks: {
          color: "#ffc107",
          source: "data",
          autoSkip: true,
        },
        grid: {
          color: "#444",
        },
        title: {
          display: true,
          text: "Date",
          color: "#ffc107",
        },
      },
      y: {
        beginAtZero: true,
        grace: "10%",
        ticks: {
          color: "#ffc107",
        },
        grid: {
          color: "#444",
        },
        title: {
          display: true,
          text: "PR Weight (kg)",
          color: "#ffc107",
        },
      },
    },
  }

  return (
    <div style={{ width: width, height: height }}>
      <h2 className="text-warning">Workout PR Progress Chart</h2>
      <p className="text-secondary">
        This graph displays your personal record (PR) — the maximum weight lifted in a single set — for the selected exercise on each workout day.
        Use the timeframe filter to view your progress over the past week, month, year, or all time.
      </p>

      <div className="d-flex flex-wrap gap-3 justify-content-center align-items-center mb-3">
        {/* Exercise Filter */}
        <div>
          <label htmlFor="exercise-filter" className="form-label fw-bold">
            Exercise:
          </label>
          <select
            id="exercise-filter"
            className="form-select bg-dark text-light border-warning"
            value={selectedExercise}
            onChange={(e) => setSelectedExercise(e.target.value)}
            disabled={exerciseNames.length === 0}
          >
            {exerciseNames.length === 0 ? (
              <option value="" disabled>
                No exercises available
              </option>
            ) : (
              exerciseNames.map(name => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))
            )}
          </select>
        </div>

        {/* Timeframe Filter */}
        <div>
          <label htmlFor="timeframe-filter" className="form-label fw-bold">
            Timeframe:
          </label>
          <select
            id="timeframe-filter"
            className="form-select bg-dark text-light border-warning"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
            <option value="all">All Time</option>
          </select>
        </div>
      </div>
      <Line data={data} options={options} />
    </div>
  )
}

export default WorkoutProgressChart
