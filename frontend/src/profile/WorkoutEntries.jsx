import React, { useEffect, useState } from "react"
import {
  Spinner,
  Alert,
  Accordion,
  Card,
  Table,
  Container
} from "react-bootstrap"
import { getUserWorkoutEntries } from "../utils/user"

const WorkoutEntries = ({ userId }) => {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        await getUserWorkoutEntries(userId, setWorkouts, setError, setLoading)
      } catch (err) {
        setError("Failed to load workout entries.")
      } finally {
        setLoading(false)
      }
    }

    fetchWorkouts()
  }, [userId])

  if (loading) return <Spinner animation="border" variant="warning" />
  if (error) return <Alert variant="danger">{error}</Alert>
  if (workouts.length === 0) return <p className="text-light">No workout entries found.</p>

  return (
    <Container fluid className="mt-3">
      <Accordion defaultActiveKey="0" className="custom-accordion">
        {workouts.map((workout, idx) => (
          <Accordion.Item
            eventKey={idx.toString()}
            key={workout.id}
            className="bg-dark border border-warning text-light"
          >
            <Accordion.Header className="custom-accordion-header">
              <span className="text-warning fw-semibold">
                {new Date(workout.start).toLocaleDateString("fi-FI")} — {workout.name || "Unnamed Workout"}
              </span>
            </Accordion.Header>
            <Accordion.Body className="bg-dark text-light">
              {workout.exercise_entries.map((entry) => (
                <Card className="bg-dark border border-warning text-light mb-3" key={entry.id}>
                  <Card.Header className="bg-dark text-warning">
                    {entry.exercise?.name || "Unnamed Exercise"}
                  </Card.Header>
                  <Card.Body>
                    {entry.set_entries.length > 0 ? (
                      <Table striped bordered hover variant="dark" size="sm">
                        <thead className="table-warning text-dark">
                          <tr>
                            <th>Set</th>
                            <th>Reps</th>
                            <th>Weight (kg)</th>
                            <th>Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {entry.set_entries.map((set, index) => (
                            <tr key={set.id}>
                              <td>{index + 1}</td>
                              <td>{set.reps}</td>
                              <td>{set.kg}</td>
                              <td>
                                {set.performed_at
                                  ? new Date(set.performed_at).toLocaleTimeString()
                                  : "—"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    ) : (
                      <p>No sets recorded.</p>
                    )}
                  </Card.Body>
                </Card>
              ))}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

    </Container>
  )
}

export default WorkoutEntries
