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
import { useNavigate, useParams } from "react-router-dom";
import { getWorkoutById } from "../utils/workout";
import { getExerciseFromWorkoutId } from "../utils/track";
import "./Track.css";
import SearchableDropdown from "./SearchableDropdown";
import { getExercises } from "../utils/exercise";
import { Stopwatch } from "./Stopwatch";

const WorkoutTrackNew = () => {
  const navigate = useNavigate();
  const { id: workoutId } = useParams();

  const [exercises, setExercises] = useState([]);
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCustomWorkout, setIsCustomWorkout] = useState(false);

  const [allExercises, setAllExercises] = useState([]);

  const handleAddExercise = (item) => {
    console.log("Selected:", item);
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
  const handleGoBack = () => {
    navigate('/track')
  }

  useEffect(() => {
    getWorkoutById(workoutId, setWorkout, setError, setLoading);
    getExerciseFromWorkoutId(workoutId, setExercises, setError, setLoading);
    getExercises(setAllExercises, setError, setLoading);
  }, [workoutId]);

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
        <Card className="mb-4 bg-dark border border-warning">
          <Card.Body>
            <div className="d-flex align-items-center justify-content-between">
              <Button variant="outline-warning" onClick={handleGoBack}>
                ← Back
              </Button>
              <h1 className="text-warning text-center flex-grow-1 mb-0">{workout.name}</h1>
              {/* Spacer to balance layout */}
              <div style={{ width: '75.5px' }} /> {/* Same width as the button */}
            </div>
            <Form>
              <Form.Check
                type="switch"
                label="Customize Workout?"
                className="d-flex gap-2 align-items-center justify-content-center text-warning mt-2"
                //checked={checked}
                onChange={() => alert("This feature is not implemented yet!")}
              />
            </Form>
            <Stopwatch />
            <p className="text-center text-muted">{workout.description}</p>
          </Card.Body>
        </Card>

        { /* Exercises List */}
        <Stack gap={4} className="col-10 mx-auto">
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

        { /* Searchable Add exercise Button (!!only visible if custom workout!!) */}
        {isCustomWorkout && (
          <div className="d-flex text-center mb-4 justify-content-end">
            <SearchableDropdown items={allExercises.map((exercise) => (exercise.name))} onSelect={handleAddExercise} />
          </div>
        )}

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
