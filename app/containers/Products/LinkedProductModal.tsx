import React from 'react';
import {Modal, Container, Col, Row} from 'react-bootstrap';
import {JSONSchema6} from 'json-schema';
import JsonSchemaForm from 'react-jsonschema-form';
import {ProductRowItemContainer_product} from 'ProductRowItemContainer_product.graphql';
import SearchDropdownWidget from 'components/Forms/SearchDropdownWidget';
import ProductRowIdField from 'containers/Forms/ProductRowIdField';
import FormArrayFieldTemplate from 'containers/Forms/FormArrayFieldTemplate';
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
        <p>TESST TEXT TEST TEXT: blah blah blah</p>
        <Container>
          <Row>
            <Col md={3}>
              <h5>Product Name</h5>
            </Col>
            <Col md={6}>
              <h5>Associated Products:</h5>
            </Col>
            <Col md={2}>
              <h5>Add / Remove</h5>
            </Col>
          </Row>
          &emsp;
          <Row>
            <Col md={3}>
              <h6>{product.productName}</h6>
            </Col>
            <Col md={6}>
              <JsonSchemaForm
                showErrorList={false}
                ArrayFieldTemplate={FormArrayFieldTemplate}
                FieldTemplate={FormFieldTemplate}
                formContext={{query}}
                fields={CUSTOM_FIELDS}
                formData={linkData}
                widgets={{SearchWidget: SearchDropdownWidget}}
                schema={linkSchema}
                uiSchema={linkUISchema}
                ObjectFieldTemplate={FormObjectFieldTemplate}
                onSubmit={saveLinkedProducts}
              />
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
      `}</style>
    </Modal>
  );
};

export default LinkedProductModalComponent;
