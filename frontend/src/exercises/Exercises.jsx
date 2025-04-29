import { Container, Row, Col, ListGroup } from "react-bootstrap"

const ExercisePage = () => {
  const exercises = [
    {
      name: "Barbell Bench Press",
      primaryMuscles: "Chest",
      secondaryMuscles: "Triceps, Shoulders",
      equipment: "Barbell",
    },
    {
      name: "Dumbbell Shoulder Press",
      primaryMuscles: "Shoulders",
      secondaryMuscles: "Triceps",
      equipment: "Dumbbell",
    },
    {
      name: "Cable Lat Pulldown",
      primaryMuscles: "Lats",
      secondaryMuscles: "Biceps",
      equipment: "Cable",
    },
    {
      name: "Leg Press",
      primaryMuscles: "Quadriceps",
      secondaryMuscles: "Glutes, Hamstrings",
      equipment: "Machine",
    },
    {
      name: "Barbell Squat",
      primaryMuscles: "Quadriceps",
      secondaryMuscles: "Glutes, Lower Back",
      equipment: "Barbell",
    },
    {
      name: "Deadlift",
      primaryMuscles: "Lower Back",
      secondaryMuscles: "Glutes, Hamstrings, Traps",
      equipment: "Barbell",
    },
    {
      name: "Pull-Up",
      primaryMuscles: "Lats",
      secondaryMuscles: "Biceps, Rear Delts",
      equipment: "Bodyweight",
    },
    {
      name: "Dumbbell Bicep Curl",
      primaryMuscles: "Biceps",
      secondaryMuscles: "Forearms",
      equipment: "Dumbbell",
    },
    {
      name: "Tricep Dips",
      primaryMuscles: "Triceps",
      secondaryMuscles: "Chest, Shoulders",
      equipment: "Bodyweight",
    },
    {
      name: "Plank",
      primaryMuscles: "Core",
      secondaryMuscles: "Shoulders, Glutes",
      equipment: "Bodyweight",
    },
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

      {/* Exercises List */}
      <Row className="justify-content-center">
        <Col md={10}>
          <Row>
            {exercises.map((exercise, index) => (
              <Col md={6} key={index} className="mb-4">
                <ListGroup.Item className="rounded-3 bg-dark border border-warning p-2">
                  <h4 className="mb-3 ">{exercise.name}</h4>
                  <p className="mb-2">
                    <strong>Primary Muscles:</strong> {exercise.primaryMuscles}
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
    </Container>
  )
}

export default ExercisePage
