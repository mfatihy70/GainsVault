import { useLocation, useNavigate } from "react-router-dom"
import { Container, Card, Button, Row, Col, Badge } from "react-bootstrap"
import { formatDateTime, formatDuration } from "../utils/stopwatch"

const WorkoutSummary = () => {
  const { state } = useLocation()
  const navigate = useNavigate()

  if (!state) {
    return (
      <p className="text-center text-light py-5">No summary data available.</p>
    )
  }

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
                <Card.Title className="text-warning mb-2">
                  {ex.name}
                  <Badge bg="info" className="ms-2">
                    {ex.primary}
                  </Badge>
                  {ex.secondary && (
                    <Badge bg="secondary" className="ms-2">
                      {ex.secondary}
                    </Badge>
                  )}
                </Card.Title>

                {ex.equipment && (
                  <p className="text-muted mb-3">Equipment: {ex.equipment}</p>
                )}

                {/* Sets */}
                <div className="mb-3">
                  <strong className="d-block mb-2">Sets Performed:</strong>
                  <Row className="g-2">
                    {finishedSets.map((set, idx) => (
                      <Col key={idx} md={4}>
                        <Card
                          bg="success"
                          text="dark"
                          className="p-2"
                        >
                          <div>
                            <strong>Set {idx + 1}</strong>
                          </div>
                          <div>Weight: {set.weight} kg</div>
                          <div>Reps: {set.reps}</div>
                        </Card>
                      </Col>
                    ))}
                  </Row>
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
