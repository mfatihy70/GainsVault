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

/**
 * Fetch workouts for a specific split by splitId.
 * Returns an array of workouts belonging to the split.
 */
export const fetchWorkoutsForSplit = async (splitId) => {
  try {
    const response = await axiosInstance.get("/workouts")
    // Filter workouts by split_id
    return response.data.filter((workout) => workout.split_id === splitId)
  } catch (err) {
    throw new Error(err.message)
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

// ============================================
/// Workout Exercises
// ============================================
export const getWorkoutExercises = async (
  workoutId,
  setWorkoutExercises,
  setError,
  setLoading
) => {
  try {
    const response = await axiosInstance.get(`/workout-exercises/workout/${workoutId}`)
    setWorkoutExercises(response.data)
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}
