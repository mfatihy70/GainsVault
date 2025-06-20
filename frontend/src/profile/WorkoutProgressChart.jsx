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

  // Set default selected exercise to first in list once exerciseNames changes
  useEffect(() => {
    if (exerciseNames.length > 0) {
      setSelectedExercise(exerciseNames[0])
    } else {
      setSelectedExercise("")
    }
  }, [exerciseNames])

  const chartDataPoints = useMemo(() => {
    return workouts
      .map((workout) => {
        let total = 0
        workout.exercise_entries.forEach((entry) => {
          const name = entry.exercise?.name || "Unnamed"
          if (name !== selectedExercise) return
          entry.set_entries.forEach((set) => {
            const kg = Number(set.kg || 0)
            const reps = Number(set.reps || 0)
            total += kg * reps
          })
        })

        return total > 0
          ? { x: new Date(workout.start), y: total }
          : null
      })
      .filter(Boolean) // remove nulls
  }, [workouts, selectedExercise])

  const data = {
    datasets: [
      {
        label: selectedExercise
          ? `Total Weight (${selectedExercise})`
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
        text: "Workout Progress Over Time",
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
          autoSkip: false,
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
          text: "Total Weight (kg)",
          color: "#ffc107",
        },
      },
    },
  }

  return (
    <div style={{ width: `${width}`, height: `${height}` }}>
      <h2 className="text-warning">Workout Progress Chart (PR)</h2>
      <p className="text-secondary">
        This graph shows your total weight lifted per workout day, helping you track progress and spot trends over time for specific
        exercises.
      </p>
      <div className="mb-3">
        <label htmlFor="exercise-filter" className="form-label text-warning">
          Filter by Exercise:
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
            exerciseNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))
          )}
        </select>
      </div>
      <Line data={data} options={options} />
    </div>
  )
}

export default WorkoutProgressChart
