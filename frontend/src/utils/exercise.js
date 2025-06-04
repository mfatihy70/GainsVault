import axiosInstance from "./axios"

export const getExerciseById = async (id, setExercise, setError, setLoading) => {
    try {
        const response = await axiosInstance.get(`/exercises/${id}`)
        setExercise(response.data)
    } catch (err) {
        setError(err.message)
    } finally {
        setLoading(false)
    }
}

export const getExercises = async (setExercises, setLoading, setError) => {
    try {
        const response = await axiosInstance.get("/exercises")
        setExercises(response.data)
    } catch (err) {
        setError(err.message)
    } finally {
        setLoading(false)
    }
}

export const addExercise = async (exercise, setError, setLoading) => {
    try {
        await axiosInstance.post("/exercises", exercise)
    } catch (err) {
        setError(err.message)
    } finally {
        setLoading(false)
    }
}

export const editExercise = async (id, updatedExercise, setError, setLoading) => {
    try {
        await axiosInstance.put(`/exercises/${id}`, updatedExercise)
    } catch (err) {
        setError(err.message)
    } finally {
        setLoading(false)
    }
}

export const deleteExercise = async (id, setError, setLoading) => {
    try {
        await axiosInstance.delete(`/exercises/${id}`)
    } catch (err) {
        setError(err.message)
    } finally {
        setLoading(false)
    }
}
