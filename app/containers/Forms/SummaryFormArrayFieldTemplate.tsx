import React from 'react';
import {ArrayFieldTemplateProps} from 'react-jsonschema-form';
import {Form, Col} from 'react-bootstrap';

const SummaryFormArrayFieldTemplate: React.FunctionComponent<ArrayFieldTemplateProps> = ({
  items,
  className
}) => {
  return (
    <div className={className}>
      {items.map((element, i) => {
        const className =
          element.children.props.formData.annualEmission === 0
            ? `${element.className} zero-emission`
            : element.className;
        return (
          <div key={element.index} className={className}>
            <Form.Row className="summary-array-block">
              <Col xs={12}>{element.children}</Col>
            </Form.Row>
            {i < items.length - 1 && <hr />}
          </div>
        );
      })}
      <style jsx global>
        {`
          .summary-array-block {
            margin-top: 15px;
            margin-bottom: 15px;
          }
          .summary-array-block > .col-12 {
            margin-left: 5px !important;
            margin-right: 5px !important;
          }
          .emission .zero-emission {
            display: none !important;
          }
          .summary-formrow .col-12.form-group.field {
            padding-left: 5px !important;
            padding-right: 5px !important;
          }
        `}
      </style>
    </div>
  );
};

export default SummaryFormArrayFieldTemplate;
