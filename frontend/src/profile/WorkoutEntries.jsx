import React, { useEffect, useState } from "react"
import {
  Spinner,
  Alert,
  Accordion,
  Card,
  Table,
  Container,
  Button,
  Form,
  Stack,
  Badge
} from "react-bootstrap"
import { updateUserWorkoutEntry, deleteUserWorkoutEntry, getUserWorkoutEntries } from "../utils/user"

const WorkoutEntries = ({ userId }) => {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editId, setEditId] = useState(null)
  const [editedName, setEditedName] = useState("")
  const [editingSetId, setEditingSetId] = useState(null)
  const [editedSet, setEditedSet] = useState({})
  const [editedStart, setEditedStart] = useState("")
  const [editedEnd, setEditedEnd] = useState("")

  // New state to track notes editing per exercise entry id
  const [editingNotesId, setEditingNotesId] = useState(null)
  const [editedNotes, setEditedNotes] = useState("")

  useEffect(() => {
    const fetchWorkouts = async () => {
      await getUserWorkoutEntries(userId, setWorkouts, setError, setLoading)
    }
    fetchWorkouts()
  }, [userId])

  const handleWorkoutEntryDelete = async (workoutId) => {
    try {
      await deleteUserWorkoutEntry(userId, workoutId, setError, setLoading)
      setWorkouts((prev) => prev.filter((workout) => workout.id !== workoutId))
    } catch (err) {
      setError("Failed to delete workout entry.")
    }
  }

  const handleStartEditWorkout = (workout) => {
    setEditId(workout.id);
    setEditedName(workout.name || "");
    const toLocalInputValue = (utcDateStr) => {
      const date = new Date(utcDateStr);

      // pad helper
      const pad = (num) => num.toString().padStart(2, "0");

      const year = date.getFullYear();
      const month = pad(date.getMonth() + 1); // Months are 0-based
      const day = pad(date.getDate());
      const hours = pad(date.getHours());
      const minutes = pad(date.getMinutes());

      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };


    setEditedStart(toLocalInputValue(workout.start));
    setEditedEnd(toLocalInputValue(workout.end));
  };
  const handleSaveWorkoutEdit = async () => {
    try {
      const updatedWorkout = workouts.find((w) => w.id === editId);
      const updatedData = {
        ...updatedWorkout,
        name: editedName,
        start: new Date(editedStart).toISOString(),
        end: new Date(editedEnd).toISOString(),
      };

      await updateUserWorkoutEntry(userId, editId, updatedData);

      setWorkouts((prev) =>
        prev.map((w) => (w.id === editId ? updatedData : w))
      );

      getUserWorkoutEntries(userId, setWorkouts, setError, () => { });

      setEditId(null);
      setEditedName("");
      setEditedStart("");
      setEditedEnd("");
    } catch (err) {
      setError("Failed to save workout edit.")
    }
  }

  const handleSetEditClick = (set) => {
    setEditingSetId(set.id)
    setEditedSet({
      reps: set.reps,
      kg: set.kg,
      performed_at: set.performed_at
    })
  }

  const handleCancelSetEdit = () => {
    setEditingSetId(null)
    setEditedSet({})
  }

  const handleSaveSetEdit = async (setId) => {
    try {
      // Find the workout and exercise entry that contains this set
      let workoutId;
      let workoutToUpdate;

      workouts.forEach((workout) => {
        workout.exercise_entries.forEach((entry) => {
          if (entry.set_entries.some((set) => set.id === setId)) {
            workoutId = workout.id;
            workoutToUpdate = workout;
          }
        });
      });

      if (!workoutToUpdate) {
        throw new Error("Workout not found for set");
      }

      // Build updated workout data with the edited set updated
      const updatedExerciseEntries = workoutToUpdate.exercise_entries.map((entry) => {
        const updatedSetEntries = entry.set_entries.map((set) =>
          set.id === setId ? { ...set, ...editedSet } : set
        );
        return { ...entry, set_entries: updatedSetEntries };
      });

      const updateData = {
        ...workoutToUpdate,
        exercise_entries: updatedExerciseEntries,
      };

      // Call API to update workout
      await updateUserWorkoutEntry(userId, workoutId, updateData);

      // Update state locally for immediate UI feedback
      setWorkouts((prev) =>
        prev.map((workout) =>
          workout.id === workoutId
            ? { ...workout, exercise_entries: updatedExerciseEntries }
            : workout
        )
      );

      // Refresh workouts to ensure consistency
      await getUserWorkoutEntries(userId, setWorkouts, setError, () => { });

      setEditingSetId(null);
      setEditedSet({});
    } catch (err) {
      setError("Failed to save set edit.");
    }
  }

  // New: Handle start editing notes for a given exercise entry
  const handleStartEditNotes = (entry) => {
    setEditingNotesId(entry.id)
    setEditedNotes(entry.notes || "")
  }

  // New: Handle cancel notes edit
  const handleCancelNotesEdit = () => {
    setEditingNotesId(null)
    setEditedNotes("")
  }

  // New: Handle save notes edit
  const handleSaveNotesEdit = async (entry) => {
    try {
      const workoutToUpdate = workouts.find(w => w.id === entry.workout_entry_id)
      if (!workoutToUpdate) throw new Error("Workout not found")

      // Update notes for the specific exercise entry
      const updatedExerciseEntries = workoutToUpdate.exercise_entries.map((e) =>
        e.id === entry.id ? { ...e, notes: editedNotes } : e
      )
      const updateData = {
        ...workoutToUpdate,
        exercise_entries: updatedExerciseEntries,
      }

      await updateUserWorkoutEntry(userId, workoutToUpdate.id, updateData)

      setWorkouts((prev) =>
        prev.map((w) =>
          w.id === workoutToUpdate.id ? { ...w, exercise_entries: updatedExerciseEntries } : w
        )
      )

      // Refresh workouts to ensure consistency
      await getUserWorkoutEntries(userId, setWorkouts, setError, () => { });

      setEditingNotesId(null)
      setEditedNotes("")
    } catch (err) {
      setError("Failed to save notes.")
    }
  }

  if (loading) return <Spinner animation="border" variant="warning" />
  if (error) return <Alert variant="danger">{error}</Alert>
  if (workouts.length === 0) return <p className="text-light">No workout entries found.</p>

  return (
    <Container fluid className="mt-3">
      <Accordion defaultActiveKey="0" className="custom-accordion">
        {workouts.map((workout, idx) => (
          <Accordion.Item
            eventKey={idx.toString()}
            key={workout.id}
            className="bg-dark border border-warning text-light"
          >
            <Accordion.Header className="custom-accordion-header">
              <div className="d-flex justify-content-between align-items-center w-100">
                <Stack direction="horizontal" gap={2} className="w-100 mb-1 text-warning fw-semibold ">
                  {/* Workout Name */}
                  <div>
                    {editId === workout.id ? (
                      <Form.Control
                        size="sm"
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="d-inline w-auto mb-1"
                      />
                    ) : (
                      workout.name || "Unnamed Workout"
                    )}
                  </div>

                  {/* Custom indicator Badge*/}
                  {!workout.default && (<Badge className="text-light small badge">Custom</Badge>)}

                  {/* Workout Start and End Times */}
                  <div className="ms-auto me-4">
                    {editId === workout.id ? (
                      <div className="d-flex gap-2 align-items-center" onClick={(e) => e.stopPropagation()}>
                        <Form.Control
                          size="sm"
                          type="datetime-local"
                          value={editedStart}
                          onChange={(e) => setEditedStart(e.target.value)}
                        />
                        <Form.Control
                          size="sm"
                          type="datetime-local"
                          value={editedEnd}
                          onChange={(e) => setEditedEnd(e.target.value)}
                        />
                      </div>
                    ) : (
                      <div>
                        {new Date(workout.start).toLocaleString()} →{" "}
                        {new Date(workout.end).toLocaleTimeString()} [
                        {
                          (() => {
                            const durationMs = new Date(workout.end) - new Date(workout.start);
                            const totalSeconds = Math.floor(durationMs / 1000);
                            const hours = Math.floor(totalSeconds / 3600);
                            const minutes = Math.floor((totalSeconds % 3600) / 60);
                            const seconds = totalSeconds % 60;
                            return `${hours > 0 ? `${hours}h ` : ""}${minutes > 0 ? `${minutes}m ` : ""}${seconds}s`;
                          })()
                        }
                        ]
                      </div>
                    )}
                  </div>
                </Stack>
                <div className="d-flex gap-2 me-4" onClick={(e) => e.stopPropagation()}>
                  {editId === workout.id ? (
                    <>
                      <Button
                        variant="success"
                        size="sm"
                        onClick={handleSaveWorkoutEdit}
                      >
                        Save
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setEditId(null)}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => handleStartEditWorkout(workout)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleWorkoutEntryDelete(workout.id)}
                      >
                        <i className="bi bi-trash-fill"></i>
                      </Button>
                    </>
                  )}
                </div>

              </div>
            </Accordion.Header>

            <Accordion.Body className="bg-dark text-light">
              {workout.exercise_entries.map((entry) => (
                <Card className="bg-dark border border-warning text-light mb-3" key={entry.id}>
                  <Card.Header className="bg-dark text-warning">
                    {entry.exercise?.name || "Unnamed Exercise"}
                  </Card.Header>
                  <Card.Body>
                    {entry.set_entries.length > 0 ? (
                      <Table striped bordered hover variant="dark" size="sm">
                        <thead className="table-warning text-dark">
                          <tr>
                            <th>Set</th>
                            <th>Reps</th>
                            <th>Weight (kg)</th>
                            <th>Time</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {entry.set_entries.map((set, index) => {
                            const isEditing = editingSetId === set.id
                            return (
                              <tr key={set.id}>
                                <td>{index + 1}</td>
                                <td>
                                  {isEditing ? (
                                    <Form.Control
                                      size="sm"
                                      type="number"
                                      value={editedSet.reps}
                                      onChange={(e) =>
                                        setEditedSet({ ...editedSet, reps: e.target.value })
                                      }
                                    />
                                  ) : (
                                    set.reps
                                  )}
                                </td>
                                <td>
                                  {isEditing ? (
                                    <Form.Control
                                      size="sm"
                                      type="number"
                                      value={editedSet.kg}
                                      onChange={(e) =>
                                        setEditedSet({ ...editedSet, kg: e.target.value })
                                      }
                                    />
                                  ) : (
                                    set.kg
                                  )}
                                </td>
                                <td>
                                  {isEditing ? (
                                    <Form.Control
                                      size="sm"
                                      type="time"
                                      value={editedSet.performed_at?.slice(11, 16) || ""}
                                      onChange={(e) =>
                                        setEditedSet({
                                          ...editedSet,
                                          performed_at: new Date(
                                            `${new Date(set.performed_at).toISOString().slice(0, 10)}T${e.target.value}`
                                          ).toISOString()
                                        })
                                      }
                                    />
                                  ) : (
                                    set.performed_at
                                      ? new Date(set.performed_at).toLocaleTimeString()
                                      : "—"
                                  )}
                                </td>
                                <td>
                                  {isEditing ? (
                                    <>
                                      <Button
                                        variant="success"
                                        size="sm"
                                        onClick={() => handleSaveSetEdit(set.id)}
                                        className="me-1"
                                      >
                                        <i className="bi bi-check-lg"></i>
                                      </Button>
                                      <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={handleCancelSetEdit}
                                      >
                                        <i className="bi bi-x-lg"></i>
                                      </Button>
                                    </>
                                  ) : (
                                    <Button
                                      variant="warning"
                                      size="sm"
                                      onClick={() => handleSetEditClick(set)}
                                    >
                                      <i className="bi bi-pencil-fill"></i>
                                    </Button>
                                  )}
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </Table>
                    ) : (
                      <p>No sets recorded.</p>
                    )}

                    {/* Notes Section */}
                    <div className="mt-3">
                      <strong>Notes:</strong>
                      {editingNotesId === entry.id ? (
                        <>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            value={editedNotes}
                            onChange={(e) => setEditedNotes(e.target.value)}
                            className="mt-2"
                          />
                          <div className="mt-2">
                            <Button
                              variant="success"
                              size="sm"
                              onClick={() => handleSaveNotesEdit(entry)}
                              className="me-2"
                            >
                              Save
                            </Button>
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={handleCancelNotesEdit}
                            >
                              Cancel
                            </Button>
                          </div>
                        </>
                      ) : (
                        <div className="d-flex justify-content-between align-items-center mt-2">
                          <div style={{ whiteSpace: "pre-wrap" }}>
                            {entry.notes || <em>No notes</em>}
                          </div>
                          <Button
                            variant="warning"
                            size="sm"
                            onClick={() => handleStartEditNotes(entry)}
                          >
                            Edit Notes
                          </Button>
                        </div>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container >
  )
}

export default WorkoutEntries
