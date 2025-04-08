import { Container, Row, Col } from "react-bootstrap"

const SplitsPage = () => {
  const workoutSplits = [
    {
      title: "Full Body Split",
      description: "Engage all major muscle groups in each session.",
    },
    {
      title: "Upper Lower Split",
      description: "Alternate between upper and lower body workouts.",
    },
    {
      title: "Push Pull Legs (PPL)",
      description: "Divide workouts into push, pull, and leg days.",
    },
    {
      title: "Bro Split",
      description: "Focus on one muscle group per day.",
    },
  ]

  return (
    <Container fluid className="d-flex flex-column min-vh-100 my-5">
      {/* Workout Splits Header */}
      <div className="text-center my-4 bg-dark p-3 rounded-4">
        <h1 className="text-white">Workout Splits</h1>
        <p className="text-white">
          Choose a workout split to view detailed exercises and plans!
        </p>
      </div>

      {/* Workout Splits Grid */}
      <Row className="g-4">
        {workoutSplits.map((split, index) => (
          <Col key={index} md={4}>
            <div className="card bg-dark text-white h-100">
              <div className="card-body">
                <h5 className="card-title">{split.title}</h5>
                <p className="card-text">{split.description}</p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default SplitsPage
