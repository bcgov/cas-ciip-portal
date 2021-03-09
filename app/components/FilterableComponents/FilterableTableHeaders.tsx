import React, {useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import {useRouter} from 'next/router';
import {ISearchProps} from 'components/Search/SearchProps';
import {getUserFriendlyStatusLabel} from 'lib/text-transforms';
import safeJsonParse from 'lib/safeJsonParse';

interface Props extends ISearchProps {
  onSubmit: (searchData: Record<string, string | number | boolean>) => void;
}

const FilterableTableHeaders: React.FunctionComponent<Props> = ({
  onSubmit,
  searchOptions
}) => {
  const router = useRouter();

  const [searchFilters, setSearchFilters] = useState(() =>
    safeJsonParse(router.query.relayVars as string)
  );

  const handleFilterChange = (value, column, parseMethod) => {
    setSearchFilters({
      ...searchFilters,
      [column]: parseMethod ? parseMethod(value) : value
    });
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
        const initialValue = searchFilters[column] ?? '';

        if (option.isSearchEnabled) {
          if (!option.searchOptionValues) {
            return (
              <td key={key}>
                <Form.Control
                  placeholder="Search"
                  name={column}
                  value={initialValue}
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
                value={initialValue}
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
