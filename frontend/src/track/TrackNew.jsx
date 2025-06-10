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
  InputGroup,
} from "react-bootstrap"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { getWorkoutById, getWorkoutExercises } from "../utils/workout"
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
  const [times, setTimes] = useState(navigationState?.times || { startTime: 0, endTime: 0, duration: 0 })
  const [isCustomWorkout, setIsCustomWorkout] = useState(navigationState?.isCustomWorkout ? true : false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [validationErrors, setValidationErrors] = useState({});

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
  const handleRepsChange = (e, index, setIdx, setKey) => {
    const val = Number(e.target.value);
    const updatedExercises = [...exercises];
    updatedExercises[index].setsData[setIdx].reps = val;
    setExercises(updatedExercises);

    if (val > 0 && validationErrors[setKey]?.reps) {
      setValidationErrors((prev) => {
        const copy = { ...prev };
        if (copy[setKey]) {
          delete copy[setKey].reps;
          if (Object.keys(copy[setKey]).length === 0) delete copy[setKey];
        }
        return copy;
      });
    }
  }
  const handleWeightChange = (e, index, setIdx, setKey) => {
    const val = Number(e.target.value);
    const updatedExercises = [...exercises];
    updatedExercises[index].setsData[setIdx].weight = val;
    setExercises(updatedExercises);

    if (val > 0 && validationErrors[setKey]?.weight) {
      setValidationErrors((prev) => {
        const copy = { ...prev };
        if (copy[setKey]) {
          delete copy[setKey].weight;
          if (Object.keys(copy[setKey]).length === 0) delete copy[setKey];
        }
        return copy;
      });
    }
  }


  useEffect(() => {
    setLoading(true)

    getWorkoutById(workoutId, setWorkout, setError, () => setLoading(false))

    if (navigationState?.exercises?.length) {
      // Restoring previous exercise state (with user-entered data)
      setExercises(navigationState.exercises)
      setLoading(false)
    } else if (!isCustomWorkout) {
      // Fresh fetch from backend
      getWorkoutExercises(
        workoutId,
        (fetchedWorkoutExercises) => {
          const enrichedExercises = fetchedWorkoutExercises.map((we) => ({
            ...we.exercise,
            workoutExerciseId: we.id,
            notes: we.notes ?? "",
            setsData:
              we.setsData?.length > 0
                ? we.setsData
                : [{ reps: 0, weight: 0, done: false }],
          }))
          setExercises(enrichedExercises)
          setLoading(false)
        },
        setError,
        () => setLoading(false)
      )
    }

    getExercises(setAllExercises, setError, () => { })
  }, [navigationState?.exercises, workoutId, isCustomWorkout])

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

                {exercise.setsData.map((set, setIdx) => {
                  const setKey = `set-${index}-${setIdx}`;
                  const isValid = set.weight > 0 && set.reps > 0;
                  const hasWeightError = validationErrors[setKey]?.weight;
                  const hasRepsError = validationErrors[setKey]?.reps;

                  // Style for done sets
                  let doneStyle = set.done
                    ? {
                      //backgroundColor: "#1e1e1e",
                      border: "2px solid #28a745", // green when done
                      opacity: 0.85,
                    }
                    : {
                      //  backgroundColor: "#111", // near-black
                      border: "2px solid #ffc107", // Bootstrap warning yellow
                    };

                  if (hasWeightError || hasRepsError) {
                    doneStyle = {
                      ...doneStyle,
                      border: "2px solid #dc3545", // red border for errors
                    };
                  }

                  return (
                    <div
                      key={setKey}
                      style={{
                        border: "1px solid",
                        borderRadius: "6px",
                        marginBottom: "10px",
                        ...doneStyle,
                      }}
                      className="d-flex py-3 px-3 align-items-center"
                    >

                      {/* Checkbox on left */}
                      <div className="me-3" style={{ minWidth: "110px" }}>
                        {/* Set number */}
                        <Form.Check
                          type="checkbox"
                          label={`Set ${setIdx + 1}`}
                          className="text-warning fw-bold"
                          checked={set.done}
                          isInvalid={!!validationErrors[setKey]}
                          onClick={(e) => {
                            const weightValid = set.weight > 0;
                            const repsValid = set.reps > 0;

                            if (!weightValid || !repsValid) {
                              e.preventDefault();
                              setValidationErrors((prev) => ({
                                ...prev,
                                [setKey]: {
                                  weight: !weightValid,
                                  reps: !repsValid,
                                },
                              }));
                            } else {
                              setValidationErrors((prev) => {
                                const copy = { ...prev };
                                delete copy[setKey];
                                return copy;
                              });

                              const updatedExercises = [...exercises];
                              updatedExercises[index].setsData[setIdx].done = e.target.checked;
                              setExercises(updatedExercises);
                            }
                          }}
                        />
                      </div>
                      <Col>
                        <Row className="justify-content-end text-end">
                          {/* Weight input */}
                          <Col md={6}>
                            <InputGroup>
                              <Form.Control
                                type="number"
                                min={0}
                                value={set.weight}
                                isInvalid={hasWeightError}
                                onChange={(e) => handleWeightChange(e, index, setIdx, setKey)}
                                className="text-center"
                              />
                              <InputGroup.Text className="bg-dark text-warning border-warning">
                                kg
                              </InputGroup.Text>
                            </InputGroup>

                          </Col>
                          {/* Reps input */}
                          <Col md={6} >
                            <InputGroup >
                              <Form.Control
                                type="number"
                                min={0}
                                value={set.reps}
                                isInvalid={hasRepsError}
                                onChange={(e) => handleRepsChange(e, index, setIdx, setKey)}
                                className="text-center"
                              />
                              <InputGroup.Text className="bg-dark text-warning border-warning">
                                reps
                              </InputGroup.Text>
                            </InputGroup>

                          </Col>
                        </Row>
                      </Col>

                      {/* Delete set button on far right */}
                      <div className="ms-3">
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => {
                            const updatedExercises = [...exercises];
                            updatedExercises[index].setsData.splice(setIdx, 1);
                            setExercises(updatedExercises);

                            setValidationErrors((prev) => {
                              const copy = { ...prev };
                              delete copy[setKey];
                              return copy;
                            });
                          }}
                        >
                          ✖
                        </Button>
                      </div>
                    </div>
                  );
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
      </motion.div >
    </Container >
  )
}

export default WorkoutTrackNew
