import React from 'react';
import {Typeahead} from 'react-bootstrap-typeahead';
import ErrorList from 'components/Forms/ErrorList';

interface Props {
  id?: string;
  placeholder?: string;
  defaultInputValue?: string;
  options: Array<{id: string | number; name: string}>;
  inputProps: {id: string};
  onChange: (items: Array<{id: string | number; name: string}>) => void;
  selected?: Array<{id: string | number; name: string}>;
  errorSchema?: any;
}

const SearchDropdown: React.FunctionComponent<Props> = ({
  id,
  placeholder,
  defaultInputValue,
  options,
  selected,
  inputProps,
  onChange,
  errorSchema
}) => {
  // Get all indexes that contain undefined
  const getAllUndefinedIndexes = (array, value) => {
    const indexArray = [];
    array.forEach((item, index) => {
      if (item === value) indexArray.push(index);
    });
    return indexArray;
  };

  // Remove all undefined indexes from options (required so archived/deprecated products do not show as options in the dropdown)
  const undefinedIndexes = getAllUndefinedIndexes(options, undefined);
  for (let i = undefinedIndexes.length - 1; i >= 0; i--) {
    options.splice(undefinedIndexes[i], 1);
  }

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
        onChange={items => onChange(items)}
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

export default SearchDropdown;
