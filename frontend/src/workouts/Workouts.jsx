import { useState, useEffect } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
  Table,
} from "react-bootstrap"
import { motion } from "framer-motion"

const WorkoutsPage = () => {
  const [selectedMuscle, setSelectedMuscle] = useState("all")
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedWorkout, setSelectedWorkout] = useState(null)
  const [selectedWorkoutExercises, setSelectedWorkoutExercises] = useState([])
  const [search, setSearch] = useState("")
  const [difficulty, setDifficulty] = useState("")

  const handleCloseModal = () => setShowModal(false)
  const handleShowModal = async (workout, e) => {
    if (e) e.preventDefault()
    setSelectedWorkout(workout)
    setShowModal(true)

    // Fetch exercises for the selected workout
    const exercises = await fetchWorkoutExercises(workout.id)
    setSelectedWorkoutExercises(exercises)
  }

  const fetchWorkoutExercises = async (workoutId) => {
    try {
      const response = await fetch(
        `http://localhost:5050/api/workouts/${workoutId}/exercises`
      )
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error fetching workout exercises:", error)
      return []
    }
  }

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch("http://localhost:5050/api/workouts")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setWorkouts(data)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchWorkouts()
  }, [])

  const muscleGroups = [
    { value: "all", label: "All Muscles" },
    { value: "Chest", label: "Chest" },
    { value: "Back", label: "Back" },
    { value: "Legs", label: "Legs" },
    { value: "Shoulders", label: "Shoulders" },
    { value: "Arms", label: "Arms" },
    { value: "Core", label: "Core" },
  ]

  const filteredWorkouts = workouts.filter(
    (w) =>
      w.name.toLowerCase().includes(search.toLowerCase()) &&
      (!difficulty || w.difficulty === difficulty)
  )

  return (
    <Container className="py-5 bg-dark text-light">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-center mb-4 text-warning">Workouts</h1>

        {/* Filter */}
        <Form.Group className="mb-3 text-center" controlId="searchFilter">
          <Form.Label>Search Workouts</Form.Label>
          <Form.Control
            type="text"
            placeholder="Search by workout name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mx-auto bg-dark text-light border border-warning"
            style={{ maxWidth: "300px" }}
          />
        </Form.Group>
        <Form.Group className="mb-3 text-center" controlId="difficultyFilter">
          <Form.Label>Filter by Difficulty</Form.Label>
          <Form.Select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="mx-auto bg-dark text-light border border-warning"
            style={{ maxWidth: "300px" }}
          >
            <option value="">All</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-5 text-center" controlId="muscleGroupFilter">
          <Form.Label>Filter by Target Muscle</Form.Label>
          <Form.Select
            value={selectedMuscle}
            onChange={(e) => setSelectedMuscle(e.target.value)}
            className="mx-auto bg-dark text-light border border-warning"
            style={{ maxWidth: "300px" }}
          >
            {muscleGroups.map((muscle) => (
              <option key={muscle.value} value={muscle.value}>
                {muscle.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {/* Cards */}
        <Row>
          {loading && <p>Loading workouts...</p>}
          {error && <p>Error loading workouts: {error.message}</p>}
          {!loading &&
            !error &&
            filteredWorkouts.map((workout) => (
              <Col key={workout.id} md={4} className="mb-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="h-100 bg-dark text-light border border-warning shadow-sm">
                    <Card.Body className="px-4">
                      <Card.Title className="text-warning">
                        {workout.name}
                      </Card.Title>
                      <Card.Subtitle className="m-2">
                        Split ID: {workout.split_id}
                      </Card.Subtitle>
                      <Card.Text>
                        <strong>Order:</strong> {workout.order}
                      </Card.Text>
                      <Button
                        variant="warning"
                        className="w-100 fw-semibold"
                        onClick={(e) => handleShowModal(workout, e)}
                      >
                        View Details
                      </Button>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
        </Row>
      </motion.div>

      {/* Workout Detail Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton className="bg-dark text-light border-warning">
          <Modal.Title className="text-warning">
            {selectedWorkout?.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light">
          {selectedWorkout && (
            <>
              <p>
                <strong>Split ID:</strong> {selectedWorkout.split_id}
              </p>
              <p>
                <strong>Order:</strong> {selectedWorkout.order}
              </p>

              <h4>Exercises:</h4>
              <Table
                striped
                bordered
                hover
                variant="dark"
                className="border-warning"
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Exercise</th>
                    <th>Primary Muscles</th>
                    <th>Secondary Muscles</th>
                    <th>Equipment</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedWorkoutExercises.map((we, idx) => (
                    <tr key={we.id}>
                      <td>{idx + 1}</td>
                      <td>{we.exercise.name}</td>
                      <td>{we.exercise.primaryMuscles}</td>
                      <td>{we.exercise.secondaryMuscles}</td>
                      <td>{we.exercise.equipment}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="bg-dark border-warning">
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default WorkoutsPage
