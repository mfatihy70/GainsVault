import { useState, useEffect } from "react"
import { Modal, Button, Form, Container, Row, Col } from "react-bootstrap"
import { getExercises } from "../utils/exercise"
import { createWorkout } from "../utils/workout"
import { getSplits } from "../utils/split"

const CreateWorkoutModal = ({ show, handleClose, onWorkoutCreated }) => {
  const [name, setName] = useState("")
  const [selectedExercises, setSelectedExercises] = useState([])
  const [allExercises, setAllExercises] = useState([])
  const [splits, setSplits] = useState([])
  const [selectedSplit, setSelectedSplit] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [image, setImage] = useState("")

  useEffect(() => {
    if (show) {
      const fetchData = async () => {
        try {
          setLoading(true)
          const [exercisesData, splitsData] = await Promise.all([
            getExercises(),
            getSplits(),
          ])
          setAllExercises(exercisesData)
          setSplits(splitsData)
        } catch (err) {
          setError(err)
        } finally {
          setLoading(false)
        }
      }
      fetchData()
    }
  }, [show])

  const handleExerciseSelection = (exerciseId) => {
    setSelectedExercises((prev) =>
      prev.includes(exerciseId)
        ? prev.filter((id) => id !== exerciseId)
        : [...prev, exerciseId]
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim() || selectedExercises.length === 0 || !selectedSplit) {
      alert("Please provide a name, select a split, and select at least one exercise.")
      return
    }

    try {
      setLoading(true)
      await createWorkout({
        name,
        split_id: selectedSplit,
        exercise_ids: selectedExercises,
        image: image.trim() || undefined,
      })
      onWorkoutCreated() // Refresh the workouts list
      handleClose() // Close the modal
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton style={{ background: "#222", color: "#fff", borderBottom: "1px solid #444" }}>
        <Modal.Title style={{ color: "#fff" }}>Create Custom Workout</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ background: "#181a1b", color: "#fff" }}>
        {error && <p className="text-danger">Error: {error.message}</p>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Workout Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Push Day"
              required
              style={{ background: "#222", color: "#fff", border: "1px solid #444" }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Split</Form.Label>
            <Form.Select
              value={selectedSplit}
              onChange={(e) => setSelectedSplit(e.target.value)}
              required
              style={{ background: "#222", color: "#fff", border: "1px solid #444" }}
            >
              <option value="">Select a Split</option>
              {splits.map((split) => (
                <option key={split.id} value={split.id}>
                  {split.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Select Exercises</Form.Label>
            <div style={{
              maxHeight: "250px",
              overflowY: "auto",
              border: "1px solid #444",
              borderRadius: "6px",
              padding: "8px",
              background: "#222",
              color: "#fff"
            }}>
              {allExercises.map((exercise) => (
                <Form.Check
                  key={exercise.id}
                  type="checkbox"
                  id={`exercise-${exercise.id}`}
                  label={exercise.name}
                  checked={selectedExercises.includes(exercise.id)}
                  onChange={() => handleExerciseSelection(exercise.id)}
                  className="mb-2"
                  style={{ color: "#fff" }}
                />
              ))}
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image URL (optional)</Form.Label>
            <Form.Control
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              style={{ background: "#222", color: "#fff", border: "1px solid #444" }}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3" disabled={loading}>
            {loading ? "Creating..." : "Create Workout"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default CreateWorkoutModal 