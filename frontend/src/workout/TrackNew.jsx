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
  FormGroup,
} from "react-bootstrap"
import { motion } from "framer-motion"
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getExercisesForWorkout, getWorkoutById } from "../utils/workout";

const WorkoutTrackNew = () => {
  const { id } = useParams()
  const [exercises, setExercises] = useState([])
  const [workout, setWorkout] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)


  //getExercises(setExercises, setError, setLoading)
  //getSplits(setSplits, setError, setLoading)
  useEffect(() => {
    getWorkoutById(id, setWorkout, setError, setLoading)
    getExercisesForWorkout(id, setExercises, setError, setLoading)
  }, [id])



  return (
    <Container className="py-5 bg-dark text-light">
      {workout != null && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-center text-warning mb-4">Track Workout</h1>
          <h3 className="text-center mb-4">{workout.name}</h3>
          ID: {id}
          {exercises.map((exercise, index) => (
            <Card key={index} className="mb-3 bg-secondary text-light">
              <Card.Body>
                <Card.Title>{exercise.name}</Card.Title>
                <Card.Text>
                  {exercise.description}
                </Card.Text>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId={`sets-${exercise.id}`}>
                      <Form.Label>Sets</Form.Label>
                      <Form.Control type="number" placeholder="Enter sets" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId={`reps-${exercise.id}`}>
                      <Form.Label>Reps</Form.Label>
                      <Form.Control type="number" placeholder="Enter reps" />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
          <Card className="bg-secondary text-light">
            <Card.Body>
              <Card.Title className="text-center">{workout.name}</Card.Title>
              <Card.Text>
                {workout.description}
              </Card.Text>
            </Card.Body>
          </Card>
        </motion.div>
      )}

    </Container>
  )
}

export default WorkoutTrackNew
