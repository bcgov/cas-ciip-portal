import React, {useEffect, useState} from 'react';
import {Button} from 'react-bootstrap';
import {TableFilter, FilterArgs} from './Filters';

interface Props {
  filters: TableFilter[];
  filterArgs: FilterArgs;
  onSubmit: (searchData: Record<string, string | number | boolean>) => void;
}

const FilterableTableFilterRow: React.FunctionComponent<Props> = ({
  filters,
  filterArgs,
  onSubmit
}) => {
  const [searchFilters, setSearchFilters] = useState(filterArgs);
  useEffect(() => setSearchFilters(filterArgs), [filterArgs]); // reset the local state when the prop changes

  const handleFilterChange = (value, column) => {
    // using a state update with a callback ensures that we always have a reference to the latest searchFilters
    // especially when this handler is fired multiple times in quick sucession, without the component updating
    // which can happen when a single filter component handles multiple variables
    setSearchFilters((prevFilters) => ({
      ...prevFilters,
      [column]: value
    }));
  };

  const clearForm = () => {
    setSearchFilters({});
    onSubmit({});
  };

  const handleKeyDown: React.KeyboardEventHandler = (e) => {
    if (e.key === 'Enter') {
      onSubmit(searchFilters);
    }
  };

  return (
    <tr onKeyDown={handleKeyDown}>
      {filters.map((filter) => (
        <filter.Component
          key={filter.argName + filter.title}
          filterArgs={searchFilters}
          onChange={handleFilterChange}
        />
      ))}
      <td className="flex">
        <Button variant="outline-secondary" onClick={clearForm}>
          Clear
        </Button>
        <Button
          style={{marginLeft: '5px'}}
          variant="primary"
          onClick={() => onSubmit(searchFilters)}
        >
          Apply
        </Button>
      </td>
      <style jsx>{`
        .flex {
          display: flex;
        }
      `}</style>
    </tr>
  );
};

export default FilterableTableFilterRow;
