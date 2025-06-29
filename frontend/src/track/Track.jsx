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
import {
  getWorkoutExercisesByWorkoutId,
  getWorkoutsForSplit,
} from "../utils/workout"
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
    getWorkoutExercisesByWorkoutId(
      workoutId,
      (fetchedWorkoutExercises) => {
        const enrichedExercises = fetchedWorkoutExercises.map((we) => ({
          ...we.exercise,
        }))
        setExercises(enrichedExercises)
        setLoading(false)
      },
      setError,
      () => setLoading(false)
    )
  }

  return (
    <Container className="py-3 bg-dark text-light">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Col className="d-flex justify-content-center align-items-center align-content-center gap-2 mb-2">
          <h1 className="text-center text-warning">Workout Tracking</h1>
        </Col>

        {/* No Split Selected */}
        {!selectedSplit ? (
          <Container className="text-center py-5 text-light">
            <h3>Please select a split to view workouts</h3>
            {/* Show the split dropdown here as well */}
            <div className="d-flex justify-content-center mt-5">
              <Form.Group controlId="splitFilter">
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
            </div>
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
                    {workout.image && (
                      <Card.Img
                        variant="top"
                        src={workout.image}
                        alt={workout.name}
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "cover",
                          transition: "transform 0.3s ease",
                        }}
                        className="hover-zoom"
                      />
                    )}
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
                          {/* Only show spinner if a workout is selected */}
                          {selectedWorkoutId == workout.id && loading && (
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
