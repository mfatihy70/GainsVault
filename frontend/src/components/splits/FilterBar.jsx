import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const FilterBar = ({ onFilterChange }) => {
  const [frequency, setFrequency] = useState('');
  const [splitCount, setSplitCount] = useState('');

  const handleChange = () => {
    onFilterChange({ frequency, splitCount });
  };

  return (
    <Form className='mb-3'>
      <Row>
        <Col md={4}>
          <Form.Group controlId='frequency'>
            <Form.Label>Frequency (per week)</Form.Label>
            <Form.Control
              type='number'
              placeholder='e.g., 3'
              value={frequency}
              onChange={(e) => {
                setFrequency(e.target.value);
                handleChange();
              }}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId='splitCount'>
            <Form.Label>Split Count</Form.Label>
            <Form.Control
              type='number'
              placeholder='e.g., 5'
              value={splitCount}
              onChange={(e) => {
                setSplitCount(e.target.value);
                handleChange();
              }}
            />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export const getSplits = async (req, res) => {
  try {
    const { frequency, splitCount } = req.query;

    const filters = {};
    if (frequency) filters.frequency = frequency;
    if (splitCount) filters.splitCount = splitCount;

    const splits = await Splits.findAll({ where: filters });
    res.json(splits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default FilterBar;