import React, {useCallback} from 'react';
import {WidgetProps} from 'react-jsonschema-form';
import SearchDropdown from 'components/SearchDropdown';

const SearchDropdownWidget: React.FunctionComponent<WidgetProps> = ({
  onChange,
  schema,
  id,
  placeholder,
  value,
  onBlur
}) => {
  const getOptions = useCallback(
    () =>
      schema.enum.map((e: string, index) => ({
        id: e,
        name: (schema as any).enumNames?.[index] ?? e
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

  const handleBlur = () => {
    onBlur(id, value);
  };

  const handleMenuToggle = (...args) => {
    console.log('menu toggle', args);
  };

  return (
    <SearchDropdown
      id={id}
      options={getOptions()}
      inputProps={{id}}
      placeholder={placeholder}
      selected={getSelected()}
      onChange={handleChange}
      onBlur={handleBlur}
      onMenuToggle={handleMenuToggle}
    />
  );
};

export default SearchDropdownWidget;
