import React, {useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import {useRouter} from 'next/router';
import {ISearchProps} from 'components/Search/SearchProps';
import {getUserFriendlyStatusLabel} from 'lib/text-transforms';
import safeJsonParse from 'lib/safeJsonParse';
import {FilterArgs} from 'components/Search/ISearchOption';

interface Props extends ISearchProps {
  onSubmit: (searchData: Record<string, string | number | boolean>) => void;
}

const FilterableTableHeaders: React.FunctionComponent<Props> = ({
  onSubmit,
  searchOptions
}) => {
  const router = useRouter();

  const [searchFilters, setSearchFilters] = useState<FilterArgs>(() =>
    safeJsonParse(router.query.relayVars as string)
  );

  const handleFilterChange = (value, column, parseMethod) => {
    // using a state update with a callback ensures that we always have a reference to the latest searchFilters
    // especially when this handler is fired multiple times in quick sucession, without the component updating
    // which can happen when a single filter component handles multiple variables
    setSearchFilters((prevFilters) => ({
      ...prevFilters,
      [column]: parseMethod ? parseMethod(value) : value
    }));
  };

  const clearForm = () => {
    setSearchFilters({});
    onSubmit({});
  };

  return (
    <tr>
      {searchOptions.map((option) => {
        const column = option.columnName;
        const key = option.columnName + option.title;
        const value = searchFilters[column] ?? '';

        if (option.Component) {
          return (
            <option.Component
              filterArgs={searchFilters}
              onChange={handleFilterChange}
            />
          );
        }

        if (option.isSearchEnabled) {
          if (!option.searchOptionValues) {
            return (
              <td key={key}>
                <Form.Control
                  placeholder="Search"
                  name={column}
                  value={value as string | number}
                  aria-label={`filter-by-${column}`}
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
                value={value as string | number}
                aria-label={`filter-by-${column}`}
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

export default FilterableTableHeaders;
