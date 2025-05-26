import axiosInstance from "./axios"

export const getExercises = async (setExercises, setError, setLoading) => {
  try {
    const response = await axiosInstance.get("/exercises")
    setExercises(response.data)
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}
export const getSplits = async (setSplits, setError, setLoading) => {
  setLoading(true)
  try {
    const response = await axiosInstance.get("/splits")
    setSplits(response.data)
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}
export const getSplitById = async (id, setSplit, setError, setLoading) => {
  try {
    const response = await axiosInstance.get(`/splits/${id}`)
    setSplit(response.data)
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}
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
    // Fetch all workouts and filter by splitId
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
export const getExercisesForWorkout = async (workoutId, setExercises, setError, setLoading) => {
  try {
    console.log("Fetching exercises for workout ID:", workoutId)
    getWorkoutExercises((workoutExercises) => {
      console.log("Workout Exercises", workoutExercises)
      // Filter exercises for the specific workout
      workoutExercises = workoutExercises.filter(exercise => exercise.workout_id == workoutId)
      console.log("Workout Exercises", workoutExercises)
      getExercises((exercises) => {
        console.log("All Exercises", exercises)
        // Map to get only the exercises that are part of the workout
        const filteredExercises = exercises.filter(exercise => workoutExercises.some(we => we.exercise_id === exercise.id))
        console.log("Filtered Exercises for Workout", filteredExercises)
        setExercises(filteredExercises)
      }, setError, setLoading)
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

