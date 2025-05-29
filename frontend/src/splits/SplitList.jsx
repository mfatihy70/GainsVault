import React from "react"
import SplitItem from "./SplitItem"
import { Row, Col } from "react-bootstrap"

const SplitList = ({ splits, onSplitClick }) => {
  // Ensure splits is an array
  if (!Array.isArray(splits) || splits.length === 0) {
    return <p>Keine Splits gefunden.</p>
  }

  return (
    <Row>
      {splits.map((split) => (
        <Col key={split.id} md={6} className='mb-4'>
          <SplitItem split={split} onSplitClick={onSplitClick} />
        </Col>
      ))}
    </Row>
  )
}

export default SplitList
