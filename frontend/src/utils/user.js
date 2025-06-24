import axiosInstance from "./axios"

export const getUserById = async (id, setUser, setError, setLoading) => {
  try {
    const response = await axiosInstance.get(`/users/${id}`)
    setUser(response.data)
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}

export const getUsers = async (setUsers, setLoading, setError) => {
  try {
    const response = await axiosInstance.get("/users")
    setUsers(response.data)
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}

export const editUser = async (id, updatedUser, setError, setLoading) => {
  try {
    await axiosInstance.put(`/users/${id}`, updatedUser)
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}

export const deleteUser = async (id, setError, setLoading) => {
  try {
    await axiosInstance.delete(`/users/${id}`)
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}

export const trackWeight = async (
  id,
  weight,
  setUser,
  setError,
  setLoading
) => {
  try {
    await axiosInstance.post(`/users/${id}/weight`, { weight })
    getUserById(id, setUser, setError, setLoading)
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}

export const getWeights = async (id, setWeight, setError, setLoading) => {
  try {
    const response = await axiosInstance.get(`/users/${id}/weight`)
    setWeight(response.data)
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}

export const getCurrentWeight = async (
  id,
  setUserWeight,
  setError,
  setLoading
) => {
  try {
    const response = await axiosInstance.get(`/users/${id}/weight`)
    const weights = response.data
    if (weights.length > 0) {
      setUserWeight(weights[weights.length - 1].value)
    }
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}

export const deleteWeight = async (
  id,
  weightId,
  setWeights,
  setError,
  setLoading
) => {
  try {
    console.log("Deleting weight with ID:", weightId)
    console.log("User ID:", id)
    await axiosInstance.delete(`/users/${id}/weight/${weightId}`)
    getWeights(id, setWeights, setError, setLoading)
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}

// User Workout Tracking Entries
export const getUserWorkoutEntries = async (
  userId,
  setWorkouts,
  setError,
  setLoading
) => {
  setError(null)
  setLoading(true)
  try {
    const response = await axiosInstance.get(`/users/${userId}/workout`)
    setWorkouts(response.data)
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}

export const createTrackedWorkout = async (
  trackedWorkoutData,
  setError,
  setLoading
) => {
  try {
    setLoading(true)
    const response = await axiosInstance.post(`/users/${trackedWorkoutData.userId}/workout`, trackedWorkoutData);

    if (!response.ok) {
      throw new Error('Failed to save workout');
    }

    const result = await response.json();
    console.log('Workout saved:', result);
    alert('Workout saved successfully!');
    // Optionally navigate away or reset state here

  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}

export const updateUserWorkoutEntry = async (userId, workoutId, data, setError, setLoading) => {
  try {
    setLoading?.(true)
    await axiosInstance.put(`/users/${userId}/workout/${workoutId}`, data)
  } catch (err) {
    setError?.(err.message || "Failed to update workout.")
    throw err
  } finally {
    setLoading?.(false)
  }
}

export const deleteUserWorkoutEntry = async (userId, workoutId, setError, setLoading) => {
  try {
    setLoading?.(true)
    await axiosInstance.delete(`/users/${userId}/workout/${workoutId}`)
  } catch (err) {
    setError?.(err.response?.data?.message || "Failed to delete workout.")
    throw err
  } finally {
    setLoading?.(false)
  }
}

