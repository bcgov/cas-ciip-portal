import React from 'react';
import {Col, Form} from 'react-bootstrap';
import {FieldTemplateProps} from '@rjsf/core';

const FormFieldTemplate: React.FunctionComponent<FieldTemplateProps> = ({
  label,
  errors,
  children,
  schema,
  classNames,
  hidden,
  uiSchema,
  formData
}) => {
  if (hidden) return null;

  if (
    uiSchema['ui:options']?.disableRenderingIfEmpty &&
    (formData === null || formData === undefined)
  )
    return null;

  if (schema.type === 'array')
    return (
      <Col xs={12} className={`${classNames} summary-array-col`}>
        {children}
        {errors}
      </Col>
    );
  if (schema.type === 'object')
    return (
      <Col xs={12} className={`${classNames} summary-formrow`}>
        <Form.Row>
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
        {children}
        {errors}
      </div>
      <style jsx>{`
        :global(.summary-formgroup.form-group.field) {
          width: 100%;
          margin: 0;
        }
        :global(.summary-formrow h3) {
          margin-top: 35px;
          font-size: 20px;
          color: #036;
          margin-bottom: 8px;
        }
        :global(.summary-formgroup) {
          display: inline-flex;
        }
        :global(.summary-label) {
          flex-basis: 30%;
          display: inline-block;
          border: 1px solid;
          margin-bottom: -1px;
          padding: 5px 10px;
          border-color: #aaa;
        }
        :global(.hidden-title .summary-label) {
          display: none;
        }
        :global(.summary-item) {
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
        :global(.summary-item > *) {
          padding: 5px 10px;
        }

        :global(.summary-item > svg) {
          // padding on an svg element (e.g. icons) may make its height/width 0 and render the svg invisible (or giant on chrome)
          padding: 0;
          margin-top: 10px;
        }

        :global(.summary-item ul.error-detail) {
          padding: 0;
          margin: 0;
          list-style: none;
        }

        :global(.summary-item > source-field-heading) {
          padding: 0;
        }
        :global(.emission .form-row .summary-formgroup:nth-of-type(2n)) {
          margin-top: 50px;
          margin-bottom: 20px;
        }

        :global(.form-row .summary-formgroup:nth-of-type(2n)) {
          background-color: #f1f1f1;
        }
        :global(.emission .summary-label) {
          border: none;
        }
        :global(.emission .summary-item) {
          border: none;
          display: inline-flex;
          justify-content: space-around;
          align-items: flex-start;
        }

        :global(.summary-card .card-body) {
          padding-top: 0;
          padding-bottom: 50px;
        }
        :global(.emission .summary-formrow .emission-summary-row) {
          border-bottom: 1px solid #ccc;
          margin-top: -1px;
          padding: 10px;
        }
        :global(.emission .summary-formgroup.form-group.field) {
          margin: 0 5px;
        }
        :global(.emission .summary-formgroup.form-group.field h5) {
          color: #036;
        }
      `}</style>
    </div>
  );
};

export default FormFieldTemplate;
