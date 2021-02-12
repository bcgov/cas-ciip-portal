import React, {useState} from 'react';
import {Button, ButtonGroup, Form} from 'react-bootstrap';
import {useRouter} from 'next/router';
import {ISearchProps} from './Search/SearchProps';

const NONE_VALUES = ['', null, undefined];

const SearchTableHeaders: React.FunctionComponent<ISearchProps> = (props) => {
  const router = useRouter();

  const [searchFilters, setSearchFilters] = useState({});

  const handleFilterChange = (value, column, parseMethod) => {
    setSearchFilters({
      ...searchFilters,
      [column]: parseMethod ? parseMethod(value) : value
    });
  };

  const applySearch = (searchData) => {
    const newQuery = router.query.relayVars
      ? JSON.parse(String(router.query.relayVars))
      : {};
    props.searchOptions.forEach((option) => {
      const column = option.columnName;

      if (option.isSearchEnabled) {
        if (!NONE_VALUES.includes(searchData[column]))
          newQuery[column] = searchData[column];
        else delete newQuery[column];
      }
    });

    const queryString = JSON.stringify(newQuery);

    const url = {
      pathname: router.pathname,
      query: {
        ...router.query,
        relayVars: queryString
      }
    };

    router.replace(url, url, {shallow: true});
  };

  const clearForm = () => {
    setSearchFilters({});
    applySearch({});
  };

  return (
    <tr>
      {props.searchOptions.map((option) => {
        if (option.isSearchEnabled) {
          const column = option.columnName;
          return (
            <td key={column}>
              <Form.Control
                placeholder="Search"
                name={column}
                value={searchFilters[column] ?? router.query[column] ?? ''}
                onChange={(evt) =>
                  handleFilterChange(
                    evt.target.value,
                    column,
                    option.parseValue
                  )
                }
              />
            </td>
          );
        }
        if (option.removeSearchHeader) return;
        return <td />;
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
