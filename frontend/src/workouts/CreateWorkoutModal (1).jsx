import { useState, useEffect } from "react"
import { Modal, Button, Form, Container, Row, Col } from "react-bootstrap"
import { getExercises } from "../utils/exercise"
import { createWorkout } from "../utils/workout"

const CreateWorkoutModal = ({ show, handleClose, onWorkoutCreated }) => {
  const [name, setName] = useState("")
  const [selectedExercises, setSelectedExercises] = useState([])
  const [allExercises, setAllExercises] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (show) {
      const fetchExercises = async () => {
        try {
          setLoading(true)
          const exercisesData = await getExercises()
          setAllExercises(exercisesData)
        } catch (err) {
          setError(err)
        } finally {
          setLoading(false)
        }
      }
      fetchExercises()
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
    if (!name.trim() || selectedExercises.length === 0) {
      alert("Please provide a name and select at least one exercise.")
      return
    }

    try {
      setLoading(true)
      await createWorkout({
        name,
        exercise_ids: selectedExercises,
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
      <Modal.Header closeButton>
        <Modal.Title>Create Custom Workout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
            />
          </Form.Group>

          <h5>Select Exercises</h5>
          {loading ? (
            <p>Loading exercises...</p>
          ) : (
            <Container>
              <Row>
                {allExercises.map((exercise) => (
                  <Col key={exercise.id} md={4}>
                    <Form.Check
                      type="checkbox"
                      id={`exercise-${exercise.id}`}
                      label={exercise.name}
                      checked={selectedExercises.includes(exercise.id)}
                      onChange={() => handleExerciseSelection(exercise.id)}
                    />
                  </Col>
                ))}
              </Row>
            </Container>
          )}

          <Button variant="primary" type="submit" className="mt-3" disabled={loading}>
            {loading ? "Creating..." : "Create Workout"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default CreateWorkoutModal 