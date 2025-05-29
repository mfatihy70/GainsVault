import React from 'react';
import { Modal, Button, Container } from 'react-bootstrap';

const SplitDetailsModal = ({ show, handleClose, split }) => {
  if (!split) return null; // Don't render if no split is selected

  // Hardcoded weekly plans for specific splits
  const weeklyPlans = {
    'Arnold Split': [
      'Workout 1: Chest, Back',
      'Workout 2: Shoulders, Arms',
      'Workout 3: Legs',
      'Workout 4: Chest, Back',
      'Workout 5: Shoulders, Arms',
      'Workout 6: Legs',
    ],
    'Bro Split': [
      'Workout 1: Chest',
      'Workout 2: Back',
      'Workout 3: Shoulders',
      'Workout 4: Arms',
      'Workout 5: Legs',
    ],
    'Full Body': [
        'Workout 1: Full Body',
        'Workout 2: Full Body',
        'Workout 3: Full Body',
    ],
    'Push-Pull-Legs (PPL)': [
        'Workout 1: Push',
        'Workout 2: Pull',
        'Workout 3: Legs',
    ],
    'Upper/Lower': [
        'Workout 1: Upper Body',
        'Workout 2: Lower Body',
    ]
  };

  const renderWeeklyPlan = () => {
    const plan = weeklyPlans[split.name];

    if (plan) {
        // Handle specific cases for PPL and Full Body and Upper/Lower
        if (split.name === 'Full Body' || split.name === 'Push-Pull-Legs (PPL)' || split.name === 'Upper/Lower') {
             return (
                <ul className="list-unstyled">
                    {plan.map((workout, index) => (
                         <li key={index} className="mb-2">{workout}</li>
                    ))}
                </ul>
             );
        }

        // For other splits with a fixed number of days, show that many workouts plus rest days
        const planToShow = [...plan]; // Copy the plan array
        // Add rest days to fill up the week
        for (let i = planToShow.length; i < 7; i++) {
            planToShow.push(`Day ${i + 1}: Rest`);
        }
        return (
          <ul className="list-unstyled">
            {planToShow.map((dayPlan, index) => (
              <li key={index} className="mb-2">{dayPlan}</li>
            ))}
          </ul>
        );

    } else {
      return <p>Keine detaillierte Wochenplanung für diesen Split verfügbar.</p>;
    }
  };

  const renderNote = () => {
      if (split.name === 'Bro Split' || split.name === 'Push-Pull-Legs (PPL)' || split.name === 'Upper/Lower' || split.name === 'Arnold Split') {
          return (
              <p className="mt-3">
                  Hinweis: Die Reihenfolge der Trainingstage kann angepasst werden, solange die Anzahl der Trainingseinheiten pro Woche eingehalten wird.
              </p>
          );
      } else {
          return null;
      }
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="bg-dark text-light">
        <Modal.Title>{split.name} Details</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-light">
        <div className="mb-3">
          <p><strong>Beschreibung:</strong> {split.description}</p>
          {/* Display hardcoded 3 days for Full Body, otherwise use split.days */}
          <p><strong>Tage pro Woche:</strong> {split.name === 'Full Body' ? 3 : split.days}</p>
          <p><strong>Schwierigkeit:</strong> {split.difficulty}</p>
        </div>
        
        <h5>Wochenplan:</h5>
        {renderWeeklyPlan()}
        {renderNote()}
        
      </Modal.Body>
      <Modal.Footer className="bg-dark text-light">
        <Button variant="secondary" onClick={handleClose}>
          Schließen
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SplitDetailsModal; 