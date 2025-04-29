import React, { useState } from 'react';
import { Card, Button, Col, Modal, Form } from 'react-bootstrap';

const SplitItem = ({ split }) => {
  const [showModal, setShowModal] = useState(false);
  const [reps, setReps] = useState('');

  const handleStart = () => {
    setShowModal(true);
  };

  const handleSave = () => {
    alert(`Workout "${split.name}" started with ${reps} reps!`);
    setShowModal(false);
  };

  return (
    <Col md={4} className='mb-4'>
      <Card>
        <Card.Body>
          <Card.Title>{split.name}</Card.Title>
          <Card.Text>Frequency: {split.frequency}x per week</Card.Text>
          <Button variant='primary' onClick={handleStart}>
            Start Workout
          </Button>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Track Reps</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId='reps'>
              <Form.Label>Reps</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter reps'
                value={reps}
                onChange={(e) => setReps(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant='primary' onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Col>
  );
};

export default SplitItem;