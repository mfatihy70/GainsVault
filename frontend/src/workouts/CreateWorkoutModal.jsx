import { useState, useEffect } from "react"
import { Modal, Button, Form, Row, Col } from "react-bootstrap"
import { getExercises } from "../utils/exercise" // You should have this or create it
import { createWorkout } from "../utils/workout" // Function to create a workout

const CreateCustomWorkoutModal = ({ show, handleClose, onWorkoutCreated }) => {
  const [name, setName] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [selectedExercises, setSelectedExercises] = useState([])
  const [exercises, setExercises] = useState([])
  const [modalLoading, setModalLoading] = useState(false)
  const [modalError, setModalError] = useState(null)

  useEffect(() => {
    if (show) {
      setModalLoading(true)
      getExercises(setExercises, setModalLoading, setModalError)
    }
  }, [show])

  const handleExerciseToggle = (exerciseId) => {
    setSelectedExercises((prev) =>
      prev.includes(exerciseId)
        ? prev.filter((id) => id !== exerciseId)
        : [...prev, exerciseId]
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Get userId from localStorage
    const userId = localStorage.getItem("userId")
    const newWorkout = {
      name,
      image: imageUrl,
      exercises: selectedExercises,
      user_id: userId, // Pass user_id to backend
    }
    try {
      await createWorkout(newWorkout, setModalError, setModalLoading)
      alert("Workout has been added successfully!")
      onWorkoutCreated()
      handleClose()
    } catch (err) {
      console.error("Failed to create workout", err)
    }
  }

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton className="bg-dark text-light border-warning">
        <Modal.Title className="text-warning">
          Create Custom Workout
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-light">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Workout Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-dark text-light border border-warning"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="bg-dark text-light border border-warning"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Select Exercises</Form.Label>
            <div
              style={{ maxHeight: "300px", overflowY: "scroll" }}
              className="border border-warning p-2"
            >
              <Row>
                {exercises.map((exercise) => (
                  <Col md={6} key={exercise.id}>
                    <Form.Check
                      type="checkbox"
                      label={exercise.name}
                      checked={selectedExercises.includes(exercise.id)}
                      onChange={() => handleExerciseToggle(exercise.id)}
                      className="text-light"
                    />
                  </Col>
                ))}
              </Row>
            </div>
          </Form.Group>

          <Button type="submit" variant="warning" className="fw-semibold w-100">
            Create Workout
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default CreateCustomWorkoutModal
