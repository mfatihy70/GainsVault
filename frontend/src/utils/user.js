import axiosInstance from "./axios"

export const getUserById = async (id, setUser, setError, setLoading) => {
  try {
    const response = await axiosInstance.get(`/user/${id}`)
    setUser(response.data)
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}

export const getUsers = async (setUsers, setLoading, setError) => {
  try {
    const response = await axiosInstance.get("/user")
    setUsers(response.data)
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}

export const editUser = async (id, updatedUser, setError, setLoading) => {
  try {
    await axiosInstance.put(`/user/${id}`, updatedUser)
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}

export const deleteUser = async (id, setError, setLoading) => {
  try {
    await axiosInstance.delete(`/user/${id}`)
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}

export const trackWeight = async (id, weight, setUser, setError, setLoading) => {
  try {
    await axiosInstance.post(`/user/${id}/weight`, { weight })
    getUserById(id, setUser, setError, setLoading)
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}

export const getWeight = async (id) => {
  try {
    const response = await axiosInstance.get(`/user/${id}/weight`)
    return response.data
  } catch (err) {
    console.error("Error fetching weight:", err)
    return []
  }
}

export const deleteWeight = async (id, weightId, setUser, setError, setLoading) => {
  try {
    console.log("Deleting weight with ID:", weightId)
    console.log("User ID:", id)
    await axiosInstance.delete(`/user/${id}/weight/${weightId}`)
    getUserById(id, setUser, setError, setLoading)
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}
