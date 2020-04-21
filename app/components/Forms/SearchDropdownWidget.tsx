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
    if ((schema as any)?.state?.indexOf(value) !== 'active') return undefined;
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
