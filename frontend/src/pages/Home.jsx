import { Container, Row, Col, Card } from "react-bootstrap"

const HomePage = () => {
  return (
    <Container fluid className="d-flex flex-column min-vh-100 my-5">
      {/* Welcome to GainsVault */}
      <div className="text-center my-4">
        <h1 className="text-warning">Welcome to GainsVault</h1>
        <p>Your ultimate platform for tracking and achieving your goals!</p>
      </div>

      {/* Features Section */}
      <section className="my-5">
        <h2 className="text-center mb-4">Features</h2>
        <Row>
          <Col md={4}>
            <Card className="mb-4 bg-dark border border-warning text-light">
              <Card.Body>
                <Card.Title>Track Progress</Card.Title>
                <Card.Text>
                  Monitor your progress with detailed analytics and insights.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4 bg-dark border border-warning text-light">
              <Card.Body>
                <Card.Title>Set Goals</Card.Title>
                <Card.Text>
                  Define your goals and stay motivated to achieve them.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4 bg-dark border border-warning text-light">
              <Card.Body>
                <Card.Title>Community</Card.Title>
                <Card.Text>
                  Connect with like-minded individuals and grow together.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>

      {/* About Section */}
      <section>
        <h2 className="text-center mb-4">About Us</h2>
        <p className="text-center">
          At GainsVault, we believe in empowering individuals to reach their
          full potential. Join us on this journey to success!
        </p>
      </section>
    </Container>
  )
}

export default HomePage
