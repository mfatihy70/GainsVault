import React from 'react';
import { Card, Button, Col } from 'react-bootstrap';

const SplitItem = ({ split }) => {
  const handleStart = () => {
    alert(`Workout "${split.name}" gestartet!`);
    // optional: hier Tracking starten
  };

  return (
    <Col md={4} className='mb-4'>
      <Card>
        <Card.Body>
          <Card.Title>{split.name}</Card.Title>
          <Card.Text>Häufigkeit: {split.frequency}x pro Woche</Card.Text>
          <Button variant='primary' onClick={handleStart}>
            Workout starten
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default SplitItem;
