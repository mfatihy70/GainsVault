import axiosInstance from "./axios"

export const getWorkouts = async (setWorkouts, setError, setLoading) => {
  setLoading(true)
  try {
    const response = await axiosInstance.get("/workouts")
    setWorkouts(response.data)
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}

export const getWorkoutById = async (id, setWorkout, setError, setLoading) => {
  try {
    const response = await axiosInstance.get(`/workouts/${id}`)
    setWorkout(response.data)
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}

export const getWorkoutsForSplit = async (
  splitId,
  setWorkouts,
  setError,
  setLoading
) => {
  try {
    // Fetch all workouts and filter by splitId (foreign key)
    getWorkouts(
      (workouts) => {
        workouts = workouts.filter((workout) => workout.split_id == splitId)
        setWorkouts(workouts)
      },
      setError,
      setLoading
    )
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}

export const getWorkoutExercises = async (
  setWorkoutExercises,
  setError,
  setLoading
) => {
  try {
    const response = await axiosInstance.get(`/workout-exercises`)
    setWorkoutExercises(response.data)
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}

export const createWorkout = async (workout, setError, setLoading) => {
  try {
    await axiosInstance.post("/workouts", {
      ...workout,
      default: false, // explicitly ensure it's user-defined
    })
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}

// Get workout exercises by workout ID (with full exercise data)
export const getWorkoutExercisesByWorkoutId = async (
  workoutId,
  setWorkoutExercises,
  setError,
  setLoading
) => {
  try {
    const response = await axiosInstance.get(
      `/workout-exercises/workout/${workoutId}`
    )
    setWorkoutExercises(response.data)
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}

export const getSplitFromWorkoutId = async (workoutId) => {
  const res = await fetch(`/api/workouts/${workoutId}/split`)
  if (!res.ok) throw new Error("Failed to fetch split")
  return await res.json()
}
