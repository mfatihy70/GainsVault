import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Container, Card, Button, Row, Col } from "react-bootstrap"
import { formatDateTime, formatDuration } from "../utils/stopwatch" // Make sure these utilities are available

const WorkoutSummary = () => {
  const { state } = useLocation()
  const navigate = useNavigate()

  if (!state) {
    return (
      <p className="text-center text-light py-5">No summary data available.</p>
    )
  }

  const { workout, exercises, workoutId, times } = state

  const { startTime, endTime, duration } = times || {}

  return (
    <Container className="py-5 bg-dark text-light">
      <Button
        variant="outline-warning"
        className="mb-3"
        onClick={() =>
          navigate(`/track/${workoutId}`, { state: { workout, exercises } })
        }
      >
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
      {exercises.map((ex, i) => (
        <Card key={i} className="mb-4 bg-dark text-light border border-warning">
          <Card.Body>
            <Card.Title className="text-warning">{ex.name}</Card.Title>
            <p>
              Muscle: <strong>{ex.primary}</strong>
              {ex.secondary && ` → ${ex.secondary}`}
              {ex.equipment && ` | Equipment: ${ex.equipment}`}
            </p>
            <Row>
              <Col>
                <strong>Sets:</strong> {ex.sets || "-"}
              </Col>
              <Col>
                <strong>Reps:</strong> {ex.reps || "-"}
              </Col>
              <Col>
                <strong>Weight:</strong> {ex.weight ? `${ex.weight} kg` : "-"}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}

      {/* Final Action */}
      <div className="text-center mt-4">
        <Button variant="success" onClick={() => navigate("/track")}>
          Done
        </Button>
      </div>
    </Container>
  )
}

export default WorkoutSummary
