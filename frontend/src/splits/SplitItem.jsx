import React from 'react';
import { Card, Button, Col, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SplitItem = ({ split }) => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate(`/workout/${split.id}`);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'success';
      case 'intermediate': return 'warning';
      case 'advanced': return 'danger';
      default: return 'secondary';
    }
  };

  return (
    <Col md={4} className='mb-4'>
      <Card className='h-100'>
        <Card.Body>
          <Card.Title>{split.name}</Card.Title>
          <Card.Text>
            <div className='mb-2'>{split.description}</div>
            <div className='d-flex justify-content-between align-items-center'>
              <Badge bg='primary' className='me-2'>
                {split.days}x pro Woche
              </Badge>
              <Badge bg={getDifficultyColor(split.difficulty)}>
                {split.difficulty}
              </Badge>
            </div>
          </Card.Text>
          <Button variant='primary' onClick={handleStart} className='w-100'>
            Workout starten
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default SplitItem;
