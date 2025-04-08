import React from 'react';
import SplitItem from './SplitItem';
import { Row } from 'react-bootstrap';

const SplitList = ({ splits }) => {
  if (splits.length === 0) return <p>Keine Splits gefunden.</p>;

  return (
    <Row>
      {splits.map((split) => (
        <SplitItem key={split.id} split={split} />
      ))}
    </Row>
  );
};

export default SplitList;
