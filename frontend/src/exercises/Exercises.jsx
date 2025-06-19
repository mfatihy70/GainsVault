import { useEffect, useState } from "react"
import {
  Container,
  Row,
  Col,
  ListGroup,
  Spinner,
  Alert,
  Form,
  InputGroup,
  Button,
} from "react-bootstrap"
import { getExercises } from "../utils/exercise"
import { motion } from "framer-motion"

const muscles = [
  "chest",
  "traps",
  "delts",
  "biceps",
  "triceps",
  "forearms",
  "lats",
  "abs",
  "quads",
  "hamstrings",
  "glutes",
  "calves",
  "lower back",
]
const equipmentList = ["barbell", "dumbbell", "cable", "machine", "bodyweight"]
const difficulties = ["beginner", "intermediate", "advanced"]

const ExercisePage = () => {
  const [exercises, setExercises] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState("")
  const [primary, setPrimary] = useState("")
  const [secondary, setSecondary] = useState("")
  const [equipment, setEquipment] = useState("")
  const [difficulty, setDifficulty] = useState("")

  useEffect(() => {
    setLoading(true)
    getExercises(setExercises, setLoading, setError)
  }, [])

  const filteredExercises = exercises.filter(
    (ex) =>
      ex.name.toLowerCase().includes(search.toLowerCase()) &&
      (!primary || ex.primary === primary) &&
      (!secondary || ex.secondary === secondary) &&
      (!equipment || ex.equipment === equipment) &&
      (!difficulty || ex.difficulty === difficulty)
  )

  const selectOptions = (arr, label) => [
    <option key="" value="">
      {label}
    </option>,
    ...arr.map((v) => (
      <option key={v} value={v}>
        {v.charAt(0).toUpperCase() + v.slice(1)}
      </option>
    )),
  ]

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

      {/* Filter Controls */}
      <Form className="mb-4">
        <Row className="g-2 justify-content-center">
          <Col md={3}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search by name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col md={2}>
            <Form.Select
              value={primary}
              className="bg-dark text-light border border-warning"
              onChange={(e) => setPrimary(e.target.value)}
              children={selectOptions(muscles, "Primary Muscle")}
            />
          </Col>
          <Col md={2}>
            <Form.Select
              value={secondary}
              className="bg-dark text-light border border-warning"
              onChange={(e) => setSecondary(e.target.value)}
              children={selectOptions(muscles, "Secondary Muscle")}
            />
          </Col>
          <Col md={2}>
            <Form.Select
              value={equipment}
              className="bg-dark text-light border border-warning"
              onChange={(e) => setEquipment(e.target.value)}
              children={selectOptions(equipmentList, "Equipment")}
            />
          </Col>
          <Col md={2}>
            <Form.Select
              value={difficulty}
              className="bg-dark text-light border border-warning"
              onChange={(e) => setDifficulty(e.target.value)}
              children={selectOptions(difficulties, "Difficulty")}
            />
          </Col>
          <Col md={1} className="d-flex align-items-center">
            <Button
              variant="outline-warning"
              className="w-100"
              onClick={() => {
                setSearch("")
                setPrimary("")
                setSecondary("")
                setEquipment("")
                setDifficulty("")
              }}
            >
              Clear
            </Button>
          </Col>
        </Row>
      </Form>

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
              {filteredExercises.length === 0 ? (
                <Col>
                  <Alert variant="warning" className="text-center mt-4">
                    No exercises found.
                  </Alert>
                </Col>
              ) : (
                filteredExercises.map((exercise, idx) => (
                  <Col md={4} key={exercise.id || idx} className="mb-4">
                    <motion.div
                      whileHover={{
                        y: -10,
                        boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      <ListGroup.Item
                        className="rounded-3 bg-dark border border-warning p-2 position-relative"
                        style={{ minHeight: "370px" }}
                      >
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
                        <h4 className="mb-2">{exercise.name}</h4>
                        <p className="mb-2">
                          <strong>Primary Muscles:</strong> {exercise.primary}
                        </p>
                        <p className="mb-2">
                          <strong>Secondary Muscles:</strong>{" "}
                          {exercise.secondary ? exercise.secondary : "-"}
                        </p>
                        <p className="mb-4">
                          <strong>Equipment:</strong> {exercise.equipment}
                        </p>
                        {exercise.difficulty && (
                          <div className="d-flex justify-content-center mt-3">
                            <span
                              className="px-3 py-1 rounded-pill small"
                              style={{
                                background:
                                  exercise.difficulty === "beginner"
                                    ? "#198754"
                                    : exercise.difficulty === "intermediate"
                                    ? "#ffc107"
                                    : "#dc3545",
                                color:
                                  exercise.difficulty === "intermediate"
                                    ? "#212529"
                                    : "#fff",
                                fontWeight: 600,
                                minWidth: "100px",
                                textAlign: "center",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                              }}
                            >
                              {exercise.difficulty}
                            </span>
                          </div>
                        )}
                      </ListGroup.Item>
                    </motion.div>
                  </Col>
                ))
              )}
            </Row>
          </Col>
        </Row>
      )}
    </Container>
  )
}

export default ExercisePage
