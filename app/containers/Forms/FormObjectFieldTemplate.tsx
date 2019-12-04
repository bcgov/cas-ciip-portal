import React from 'react';
import {Col} from 'react-bootstrap';

const FormObjectFieldTemplate = ({
  TitleField,
  properties,
  title,
  description
}) => {
  return (
    <>
      {title && (
        <Col xs={12}>
          <TitleField title={title} />
        </Col>
      )}
      {properties.map(prop => (
        <React.Fragment key={prop.content.key}>{prop.content}</React.Fragment>
      ))}
      {description}
    </>
  );
};

export default FormObjectFieldTemplate;
