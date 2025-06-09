import SetEntry from "../../models/entries/set.model.js"

// Fetch all SetEntries
export const getSetEntries = async (req, res) => {
  try {
    const setEntries = await SetEntry.findAll()
    res.json(setEntries)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Fetch a SetEntry by ID
export const getSetEntryById = async (req, res) => {
  try {
    const setEntry = await SetEntry.findByPk(req.params.id)
    if (!setEntry)
      return res.status(404).json({ message: "SetEntry not found" })
    res.json(setEntry)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Create a new SetEntry
export const createSetEntry = async (req, res) => {
  try {
    // TODO: replace with actual fields from the request body
    const { exercise_entry_id, set_order, kg, reps, performed_at } = req.body

    const newSetEntry = await SetEntry.create({
      exercise_entry_id,
      set_order,
      kg,
      reps,
      performed_at,
    })

    res.status(201).json(newSetEntry)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Update SetEntry details
export const updateSetEntry = async (req, res) => {
  try {
    const [rowsUpdated, [updatedSetEntry]] = await SetEntry.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    })

    if (!rowsUpdated)
      return res.status(404).json({ message: "SetEntry not found" })
    res.json(updatedSetEntry)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Delete a SetEntry
export const deleteSetEntry = async (req, res) => {
  try {
    const deleted = await SetEntry.destroy({
      where: { id: req.params.id },
    })

    if (!deleted)
      return res.status(404).json({ message: "SetEntry not found" })

    res.json({ message: "SetEntry deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
