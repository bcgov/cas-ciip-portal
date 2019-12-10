import React from 'react';
import {ArrayFieldTemplateProps} from 'react-jsonschema-form';
import {Form, Col} from 'react-bootstrap';

const SummaryFormArrayFieldTemplate: React.FunctionComponent<ArrayFieldTemplateProps> = ({
  items
}) => {
  return (
    <>
      {items.map((element, i) => {
        return (
          <React.Fragment key={element.index}>
            <Form.Row className="summary-array-block">
              <Col xs={12}>{element.children}</Col>
            </Form.Row>
            {i < items.length - 1 && <hr />}
          </React.Fragment>
        );
      })}
      <style jsx global>
        {`
          .summary-array-block {
            margin-top: 15px;
            margin-bottom: 15px;
          }
        `}
      </style>
    </>
  );
};

export default SummaryFormArrayFieldTemplate;
