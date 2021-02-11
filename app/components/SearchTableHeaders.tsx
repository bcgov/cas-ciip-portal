import React, {useState} from 'react';
import {Button, ButtonGroup, Form} from 'react-bootstrap';
import SearchProps from './Interfaces/SearchProps';
import {useRouter} from 'next/router';

const SearchTableHeaders: React.FunctionComponent<SearchProps> = (props) => {
  const router = useRouter();

  const [searchFilters, setSearchFilters] = useState({});

  const handleFilterChange = (value, column) => {
    setSearchFilters({
      ...searchFilters,
      [column]: value
    });
  };

  const applySearch = (searchData) => {
    const newQuery = {...router.query};
    Object.values(props.displayNameToColumnNameMap).forEach((key) => {
      if (key !== null) {
        if (
          searchData[key] !== '' &&
          searchData[key] !== null &&
          searchData[key] !== undefined
        )
          newQuery[key] = searchData[key];
        else delete newQuery[key];
      }
    });

    const url = {
      pathname: router.pathname,
      query: newQuery
    };

    router.replace(url, url, {shallow: true});
  };

  const clearForm = () => {
    setSearchFilters({});
    applySearch({});
  };

  return (
    <tr>
      {Object.keys(props.displayNameToColumnNameMap)
        .filter((x) => x !== '')
        .map((key) => {
          const column = props.displayNameToColumnNameMap[key];

          return (
            <td key={column}>
              <Form.Control
                placeholder={column}
                name={key}
                value={searchFilters[column] ?? router.query[column] ?? ''}
                onChange={(evt) => handleFilterChange(evt.target.value, column)}
              />
            </td>
          );
        })}
      <td>
        <ButtonGroup>
          <Button variant="success" onClick={() => applySearch(searchFilters)}>
            Search
          </Button>
          <Button variant="danger" onClick={clearForm}>
            Reset
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  );
};

export default SearchTableHeaders;
