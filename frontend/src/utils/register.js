import axiosInstance from "./axios"

export const handleRegister = async (
  name,
  email,
  password,
  confirmPassword,
  location,
  bio,
  setError,
  navigate
) => {
  if (password !== confirmPassword) {
    setError("Passwords do not match")
    return
  }

  try {
    const res = await axiosInstance.post("/users/register", {
      name,
      email,
      password,
      location,
      bio,
      role: "user",
    })

    alert(res.data.msg)
    navigate("/login")
  } catch (err) {
    setError(err.response?.data?.msg || "Something went wrong")
  }
}
