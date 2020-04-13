import React from 'react';
import {ArrayFieldTemplateProps} from 'react-jsonschema-form';
import {Form, Col} from 'react-bootstrap';

const SummaryFormArrayFieldTemplate: React.FunctionComponent<ArrayFieldTemplateProps> = ({
  items
}) => {
  return (
    <>
      {items.map((element, i) => {
        const zeroEmission =
          element.children.props.formData.annualEmission === 0
            ? 'zero-emission'
            : '';
        return (
          <div key={element.index} className={zeroEmission}>
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
          .emission .zero-emission {
            display: none !important;
          }
          .summary-formrow .col-12 {
            padding-left: 5px !important;
            padding-right: 5px !important;
          }
        `}
      </style>
    </>
  );
};

export default SummaryFormArrayFieldTemplate;
