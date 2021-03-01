import React, {useState, useEffect} from 'react';
import {Button, Form} from 'react-bootstrap';
import {useRouter} from 'next/router';
import {ISearchProps} from 'components/Search/SearchProps';
import {getUserFriendlyStatusLabel} from 'lib/text-transforms';

const NONE_VALUES = [null, undefined];

const FilterableTableHeaders: React.FunctionComponent<ISearchProps> = (
  props
) => {
  const router = useRouter();

  const [searchFilters, setSearchFilters] = useState({});

  const handleFilterChange = (value, column, parseMethod) => {
    setSearchFilters({
      ...searchFilters,
      [column]: parseMethod ? parseMethod(value) : value
    });
  };

  const applySearch = (searchData) => {
    const newQuery = {};
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

  // functional equivalent to componentDidMount()
  useEffect(() => {
    const parsedUrl = router.query.relayVars
      ? JSON.parse(String(router.query.relayVars))
      : {};
    Object.keys(parsedUrl).forEach((key) => {
      if (NONE_VALUES.includes(searchFilters[key]))
        searchFilters[key] = parsedUrl[key];
    });
  }, []);

  return (
    <tr>
      {props.searchOptions.map((option) => {
        const column = option.columnName;
        const key = option.columnName + option.title;
        const initialValue = searchFilters[column] ?? '';

        if (option.isSearchEnabled) {
          if (!option.searchOptionValues) {
            return (
              <td key={key}>
                <Form.Control
                  placeholder="Search"
                  name={column}
                  value={initialValue}
                  onChange={(evt) =>
                    handleFilterChange(evt.target.value, column, option.toUrl)
                  }
                />
              </td>
            );
          }

          return (
            <td key={key}>
              <Form.Control
                as="select"
                placeholder="Search"
                name={column}
                value={initialValue}
                onChange={(evt) =>
                  handleFilterChange(evt.target.value, column, option.toUrl)
                }
              >
                <option key={column + '-placeholder'} value="">
                  ...
                </option>
                {option.searchOptionValues.map((kvp) => (
                  <option key={column + '-' + kvp.display} value={kvp.value}>
                    {getUserFriendlyStatusLabel(kvp.display)}
                  </option>
                ))}
              </Form.Control>
            </td>
          );
        }
        if (option.removeSearchHeader) return;
        return <td key={key} />;
      })}
      <td className="flex">
        <Button variant="outline-secondary" onClick={clearForm}>
          Clear
        </Button>
        <Button
          style={{marginLeft: '5px'}}
          variant="primary"
          onClick={() => applySearch(searchFilters)}
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

export default FilterableTableHeaders;
