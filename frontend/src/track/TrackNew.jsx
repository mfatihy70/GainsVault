import {
  Container,
  Card,
  Button,
  Spinner,
  Row,
  Col,
  Form,
  Stack,
  Alert,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap"
import { motion } from "framer-motion"
import React, { useState, useEffect } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { getWorkoutById } from "../utils/workout"
import { getExerciseFromWorkoutId } from "../utils/track"
import "../styles/track.css"
import SearchableDropdown from "./SearchableDropdown"
import { getExercises } from "../utils/exercise"
import { Stopwatch } from "./Stopwatch"

const WorkoutTrackNew = () => {
  const { state } = useLocation()
  const newExercise = {
    id: Date.now(),
    name: "New Exercise",
    primary: "chest",
    secondary: null,
    equipment: null,
    sets: "",
    reps: "",
    weight: "",
  }

  const navigate = useNavigate()
  const { id: workoutId } = useParams()
  const [times, setTimes] = useState({ startTime: 0, endTime: 0, duration: 0 })
  const [exercises, setExercises] = useState([])
  const [workout, setWorkout] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isCustomWorkout, setIsCustomWorkout] = useState(false)

  const [allExercises, setAllExercises] = useState([])

  const handleAddExercise = (exercise) => {
    console.log("Selected:", exercise)
    const newExercise = {
      id: exercise.id,
      name: exercise.name,
      primary: exercise.primary || "unknown",
      secondary: exercise.secondary || null,
      equipment: exercise.equipment || null,
    }
    setExercises([...exercises, newExercise])
  }
  const handleRemoveExercise = (index) => {
    const updatedExercises = exercises.filter((_, i) => i !== index)
    setExercises(updatedExercises)
  }
  const handleExerciseChange = (index, field, value) => {
    const updatedExercises = [...exercises]
    updatedExercises[index] = {
      ...updatedExercises[index],
      [field]: value,
    }
    setExercises(updatedExercises)
  }
  const handleGoBack = () => {
    navigate("/track")
  }
  const handleFinishWorkout = () => {
    //1.Create Workout Entry (user_id, workout_id, name, performed_at)
    //2.Create Exercise Entries for each exercise in the workout
    //   (workout_entry_id, workout_exercise_id, exercise_id, performed_at)
    //3.
    navigate("/summary", {
      state: {
        workout,
        exercises,
        workoutId,
        times,
      },
    })
  }

  useEffect(() => {
    getWorkoutById(workoutId, setWorkout, setError, setLoading)
    // Refetch exercises only if it's not a custom workout
    if (!isCustomWorkout)
      getExerciseFromWorkoutId(
        workoutId,
        (fetchedExercises) => {
          setExercises(
            fetchedExercises.map((ex) => ({ ...ex, notes: ex.notes ?? "" }))
          )
        },
        setError,
        setLoading
      )

    getExercises(setAllExercises, setError, setLoading)
  }, [workoutId, isCustomWorkout])

  if (loading || !workout) {
    return (
      <Container className="text-center py-5 text-light">
        <Spinner animation="border" variant="warning" />
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      </Container>
    )
  }

  return (
    <Container className="py-5 bg-dark text-light">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mb-4 bg-dark border border-warning">
          <Card.Body>
            <div className="d-flex align-items-center justify-content-between">
              <Button variant="outline-warning" onClick={handleGoBack}>
                ← Back
              </Button>
              <h1 className="text-warning text-center flex-grow-1 mb-0">
                {workout.name}
                <span class="ms-2 fs-6 badge rounded-pill text-bg-info">
                  {isCustomWorkout ? "Customized" : ""}
                </span>
              </h1>
              {/* Spacer to balance layout */}
              <div style={{ width: "75.5px" }} />{" "}
              {/* Same width as the button */}
            </div>
            <Form>
              <Form.Check
                type="switch"
                label="Customize Workout?"
                className="d-flex gap-2 align-items-center justify-content-center text-warning mt-2"
                //checked={checked}
                onChange={() => setIsCustomWorkout(!isCustomWorkout)}
              />
            </Form>
            <Stopwatch onTimeUpdate={setTimes} />
            <p className="text-center text-muted">{workout.description}</p>
          </Card.Body>
        </Card>

        {/* Exercises List */}
        <Stack gap={4} className="col-10 mx-auto">
          {exercises.map((exercise, index) => (
            <Card key={index} className="tracker-card mb-4">
              <Card.Body className="tracker-form">
                <Row className="align-items-center mb-3">
                  <Col>
                    <Card.Title className="mb-1 text-warning">
                      {exercise.name}
                    </Card.Title>
                    <div className="exercise-meta">
                      Muscle: <strong>{exercise.primary}</strong>
                      {exercise.secondary && <> → {exercise.secondary}</>}
                      {exercise.equipment && (
                        <> | Equipment: {exercise.equipment}</>
                      )}
                    </div>
                  </Col>

                  {/* Remove Button - only shown in custom mode */}
                  {isCustomWorkout && (
                    <Col xs="auto">
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleRemoveExercise(index)}
                      >
                        ✖ Remove
                      </Button>
                    </Col>
                  )}
                </Row>

                <Row className="gy-3">
                  <Col md={4}>
                    <Form.Group controlId={`sets-${exercise.id}`}>
                      <Form.Label>Sets</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="e.g. 3"
                        value={exercise.sets ?? ""}
                        onChange={(e) =>
                          handleExerciseChange(index, "sets", e.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId={`reps-${exercise.id}`}>
                      <Form.Label>Reps</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="e.g. 12"
                        value={exercise.reps ?? ""}
                        onChange={(e) =>
                          handleExerciseChange(index, "reps", e.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId={`weight-${exercise.id}`}>
                      <Form.Label>Weight (kg)</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="e.g. 40"
                        value={exercise.weight ?? ""}
                        onChange={(e) =>
                          handleExerciseChange(index, "weight", e.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <Form.Group controlId={`notes-${exercise.id}`}>
                      <Form.Label>
                        Notes <span className="text-muted">(optional)</span>
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        placeholder="Any thoughts or notes about this exercise..."
                        value={exercise.notes ?? ""}
                        onChange={(e) =>
                          handleExerciseChange(index, "notes", e.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}

          {/* Searchable Add exercise Button (!!only visible if custom workout!!) */}
          {isCustomWorkout && (
            <div className="d-flex text-center mb-4 justify-content-end">
              <SearchableDropdown
                exercises={allExercises}
                onSelect={handleAddExercise}
              />
            </div>
          )}
        </Stack>

        {/* Finish Workout Button */}
        <div className="text-center mt-5">
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id="tooltip-disabled-button">
                {exercises.length === 0
                  ? "Add at least one exercise to enable"
                  : times.duration === 0
                  ? "Workout duration must be greater than 0"
                  : "Finish Workout"}
              </Tooltip>
            }
          >
            <span
              className="d-inline-block"
              tabIndex={0}
              style={{
                cursor:
                  exercises.length === 0 || times.duration === 0
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              <Button
                variant="warning"
                size="lg"
                className="finish-btn"
                onClick={handleFinishWorkout}
                disabled={exercises.length === 0 || times.duration === 0}
              >
                Finish Workout
              </Button>
            </span>
          </OverlayTrigger>
        </div>
      </motion.div>
    </Container>
  )
}

export default WorkoutTrackNew
