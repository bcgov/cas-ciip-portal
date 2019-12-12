import React from 'react';
import {Col} from 'react-bootstrap';
import {ObjectFieldTemplateProps} from 'react-jsonschema-form';

const FormObjectFieldTemplate: React.FunctionComponent<ObjectFieldTemplateProps> = ({
  idSchema,
  required,
  TitleField,
  properties,
  title,
  description
}) => {
  return (
    <>
      {title && (
        <Col xs={12}>
          <TitleField
            title={title}
            required={required}
            id={`${idSchema.$id}__title`}
          />
        </Col>
      )}
      {description && (
        <Col xs={12}>
          <span className="font-italic">{description}</span>
        </Col>
      )}
      {properties.map(prop => (
        <React.Fragment key={prop.content.key}>{prop.content}</React.Fragment>
      ))}
    </>
  );
};

export default FormObjectFieldTemplate;
