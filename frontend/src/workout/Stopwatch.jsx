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
  ListGroup,
  Modal,
  Alert,
  FormGroup,
} from "react-bootstrap"
import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function formatTime(totalSeconds) {
  const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const secs = String(totalSeconds % 60).padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
}
function formatDateTime(ms) {
  if (ms === 0) return "00:00:00"; // Handle case when no time is set
  const date = new Date(ms);
  return date.toTimeString().split(' ')[0]; // "HH:MM:SS"
}
function fromatToDateString(ms) {
  if (ms === 0) return "Today"; // Handle case when no time is set

  const inputDate = new Date(ms);
  const today = new Date();
  // Check if the input date is today (year, month, day all match)
  const isToday =
    inputDate.getDate() === today.getDate() &&
    inputDate.getMonth() === today.getMonth() &&
    inputDate.getFullYear() === today.getFullYear();

  if (isToday) return "Today";

  const date = new Date(ms);
  return date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
  });
}

export function Stopwatch() {
  const [selection, setSelection] = useState("start");
  const [startTime, setStartTime] = useState(0);
  const [startTimeMode, setStartTimeMode] = useState("automatic");
  const [endTimeMode, setEndTimeMode] = useState("automatic");
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const intervalRef = useRef(null);

  function handleStart() {
    if (isRunning) {
      ;
    } else {
      if (!isRunning) {
        const timestamp = Date.now();
        setStartTime(timestamp);
        setSeconds(0);
      }
    }
    setIsRunning(!isRunning);
  }

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
    setStartTime(0)
    setSelection("start");
  };
  const getStyle = (id) => ({
    userSelect: selection === id ? 'text' : 'none',
    padding: '1rem',
    margin: '0.5rem 0',
    border: '1px solid #ccc',
    backgroundColor: selection === id ? 'rgba(255, 193, 7, 0.219)' : 'transparent',
    cursor: 'pointer',
  });
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handleSetSelectedTime = (time) => {
    if (selection === "start") {
      setStartTime(time.getTime());
    } else {
      const endTime = time.getTime();
      setSeconds(Math.floor((endTime - startTime) / 1000));
    }
  }
  const getSelectedDateTime = () => {
    if (selection === "start") {
      return new Date(startTime);
    } else {
      return new Date(startTime + seconds * 1000);
    }
  }
  const handleGetSelectedTimeMode = () => {
    return selection === "start" ? startTimeMode : endTimeMode;
  }
  const handleSetSelectedTimeMode = (mode) => {
    if (selection === "start") {
      setStartTimeMode(mode.target.value);
    } else {
      setEndTimeMode(mode.target.value);
    }
  }

  return (
    <Container className="text-center mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="p-4 shadow rounded-3">
            <div className="row align-items-center">
              <Col className="me-auto">
                <h1>{formatTime(seconds)}</h1>
              </Col>
              <Col className="ms-auto me-0">
                <Button variant="secondary" className="btn-sm ms-auto me-0" onClick={handleShow}>
                  Edit <i className="bi bi-pencil-square"></i>
                </Button>
              </Col>
            </div>
            <div className="d-flex justify-content-center gap-2 mt-3">
              <Button variant={isRunning ? "danger" : "success"} onClick={handleStart}>
                {isRunning ? "Stop" : "Start"}
              </Button>
              <Button variant="secondary" onClick={handleReset}>Reset</Button>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton className="bg-dark text-light border-warning">
          <Modal.Title className="d-flex w-100"><span>Duration</span><span className="ms-auto text-warning">{formatTime(seconds)}</span></Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light border-warning">

          {/* Start/End Time selection */}
          <Row className="gap-2 mx-auto">
            <Col className="border border-warning rounded p-3 mb-3 d-flex justify-content-between align-items-center"
              onClick={() => setSelection("start")} style={getStyle("start")}
            >
              <div> Start </div>
              <strong className="text-warning"> {formatDateTime(startTime)}</strong>
              <div> {"Today"}</div>
            </Col>
            <Col className="border border-warning rounded p-3 mb-3 d-flex justify-content-between align-items-center"
              onClick={() => setSelection("end")} style={getStyle("end")}
            >
              <div> End </div>
              <strong className="text-warning"> {formatDateTime(startTime + seconds * 1000)}</strong>
              <div> {fromatToDateString(startTime + seconds * 1000)}</div>
            </Col>
          </Row>

          { /* Automatic/Manual tracking time selector */}
          <Col className="mb-3 border border-warning rounded p-2">
            <h4>{selection === "start" ? "StartTime" : "EndTime"}</h4>
            <Form className="d-flex justify-content-center mb-3">
              <Form.Check
                inline
                type="radio"
                id="automatic"
                label="Automatic"
                name="automatic"
                value="automatic"
                checked={handleGetSelectedTimeMode() === 'automatic'}
                onChange={handleSetSelectedTimeMode}
              />
              <Form.Check
                inline
                type="radio"
                id="manual"
                label="Manual"
                name="manual"
                value="manual"
                checked={handleGetSelectedTimeMode() === 'manual'}
                onChange={handleSetSelectedTimeMode}
              />
            </Form>
          </Col>

          {/* Date/Time Picker */}
          <Form>
            <Row className="mb-3 mx-auto">
              <DatePicker
                className="form-control text-center bg-dark text-warning border-warning"
                selected={getSelectedDateTime()}
                onChange={(date) => handleSetSelectedTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={1}
                dateFormat="Pp"
                disabled={handleGetSelectedTimeMode() === 'automatic'}
                style="opacity: 0.5; cursor: not-allowed;"
              />
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-dark text-light border-warning">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
