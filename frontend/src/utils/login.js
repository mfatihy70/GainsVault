import axiosInstance from "./axios"

export const isLoggedIn = () => {
  return !!localStorage.getItem("token")
}

export const logout = (navigate) => {
  localStorage.removeItem("token")
  localStorage.removeItem("role")
  localStorage.removeItem("userId")
  if (navigate) navigate("/login")
}

export const handleLogin = async (email, password, setError, navigate) => {
  try {
    // Clear previous session
    logout()

    // Login request
    const res = await axiosInstance.post("/users/login", { email, password })

    // Store login info
    alert(res.data.msg)
    localStorage.setItem("token", res.data.token)
    localStorage.setItem("role", JSON.stringify(res.data.role))
    localStorage.setItem("userId", res.data.userId)

    // Redirect based on role
    if (res.data.role =="admin") {
      navigate("/admin")
    } else {
      navigate("/profile")
    }
  } catch (err) {
    setError(
      err.response?.data?.message || "Something went wrong: " + err.message
    )
  }
}
