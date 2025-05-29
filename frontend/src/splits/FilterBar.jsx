import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const FilterBar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    days: '',
    difficulty: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <Form className='mb-4'>
      <Row>
        <Col md={4}>
          <Form.Group controlId='days'>
            <Form.Label>Tage pro Woche</Form.Label>
            <Form.Select
              name='days'
              value={filters.days}
              onChange={handleChange}
            >
              <option value=''>Alle</option>
              <option value='1'>1 Tag</option>
              <option value='2'>2 Tage</option>
              <option value='3'>3 Tage</option>
              <option value='4'>4 Tage</option>
              <option value='5'>5 Tage</option>
              <option value='6'>6 Tage</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId='difficulty'>
            <Form.Label>Schwierigkeitsgrad</Form.Label>
            <Form.Select
              name='difficulty'
              value={filters.difficulty}
              onChange={handleChange}
            >
              <option value=''>Alle</option>
              <option value='beginner'>Anfänger</option>
              <option value='intermediate'>Fortgeschritten</option>
              <option value='advanced'>Profi</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default FilterBar;
