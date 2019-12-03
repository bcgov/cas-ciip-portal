import React from 'react';
import {Typeahead} from 'react-bootstrap-typeahead';

interface Props {
  placeholder?: string;
  defaultInputValue: string;
  options: Array<{id: number; name: string}>;
  inputProps: object;
  onChange: (items?: string[]) => void;
}

const SearchDropdown: React.FunctionComponent<Props> = ({
  placeholder,
  defaultInputValue,
  options,
  inputProps,
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
        return option.name.toLowerCase().includes(props.text.toLowerCase());
      }}
      placeholder={placeholder || 'Search...'}
      defaultInputValue={defaultInputValue}
      options={options}
      inputProps={inputProps}
      labelKey="name"
      onChange={items => onChange(items)}
    />
  );
};

export default SearchDropdown;
