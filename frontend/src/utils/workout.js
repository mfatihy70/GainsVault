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