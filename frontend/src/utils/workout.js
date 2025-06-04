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
  }
  finally {
    setLoading(false)
  }
}

export const getWorkoutsForSplit = async (splitId, setWorkouts, setError, setLoading) => {
  try {
    // Fetch all workouts and filter by splitId (foreign key)
    getWorkouts((workouts) => {
      workouts = workouts.filter(workout => workout.split_id == splitId)
      setWorkouts(workouts)
    }, setError, setLoading)
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}

// ============================================
/// Workout Exercises
// ============================================
export const getWorkoutExercises = async (setWorkoutExercises, setError, setLoading) => {
  try {
    const response = await axiosInstance.get(`/workout-exercises`)
    setWorkoutExercises(response.data)
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}

