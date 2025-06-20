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
  Tab,
  Tabs
} from "react-bootstrap"
import logo from "@/assets/icon/gainsvault.png"
import { getUserById, editUser } from "../utils/user"
import GainsChart from "./GainsChart"
import MuscleRadarChart from "./MuscleRadarChart"
import WeightTracker from "./WeightTracker"
import WorkoutEntries from "./WorkoutEntries"
import { getUserWorkoutEntries } from "../utils/user"

const ProfilePage = () => {
  const userId = localStorage.getItem("userId")
  const [user, setUser] = useState(null)
  const [updatedUser, setUpdatedUser] = useState({})
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [workoutEntries, setWorkoutEntries] = useState([])

  useEffect(() => {
    getUserById(userId, setUser, setError, setLoading)
    getUserWorkoutEntries(userId, setWorkoutEntries, setError, setLoading)
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
    // Remove empty string fields to avoid overwriting with empty values
    const filteredUpdate = Object.fromEntries(
      Object.entries(updatedUser).filter(
        ([_, v]) => v !== "" && v !== undefined
      )
    )
    await editUser(userId, filteredUpdate, setError, setSaving)
    setUser((prev) => ({
      ...prev,
      ...filteredUpdate,
    }))
    setEditing(false)
  }

  const handleCancel = () => {
    setEditing(false)
    setUpdatedUser({})
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
      <Card className="bg-dark border border-warning text-light">
        <Card.Body>
          <Row>
            <Col md={4} className="d-flex flex-column align-items-center">
              <Col
                md={4}
                className="d-flex justify-content-center"
                style={{ height: "150px", width: "150px" }}
              >
                <Image
                  src={user.avatar || logo}
                  roundedCircle
                  fluid={false}
                  className="border border-warning"
                  width={150}
                  height={150}
                  alt="User Avatar"
                />
              </Col>
              {editing ? (
                <Form.Group className="mb-3 mt-3">
                  <Form.Label>Avatar URL</Form.Label>
                  <Form.Control
                    type="text"
                    name="avatar"
                    value={
                      updatedUser.avatar !== undefined
                        ? updatedUser.avatar
                        : user.avatar
                    }
                    onChange={handleChange}
                  />
                </Form.Group>
              ) : (
                <>
                  <p className="mb-3 mt-3">Avatar</p>
                </>
              )}
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
                      name="location"
                      value={updatedUser.location || user.location || ""}
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
                  <Form.Group className="mb-3">
                    <Form.Label>Height</Form.Label>
                    <Form.Control
                      type="number"
                      name="height"
                      value={updatedUser.height || user.height || ""}
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
                  <Button variant="secondary" onClick={handleCancel}>
                    Cancel
                  </Button>
                </Form>
              ) : (
                <>
                  <h3>{user.name}</h3>
                  <p className="text-white">{user.email}</p>
                  <p>
                    <strong>Location:</strong> {user.location || "N/A"}
                  </p>
                  <p>
                    <strong>Bio:</strong> {user.bio || "No bio yet."}
                  </p>
                  <p>
                    <strong>Height:</strong>{" "}
                    {user.height ? user.height + "cm" : "Not specified"}
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
      <Card className="bg-dark border border-warning text-light mt-4 p-3">
        <Tabs defaultActiveKey="stats" id="profile-tabs" className="mb-3 border-bottom border-primary" justify variant="pills">
          <Tab eventKey="stats" title="Progress Stats">
            <Col
              md={12}
              className="d-flex justify-content-center align-items-center text-center col mb-3"
            >
              <GainsChart workouts={workoutEntries} width={"800px"} height={"100%"} />
            </Col>
            <hr />
            <Col
              md={12}
              className="d-flex justify-content-center align-items-center text-center col mb-3"
            >
              <MuscleRadarChart width={"500px"} height={"100%"} />
            </Col>
            <hr />
            <Col
              md={12}
              className="d-flex justify-content-center align-items-center text-center col mb-3"
            >
              <MuscleRadarChart width={500} height={500} />
            </Col>
          </Tab>
          <Tab eventKey="weight" title="Weight">
            <WeightTracker userId={userId} />
          </Tab>
          <Tab eventKey="entries" title="Workout Entries">
            <WorkoutEntries userId={userId} />
          </Tab>
        </Tabs>
      </Card>
    </Container>
  )
}

export default ProfilePage
