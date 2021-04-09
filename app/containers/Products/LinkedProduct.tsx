import React, {useMemo, useState} from 'react';
import {Modal, Container, Col, Row, Button, Table} from 'react-bootstrap';
import {LinkedProduct_product} from 'LinkedProduct_product.graphql';
import {LinkedProduct_query} from 'LinkedProduct_query.graphql';
import SearchDropdown from 'components/SearchDropdown';
import {graphql, createFragmentContainer, RelayProp} from 'react-relay';
import createLinkedProductMutation from 'mutations/linked_product/createLinkedProductMutation';
import deleteLinkedProductMutation from 'mutations/linked_product/deleteLinkedProductMutation';
import {nowMoment} from 'functions/formatDates';

interface Props {
  product: LinkedProduct_product;
  setLinkProductModalShow: (boolean) => void;
  query: LinkedProduct_query;
  relay: RelayProp;
}

const LinkedProduct: React.FunctionComponent<Props> = ({
  product,
  setLinkProductModalShow,
  query,
  relay
}) => {
  const [selected, setSelected] = useState(null);
  const {nonEnergyProducts} = query;
  const currentlyLinkedProductIds = product.linkedProductsByProductId.edges.map(
    ({node}) => node.linkedProductId
  );
  // Populate the dropdown search options by filtering out the parent product & any currently linked products
  const searchOptions = useMemo(
    () =>
      nonEnergyProducts.edges
        .filter(
          ({node}) =>
            ![product.rowId, ...currentlyLinkedProductIds].includes(node.rowId)
        )
        .map(({node}) => {
          return {id: node.rowId, name: node.productName};
        }),
    [nonEnergyProducts]
  );

  const handleCreateLinkedProduct = async () => {
    if (selected) {
      const variables = {
        input: {
          linkedProduct: {
            productId: product.rowId,
            linkedProductId: selected[0].id,
            isDeleted: false
          }
        }
      };
      await createLinkedProductMutation(
        relay.environment,
        variables,
        product.id
      );
    }
  };

  const handleChange = (option: {id: string | number; name: string}[]) =>
    setSelected(option);

  const handleDeleteLinkedProduct = async (linkedProduct) => {
    const {environment} = relay;
    const variables = {
      input: {
        id: linkedProduct.id,
        linkedProductPatch: {
          linkedProductId: linkedProduct.linkedProductId,
          isDeleted: true,
          deletedAt: nowMoment().format('YYYY-MM-DDTHH:mm:ss')
        }
      }
    };
    await deleteLinkedProductMutation(
      environment,
      variables,
      product.linkedProductsByProductId.__id
    );
  };

  return (
    <Modal
      centered
      size="xl"
      show
      onHide={() => setLinkProductModalShow(false)}
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
            <Col md={7}>
              <SearchDropdown
                id="search products"
                options={searchOptions}
                inputProps={{id: product.id}}
                placeholder="Search Products.."
                selected={selected}
                onChange={handleChange}
                onBlur={() => null}
                onMenuToggle={() => null}
              />
            </Col>
            <Col md={2}>
              <Button
                variant="outline-primary"
                onClick={() => handleCreateLinkedProduct()}
              >
                + Link Product
              </Button>
            </Col>
          </Row>
          <Row style={{marginTop: '20px'}}>
            <Col md={{offset: 3, span: 9}}>
              <Table striped bordered hover>
                <thead style={{textAlign: 'center'}}>
                  <tr>
                    <th>Product</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {product.linkedProductsByProductId.edges.map(({node}) => (
                    <tr>
                      <td>{node.productByLinkedProductId.productName}</td>
                      <td style={{textAlign: 'center'}}>
                        <Button
                          variant="outline-danger"
                          onClick={() => handleDeleteLinkedProduct(node)}
                        >
                          -
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row>
            <Col md={{span: 1, offset: 11}}>
              <Button
                onClick={() => setLinkProductModalShow(false)}
                variant="secondary"
              >
                Close
              </Button>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <style jsx global>{`
        .close {
          color: white;
        }
      `}</style>
    </Modal>
  );
};

export default createFragmentContainer(LinkedProduct, {
  product: graphql`
    fragment LinkedProduct_product on Product {
      id
      rowId
      productName
      linkedProductsByProductId(
        first: 2147483647
        filter: {deletedAt: {isNull: true}}
      ) @connection(key: "LinkedProduct_linkedProductsByProductId") {
        __id
        edges {
          node {
            id
            rowId
            linkedProductId
            productByLinkedProductId {
              productName
            }
          }
        }
      }
    }
  `,
  query: graphql`
    fragment LinkedProduct_query on Query {
      nonEnergyProducts: allProducts(
        filter: {isEnergyProduct: {equalTo: false}}
        orderBy: PRODUCT_NAME_ASC
      ) {
        edges {
          node {
            id
            rowId
            productName
          }
        }
      }
    }
  `
});
