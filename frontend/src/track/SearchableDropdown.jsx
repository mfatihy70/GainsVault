import React, { useState } from "react"
import { Dropdown, FormControl, InputGroup } from "react-bootstrap"

const SearchableDropdown = ({ exercises = [], onSelect }) => {
  const [search, setSearch] = useState("")
  const [show, setShow] = useState(false)

  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Dropdown show={show} onToggle={() => setShow(!show)}>
      <Dropdown.Toggle variant="warning">+ Add Exercise</Dropdown.Toggle>

      <Dropdown.Menu
        className="bg-dark text-light border-warning"
        style={{ minWidth: "300px", padding: "10px" }}
      >
        <InputGroup className="mb-2">
          <FormControl
            placeholder="Search..."
            className="bg-dark text-light border-warning placeholder-grey"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            autoFocus
          />
        </InputGroup>

        {filteredExercises.length > 0 ? (
          filteredExercises.map((exercise) => (
            <Dropdown.Item
              className="bg-dark text-light"
              style={{ cursor: "pointer" }}
              key={exercise.id}
              onClick={() => {
                onSelect(exercise) // return the full exercise object
                setShow(false)
                setSearch("") // optional: clear input after select
              }}
            >
              {exercise.name}
            </Dropdown.Item>
          ))
        ) : (
          <Dropdown.Item className="text-secondary" disabled>
            No results
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default SearchableDropdown
