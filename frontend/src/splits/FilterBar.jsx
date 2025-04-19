import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const FilterBar = ({ onFilterChange }) => {
  const [frequency, setFrequency] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setFrequency(value);
    onFilterChange({ frequency: value });
  };

  return (
    <Form className='mb-3'>
      <Row>
        <Col md={4}>
          <Form.Group controlId='frequency'>
            <Form.Label>Häufigkeit (pro Woche)</Form.Label>
            <Form.Control
              type='number'
              placeholder='z. B. 3'
              value={frequency}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default FilterBar;
