import Split from "../../models/core/split.model.js"
import Workout from "../../models/core/workout.model.js"

// Fetch all splits
export const getSplits = async (req, res) => {
  try {
    const splits = await Split.findAll({
      order: [["id", "ASC"]],
      raw: true,
    })
    res.json(splits)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Fetch a split by ID
export const getSplitById = async (req, res) => {
  try {
    const split = await Split.findByPk(req.params.id)
    if (!split) return res.status(404).json({ message: "Split not found" })
    res.json(split)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Create a new split
export const createSplit = async (req, res) => {
  try {
    const { name, description, days, difficulty } = req.body
    const newSplit = await Split.create({
      name,
      description,
      days,
      difficulty,
    })
    res.status(201).json(newSplit)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Update split details
export const updateSplit = async (req, res) => {
  try {
    const [rowsUpdated, [updatedSplit]] = await Split.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    })

    if (!rowsUpdated)
      return res.status(404).json({ message: "Split not found" })
    res.json(updatedSplit)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Delete a split
export const deleteSplit = async (req, res) => {
  try {
    const deletedSplit = await Split.destroy({ where: { id: req.params.id } })
    if (!deletedSplit)
      return res.status(404).json({ message: "Split not found" })
    res.json({ message: "Split deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Fetch workouts for a split by splitId
export const getWorkoutsForSplit = async (req, res) => {
  try {
    const splitId = req.params.id
    const workouts = await Workout.findAll({
      where: { split_id: splitId },
      raw: true,
    })
    res.json(workouts)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
