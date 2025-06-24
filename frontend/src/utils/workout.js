import axiosInstance from "./axios"

export const getWorkouts = async () => {
  try {
    const response = await axiosInstance.get("/workouts")
    return response.data
  } catch (err) {
    console.error("Error fetching workouts:", err)
    throw err
  }
}

export const getWorkoutById = async (id) => {
  try {
    const response = await axiosInstance.get(`/workouts/${id}`)
    return response.data
  } catch (err) {
    console.error(`Error fetching workout ${id}:`, err)
    throw err
  }
}

export const getWorkoutsForSplit = async (splitId) => {
  try {
    const allWorkouts = await getWorkouts()
    return allWorkouts.filter((workout) => String(workout.split_id) === String(splitId))
  } catch (err) {
    console.error("Error fetching workouts for split:", err)
    throw err
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

export const createWorkout = async (workoutData) => {
  try {
    const response = await axiosInstance.post("/workouts", workoutData)
    return response.data
  } catch (err) {
    console.error("Error creating workout:", err)
    throw err
  }
}

export const updateWorkout = async (id, workoutData) => {
  try {
    const response = await axiosInstance.put(`/workouts/${id}`, workoutData)
    return response.data
  } catch (err) {
    console.error(`Error updating workout ${id}:`, err)
    throw err
  }
}

export const deleteWorkout = async (id) => {
  try {
    const response = await axiosInstance.delete(`/workouts/${id}`)
    return response.data
  } catch (err) {
    console.error(`Error deleting workout ${id}:`, err)
    throw err
  }
}

// Get workout exercises by workout ID (with full exercise data)
export const getWorkoutExercisesByWorkoutId = async (
  workoutId
) => {
  try {
    const response = await axiosInstance.get(`/workout-exercises/workout/${workoutId}`)
    return response.data
  } catch (err) {
    console.error(`Error fetching exercises for workout ${workoutId}:`, err)
    throw err
  }
}

export const getSplitFromWorkoutId = async (workoutId) => {
  const res = await fetch(`/api/workouts/${workoutId}/split`)
  if (!res.ok) throw new Error("Failed to fetch split")
  return await res.json()
}
