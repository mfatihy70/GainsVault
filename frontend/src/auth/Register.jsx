import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap"
import { handleRegister } from "../utils/register"

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [location, setLocation] = useState("")
  const [bio, setBio] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleRegisterClick = async () => {
    // This function handles the register and will be imported from utils/register.js
    handleRegister(
      name,
      email,
      password,
      confirmPassword,
      location,
      bio,
      setError,
      navigate
    )
  }

  return (
    <Container fluid className="d-flex flex-column min-vh-100 my-5">
      <Row>
        <Col>
          <Card
            className="bg-dark mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "500px" }}
          >
            <Card.Body className="p-5 w-100 d-flex flex-column">
              <h3 className="mb-5 text-white">Register</h3>
              {error && <p className="text-danger text-center">{error}</p>}
              <Form>
                <Form.Group className="mb-4" controlId="formName">
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    size="lg"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
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
                <Form.Group className="mb-4" controlId="formPasswordConfirm">
                  <Form.Control
                    type="password"
                    placeholder="Confirm your password"
                    size="lg"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-4" controlId="formLocation">
                  <Form.Control
                    type="text"
                    placeholder="Enter your location"
                    size="lg"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-4" controlId="formBio">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Tell us about yourself"
                    size="lg"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </Form.Group>
                <Button
                  variant="warning"
                  size="lg"
                  className="w-100 mb-4"
                  onClick={handleRegisterClick}
                >
                  Register
                </Button>
                <p className="text-white">or</p>
                <Link to={`/login`}>
                  <Button variant="secondary" size="lg" className="w-100">
                    Login
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

export default Register
