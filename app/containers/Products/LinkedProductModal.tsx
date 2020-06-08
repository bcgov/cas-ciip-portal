import React from 'react';
import {Modal, Container, Col, Row, Button} from 'react-bootstrap';
import {JSONSchema6} from 'json-schema';
import JsonSchemaForm from 'react-jsonschema-form';
import {ProductRowItemContainer_product} from 'ProductRowItemContainer_product.graphql';
import SearchDropdownWidget from 'components/Forms/SearchDropdownWidget';
import ProductRowIdField from 'containers/Forms/ProductRowIdField';
import LinkProductModalArrayFieldTemplate from './LinkProductModalArrayFieldTemplate';
import FormFieldTemplate from 'containers/Forms/FormFieldTemplate';
import FormObjectFieldTemplate from 'containers/Forms/FormObjectFieldTemplate';

interface Props {
  product: ProductRowItemContainer_product;
  linkProductModalShow: boolean;
  setLinkProductModalShow: (boolean) => void;
  saveLinkedProducts: (...args: [any]) => void;
  query: any;
  linkData: any;
}

export const LinkedProductModalComponent: React.FunctionComponent<Props> = ({
  product,
  linkProductModalShow,
  setLinkProductModalShow,
  saveLinkedProducts,
  query,
  linkData
}) => {
  const CUSTOM_FIELDS = {
    productRowId: (props) => {
      return <ProductRowIdField query={props.formContext.query} {...props} />;
    }
  };

  const linkSchema: JSONSchema6 = {
    type: 'array',
    items: {
      $ref: '#/definitions/product'
    },
    definitions: {
      product: {
        type: 'object',
        properties: {
          productRowId: {
            type: 'integer'
          }
        }
      }
    }
  };

  const linkUISchema = {
    'ui:add-text': '+',
    'ui:remove-text': '-',
    items: {
      'ui:field': 'product',
      classNames: 'hidden-title',
      productRowId: {
        'ui:col-md': 12,
        'ui:widget': 'SearchWidget',
        'ui:field': 'productRowId'
      }
    }
  };

  return (
    <Modal
      centered
      size="xl"
      show={linkProductModalShow}
      onHide={() => {
        setLinkProductModalShow(false);
      }}
    >
      <Modal.Header closeButton style={{color: 'white', background: '#003366'}}>
        <Modal.Title>Product Associations</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{background: '#f5f5f5'}}>
        <Container>
          <Row>
            <Col md={12}>
              <h5>Add/Edit Associations</h5>
              <hr />
              <p>
                When you specify one or more products on the right, applications
                reporting the product on the left will be prompted to report
                these products as well.
              </p>
              <p>
                Press the &apos;+&apos; button and select a product to add an
                association, press the &apos;-&apos; button to remove an
                association. Deleting an association will not delete the
                products themselves.
              </p>
              <p>
                Once you have created all the necessary associations, press
                &apos;Save&apos; to apply them.
              </p>
              <hr />
              <br />
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <h4>Product Name:</h4>
            </Col>
            <Col md={9}>
              <h4>Associated Products:</h4>
            </Col>
          </Row>
          &emsp;
          <Row>
            <Col md={3}>
              <h5>{product.productName}</h5>
            </Col>
            <Col md={9}>
              <JsonSchemaForm
                showErrorList={false}
                ArrayFieldTemplate={LinkProductModalArrayFieldTemplate}
                FieldTemplate={FormFieldTemplate}
                formContext={{query}}
                fields={CUSTOM_FIELDS}
                formData={linkData}
                widgets={{SearchWidget: SearchDropdownWidget}}
                schema={linkSchema}
                uiSchema={linkUISchema}
                ObjectFieldTemplate={FormObjectFieldTemplate}
                onSubmit={saveLinkedProducts}
              >
                <div className="save-close">
                  <Button
                    className="save-button"
                    variant="success"
                    type="submit"
                  >
                    Save
                  </Button>
                  <Button variant="danger" onClick={setLinkProductModalShow}>
                    Cancel
                  </Button>
                </div>
              </JsonSchemaForm>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <style jsx global>{`
        .hidden-title label {
          display: none;
        }
        .close {
          color: white;
        }
        .hidden-button {
          display: none;
        }
        .save-close {
          text-align: right;
          margin-right: 10px;
        }
        .save-button {
          margin-right: 10px;
        }
      `}</style>
    </Modal>
  );
};

export default LinkedProductModalComponent;
