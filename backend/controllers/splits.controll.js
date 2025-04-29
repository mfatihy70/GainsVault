import Sets from "../models/sets.model.js";

export const saveReps = async (req, res) => {
  try {
    const { id } = req.params; // Split ID
    const { reps, weight_kg, time_sec, rest_sec, failure } = req.body;

    // Save the reps to the database
    const newSet = await Sets.create({
      entry_id: id, // Assuming `id` maps to an entry or split
      reps,
      weight_kg: weight_kg || null,
      time_sec: time_sec || null,
      rest_sec: rest_sec || null,
      failure: failure || false,
    });

    res.status(201).json({ message: "Reps saved successfully!", set: newSet });
  } catch (error) {
    res.status(500).json({ message: "Failed to save reps", error: error.message });
  }
};