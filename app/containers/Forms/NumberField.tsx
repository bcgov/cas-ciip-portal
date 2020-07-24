import React from 'react';
import NumberFormat from 'react-number-format';
import {FieldProps} from 'react-jsonschema-form';
import {getWidget} from 'react-jsonschema-form/lib/utils';

const NumberField: React.FunctionComponent<FieldProps> = ({
  formData,
  onChange,
  schema,
  idSchema,
  disabled,
  readonly,
  uiSchema,
  registry,
  name,
  required,
  formContext,
  autofocus,
  placeholder,
  rawErrors,
  onBlur,
  onFocus
}) => {
  const {title} = schema;
  if (uiSchema?.['ui:widget']) {
    const WidgetComponent = getWidget(
      schema,
      // @ts-ignore
      uiSchema['ui:widget'],
      registry.widgets
    );
    return (
      // @ts-ignore
      <WidgetComponent
        schema={schema}
        id={idSchema?.$id}
        label={title ?? name}
        value={formData}
        required={required}
        disabled={disabled}
        readonly={readonly}
        formContext={formContext}
        autofocus={autofocus}
        registry={registry}
        placeholder={placeholder}
        rawErrors={rawErrors}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    );
  }

  const allowNegative =
    (schema.minimum === undefined && schema.exclusiveMinimum === undefined) ||
    schema.minimum < 0 ||
    schema.exclusiveMinimum < 0;

  if (readonly) {
    return (
      <NumberFormat
        thousandSeparator={!uiSchema?.['ui:no-seperator']}
        id={idSchema.$id}
        disabled={disabled}
        decimalScale={4}
        value={formData}
        displayType="text"
      />
    );
  }

  return (
    <NumberFormat
      thousandSeparator={!uiSchema?.['ui:no-seperator']}
      id={idSchema.$id}
      disabled={disabled}
      className="form-control"
      allowNegative={allowNegative}
      decimalScale={4}
      defaultValue={(schema as any).defaultValue}
      value={formData}
      onValueChange={({floatValue}) => onChange(floatValue)}
      onBlur={() => onBlur(idSchema.$id, formData)}
    />
  );
};

export default NumberField;
