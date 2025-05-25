import {
  Container,
  Card,
  Button,
  Spinner,
  Row,
  Col,
  Image,
  Form,
  Stack,
  ListGroup,
  Modal,
  Alert,
} from "react-bootstrap"

import React, { useState, useEffect, useRef } from 'react';
import { getExercises } from "../utils/workout";
import { Stopwatch } from "./Stopwatch";


const WorkoutTrack = () => {

  const [exercises, setExercises] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getExercises(setExercises, setError, setLoading)
  }, [exercises])

  return (
    <Container className="py-5 bg-dark text-light">
      <Stopwatch />
      <h1>Summary</h1>
      <p>This is the summary page.</p>
      <p>Here you can find a summary of your workouts and progress.</p>
      <p>More features will be added soon!</p>

      <Container style={{ flexGrow: 1, overflowY: 'auto' }}>
        <ListGroup>

          {/* Exercise List */}
          {exercises.map((entry, index) => (
            <ListGroup.Item
              key={index}
              className="bg-dark text-light d-flex justify-content-between align-items-center"
            >
              {entry.name}<small className="ms-auto me-2 text-secondary">Muscle Groups: {(entry.primary)}</small>
              <Button
                variant="success"
              >
                Add
              </Button>
            </ListGroup.Item>
          ))}

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
        </ListGroup>
      </Container>
    </Container>
  )
}

export default WorkoutTrack
