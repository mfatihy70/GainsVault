import React, { useState } from 'react';
import { Form, Button, ListGroup, InputGroup, Container } from 'react-bootstrap';
import { deleteWeight, trackWeight } from '../utils/user';
import WeigthChart from "./WeightChart"

const WeightTracker = ({ user, width = "100%", height = "100%" }) => {
  const [weight, setWeight] = useState('');
  const [weights, setWeights] = useState(user.weight || []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleAddWeight = () => {
    if (!weight) return;

    // Optionally, update the user weight in the backend
    trackWeight(user.id, weight, (data) => {
      setWeights(data.weight);
    }, setError, setLoading);

    setWeight(''); // Reset weight input
  };

  const handleDeleteWeight = (index) => {
    // Optionally, delete the weight from the backend
    deleteWeight(user.id, index, (data) => { setWeights(data.weight); }, setError, setLoading);
  };

  return (
    <Container style={{ width: `${width}`, height: `${height}`, display: 'flex', flexDirection: 'column' }}>
      <h3>Track Your Weight</h3>
      <WeigthChart weights={weights} />
      <InputGroup className="mb-3">
        <Form.Control
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Enter weight (kg)"
        />
        <Button onClick={handleAddWeight}>Add</Button>
      </InputGroup>

      <div style={{ flexGrow: 1, overflowY: 'auto' }}>
        <ListGroup>
          {weights.map((entry, index) => (
            <ListGroup.Item
              key={index}
              className="bg-dark text-light d-flex justify-content-between align-items-center"
            >
              {entry.value} kg<small className="ms-auto me-2 text-secondary">{new Date(entry.date).toLocaleString()}</small>
              <Button
                variant="danger"
                onClick={() => handleDeleteWeight(index)}
              >
                Remove
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>

    </Container >
  );
};

export default WeightTracker;
