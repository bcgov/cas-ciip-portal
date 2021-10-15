import React, { useCallback } from "react";
import { WidgetProps } from "@rjsf/core";
import Widgets from "@rjsf/core/dist/cjs/components/widgets";
import SearchDropdown from "components/SearchDropdown";

const SearchDropdownWidget: React.FunctionComponent<WidgetProps> = (props) => {
  const { onChange, schema, id, placeholder, value, onBlur, readonly } = props;
  const getOptions = useCallback(
    () =>
      schema.enum.map((e: string, index) => ({
        id: e,
        name: (schema as any).enumNames?.[index] ?? e,
      })),
    [schema]
  );

  const getSelected = useCallback(() => {
    if (value === null || value === undefined) return undefined;
    const index = schema.enum.indexOf(value);
    return [
      {
        id: value,
        name: (schema as any).enumNames?.[index] ?? value,
      },
    ];
  }, [schema, value]);
  const handleChange = (items: Array<{ id: string | number }>) => {
    onChange(items[0]?.id);
  };

  const handleBlur = () => {
    onBlur(id, value);
  };

  if (readonly) return <Widgets.SelectWidget {...props} />;

  return (
    <SearchDropdown
      id={id}
      options={getOptions()}
      inputProps={{ id }}
      placeholder={placeholder}
      selected={getSelected()}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

export default SearchDropdownWidget;
