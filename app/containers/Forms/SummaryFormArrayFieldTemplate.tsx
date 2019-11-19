import React from 'react';
import {ArrayFieldTemplateProps} from 'react-jsonschema-form';
import {Form, Col} from 'react-bootstrap';

const SummaryFormArrayFieldTemplate: React.FunctionComponent<ArrayFieldTemplateProps> = ({
  TitleField,
  title,
  items
}) => {
  return (
    <>
      <Col xs={12}>
        <TitleField
          id={null}
          title={title === 'gases' || title === 'Source Types' ? null : title}
          required={false}
        />
      </Col>
      {items.map(element => {
        return (
          <React.Fragment key={element.index}>
            <Form.Row>
              <Col xs={12}>{element.children}</Col>
            </Form.Row>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default SummaryFormArrayFieldTemplate;
