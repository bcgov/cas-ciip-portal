import React from 'react';
import {Typeahead} from 'react-bootstrap-typeahead';

interface Props {
  placeholder?: string;
  options: string[];
  onChange: (items?: string[]) => void;
}

const SearchDropdown: React.FunctionComponent<Props> = ({
  placeholder,
  options,
  onChange
}) => {
  return (
    <Typeahead
      filterBy={(option, props) => {
        if (props.selected.length > 0) {
          // Display all the options if there's a selection
          return true;
        }

        // Filter by input
        return option.toLowerCase().includes(props.text.toLowerCase());
      }}
      placeholder={placeholder || 'Search...'}
      options={options}
      onChange={items => onChange(items)}
    />
  );
};

export default SearchDropdown;
