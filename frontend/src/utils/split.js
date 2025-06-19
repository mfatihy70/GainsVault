import axiosInstance from "./axios"

export const getSplits = async (setSplits, setError, setLoading) => {
  setLoading(true)
  try {
    const response = await axiosInstance.get("/splits")
    setSplits(response.data)
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}

export const getSplitById = async (id, setSplit, setError, setLoading) => {
  try {
    const response = await axiosInstance.get(`/splits/${id}`)
    setSplit(response.data)
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}
