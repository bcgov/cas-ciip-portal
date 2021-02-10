import React from 'react';
import {Button, ButtonGroup, Form} from 'react-bootstrap';
import SearchProps from './Interfaces/SearchProps';

const SearchTableHeaders: React.FunctionComponent<SearchProps> = (props) => {
  const clearForm = () => {
    props.handleEvent('applySearch', undefined, undefined);
  };

  const handleFilterChange = (value, column) => {
    props.handleEvent('applySearch', column, value);
  };

  return (
    <tr>
      {Object.keys(props.displayNameToColumnNameMap)
        .filter((x) => x !== '')
        .map((key) => (
          <td>
            <Form.Control
              key={key}
              placeholder={props.displayNameToColumnNameMap[key]}
              name={key}
              onChange={(evt) =>
                handleFilterChange(
                  evt.target.value,
                  props.displayNameToColumnNameMap[key]
                )
              }
            />
          </td>
        ))}
      <td>
        <ButtonGroup>
          <Button variant="success">Search</Button>
          <Button variant="danger" onClick={clearForm}>
            Reset
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  );
};

export default SearchTableHeaders;
