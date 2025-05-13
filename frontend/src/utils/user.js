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
