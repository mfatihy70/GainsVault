import {
  Container,
  Card,
  Button,
  Spinner,
  Row,
  Col,
  Form,
  ListGroup,
  Alert,
} from "react-bootstrap"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { getWorkoutsForSplit } from "../utils/workout"
import { getExerciseFromWorkoutId } from "../utils/track"
import { getSplitById, getSplits } from "../utils/split"
import { useNavigate } from "react-router-dom"

const WorkoutTrack = () => {
  const navigate = useNavigate()

  const [splits, setSplits] = useState([])
  const [workouts, setWorkouts] = useState([])
  const [exercises, setExercises] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedSplit, setSelectedSplit] = useState(null)
  const [selectedWorkoutId, setSelectedWorkoutId] = useState(null)

  useEffect(() => {
    getSplits(setSplits, setError, setLoading)
  }, [])

  const handleSelectSplit = (event) => {
    const splitId = event.target.value
    setWorkouts([])
    setExercises([])
    setSelectedSplit(null)
    setSelectedWorkoutId(null)
    if (splitId == "-1") return
    getSplitById(splitId, setSelectedSplit, setError, setLoading)
    getWorkoutsForSplit(splitId, setWorkouts, setError, setLoading)
  }

  const handleViewExercises = (workoutId) => {
    setSelectedWorkoutId(null)
    setExercises([])
    setSelectedWorkoutId(workoutId)
    getExerciseFromWorkoutId(workoutId, setExercises, setError, setLoading)
  }

  return (
    <Container className="py-3 bg-dark text-light">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Col className="d-flex justify-content-center align-items-center align-content-center gap-2 mb-2">
          <h1 className="text-center text-warning">Workouts</h1>

          {/* Filter by Split */}
          <Form.Group className="text-center ms-3" controlId="splitFilter">
            <Form.Select
              value={selectedSplit?.id}
              onChange={handleSelectSplit}
              className="mx-auto bg-dark text-light border border-warning"
              style={{ maxWidth: "300px" }}
            >
              <option value="-1">Select a Split</option>
              {splits.map((split) => (
                <option key={split.id} value={split.id}>
                  {split.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        {/* No Split Selected */}
        {!selectedSplit ? (
          <Container className="text-center py-5 text-light">
            <Spinner animation="border" variant="warning" />
            <h3 className="mt-3">Please select a split to view workouts</h3>
          </Container>
        ) : (
          /* Selected Split Details */
          <div>
            <h4>
              {selectedSplit?.name}{" "}
              <span className="badge text-bg-warning">
                {selectedSplit?.difficulty}
              </span>
            </h4>
            <small className="text-secondary">{selectedSplit?.days} Day</small>
            <p className="text-secondary">{selectedSplit?.description}</p>
          </div>
        )}

        {/* Cards */}
        <Row>
          {workouts.map((workout) => (
            <Col key={workout.id} md={4} className="mb-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-100 bg-dark text-light border border-warning shadow-sm">
                  <div
                    className="position-relative"
                    style={{ height: "200px", overflow: "hidden" }}
                  >
                    <Card.Img
                      variant="top"
                      src="https://images.unsplash.com/photo-1596357395217-80de13130e92?q=80&w=2071&auto=format&fit=crop"
                      alt={workout.name}
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                        transition: "transform 0.3s ease",
                      }}
                      className="hover-zoom"
                    />
                  </div>
                  <Card.Body className="px-4">
                    <Card.Title className="text-warning">
                      {workout.name}
                    </Card.Title>
                    <Card.Subtitle className="m-2"></Card.Subtitle>
                    <Card.Text></Card.Text>
                    <Card.Text className="mb-1"></Card.Text>
                    <Col className="d-flex justify-content-between align-items-center gap-2 mb-2">
                      <Button
                        variant="primary"
                        className="w-100 fw-semibold"
                        onClick={() => {
                          navigate(`/track/${workout.id}`, {
                            state: { workout },
                          })
                        }}
                      >
                        Start Workout
                      </Button>
                      <Button
                        variant="warning"
                        className="w-100 fw-semibold"
                        onClick={handleViewExercises.bind(null, workout.id)}
                      >
                        View Details
                      </Button>
                    </Col>
                    {selectedWorkoutId == workout.id && exercises && (
                      <Container style={{ flexGrow: 1, overflowY: "auto" }}>
                        <ListGroup>
                          {/* Exercise List */}
                          {exercises.map((entry, index) => (
                            <ListGroup.Item
                              key={index}
                              className="bg-dark text-light d-flex justify-content-between text-start"
                            >
                              {entry.name}
                              <small className="ms-auto me-2 text-end text-secondary">
                                Muscle : {entry.primary}
                                {entry.secondary && ", " + entry.secondary}
                              </small>
                            </ListGroup.Item>
                          ))}

                          {/* Loading/Error States */}
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
                        </ListGroup>
                      </Container>
                    )}

                    {/* No Exercises Found for selected workout */}
                    {selectedWorkoutId == workout.id &&
                      exercises.length == 0 &&
                      !loading && (
                        <div className="text-center my-2">
                          <Alert variant="info">
                            No exercises found for this workout.
                          </Alert>
                        </div>
                      )}
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </motion.div>
    </Container>
  )
}

export default WorkoutTrack
