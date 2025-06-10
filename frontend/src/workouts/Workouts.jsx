import { useEffect, useState } from "react"
import {
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Form,
  InputGroup,
  Button,
  Modal,
  ListGroup,
} from "react-bootstrap"
import { motion } from "framer-motion"
import {
  getWorkouts,
  getWorkoutById,
  getWorkoutExercises,
} from "../utils/workout"
import "../styles/workouts.css"

const difficulties = ["beginner", "intermediate", "advanced"]

const WorkoutsPage = ({ exercises }) => {
  const [workouts, setWorkouts] = useState([])
  const [workoutExercises, setWorkoutExercises] = useState([])
  const [selectedWorkout, setSelectedWorkout] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [search, setSearch] = useState("")
  const [difficulty, setDifficulty] = useState("")

  useEffect(() => {
    setLoading(true)
    getWorkouts(setWorkouts, setError, setLoading)
    getWorkoutExercises(setWorkoutExercises, setError, setLoading)
  }, [])

  const openWorkoutModal = async (workout) => {
    setLoading(true)
    await getWorkoutById(workout.id, setSelectedWorkout, setError, setLoading)
    setModalVisible(true)
  }

  const closeWorkoutModal = () => {
    setSelectedWorkout(null)
    setModalVisible(false)
  }

  const getExercisesForWorkout = (workoutId) => {
    return workoutExercises
      .filter((we) => we.workout_id === workoutId)
      .sort((a, b) => a.order - b.order)
      .map((we) =>
        Array.isArray(exercises)
          ? exercises.find((e) => e.id === we.exercise_id)
          : undefined
      )
      .filter(Boolean)
  }

  const filteredWorkouts = workouts.filter(
    (w) =>
      w.name.toLowerCase().includes(search.toLowerCase()) &&
      (!difficulty || w.difficulty === difficulty)
  )

  return (
    <Container fluid className="d-flex flex-column min-vh-100 my-5">
      <div className="text-center my-4">
        <h1 className="text-warning">Workouts</h1>
        <p>
          Browse and filter curated workouts. Click a workout to see included
          exercises.
        </p>
      </div>

      {/* Filter Controls */}
      <Form className="mb-4">
        <Row className="g-2 justify-content-center">
          <Col md={4}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search by workout name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col md={3}>
            <Form.Select
              value={difficulty}
              className="bg-dark text-light border border-warning"
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="">Difficulty</option>
              {difficulties.map((d) => (
                <option key={d} value={d}>
                  {d.charAt(0).toUpperCase() + d.slice(1)}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col md={2} className="d-flex align-items-center">
            <Button
              variant="outline-warning"
              className="w-100"
              onClick={() => {
                setSearch("")
                setDifficulty("")
              }}
            >
              Clear
            </Button>
          </Col>
        </Row>
      </Form>

      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" variant="warning" />
        </div>
      )}
      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <Row className="justify-content-center">
          <Col md={10}>
            <Row>
              {filteredWorkouts.length === 0 ? (
                <Col>
                  <Alert variant="warning" className="text-center mt-4">
                    No workouts found.
                  </Alert>
                </Col>
              ) : (
                filteredWorkouts.map((workout, idx) => (
                  <Col md={4} key={workout.id || idx} className="mb-4">
                    <motion.div
                      whileHover={{
                        y: -8,
                        boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      <ListGroup.Item
                        className="rounded-3 bg-dark border border-warning p-3 position-relative workout-card"
                        style={{ minHeight: "220px", cursor: "pointer" }}
                        onClick={() => openWorkoutModal(workout)}
                      >
                        <h4 className="mb-2 text-warning">{workout.name}</h4>
                        <p className="mb-2">
                          <strong>Exercises:</strong>{" "}
                          {getExercisesForWorkout(workout.id).length}
                        </p>
                        {workout.difficulty && (
                          <span
                            className="px-3 py-1 rounded-pill small"
                            style={{
                              background:
                                workout.difficulty === "beginner"
                                  ? "#198754"
                                  : workout.difficulty === "intermediate"
                                  ? "#ffc107"
                                  : "#dc3545",
                              color:
                                workout.difficulty === "intermediate"
                                  ? "#212529"
                                  : "#fff",
                              fontWeight: 600,
                              minWidth: "100px",
                              textAlign: "center",
                              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                            }}
                          >
                            {workout.difficulty}
                          </span>
                        )}
                        <div className="mt-3">
                          <Button
                            variant="outline-warning"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              openWorkoutModal(workout)
                            }}
                          >
                            View Details
                          </Button>
                        </div>
                      </ListGroup.Item>
                    </motion.div>
                  </Col>
                ))
              )}
            </Row>
          </Col>
        </Row>
      )}

      {/* Workout Modal */}
      {selectedWorkout && (
        <Modal
          show={modalVisible}
          onHide={closeWorkoutModal}
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>{selectedWorkout.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6>Included Exercises:</h6>
            <Row>
              {getExercisesForWorkout(selectedWorkout.id).map((exercise) => (
                <Col md={6} key={exercise.id} className="mb-3">
                  <div className="card p-2">
                    <img
                      src={exercise.image}
                      alt={exercise.name}
                      className="img-fluid"
                      style={{ maxHeight: 120, objectFit: "cover" }}
                    />
                    <div className="mt-2">
                      <h6>{exercise.name}</h6>
                      <p className="mb-1">
                        <strong>Primary:</strong> {exercise.primary}
                      </p>
                      {exercise.secondary && (
                        <p className="mb-1">
                          <strong>Secondary:</strong> {exercise.secondary}
                        </p>
                      )}
                      <p className="mb-0">
                        <strong>Equipment:</strong> {exercise.equipment} |{" "}
                        <strong>Difficulty:</strong> {exercise.difficulty}
                      </p>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeWorkoutModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  )
}

export default WorkoutsPage
