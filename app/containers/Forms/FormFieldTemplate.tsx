import React from "react";
import { Col, Form } from "react-bootstrap";
import { FieldTemplateProps } from "@rjsf/core";

const FormFieldTemplate: React.FunctionComponent<FieldTemplateProps> = ({
  id,
  label,
  help,
  required,
  description,
  errors,
  children,
  schema,
  classNames,
  uiSchema,
  hidden,
}) => {
  if (hidden) return <div className="hidden">{children}</div>;

  const helpText = uiSchema?.["ui:helplink"] ? (
    <a
      className="font-italic"
      href={uiSchema["ui:helplink"]}
      target="_blank"
      rel="noopener noreferrer"
    >
      {help}
    </a>
  ) : (
    <span className="font-italic">{help}</span>
  );

  if (schema.type === "array")
    return (
      <Col xs={12}>
        {description}
        {helpText}
        {errors}
        {children}
      </Col>
    );
  if (schema.type === "object")
    return (
      <Col xs={12} className={classNames}>
        <Form.Row>
          <div className="col-12">{errors}</div>
          <div className="col-12">{helpText}</div>
          {children}
        </Form.Row>
      </Col>
    );

  const xs = uiSchema["ui:col-xs"] || 12;
  const sm = uiSchema["ui:col-sm"] || xs;
  const md = uiSchema["ui:col-md"] || (sm < 6 ? sm : 6);
  const lg = uiSchema["ui:col-lg"] || md;
  const xl = uiSchema["ui:col-xl"] || lg;

  const renderLabel = uiSchema["ui:options"]?.label !== false;

  return (
    <Form.Group
      as={Col}
      xs={xs}
      sm={sm}
      md={md}
      lg={lg}
      xl={xl}
      className={classNames}
    >
      {renderLabel && (
        <Form.Label htmlFor={id}>
          {label}
          {required ? <>&nbsp;*</> : null}
        </Form.Label>
      )}
      {description}
      {children}
      {errors}
      {helpText}
    </Form.Group>
  );
};

export default FormFieldTemplate;
