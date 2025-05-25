import React from 'react';
import { Card, Button, Col, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const SplitItem = ({ split, onSplitClick }) => {
  const navigate = useNavigate();

  const handleStart = () => {
    onSplitClick(split);
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
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-100"
    >
      <motion.div
        whileHover={{ scale: 1.03, boxShadow: "0 0 15px rgba(255, 193, 7, 0.4)" }}
        transition={{ duration: 0.3 }}
        className="h-100"
      >
        <Card className='h-100 bg-dark border border-warning text-light'>
          <Card.Body>
            <Card.Title>{split.name}</Card.Title>
            <Card.Text>
              <div className='mb-2'>{split.description}</div>
              <div className='d-flex justify-content-between align-items-center'>
                <Badge bg='primary' className='me-2'>
                  {split.name === 'Full Body' ? 3 : split.days}x pro Woche
                </Badge>
                <Badge bg={getDifficultyColor(split.difficulty)}>
                  {split.difficulty}
                </Badge>
              </div>
            </Card.Text>
            <Button variant='primary' onClick={handleStart} className='w-100'>
              View Details
            </Button>
          </Card.Body>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default SplitItem;
