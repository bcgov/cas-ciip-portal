import React from "react";
import { Col } from "react-bootstrap";
import { ObjectFieldTemplateProps } from "@rjsf/core";

const FormObjectFieldTemplate: React.FunctionComponent<ObjectFieldTemplateProps> = ({
  idSchema,
  required,
  TitleField,
  properties,
  title,
  description,
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
          <div className="font-italic description">{description}</div>
        </Col>
      )}
      {properties.map((prop) => (
        <React.Fragment key={prop.content.key}>{prop.content}</React.Fragment>
      ))}
      <style jsx>
        {`
          .description {
            margin-top: -8px;
            margin-bottom: 8px;
          }
        `}
      </style>
    </>
  );
};

export default FormObjectFieldTemplate;
