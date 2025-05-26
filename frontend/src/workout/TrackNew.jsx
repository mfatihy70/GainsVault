import {
  Container,
  Card,
  Button,
  Spinner,
  Row,
  Col,
  Form,
  Stack,
  Alert,
} from "react-bootstrap";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getExercisesForWorkout, getWorkoutById } from "../utils/workout";
import "./Track.css";

const WorkoutTrackNew = () => {
  const { id } = useParams();
  const [exercises, setExercises] = useState([]);
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleAddExercise = () => {
    const newExercise = {
      id: Date.now(), // temporary unique ID
      name: "New Exercise",
      primary: "chest",
      secondary: null,
      equipment: null,
    };
    setExercises([...exercises, newExercise]);
  };
  const handleExerciseChange = (index, field, value) => {
    const updatedExercises = [...exercises];
    updatedExercises[index][field] = value;
    setExercises(updatedExercises);
  };
  const handleRemoveExercise = (index) => {
    const updatedExercises = exercises.filter((_, i) => i !== index);
    setExercises(updatedExercises);
  };
  const handleSelect = (item) => {
    console.log("Selected:", item);
  }


  useEffect(() => {
    getWorkoutById(id, setWorkout, setError, setLoading);
    getExercisesForWorkout(id, setExercises, setError, setLoading);
    getExercises(setAllExercises, setError, setLoading);
  }, [id]);

  if (loading || !workout) {
    return (
      <Container className="text-center py-5 text-light">
        <Spinner animation="border" variant="warning" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5 bg-dark text-light">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mb-4 bg-black border border-warning">
          <Card.Body>
            <h1 className="text-center text-warning">{workout.name}</h1>
            <p className="text-center text-muted">{workout.description}</p>
          </Card.Body>
        </Card>

        { /* Exercises List */}
        <Stack gap={4}>
          {exercises.map((exercise, index) => (
            <Card key={index} className="tracker-card mb-4">
              <Card.Body className="tracker-form">
                <Row className="align-items-center mb-3">
                  <Col>
                    <Card.Title className="mb-1 text-warning">{exercise.name}</Card.Title>
                    <div className="exercise-meta">
                      Muscle: <strong>{exercise.primary}</strong>
                      {exercise.secondary && <> → {exercise.secondary}</>}
                      {exercise.equipment && <> | Equipment: {exercise.equipment}</>}
                    </div>
                  </Col>
                </Row>

                <Row className="gy-3">
                  <Col md={4}>
                    <Form.Group controlId={`sets-${exercise.id}`}>
                      <Form.Label>Sets</Form.Label>
                      <Form.Control type="number" placeholder="e.g. 3" />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId={`reps-${exercise.id}`}>
                      <Form.Label>Reps</Form.Label>
                      <Form.Control type="number" placeholder="e.g. 12" />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId={`weight-${exercise.id}`}>
                      <Form.Label>Weight (kg)</Form.Label>
                      <Form.Control type="number" placeholder="e.g. 40" />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

          ))}
        </Stack>

        <div className="text-end mb-4">
          <Button variant="outline-light" onClick={handleAddExercise}>
            + Add Exercise
          </Button>
        </div>

        <div className="text-center mt-5">
          <Button variant="warning" size="lg" className="finish-btn">
            Finish Workout
          </Button>
        </div>
      </motion.div>
    </Container>
  );
};

export default WorkoutTrackNew;
