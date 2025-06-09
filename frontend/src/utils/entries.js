import axiosInstance from "./axios"

export const createWorkoutEntry = async (user_id, workout_id, setWeight, setError, setLoading) => {
  try {
    const response = await axiosInstance.post(`/users/entry/${id}/`, {
      user_id,
      workout_id,
      name: "Push Day - June 9",
      performed_at: new Date().toISOString(),
      exercises: [
        {
          workout_exercise_id: 1,
          exercise_id: 1,
          performed_at: new Date().toISOString(),
          sets: [
            { kg: 80, reps: 8, set_order: 1 },
            { kg: 80, reps: 6, set_order: 2 },
          ],
        },
        {
          workout_exercise_id: 2,
          exercise_id: 2,
          performed_at: new Date().toISOString(),
          sets: [
            { kg: 40, reps: 10, set_order: 1 },
          ],
        },
      ],
    })

    setWeight(response.data)
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}
