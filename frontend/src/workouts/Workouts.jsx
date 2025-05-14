import React, { useState } from "react"
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap"
import { motion } from "framer-motion"

const Workouts = () => {
  const [selectedMuscle, setSelectedMuscle] = useState("all")

  const workouts = [
    {
      id: 1,
      name: "Push Day",
      targetMuscle: "Chest",
      exercises: ["Bench Press", "Incline Dumbbell Press", "Tricep Pushdowns"],
      difficulty: "Intermediate",
      duration: "60 min",
      image:
        "https://images.unsplash.com/photo-1549476464-37392f717541?q=80&w=1887&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Pull Day",
      targetMuscle: "Back",
      exercises: ["Pull-ups", "Barbell Rows", "Bicep Curls"],
      difficulty: "Intermediate",
      duration: "60 min",
      image:
        "https://images.unsplash.com/photo-1581009137042-c552e485697a?ixlib=rb-1.2.1&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Leg Day",
      targetMuscle: "Legs",
      exercises: ["Squats", "Romanian Deadlifts", "Leg Press"],
      difficulty: "Advanced",
      duration: "75 min",
      image:
        "https://images.unsplash.com/photo-1596357395217-80de13130e92?q=80&w=2071&auto=format&fit=crop",
    },
  ]

  const muscleGroups = [
    { value: "all", label: "All Muscles" },
    { value: "Chest", label: "Chest" },
    { value: "Back", label: "Back" },
    { value: "Legs", label: "Legs" },
    { value: "Shoulders", label: "Shoulders" },
    { value: "Arms", label: "Arms" },
    { value: "Core", label: "Core" },
  ]

  const filteredWorkouts =
    selectedMuscle === "all"
      ? workouts
      : workouts.filter((w) => w.targetMuscle === selectedMuscle)

  return (
    <Container className="py-5 bg-dark text-light">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-center mb-4 text-warning">Workouts</h1>

        {/* Filter */}
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
          {filteredWorkouts.map((workout) => (
            <Col key={workout.id} md={4} className="mb-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-100 bg-dark text-light border border-warning shadow-sm">
                  <div
                    className="position-relative"
                    style={{ height: "200px", overflow: "hidden" }}
                  >
                    <Card.Img
                      variant="top"
                      src={workout.image}
                      alt={workout.name}
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                        transition: "transform 0.3s ease",
                      }}
                      className="hover-zoom"
                    />
                    <span className="position-absolute top-0 end-0 m-2 px-3 py-1 bg-warning text-dark rounded-pill">
                      {workout.difficulty}
                    </span>
                  </div>
                  <Card.Body className="px-4">
                    <Card.Title className="text-warning">
                      {workout.name}
                    </Card.Title>
                    <Card.Subtitle className="m-2">
                      Target: {workout.targetMuscle}
                    </Card.Subtitle>
                    <Card.Text>
                      <strong>Duration:</strong> {workout.duration}
                    </Card.Text>
                    <Card.Text className="mb-1">
                      <strong>Exercises:</strong>
                    </Card.Text>
                    <ul className="ps-3 mb-3">
                      {workout.exercises.map((exercise, idx) => (
                        <li key={idx}>{exercise}</li>
                      ))}
                    </ul>
                    <Button variant="warning" className="w-100 fw-semibold">
                      View Details
                    </Button>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </motion.div>
    </Container>
  )
}

export default Workouts
