import React from 'react';
import {ArrayFieldTemplateProps} from 'react-jsonschema-form';
import {Form, Button, Col} from 'react-bootstrap';

const FormArrayFieldTemplate: React.FunctionComponent<ArrayFieldTemplateProps> = ({
  items,
  canAdd,
  onAddClick,
  uiSchema,
  idSchema,
  className
}) => {
  return (
    <div className={className}>
      {items.map(element => {
        return (
          <React.Fragment key={element.index}>
            <Form.Row>
              <Col xs={12} md={element.hasRemove ? 11 : 12}>
                {element.children}
              </Col>

              {element.hasRemove && (
                <Col xs={12} md={1}>
                  <div className="remove-button-container">
                    <Button
                      type="button"
                      variant="danger"
                      onClick={element.onDropIndexClick(element.index)}
                    >
                      {uiSchema['ui:remove-text'] || 'Remove'}
                    </Button>
                  </div>
                </Col>
              )}
            </Form.Row>
            <hr />
          </React.Fragment>
        );
      })}
      {canAdd && (
        <Form.Row>
          <Col xs={12}>
            <div className="add-button-container">
              <Button
                id={`${idSchema.$id}-add`}
                type="button"
                onClick={onAddClick}
              >
                {uiSchema['ui:add-text'] || 'Add'}
              </Button>
            </div>
          </Col>
        </Form.Row>
      )}
      <style jsx>
        {`
          .remove-button-container {
            height: 100%;
            display: flex;
            justify-content: space-around;
            align-items: flex-start;
            margin-top: 40px;
          }
          .add-button-container {
            height: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;
          }
        `}
      </style>
    </div>
  );
};

export default FormArrayFieldTemplate;
