import { useEffect, useState } from "react"
import { Container, Row, Col, ListGroup, Spinner, Alert } from "react-bootstrap"
import { getExercises } from "../utils/exercise" // Adjust path if needed

const ExercisePage = () => {
  const [exercises, setExercises] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    getExercises(setExercises, setLoading, setError)
  }, [])

  return (
    <Container fluid className="d-flex flex-column min-vh-100 my-5">
      {/* Exercises Header */}
      <div className="text-center my-4">
        <h1 className="text-warning">Exercises</h1>
        <p>
          Browse through a list of exercises with details on muscles and
          equipment.
        </p>
      </div>

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

      {/* Exercises List */}
      {!loading && !error && (
        <Row className="justify-content-center">
          <Col md={10}>
            <Row>
              {exercises.map((exercise, index) => (
                <Col md={4} key={exercise.id || index} className="mb-4">
                  <ListGroup.Item className="rounded-3 bg-dark border border-warning p-2">
                      {exercise.image && (
                      <div className="mb-3 text-center">
                        <img
                          src={exercise.image}
                          alt={exercise.name}
                          style={{
                            maxWidth: "100%",
                            maxHeight: "180px",
                            objectFit: "cover",
                            borderRadius: "0.75rem",
                          }}
                        />
                      </div>
                    )}
                    <h4 className="mb-3">{exercise.name}</h4>
                    <p className="mb-2">
                      <strong>Primary Muscles:</strong>{" "}
                      {exercise.primaryMuscles}
                    </p>
                    <p className="mb-2">
                      <strong>Secondary Muscles:</strong>{" "}
                      {exercise.secondaryMuscles}
                    </p>
                    <p className="mb-0">
                      <strong>Equipment:</strong> {exercise.equipment}
                    </p>
                  </ListGroup.Item>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      )}
    </Container>
  )
}

export default ExercisePage
