import React, { useEffect, useState } from "react"
import {
  Container,
  Card,
  Button,
  Spinner,
  Row,
  Col,
  Image,
  Form,
} from "react-bootstrap"
import logo from "@/assets/gainsvault.png"
import { getUserById, editUser } from "../utils/user"

const ProfilePage = () => {
  const userId = localStorage.getItem("userId")
  const [user, setUser] = useState(null)
  const [updatedUser, setUpdatedUser] = useState({})
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    getUserById(userId, setUser, setError, setLoading)
  }, [userId])

  const handleChange = (e) => {
    const { name, value } = e.target
    setUpdatedUser((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    await editUser(userId, updatedUser, setError, setSaving)
    setUser((prev) => ({
      ...prev,
      ...updatedUser,
    }))
    setEditing(false)
  }

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    )
  }

  if (error || !user) {
    return (
      <Container className="text-center mt-5">
        <p>{error || "Failed to load user data."}</p>
      </Container>
    )
  }

  return (
    <Container fluid className="d-flex flex-column min-vh-100 my-5">
      <Card>
        <Card.Body>
          <Row>
            <Col md={4} className="text-center">
              <Image
                src={user.avatar || logo}
                roundedCircle
                fluid
                width={150}
                height={150}
              />
            </Col>
            <Col md={8}>
              {editing ? (
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={updatedUser.name || user.name}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={updatedUser.email || user.email}
                      onChange={handleChange}
                      disabled
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={updatedUser.address || user.address || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="bio"
                      value={updatedUser.bio || user.bio || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Button
                    variant="success"
                    onClick={handleSave}
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>{" "}
                  <Button variant="secondary" onClick={() => setEditing(false)}>
                    Cancel
                  </Button>
                </Form>
              ) : (
                <>
                  <h3>{user.name}</h3>
                  <p className="text-muted">{user.email}</p>
                  <p>
                    <strong>Location:</strong> {user.address || "N/A"}
                  </p>
                  <p>
                    <strong>Bio:</strong> {user.bio || "No bio yet."}
                  </p>
                  <p>
                    <strong>Joined:</strong>{" "}
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                  <Button
                    variant="primary"
                    className="mt-3"
                    onClick={() => setEditing(true)}
                  >
                    Edit Profile
                  </Button>
                </>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default ProfilePage
