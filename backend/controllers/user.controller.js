import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import WorkoutEntry from "../models/entries/workout.model.js"
import ExerciseEntry from "../models/entries/exercise.model.js"
import SetEntry from "../models/entries/set.model.js"
import Exercise from "../models/core/exercise.model.js"

// Fetch all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

// Fetch a user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    if (!user) return res.status(404).json({ message: "User not found" })
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

// Update user details
export const updateUser = async (req, res) => {
  try {
    // Remove empty string fields from req.body
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] === "") delete req.body[key]
    })

    const [rowsUpdated, [updatedUser]] = await User.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    })

    if (!rowsUpdated) return res.status(404).json({ message: "User not found" })
    res.json(updatedUser)
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.destroy({ where: { id: req.params.id } })
    if (!deletedUser) return res.status(404).json({ message: "User not found" })
    res.json({ message: "User deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

// Register a new user
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, location, bio, role } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser)
      return res.status(400).json({ msg: "User already exists" })

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10)

    await User.create({
      name,
      email,
      password: hashedPassword,
      location,
      bio,
      role: role || "user",
    })

    res.status(201).json({ msg: "User registered successfully" })
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
      return res.status(400).json({ msg: "Invalid Credentials" })

    // Generate JWT token
    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    })
    res.status(200).json({
      msg: "Login successful",
      token: token,
      userId: user.id,
      role: user.role,
    })
  } catch (error) {
    next(error)
  }
}

//
export const trackWeight = async (req, res, next) => {
  try {
    const { weight } = req.body
    const userId = req.params.id

    // Check if user exists
    const user = await User.findByPk(userId)
    if (!user) return res.status(404).json({ msg: "User not found" })

    // create new weight object
    const newWeight = {
      value: weight,
      date: new Date().toISOString(),
    }

    console.log("New Weight object:", newWeight)
    // add new weight to the existing array
    await user.update({
      weight: [...(user.weight || []), newWeight],
    })

    res.status(200).json({ msg: "Weight updated successfully" })
  } catch (error) {
    next(error)
  }
}

export const getWeights = async (req, res, next) => {
  try {
    const userId = req.params.id

    // Check if user exists
    const user = await User.findByPk(userId)
    if (!user) return res.status(404).json({ msg: "User not found" })

    // get weight from the existing array
    const weight = user.weight || []

    res.status(200).json(weight)
  } catch (error) {
    next(error)
  }
}

export const deleteWeight = async (req, res, next) => {
  try {
    const userId = req.params.id
    const weightIndex = req.params.index

    // Check if user exists
    const user = await User.findByPk(userId)
    if (!user) return res.status(404).json({ msg: "User not found" })

    // remove weight from the existing array
    const updatedWeights = user.weight.filter(
      (_, index) => index !== parseInt(weightIndex)
    )

    await user.update({
      weight: updatedWeights,
    })

    res.status(200).json({ msg: "Weight deleted successfully" })
  } catch (error) {
    next(error)
  }
}

export const getUserWorkoutEntries = async (req, res, next) => {
  try {
    const userId = req.params.id

    const userWorkouts = await WorkoutEntry.findAll({
      where: { user_id: userId },
      order: [['start', 'DESC']],
      include: [
        {
          model: ExerciseEntry,
          include: [
            {
              model: SetEntry,
              order: [['set_order', 'ASC']], // optional: sort sets by order
            },
            {
              model: Exercise, // optional: include exercise name, type, etc.
            }
          ],
        }
      ],
    });
    console.log("User Workouts:", userWorkouts)
    res.status(200).json(userWorkouts)
  } catch (error) {
    console.error("Error fetching user workouts:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

export const getUserWorkoutEntryById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const workoutEntryId = req.params.workoutId;
    console.log("Fetching workout for user:", userId, "Workout ID:", workoutEntryId);
    const workout = await WorkoutEntry.findOne({
      where: {
        id: workoutEntryId,
        user_id: userId, // ensure the workout belongs to the user
      },
      include: [
        {
          model: ExerciseEntry,
          include: [
            {
              model: SetEntry,
              order: [['set_order', 'ASC']],
            },
            {
              model: Exercise,
            },
          ],
        },
      ],
    });

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    res.status(200).json(workout);
  } catch (error) {
    console.error("Error fetching workout by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUserWorkoutEntry = async (req, res, next) => {
  try {
    const { id: userId, workoutId } = req.params
    const updateData = req.body

    const workout = await WorkoutEntry.findOne({
      where: {
        id: workoutId,
        user_id: userId,
      },
    })

    if (!workout) {
      return res.status(404).json({ message: "Workout not found or does not belong to user" })
    }

    // Update fields of the workout entry itself (e.g., name, start, end)
    await workout.update({
      name: updateData.name,
      start: updateData.start,
      end: updateData.end,
    })

    // Iterate over exercise entries
    if (Array.isArray(updateData.exercise_entries)) {
      for (const exerciseEntry of updateData.exercise_entries) {
        const existingExerciseEntry = await ExerciseEntry.findOne({
          where: {
            id: exerciseEntry.id,
            workout_entry_id: workoutId,
          },
        })

        if (!existingExerciseEntry) continue // skip if not found

        // Optionally update exerciseEntry fields if needed
        // await existingExerciseEntry.update({ ... })

        // Iterate over set entries
        if (Array.isArray(exerciseEntry.set_entries)) {
          for (const setEntry of exerciseEntry.set_entries) {
            const existingSet = await SetEntry.findOne({
              where: {
                id: setEntry.id,
                exercise_entry_id: exerciseEntry.id,
              },
            })

            if (existingSet) {
              await existingSet.update({
                kg: setEntry.kg,
                reps: setEntry.reps,
                performed_at: setEntry.performed_at,
              })
            }
          }
        }
      }
    }

    res.status(200).json({ message: "Workout updated successfully" })
  } catch (error) {
    console.error("Error updating workout entry:", error)
    res.status(400).json({ message: error.message || "Update failed" })
  }
}

export const deleteUserWorkoutEntry = async (req, res, next) => {
  try {
    const userId = req.params.id
    const workoutEntryId = req.params.workoutId

    console.log("Deleting workoutEntry for user:", userId, "Workout ID:", workoutEntryId)

    const workout = await WorkoutEntry.findOne({
      where: {
        id: workoutEntryId,
        user_id: userId, // Ensure workout belongs to the user
      },
    })

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" })
    }

    await workout.destroy()

    res.status(200).json({ message: "Workout deleted successfully" })
  } catch (error) {
    console.error("Error deleting workout entry:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}
