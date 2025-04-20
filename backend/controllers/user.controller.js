import User from "../models/users.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// Fetch all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: "Server Error" })
  }
}

// Fetch a user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    if (!user) return res.status(404).json({ message: "User not found" })
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: "Server Error" })
  }
}

// Update user details
export const updateUser = async (req, res) => {
  try {
    const [rowsUpdated, [updatedUser]] = await User.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    })

    if (!rowsUpdated) return res.status(404).json({ message: "User not found" })
    res.json(updatedUser)
  } catch (error) {
    res.status(500).json({ message: "Server Error" })
  }
}

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.destroy({ where: { id: req.params.id } })
    if (!deletedUser) return res.status(404).json({ message: "User not found" })
    res.json({ message: "User deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Server Error" })
  }
}

// Register a new user
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    // Check if user already exists
    if (await User.findOne({ where: { email } }))
      return res.status(400).json({ message: "User already exists" })

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10)
    await User.create({ name, email, password: hashedPassword })
    res.status(201).json({ message: "User registered successfully" })
  } catch (error) {
    next(error)
  }
}

// Login a user
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body

    // Check if user exists
    const user = await User.findOne({ where: { email } })
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ message: "Invalid Credentials" })

    // Generate JWT token
    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    })
    res.json({ token })
  } catch (error) {
    next(error)
  }
}
