import jwt from "jsonwebtoken"

export const authUser = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "")

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded.user
    next()
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" })
  }
}

export const tryAuthUser = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "")

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = decoded.user
    } catch (error) {
      // Token is invalid, but we don't block the request
      // We just don't set req.user
    }
  }
  next()
} 