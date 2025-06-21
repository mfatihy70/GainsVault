import React, { useMemo, useState, useEffect } from "react"
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Title,
} from "chart.js"
import { Radar } from "react-chartjs-2"
import { getMuscleGroups } from "../utils/exercise"
import { Button } from "react-bootstrap"

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Title
)

const MuscleRadarChart = ({ workouts = [], width = 400, height = 400 }) => {
  const [muscleGroups, setMuscleGroups] = useState([])
  const [selectedExercises, setSelectedExercises] = useState([])

  // Get all unique exercise names from workouts
  const allExerciseNames = useMemo(() => {
    const names = new Set()
    workouts.forEach(w =>
      w.exercise_entries.forEach(e => {
        if (e.exercise?.name) names.add(e.exercise.name)
      })
    )
    return Array.from(names).sort()
  }, [workouts])

  // Set initial selected exercises to all
  useEffect(() => {
    if (allExerciseNames.length > 0 && selectedExercises.length === 0) {
      setSelectedExercises(allExerciseNames)
    }
  }, [allExerciseNames])

  // Fetch muscle groups
  useEffect(() => {
    getMuscleGroups(
      setMuscleGroups,
      () => { },
      (err) => console.error(err)
    )
  }, [])

  // Toggle exercise in selection
  const toggleExercise = (name) => {
    setSelectedExercises((prev) =>
      prev.includes(name)
        ? prev.filter((n) => n !== name)
        : [...prev, name]
    )
  }

  const { labels, chartData } = useMemo(() => {
    if (!muscleGroups.length || !selectedExercises.length) {
      return { labels: [], chartData: { labels: [], datasets: [] } }
    }

    const combinedMuscleLoads = {}

    workouts.forEach((workout) => {
      workout.exercise_entries.forEach((entry) => {
        const name = entry.exercise?.name
        if (!name || !selectedExercises.includes(name)) return

        const muscles = [entry.exercise?.primary, entry.exercise?.secondary].filter(Boolean)
        const totalLoad = entry.set_entries.reduce((sum, set) => {
          return sum + (Number(set.kg || 0) * Number(set.reps || 0))
        }, 0)

        muscles.forEach((muscle) => {
          combinedMuscleLoads[muscle] = (combinedMuscleLoads[muscle] || 0) + totalLoad
        })
      })
    })

    const raw = muscleGroups.map((muscle) => combinedMuscleLoads[muscle] || 0)
    const maxLoad = Math.max(...raw, 1)
    const logMax = Math.log10(maxLoad + 1)
    const normalized = raw.map((v) => Math.round(Math.log10(v + 1) / logMax * 10))

    const color = getRandomColor()

    return {
      labels: muscleGroups,
      chartData: {
        labels: muscleGroups,
        datasets: [
          {
            label: "Total Muscle Engagement",
            data: normalized,
            backgroundColor: color.bg,
            borderColor: color.border,
            pointBackgroundColor: color.border,
            fill: true,
          },
        ],
      },
    }
  }, [workouts, muscleGroups, selectedExercises])

  const options = {
    responsive: true,
    animation: false,
    plugins: {
      title: {
        display: true,
        text: "Muscle Group Engagement",
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.label}: ${ctx.formattedValue}/10`,
        },
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 10,
        ticks: {
          stepSize: 2,
          color: "#000", // white tick labels
        },
        grid: {
          color: "#888", // white circular grid lines
        },
        angleLines: {
          color: "#888", // white radial lines from center
        },
        pointLabels: {
          color: "#fdd835", // white labels around the radar
        },
      },
    },
  }

  return (
    <div style={{ width: `${width}`, height: `${height}` }}>
      <h2 className="text-center text-warning mb-3">Muscle Radar</h2>
      <p className="text-center text-secondary mb-4">
        The Muscle Radar shows how much each muscle is worked this month. Scores from 0 to 10 help you see which muscles get the most focus and track your training balance.
      </p>

      <div className="mb-4 d-flex flex-wrap gap-2 justify-content-center">
        {allExerciseNames.map((name) => (
          <label key={name} className="form-check-label">
            <input
              type="checkbox"
              className="form-check-input me-1"
              checked={selectedExercises.includes(name)}
              onChange={() => toggleExercise(name)}
            />
            {name}
          </label>
        ))}
      </div>

      <Button
        className="btn-sm mb-4"
        checked={selectedExercises.length === allExerciseNames.length}
        onClick={() =>
          setSelectedExercises(
            selectedExercises.length === allExerciseNames.length ? [] : allExerciseNames
          )
        }
      >
        {selectedExercises.length === allExerciseNames.length ? "Deselect All" : "Select All"}
      </Button>

      {selectedExercises.length > 0 ? (
        <Radar data={chartData} options={options} />
      ) : (
        <h2 className="alert alert-danger">No Exercises Selected!</h2>
      )}
    </div>
  )
}

function getRandomColor() {
  const r = Math.floor(Math.random() * 156 + 100)
  const g = Math.floor(Math.random() * 156 + 100)
  const b = Math.floor(Math.random() * 156 + 100)
  return {
    border: `rgb(${r},${g},${b})`,
    bg: `rgba(${r},${g},${b}, 0.2)`,
  }
}

export default MuscleRadarChart
