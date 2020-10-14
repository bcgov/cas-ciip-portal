import React from 'react';
import {Col, Form} from 'react-bootstrap';
import {FieldTemplateProps} from 'react-jsonschema-form';

const FormFieldTemplate: React.FunctionComponent<FieldTemplateProps> = ({
  label,
  description,
  errors,
  children,
  schema,
  classNames,
  hidden,
  uiSchema
}) => {
  if (hidden) return null;

  if (
    uiSchema['ui:options']?.disableRenderingIfEmpty &&
    !children[0]?.props?.formData
  )
    return null;

  if (schema.type === 'array')
    return (
      <Col xs={12} className={`${classNames} summary-array-col`}>
        {description}
        {children}
        {errors}
      </Col>
    );
  if (schema.type === 'object')
    return (
      <Col xs={12} className={`${classNames} summary-formrow`}>
        <Form.Row>
          {description}
          {children}
          {errors}
        </Form.Row>
      </Col>
    );

  return (
    <div className={`${classNames} summary-formgroup`}>
      <div className="summary-label">
        <strong>{label}</strong>
      </div>
      <div className="summary-item">
        {description}
        {children}
        {errors}
      </div>
      <style jsx global>{`
        .summary-formgroup.form-group.field {
          width: 100%;
          margin: 0;
        }
        .summary-formrow h3 {
          margin-top: 35px;
          font-size: 20px;
          color: #036;
        }
        .summary-formgroup {
          display: inline-flex;
        }
        .summary-label {
          flex-basis: 30%;
          display: inline-block;
          border: 1px solid;
          margin-bottom: -1px;
          padding: 5px 10px;
          border-color: #aaa;
        }
        .hidden-title .summary-label {
          display: none;
        }
        .summary-item {
          flex-basis: 70%;
          // Allows the item to grow to 100% when summary-label is hidden
          flex-grow: 1;
          display: inline-flex;
          align-items: flex-start;
          border: 1px solid;
          border-color: #aaa;
          margin-bottom: -1px;
          margin-left: -1px;
        }
        .summary-item > * {
          padding: 5px 10px;
        }

        .summary-item > svg {
          // padding on an svg element (e.g. icons) may make its height/width 0 and render the svg invisible (or giant on chrome)
          padding: 0;
          margin-top: 10px;
        }

        .summary-item ul.error-detail {
          padding: 0;
          margin: 0;
          list-style: none;
        }

        .summary-item > source-field-heading {
          padding: 0;
        }
        .emission .form-row .summary-formgroup:nth-of-type(2n) {
          margin-top: 50px;
          margin-bottom: 20px;
        }

        .form-row .summary-formgroup:nth-of-type(2n) {
          background-color: #f1f1f1;
        }
        .emission .summary-label {
          border: none;
        }
        .emission .summary-item {
          border: none;
          display: inline-flex;
          justify-content: space-around;
          align-items: flex-start;
        }

        .summary-card .card-body {
          padding-top: 0;
          padding-bottom: 50px;
        }
        .emission .summary-formrow .emission-summary-row {
          border-bottom: 1px solid #ccc;
          margin-top: -1px;
          padding: 10px;
        }
        .emission .summary-formgroup.form-group.field {
          margin: 0 5px;
        }
        .emission .summary-formgroup.form-group.field h5 {
          color: #036;
        }
      `}</style>
    </div>
  );
};

export default FormFieldTemplate;
