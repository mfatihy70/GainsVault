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
import { getWorkouts, getWorkoutExercisesByWorkoutId } from "../utils/workout"
import { getSplits } from "../utils/split"
import CreateWorkoutModal from "./CreateWorkoutModal"

const WorkoutsPage = () => {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedWorkout, setSelectedWorkout] = useState(null)
  const [selectedWorkoutExercises, setSelectedWorkoutExercises] = useState([])
  const [search, setSearch] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [splits, setSplits] = useState([])
  const [splitMap, setSplitMap] = useState({})
  const [selectedSplit, setSelectedSplit] = useState("")
  const [showCreateModal, setShowCreateModal] = useState(false)

  const handleCloseModal = () => setShowModal(false)

  const handleShowModal = async (workout, e) => {
    if (e) e.preventDefault()
    setSelectedWorkout(workout)
    setShowModal(true)
    // Pass all required parameters
    await getWorkoutExercisesByWorkoutId(
      workout.id,
      setSelectedWorkoutExercises,
      setError,
      setLoading
    )
  }

  useEffect(() => {
    getSplits(setSplits, setError, setLoading)
  }, [])

  useEffect(() => {
    const map = {}
    splits.forEach((split) => {
      map[split.id] = split.name
    })
    setSplitMap(map)
  }, [splits])

  useEffect(() => {
    getWorkouts(setWorkouts, setError, setLoading)
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const splitParam = params.get("split")
    if (splitParam) setSelectedSplit(splitParam)
  }, [])

  const filteredWorkouts = workouts.filter(
    (w) =>
      w.name.toLowerCase().includes(search.toLowerCase()) &&
      (!difficulty || w.difficulty === difficulty) &&
      (!selectedSplit || String(w.split_id) === String(selectedSplit))
  )

  const getSplitName = (splitId) => {
    const split = splits.find((s) => s.id == splitId)
    return split ? split.name : `Split ${splitId}`
  }

  const handleWorkoutCreated = () => {
    getWorkouts(setWorkouts, setError, setLoading)
  }

  return (
    <Container className="py-5 bg-dark text-light">
      {/* Header Buttons */}
      <div className="d-flex justify-content-end mb-3 gap-2">
        <Button
          variant="warning"
          className="fw-semibold"
          onClick={() => setShowCreateModal(true)}
        >
          + Create Workout
        </Button>
      </div>

      {/* Modals */}
      <CreateWorkoutModal
        show={showCreateModal}
        handleClose={() => setShowCreateModal(false)}
        onWorkoutCreated={handleWorkoutCreated}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-center mb-4 text-warning">Workouts</h1>

        {/* Filters */}
        <Form className="mb-4">
          <Row className="align-items-end">
            <Col md={4} className="mb-2">
              <Form.Group controlId="searchFilter">
                <Form.Label>Search Workouts</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Search by workout name"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-dark text-light border border-warning"
                />
              </Form.Group>
            </Col>
            <Col md={4} className="mb-2">
              <Form.Group controlId="difficultyFilter">
                <Form.Label>Difficulty</Form.Label>
                <Form.Select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="bg-dark text-light border border-warning"
                >
                  <option value="">All</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4} className="mb-2">
              <Form.Group controlId="splitFilter">
                <Form.Label>Split</Form.Label>
                <Form.Select
                  value={selectedSplit}
                  onChange={(e) => setSelectedSplit(e.target.value)}
                  className="bg-dark text-light border border-warning"
                >
                  <option value="">All</option>
                  {splits.map((split) => (
                    <option key={split.id} value={split.id}>
                      {split.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Form>

        {/* Workout Cards */}
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
                    {workout.image && (
                      <Card.Img
                        variant="top"
                        src={workout.image}
                        alt={workout.name}
                        style={{ objectFit: "cover", height: "180px" }}
                      />
                    )}
                    {/* If your backend uses imageUrl instead of image, use this: */}
                    {/* {workout.imageUrl && (
                      <Card.Img
                        variant="top"
                        src={workout.imageUrl}
                        alt={workout.name}
                        style={{ objectFit: "cover", height: "180px" }}
                      />
                    )} */}
                    <Card.Body className="px-4">
                      <Card.Title className="text-warning">
                        {workout.name}
                      </Card.Title>
                      <Card.Subtitle className="m-2">
                        <strong>Split: </strong>
                        {splitMap[workout.split_id] ||
                          `Split ${workout.split_id}`}
                      </Card.Subtitle>
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

      {/* Workout Details Modal */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        size="lg"
        dialogClassName="workout-modal-xl"
      >
        <Modal.Header closeButton className="bg-dark text-light border-warning">
          <Modal.Title className="text-warning">
            {selectedWorkout?.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light">
          {selectedWorkout && (
            <>
              <p>
                <strong>Split:</strong> {getSplitName(selectedWorkout.split_id)}
              </p>
              <h4>Exercises:</h4>
              <Table
                striped
                bordered
                hover
                variant="dark"
                className="border-warning"
                responsive
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Exercise</th>
                    <th>Primary Muscle</th>
                    <th>Secondary Muscle</th>
                    <th>Equipment</th>
                    <th>Image</th>
                    <th>Difficulty</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedWorkoutExercises.map((we, idx) => (
                    <tr key={we.id}>
                      <td>{idx + 1}</td>
                      <td>{we.exercise?.name}</td>
                      <td>{we.exercise?.primary}</td>
                      <td>{we.exercise?.secondary || "-"}</td>
                      <td>{we.exercise?.equipment}</td>
                      <td>
                        {we.exercise?.image && (
                          <img
                            src={we.exercise.image}
                            alt={we.exercise.name}
                            style={{
                              width: 60,
                              height: 40,
                              objectFit: "cover",
                            }}
                          />
                        )}
                      </td>
                      <td>{we.exercise?.difficulty}</td>
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
