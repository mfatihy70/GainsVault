import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap"
import { handleLogin } from "../utils/login" // Import the handleLogin function

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLoginClick = async () => {
    // This function handles the login and will be imported from utils/login.js
    handleLogin(email, password, setError, navigate)
  }

  return (
    // This className is for sending the footer to the bottom of the page
    <Container fluid className="d-flex flex-column min-vh-100 my-5">
      <Row>
        <Col>
          <Card
            className="bg-dark mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "500px" }}
          >
            <Card.Body className="p-5 w-100 d-flex flex-column">
              <h3 className="mb-5 text-center">Login</h3>
              {error && <p className="text-danger text-center">{error}</p>}
              <Form>
                <Form.Group className="mb-4" controlId="formEmail">
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    size="lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formPassword">
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    size="lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Button
                  variant="warning"
                  size="lg"
                  className="w-100 mb-4"
                  onClick={handleLoginClick}
                >
                  Login
                </Button>
                <p className="text-center">or</p>
                <Link to={`/register`}>
                  <Button variant="secondary" size="lg" className="w-100">
                    Register
                  </Button>
                </Link>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
