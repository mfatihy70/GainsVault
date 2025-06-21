import axiosInstance from "./axios"

export const getSplits = async () => {
  try {
    const response = await axiosInstance.get("/splits")
    return response.data
  } catch (err) {
    console.error("Error fetching splits:", err)
    throw err
  }
}

export const getSplitById = async (id) => {
  try {
    const response = await axiosInstance.get(`/splits/${id}`)
    return response.data
  } catch (err) {
    console.error(`Error fetching split ${id}:`, err)
    throw err
  }
}
