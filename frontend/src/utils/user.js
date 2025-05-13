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
