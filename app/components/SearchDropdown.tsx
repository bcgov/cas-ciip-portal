import React from 'react';
import {Typeahead} from 'react-bootstrap-typeahead';

interface Props {
  id?: string;
  placeholder?: string;
  defaultInputValue?: string;
  options: Array<{id: string | number; name: string}>;
  inputProps: {id: string};
  onChange: (items: Array<{id: string | number; name: string}>) => void;
  onBlur?: (...args: any[]) => void;
  onMenuToggle?: (...args: any[]) => void;
  selected?: Array<{id: string | number; name: string}>;
  errorSchema?: any;
}

export const SearchDropdownComponent: React.FunctionComponent<Props> = ({
  id,
  placeholder,
  defaultInputValue,
  options,
  selected,
  inputProps,
  onChange,
  onBlur,
  onMenuToggle
}) => {
  return (
    <>
      <Typeahead
        id={id}
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
        inputProps={{...inputProps, ...{className: 'typeahead-input'}}}
        labelKey="name"
        selected={selected}
        onChange={(items) => onChange(items)}
        onBlur={onBlur}
        onMenuToggle={onMenuToggle}
      />
      <style jsx global>
        {`
          .typeahead-input {
            -webkit-appearance: menulist;
            -moz-appearance: menulist;
          }
        `}
      </style>
    </>
  );
};

export default SearchDropdownComponent;
