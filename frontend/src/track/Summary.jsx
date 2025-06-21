import { useLocation, useNavigate } from "react-router-dom"
import { Container, Card, Button, Row, Col, Badge, Image } from "react-bootstrap"
import { formatDateTime, formatDuration } from "../utils/stopwatch"
import workoutImage from '../assets/workout.png'
import { createTrackedWorkout } from "../utils/workout"

const WorkoutSummary = () => {
  const { state } = useLocation()
  const navigate = useNavigate()

  if (!state) {
    return (
      <p className="text-center text-light py-5">No summary data available.</p>
    )
  }

  const userId = localStorage.getItem("userId")
  const { workout, exercises, workoutId, times, isCustomWorkout } = state
  const { startTime, endTime, duration } = times || {}
  const finishedExercises = exercises
    .map((ex) => {
      const finishedSets = ex.setsData?.filter((set) => set.done) || []
      if (finishedSets.length === 0) return null

      return {
        ...ex,
        setsData: finishedSets, // replace original sets with only finished ones
      }
    })
    .filter(Boolean) // removes nulls

  const handleSubmitWorkout = () => {
    console.log("Submitting workout data...")
    console.log("Workout ID:", workoutId)
    console.log("Workout Data:", workout)
    console.log("Exercises:", exercises)
    console.log("Times:", times)
    console.log("Is Custom Workout:", isCustomWorkout)
    // Submit logic here

    const trackedWorkoutData = {
      userId: userId,
      workoutId: workoutId,
      name: workout?.name || "Custom Workout",
      performedAt: new Date(),
      start: new Date(startTime).toISOString(),
      end: new Date(endTime).toISOString(),
      default: !isCustomWorkout, // true if it's a default workout
      exercises: finishedExercises.map((exercise) => ({
        exerciseId: exercise.id,
        performedAt: new Date(),
        notes: exercise.notes || null,
        sets: exercise.setsData.map((set, index) => ({
          kg: set.weight,
          reps: set.reps,
          performedAt: new Date(),
          set_order: index + 1,
        })),
      })),
    };
    console.log("Tracked Workout Data:", trackedWorkoutData);
    createTrackedWorkout(trackedWorkoutData, () => { }, () => { });
  }

  const handleGoBack = () => {
    navigate(`/track/${workoutId}`, {
      state: {
        workout,
        exercises,
        workoutId,
        times,
        isCustomWorkout,
      },
    })
  }

  return (
    <Container className="py-5 bg-dark text-light">
      <Button variant="outline-warning" className="mb-3" onClick={handleGoBack}>
        ← Back to Workout
      </Button>

      <h2 className="text-warning text-center mb-2">{workout?.name} Summary</h2>
      <p className="text-muted text-center mb-4">{workout?.description}</p>

      {/* Time Summary */}
      <Card className="mb-4 text-light bg-dark border border-warning">
        <Card.Body>
          <Row className="text-center">
            <Col>
              <strong className="text-warning">Start Time</strong>
              <div>{formatDateTime(startTime)}</div>
            </Col>
            <Col>
              <strong className="text-warning">End Time</strong>
              <div>{formatDateTime(endTime)}</div>
            </Col>
            <Col>
              <strong className="text-warning">Duration</strong>
              <div>{formatDuration(duration)}</div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Exercise Summary */}
      {finishedExercises.map((ex, i) => {
        const finishedSets = ex.setsData

        return (
          <Card key={i} className="mb-4 bg-dark text-light border border-warning">
            <Card.Body>
              <Card.Title className="text-warning mb-3 d-flex justify-content-center">
                <div className="d-flex align-items-center">
                  <Image
                    src={ex.image || workoutImage}
                    alt={ex.name}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "0.25rem",
                      marginRight: "1rem",
                    }}
                    rounded
                  />
                  <div className="d-flex flex-column">
                    <div className="fw-bold">{ex.name}</div>
                    <div className="mt-1">
                      <Badge bg="info" className="me-2">
                        {ex.primary}
                      </Badge>
                      {ex.secondary && (
                        <Badge bg="secondary" className="me-2">
                          {ex.secondary}
                        </Badge>
                      )}
                    </div>
                    {ex.equipment && (
                      <p
                        style={{
                          color: "#dcdcdc",
                          fontSize: "0.8rem",
                          marginBottom: "0.25rem",
                          marginTop: "0.25rem",
                        }}
                      >
                        Equipment: {ex.equipment}
                      </p>
                    )}
                  </div>
                </div>
              </Card.Title>

              {/* Sets */}
              <div className="mb-3">
                <strong className="d-block mb-2">Sets Performed:</strong>
                <div className="d-flex flex-column gap-2">
                  {finishedSets.map((set, idx) => (
                    <Card
                      key={idx}
                      bg="success"
                      text="dark"
                      className="p-2"
                    >
                      <div className="d-flex justify-content-between gap-3">
                        <div><strong>Set {idx + 1}</strong></div>
                        <div>Weight: {set.weight} kg</div>
                        <div>Reps: {set.reps}</div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>


              {/* Notes */}
              {ex.notes && (
                <div className="mt-2">
                  <strong>Notes:</strong>
                  <p className="fst-italic text-info mb-0">{ex.notes}</p>
                </div>
              )}
            </Card.Body>
          </Card>
        )
      })}


      {/* Final Action */}
      <div className="text-center mt-4">
        <Button variant="success" size="lg" onClick={handleSubmitWorkout}>
          Save Workout
        </Button>
      </div>
    </Container>
  )
}

export default WorkoutSummary
