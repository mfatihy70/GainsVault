import React, { useState } from "react"
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap"
import { motion } from "framer-motion"
import "../styles/Workouts.css"

const Workouts = () => {
  const [selectedMuscle, setSelectedMuscle] = useState("all")

  // Beispiel-Workouts (später durch API-Daten ersetzen)
  const workouts = [
    {
      id: 1,
      name: "Push Day",
      targetMuscle: "Chest",
      exercises: ["Bench Press", "Incline Dumbbell Press", "Tricep Pushdowns"],
      difficulty: "Intermediate",
      duration: "60 min",
      image:
        "https://images.unsplash.com/photo-1549476464-37392f717541?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      name: "Pull Day",
      targetMuscle: "Back",
      exercises: ["Pull-ups", "Barbell Rows", "Bicep Curls"],
      difficulty: "Intermediate",
      duration: "60 min",
      image:
        "https://images.unsplash.com/photo-1581009137042-c552e485697a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
      id: 3,
      name: "Leg Day",
      targetMuscle: "Legs",
      exercises: ["Squats", "Romanian Deadlifts", "Leg Press"],
      difficulty: "Advanced",
      duration: "75 min",
      image:
        "https://images.unsplash.com/photo-1596357395217-80de13130e92?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      : workouts.filter((workout) => workout.targetMuscle === selectedMuscle)

  return (
    <Container className="workouts-container bg-dark text-light">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="workouts-title text-warning">Workouts</h1>

        {/* Filter Section */}
        <Container className="filter-section bg-dark text-light p-3 mb-4">
          <Form.Group controlId="muscleGroupFilter">
            <Form.Label>Filter by Target Muscle</Form.Label>
            <Form.Select
              value={selectedMuscle}
              onChange={(e) => setSelectedMuscle(e.target.value)}
              className="muscle-filter bg-dark text-light border border-warning"
            >
              {muscleGroups.map((muscle) => (
                <option key={muscle.value} value={muscle.value}>
                  {muscle.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Container>

        {/* Workouts Grid */}
        <Row className="workouts-grid">
          {filteredWorkouts.map((workout, index) => (
            <Col key={workout.id} md={4} className="mb-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="workout-card bg-dark text-light border border-warning">
                  <div className="workout-image-container">
                    <Card.Img
                      variant="top"
                      src={workout.image}
                      alt={workout.name}
                      className="workout-image"
                    />
                    <div className="workout-difficulty bg-warning text-dark">
                      {workout.difficulty}
                    </div>
                  </div>
                  <Card.Body>
                    <Card.Title className="text-warning">
                      {workout.name}
                    </Card.Title>
                    <Card.Subtitle className="m-2">
                      Target: {workout.targetMuscle}
                    </Card.Subtitle>
                    <Card.Text>
                      <strong>Duration:</strong> {workout.duration}
                    </Card.Text>
                    <Card.Text>
                      <strong>Exercises:</strong>
                      <ul className="exercise-list">
                        {workout.exercises.map((exercise, idx) => (
                          <li key={idx}>{exercise}</li>
                        ))}
                      </ul>
                    </Card.Text>
                    <Button
                      variant="warning"
                      className="workout-button text-dark"
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
    </Container>
  )
}

export default Workouts
