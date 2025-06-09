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
import { useState, useEffect } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { getWorkoutById } from "../utils/workout"
import { getExerciseFromWorkoutId } from "../utils/track"
import "../styles/track.css"
import SearchableDropdown from "./SearchableDropdown"
import { getExercises } from "../utils/exercise"
import { Stopwatch } from "./Stopwatch"

const WorkoutTrackNew = () => {
  const location = useLocation()
  const navigationState = location.state

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
  const [exercises, setExercises] = useState(navigationState?.exercises || [])
  const [workout, setWorkout] = useState(navigationState?.workout || null)
  const [times, setTimes] = useState(
    navigationState?.times || { startTime: 0, endTime: 0, duration: 0 }
  )
  const [isCustomWorkout, setIsCustomWorkout] = useState(
    navigationState?.isCustomWorkout ? true : false
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [allExercises, setAllExercises] = useState([])

  const handleAddExercise = (exercise) => {
    console.log("Selected:", exercise)
    const newExercise = {
      id: exercise.id,
      name: exercise.name,
      primary: exercise.primary || "unknown",
      secondary: exercise.secondary || null,
      equipment: exercise.equipment || null,
      setsData: [],
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
        isCustomWorkout,
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
            fetchedExercises.map((ex) => ({
              ...ex,
              notes: ex.notes ?? "",
              setsData:
                ex.setsData?.length > 0
                  ? ex.setsData
                  : [{ reps: 0, weight: 0, done: false }],
            }))
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
                <span className="ms-2 fs-6 badge rounded-pill text-bg-info">
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
                checked={isCustomWorkout}
                onChange={() => setIsCustomWorkout(!isCustomWorkout)}
              />
            </Form>
            <Stopwatch
              initialStartTime={times.startTime}
              initialEndTime={times.endTime}
              initialIsRunning={false}
              onTimeUpdate={setTimes}
            />
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

                {/* Exercise-Set Data */}
                {exercise.setsData?.map((set, setIdx) => {
                  const isDone = set.done
                  return (
                    <div
                      key={setIdx}
                      className={`d-flex flex-column flex-md-row align-items-md-center justify-content-between rounded p-3 mb-2 ${
                        isDone ? "bg-success text-dark" : "bg-dark text-light"
                      }`}
                    >
                      <div className="d-flex align-items-center gap-3 mb-3 mb-md-0">
                        <Form.Check
                          type="checkbox"
                          className="me-2 text-dark"
                          checked={isDone}
                          onChange={() => {
                            const updatedSets = [...(exercise.setsData || [])]
                            updatedSets[setIdx].done = !updatedSets[setIdx].done
                            handleExerciseChange(index, "setsData", updatedSets)
                          }}
                        />
                        <strong>{setIdx + 1}</strong>

                        <Form.Control
                          type="number"
                          placeholder="Weight"
                          className="w-auto text-center"
                          value={set.weight}
                          onChange={(e) => {
                            const updatedSets = [...(exercise.setsData || [])]
                            updatedSets[setIdx].weight = parseFloat(
                              e.target.value
                            )
                            handleExerciseChange(index, "setsData", updatedSets)
                          }}
                        />
                        <span>kg</span>

                        <Form.Control
                          type="number"
                          placeholder="Reps"
                          className="w-auto text-center"
                          value={set.reps}
                          onChange={(e) => {
                            const updatedSets = [...(exercise.setsData || [])]
                            updatedSets[setIdx].reps = parseInt(
                              e.target.value,
                              10
                            )
                            handleExerciseChange(index, "setsData", updatedSets)
                          }}
                        />
                        <span>Reps.</span>
                      </div>

                      <Button
                        variant={`${isDone ? "danger" : "outline-danger"}`}
                        size="sm"
                        onClick={() => {
                          const updatedSets = [...(exercise.setsData || [])]
                          updatedSets.splice(setIdx, 1)
                          handleExerciseChange(index, "setsData", updatedSets)
                        }}
                      >
                        ✖
                      </Button>
                    </div>
                  )
                })}

                {/* Add Set Button */}
                <Button
                  variant="outline-warning"
                  className="mt-2 w-100"
                  onClick={() => {
                    const updatedSets = [...(exercise.setsData || [])]
                    updatedSets.push({ weight: 0, reps: 0, done: false })
                    handleExerciseChange(index, "setsData", updatedSets)
                  }}
                >
                  + Add Set
                </Button>

                {/* Notes Section */}
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
