import React, { useEffect, useState } from "react"
import {
  Container,
  Spinner,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Modal,
  Form,
} from "react-bootstrap"
import { motion } from "framer-motion"
import { getSplits } from "../utils/split"
import axiosInstance from "../utils/axios"

const getDifficultyColor = (level) => {
  switch (level) {
    case "beginner":
      return "success"
    case "intermediate":
      return "warning"
    case "advanced":
      return "danger"
    default:
      return "secondary"
  }
}

const SplitPage = () => {
  const [splits, setSplits] = useState([])
  const [filters, setFilters] = useState({ days: "", difficulty: "" })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedSplit, setSelectedSplit] = useState(null)
  const [splitWorkouts, setSplitWorkouts] = useState([])
  const [workoutsLoading, setWorkoutsLoading] = useState(false)
  const [workoutsError, setWorkoutsError] = useState(null)

  useEffect(() => {
    const fetchSplits = async () => {
      await getSplits(setSplits, setError, setLoading)
    }
    fetchSplits()
  }, [])

  useEffect(() => {
    if (!selectedSplit) {
      setSplitWorkouts([])
      setWorkoutsError(null)
      return
    }
    const fetchWorkouts = async () => {
      setWorkoutsLoading(true)
      setWorkoutsError(null)
      try {
        const res = await axiosInstance.get(
          `/splits/${selectedSplit.id}/workouts`
        )
        setSplitWorkouts(res.data)
      } catch (err) {
        setWorkoutsError("Failed to load workouts for this split.")
        setSplitWorkouts([])
      } finally {
        setWorkoutsLoading(false)
      }
    }
    fetchWorkouts()
  }, [selectedSplit])

  const filteredSplits = splits.filter(
    (split) =>
      (!filters.days || String(split.days) === String(filters.days)) &&
      (!filters.difficulty || split.difficulty === filters.difficulty)
  )

  return (
    <Container className="py-4">
      <div className="text-center mb-4">
        <h1>Workout Splits</h1>
        <p className="text-muted">
          Choose a training plan and start your workout!
        </p>
      </div>

      {/* Filters */}
      <Form className="mb-4">
        <Row>
          <Col md={4}>
            <Form.Group controlId="days">
              <Form.Label>Days per Week</Form.Label>
              <Form.Select
                value={filters.days}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, days: e.target.value }))
                }
              >
                <option value="">All</option>
                {[1, 2, 3, 4, 5, 6].map((d) => (
                  <option key={d} value={d}>
                    {d} Day{d > 1 && "s"}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="difficulty">
              <Form.Label>Difficulty</Form.Label>
              <Form.Select
                value={filters.difficulty}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, difficulty: e.target.value }))
                }
              >
                <option value="">All</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Form>

      {/* Loading / Error / Content */}
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" role="status" />
        </div>
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : filteredSplits.length > 0 ? (
        <Row>
          {filteredSplits.map((split) => (
            <Col key={split.id} md={6} className="mb-4">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 0 15px rgba(255, 193, 7, 0.4)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-100 bg-dark border border-warning text-light">
                    <Card.Body>
                      <Card.Title>{split.name}</Card.Title>
                      <div className="mb-2">{split.description}</div>
                      <Card.Text>
                        <span className="d-flex justify-content-between align-items-center">
                          <Badge bg="primary" className="me-2">
                            {split.days}x / week
                          </Badge>
                          <Badge bg={getDifficultyColor(split.difficulty)}>
                            {split.difficulty}
                          </Badge>
                        </span>
                      </Card.Text>
                      <Button
                        variant="primary"
                        onClick={() => setSelectedSplit(split)}
                        className="w-100"
                      >
                        View Details
                      </Button>
                    </Card.Body>
                  </Card>
                </motion.div>
              </motion.div>
            </Col>
          ))}
        </Row>
      ) : (
        <p>No workout splits found.</p>
      )}

      {/* Modal */}
      <Modal
        show={!!selectedSplit}
        onHide={() => setSelectedSplit(null)}
        centered
      >
        <Modal.Header closeButton className="bg-dark text-light">
          <Modal.Title>{selectedSplit?.name} Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light">
          {selectedSplit && (
            <>
              <p>
                <strong>Description:</strong> {selectedSplit.description}
              </p>
              <p>
                <strong>Days per Week:</strong> {selectedSplit.days}
              </p>
              <p>
                <strong>Difficulty:</strong> {selectedSplit.difficulty}
              </p>

              <h5 className="mt-3">Workouts:</h5>
              {workoutsLoading ? (
                <div>
                  <Spinner animation="border" size="sm" /> Loading workouts...
                </div>
              ) : workoutsError ? (
                <div className="text-danger">{workoutsError}</div>
              ) : splitWorkouts.length > 0 ? (
                <ul className="list-unstyled">
                  {splitWorkouts.map((workout) => (
                    <li key={workout.id} className="mb-2">
                      <strong>Day {workout.order}:</strong> {workout.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No workouts found for this split.</p>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="bg-dark text-light">
          <Button variant="secondary" onClick={() => setSelectedSplit(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default SplitPage
