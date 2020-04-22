import React, {useCallback} from 'react';
import {WidgetProps} from 'react-jsonschema-form';
import SearchDropdown from 'components/SearchDropdown';

const SearchDropdownWidget: React.FunctionComponent<WidgetProps> = ({
  onChange,
  schema,
  id,
  placeholder,
  value
}) => {
  // Get indices of all non-active products (deprecated, archived)
  const getAllIndexes = (array, value) => {
    const indexArray = [];
    array.forEach((item, index) => {
      if (item !== value) indexArray.push(index);
    });
    return indexArray;
  };

  const inactiveIndexes = getAllIndexes((schema as any).state, 'active');

  // Remove all enums & enumNames that correspond to a non-active product from the options
  for (let i = inactiveIndexes.length - 1; i >= 0; i--) {
    schema.enum.splice(inactiveIndexes[i], 1);
    (schema as any).enumNames.splice(inactiveIndexes[i], 1);
  }

  const getOptions = useCallback(
    () =>
      schema.enum.map((e: string, index) => ({
        id: e,
        name: (schema as any).enumNames?.[index] ?? e,
        state: (schema as any).state?.[index]
      })),
    [schema]
  );

  const getSelected = useCallback(() => {
    if (value === null || value === undefined) return undefined;
    const index = schema.enum.indexOf(value);
    return [
      {
        id: value,
        name: (schema as any).enumNames?.[index] ?? value
      }
    ];
  }, [schema, value]);
  const handleChange = (items: Array<{id: string | number}>) => {
    onChange(items[0]?.id);
  };

  return (
    <SearchDropdown
      id={id}
      options={getOptions()}
      inputProps={{id}}
      placeholder={placeholder}
      selected={getSelected()}
      onChange={handleChange}
    />
  );
};

export default SearchDropdownWidget;
