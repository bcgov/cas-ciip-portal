import React from "react";
import { ArrayFieldTemplateProps } from "@rjsf/core";
import { Form, Button, Col } from "react-bootstrap";

const FormArrayFieldTemplate: React.FunctionComponent<ArrayFieldTemplateProps> = ({
  items,
  canAdd,
  onAddClick,
  uiSchema,
  idSchema,
  className,
}) => {
  return (
    <div className={className}>
      {items.map((element) => {
        const elementProps = element.children.props;
        let shouldRenderRemoveButton = element.hasRemove;

        if (
          "ui:hasRemove" in elementProps.uiSchema &&
          "isFalse" in elementProps.uiSchema["ui:hasRemove"]
        ) {
          shouldRenderRemoveButton =
            shouldRenderRemoveButton &&
            !elementProps.formData[
              elementProps.uiSchema["ui:hasRemove"].isFalse
            ];
        }

        return (
          <div key={element.index}>
            <Form.Row>
              {uiSchema.linkProduct ? (
                <Col xs={12} md={shouldRenderRemoveButton ? 6 : 9}>
                  {element.children}
                </Col>
              ) : (
                <Col xs={12} md={shouldRenderRemoveButton ? 11 : 12}>
                  {element.children}
                </Col>
              )}

              {shouldRenderRemoveButton && uiSchema.linkProduct && (
                <Col
                  xs={12}
                  md={{ span: 1, offset: 1 }}
                  className="remove-button-container"
                >
                  <Button
                    type="button"
                    variant="danger"
                    onClick={element.onDropIndexClick(element.index)}
                  >
                    {uiSchema["ui:remove-text"] || "Remove"}
                  </Button>
                </Col>
              )}
              {shouldRenderRemoveButton && !uiSchema.linkProduct && (
                <Col xs={12} md={1}>
                  <div className="remove-button-container">
                    <Button
                      type="button"
                      variant="danger"
                      onClick={element.onDropIndexClick(element.index)}
                    >
                      {uiSchema["ui:remove-text"] || "Remove"}
                    </Button>
                  </div>
                </Col>
              )}
            </Form.Row>
            {!uiSchema.linkProduct && <hr />}
          </div>
        );
      })}
      {canAdd && (
        <Form.Row>
          {uiSchema.linkProduct ? (
            <Col xs={12} md={{ span: 1, offset: 6 }}>
              <div className="add-button-container">
                <Button
                  id={`${idSchema.$id}-add`}
                  type="button"
                  onClick={onAddClick}
                >
                  {uiSchema["ui:add-text"] || "Add"}
                </Button>
              </div>
            </Col>
          ) : (
            <Col xs={12}>
              <div className="add-button-container">
                <Button
                  id={`${idSchema.$id}-add`}
                  type="button"
                  onClick={onAddClick}
                >
                  {uiSchema["ui:add-text"] || "Add"}
                </Button>
              </div>
            </Col>
          )}
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
