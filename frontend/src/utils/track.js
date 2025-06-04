import { getWorkoutExercises } from "./workout"
import { getExercises } from "./exercise"

export const getExerciseFromWorkoutId = (workoutId, setExercises, setError, setLoading) => {
  setLoading(true)
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
        setLoading(false)
      }, setError, () => { })

    }, setError, () => { })
  } catch (err) {
    setError(err.message)
  } finally {
    console.log("Finished fetching exercises for workout ID:", workoutId)
  }
}

