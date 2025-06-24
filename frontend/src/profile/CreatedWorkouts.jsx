import { useEffect, useState } from "react"
import { Card, Row, Col, Button, Spinner, Modal, Form } from "react-bootstrap"
import { getWorkouts, getWorkoutExercisesByWorkoutId } from "../utils/workout"
import { getExercises } from "../utils/exercise"
import axiosInstance from "../utils/axios"
import { useNavigate } from "react-router-dom"

const CreatedWorkouts = ({ userId }) => {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editWorkout, setEditWorkout] = useState(null)
  const [editName, setEditName] = useState("")
  const [editImage, setEditImage] = useState("")
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [allExercises, setAllExercises] = useState([])
  const [selectedExercises, setSelectedExercises] = useState([])
  const [exLoading, setExLoading] = useState(false)
  const [exError, setExError] = useState(null)
  const navigate = useNavigate ? useNavigate() : () => {}

  useEffect(() => {
    fetchWorkouts()
    // eslint-disable-next-line
  }, [userId])

  const fetchWorkouts = () => {
    getWorkouts(
      (allWorkouts) => {
        setWorkouts(
          allWorkouts.filter((w) => String(w.user_id) === String(userId))
        )
      },
      setError,
      setLoading
    )
  }

  const handleEdit = async (workout) => {
    setEditWorkout(workout)
    setEditName(workout.name)
    setEditImage(workout.image || "")
    setShowEditModal(true)
    setExLoading(true)
    // Fetch all exercises
    getExercises(setAllExercises, setExLoading, setExError)
    // Fetch current workout's exercises
    getWorkoutExercisesByWorkoutId(
      workout.id,
      (workoutExercises) => {
        setSelectedExercises(
          workoutExercises.map((we) => we.exercise_id || we.exercise?.id)
        )
      },
      setExError,
      setExLoading
    )
  }

  const handleExerciseToggle = (exerciseId) => {
    setSelectedExercises((prev) =>
      prev.includes(exerciseId)
        ? prev.filter((id) => id !== exerciseId)
        : [...prev, exerciseId]
    )
  }

  const handleEditSave = async () => {
    setSaving(true)
    try {
      // Update workout info
      await axiosInstance.put(`/workouts/${editWorkout.id}`, {
        name: editName,
        image: editImage,
      })
      // Update exercises: delete all old, add new
      await axiosInstance.delete(`/workout-exercises/workout/${editWorkout.id}`)
      if (selectedExercises.length > 0) {
        await Promise.all(
          selectedExercises.map((exercise_id, idx) =>
            axiosInstance.post("/workout-exercises", {
              workout_id: editWorkout.id,
              exercise_id,
              order: idx + 1,
            })
          )
        )
      }
      setShowEditModal(false)
      setEditWorkout(null)
      fetchWorkouts()
      alert("Workout updated successfully!")
    } catch (err) {
      alert("Failed to update workout")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this workout?")) return
    setDeletingId(id)
    try {
      await axiosInstance.delete(`/workouts/${id}`)
      setWorkouts((prev) => prev.filter((w) => w.id !== id))
    } catch (err) {
      alert("Failed to delete workout")
    } finally {
      setDeletingId(null)
    }
  }

  if (loading) return <Spinner animation="border" className="mt-3" />
  if (error) return <div className="text-danger mt-3">{error}</div>
  if (!workouts.length)
    return <div className="mt-3">No custom workouts found.</div>

  return (
    <>
      <Row className="mt-2">
        {workouts.map((workout) => (
          <Col key={workout.id} md={6} lg={4} className="mb-4">
            <Card className="h-100 bg-dark text-light border border-warning shadow-sm">
              {workout.image && (
                <Card.Img
                  variant="top"
                  src={workout.image}
                  alt={workout.name}
                  style={{ objectFit: "cover", height: "180px" }}
                />
              )}
              <Card.Body>
                <Card.Title className="text-warning">{workout.name}</Card.Title>
                <div className="d-flex gap-2 mt-2">
                  <Button
                    variant="outline-warning"
                    size="sm"
                    onClick={() => handleEdit(workout)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(workout.id)}
                    disabled={deletingId === workout.id}
                  >
                    {deletingId === workout.id ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton className="bg-dark text-warning">
          <Modal.Title>Edit Workout</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Workout Name</Form.Label>
              <Form.Control
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="bg-dark text-light border border-warning"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                value={editImage}
                onChange={(e) => setEditImage(e.target.value)}
                className="bg-dark text-light border border-warning"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Edit Exercises</Form.Label>
              <div
                style={{ maxHeight: "250px", overflowY: "auto" }}
                className="border border-warning p-2"
              >
                {exLoading ? (
                  <Spinner animation="border" size="sm" />
                ) : exError ? (
                  <div className="text-danger">{exError}</div>
                ) : (
                  <Row>
                    {allExercises.map((exercise) => (
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
                )}
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-dark border-warning">
          <Button
            variant="secondary"
            onClick={() => setShowEditModal(false)}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button variant="warning" onClick={handleEditSave} disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CreatedWorkouts
