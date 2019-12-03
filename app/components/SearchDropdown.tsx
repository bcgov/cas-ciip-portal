import React from 'react';
import {Typeahead} from 'react-bootstrap-typeahead';

interface Props {
  placeholder?: string;
  defaultInputValue: string;
  options: {items: string[] | object[]; id: string};
  onChange: (items?: string[]) => void;
}

const SearchDropdown: React.FunctionComponent<Props> = ({
  placeholder,
  defaultInputValue,
  options,
  onChange
}) => {
  return (
    <Typeahead
      filterBy={(option, props) => {
        if (props.selected.length > 0 || defaultInputValue) {
          // Display all the options if there's a selection
          return true;
        }

        // Filter by input
        return option.toLowerCase().includes(props.text.toLowerCase());
      }}
      placeholder={placeholder || 'Search...'}
      defaultInputValue={defaultInputValue}
      options={options.items}
      id={options.id}
      onChange={items => onChange(items)}
    />
  );
};

export default SearchDropdown;
