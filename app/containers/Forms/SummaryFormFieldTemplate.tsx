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
  hidden
}) => {
  if (hidden) return null;

  if (schema.type === 'array')
    return (
      <Col xs={12} className="summary-array-col">
        {description}
        {children}
        {errors}
      </Col>
    );
  if (schema.type === 'object')
    return (
      <Col xs={12} className="summary-formrow">
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
          margin: 0 10px;
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
          width: 30%;
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
          display: inline-block;
          width: 70%;
          border: 1px solid;
          margin-bottom: -1px;
          margin-left: -1px;
          padding: 5px;
          border-color: #aaa;
          padding: 5px 10px;
        }
        .emission .form-row .summary-formgroup:nth-of-type(2n) {
          margin-top: 50px;
          margin-bottom: 20px;
        }
        .emission h3 {
          margin: 0;
        }
        .form-row .summary-formgroup:nth-of-type(2n) {
          background-color: #f1f1f1;
        }
        .emission .summary-item {
          border: 0;
          padding: 20px 20px 10px 20px;
        }
        .summary-card .card-body {
          padding-top: 0;
          padding-bottom: 50px;
        }
        .summary-card .card-header h2 {
          font-size: 30px;
        }
        .emission .summary-formrow .emission-summary-row {
          border-bottom: 1px solid #ccc;
          margin-top: -1px;
          padding: 10px;
        }
      `}</style>
    </div>
  );
};

export default FormFieldTemplate;
