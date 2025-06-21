import axiosInstance from "./axios"

export const getExerciseById = async (id) => {
    try {
        const response = await axiosInstance.get(`/exercises/${id}`)
        return response.data
    } catch (err) {
        console.error(`Error fetching exercise ${id}:`, err)
        throw err
    }
}

export const getExercises = async () => {
    try {
        const response = await axiosInstance.get("/exercises")
        return response.data
    } catch (err) {
        console.error("Error fetching exercises:", err)
        throw err
    }
}

export const addExercise = async (exercise) => {
    try {
        const response = await axiosInstance.post("/exercises", exercise)
        return response.data
    } catch (err) {
        console.error("Error adding exercise:", err)
        throw err
    }
}

export const editExercise = async (id, updatedExercise) => {
    try {
        const response = await axiosInstance.put(`/exercises/${id}`, updatedExercise)
        return response.data
    } catch (err) {
        console.error(`Error editing exercise ${id}:`, err)
        throw err
    }
}

export const deleteExercise = async (id) => {
    try {
        const response = await axiosInstance.delete(`/exercises/${id}`)
        return response.data
    } catch (err) {
        console.error(`Error deleting exercise ${id}:`, err)
        throw err
    }
}

export const getMuscleGroups = async (setMuscleGroups, setLoading, setError) => {
    try {
        const response = await axiosInstance.get("/exercises/muscles")
        setMuscleGroups(response.data)
    } catch (err) {
        setError(err.message)
    } finally {
        setLoading(false)
    }
}
