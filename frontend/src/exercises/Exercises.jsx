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

const Exercises = () => {
  const [exercises, setExercises] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState("")
  const [primary, setPrimary] = useState("")
  const [secondary, setSecondary] = useState("")
  const [equipment, setEquipment] = useState("")
  const [difficulty, setDifficulty] = useState("")

  // Modal State for new Exercise
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    primary: "",
    secondary: "",
    equipment: "",
    difficulty: "",
  })
  // Track touched fields for validation
  const [touched, setTouched] = useState({})
  const [submitAttempted, setSubmitAttempted] = useState(false)

  useEffect(() => {
    setLoading(true)
    getExercises(
      (data) => {
        setExercises(data)
        setLoading(false)
        setError(null)
      },
      setLoading,
      setError
    )
  }, [])

  // Reload after adding
  const reloadExercises = () => {
    setLoading(true)
    getExercises(
      (data) => {
        setExercises(data)
        setLoading(false)
        setError(null)
      },
      setLoading,
      setError
    )
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setTouched({ ...touched, [e.target.name]: true })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitAttempted(true)
    // Validation
    if (!formData.name || !formData.primary || !formData.difficulty) {
      return
    }
    try {
      const res = await fetch("http://localhost:5050/api/exercises", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        alert("Exercise created!")
        setShowModal(false)
        setFormData({
          name: "",
          primary: "",
          secondary: "",
          equipment: "",
          difficulty: "",
        })
        setTouched({})
        setSubmitAttempted(false)
        reloadExercises()
      } else {
        alert("Error creating exercise.")
      }
    } catch (err) {
      alert("Server error.")
    }
  }

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

  // Helper for validation
  const showWarning = (field) =>
    (submitAttempted || touched[field]) && !formData[field]

  return (
    <Container fluid className="d-flex flex-column min-vh-100 my-5">
      {/* Exercises Header */}
      <div className="text-center my-4">
        <h1 className="text-warning">Exercises</h1>
        <p>
          Browse a list of exercises with details about muscles and equipment.
        </p>
        <Button variant="warning" onClick={() => setShowModal(true)}>
          + Add Exercise
        </Button>
      </div>

      {/* Modal for new Exercise */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: "#222",
              padding: "2rem",
              borderRadius: "8px",
              minWidth: 350,
            }}
          >
            <h3 className="text-warning">New Exercise</h3>
            <form onSubmit={handleSubmit}>
              <input
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className={`form-control mb-2 bg-dark text-light border border-warning`}
                autoComplete="off"
              />
              {showWarning("name") && (
                <div className="text-warning small mb-2">Name is required.</div>
              )}
              <select
                name="primary"
                value={formData.primary}
                onChange={handleInputChange}
                required
                className="form-control mb-2 bg-dark text-light border border-warning"
              >
                <option value="">Primary Muscle</option>
                {muscles.map((m) => (
                  <option key={m} value={m}>
                    {m.charAt(0).toUpperCase() + m.slice(1)}
                  </option>
                ))}
              </select>
              {showWarning("primary") && (
                <div className="text-warning small mb-2">
                  Primary muscle is required.
                </div>
              )}
              <select
                name="secondary"
                value={formData.secondary}
                onChange={handleInputChange}
                className="form-control mb-2 bg-dark text-light border border-warning"
              >
                <option value="">Secondary Muscle (optional)</option>
                {muscles.map((m) => (
                  <option key={m} value={m}>
                    {m.charAt(0).toUpperCase() + m.slice(1)}
                  </option>
                ))}
              </select>
              <select
                name="equipment"
                value={formData.equipment}
                onChange={handleInputChange}
                className="form-control mb-2 bg-dark text-light border border-warning"
              >
                <option value="">Equipment (optional)</option>
                {equipmentList.map((e) => (
                  <option key={e} value={e}>
                    {e.charAt(0).toUpperCase() + e.slice(1)}
                  </option>
                ))}
              </select>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleInputChange}
                className="form-control mb-2 bg-dark text-light border border-warning"
                required
              >
                <option value="">Difficulty</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              {showWarning("difficulty") && (
                <div className="text-warning small mb-2">
                  Difficulty is required.
                </div>
              )}
              <div className="d-flex gap-2 mt-2">
                <button type="submit" className="btn btn-warning">
                  Create
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowModal(false)
                    setTouched({})
                    setSubmitAttempted(false)
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
              Reset
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
                  <Col
                    md={4}
                    key={exercise.id || exercise._id || idx}
                    className="mb-4"
                  >
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
                          <strong>Primary Muscle:</strong> {exercise.primary}
                        </p>
                        <p className="mb-2">
                          <strong>Secondary Muscle:</strong>{" "}
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

export default Exercises
