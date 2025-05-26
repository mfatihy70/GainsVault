import React, { useState } from "react";
import {
  Dropdown,
  FormControl,
  Button,
  DropdownButton,
  InputGroup,
} from "react-bootstrap";

const SearchableDropdown = ({ items = [], onSelect }) => {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Dropdown show={show} onToggle={() => setShow(!show)}>
      <Dropdown.Toggle variant="warning">
        + Add Exercise
      </Dropdown.Toggle>

      <Dropdown.Menu className="bg-dark text-light border-warning" style={{ minWidth: "300px", padding: "10px" }}>
        <InputGroup className="mb-2">
          <FormControl
            placeholder="Search..."
            className="bg-dark text-light border-warning placeholder-grey"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            autoFocus
          />
        </InputGroup>

        {filteredItems.length > 0 ? (
          filteredItems.map((item, idx) => (
            <Dropdown.Item
              className="bg-dark text-light"
              style={{ cursor: "pointer" }}
              key={idx}
              onClick={() => {
                onSelect(item);
                setShow(false);
              }}
            >
              {item}
            </Dropdown.Item>
          ))
        ) : (
          <Dropdown.Item className="text-secondary" disabled>No results</Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SearchableDropdown;
