import React, { useEffect, useState } from "react"
import {
  Container,
  Card,
  Button,
  Spinner,
  Row,
  Col,
  Image,
  Form,
  Stack,
} from "react-bootstrap"


const WorkoutSummary = () => {

  return (
    <Container className="mt-4">
      <h1>Summary</h1>
      <p>This is the summary page.</p>
      <p>Here you can find a summary of your workouts and progress.</p>
      <p>More features will be added soon!</p>
    </Container>
  )
}

export default WorkoutSummary
