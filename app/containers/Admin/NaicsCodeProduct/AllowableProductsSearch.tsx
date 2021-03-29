import React from 'react';
import {Button, Card, Col, Row} from 'react-bootstrap';
import {createFragmentContainer, graphql} from 'react-relay';
import {AllowableProductsSearch_query} from '__generated__/AllowableProductsSearch_query.graphql';
import SearchDropdownComponent from 'components/SearchDropdown';

interface Props {
  query: AllowableProductsSearch_query;
  naicsCodeId: number;
  existingProductIds: number[];
  addAllowedProduct: (productRowId: number, mandatory: boolean) => void;
}

export const AllowableProductsSearchContainer: React.FunctionComponent<Props> = (
  props
) => {
  const onAddClick = () => {};

  const typeaheadOptions = props.query?.allProducts?.edges.map((e) => {
    return {
      id: e.node.id,
      name: e.node.productName
    };
  });

  return (
    <Card>
      <Card.Header className="bc-card-header">
        Add an Allowed Product
      </Card.Header>
      <Card.Body>
        <Row>
          <Col className="text-right mb-2">
            Is reporting this product required?
          </Col>
        </Row>
        <Row>
          <Col>
            <SearchDropdownComponent
              id="product-naics-search"
              inputProps={{id: 'product-naics-search-typeahead'}}
              options={typeaheadOptions}
              onChange={() => {}}
              placeholder="Search Products ..."
            />
          </Col>
          <Col md="auto">
            <Button onClick={() => onAddClick(true)}>Add as Mandatory</Button>{' '}
            <Button variant="secondary" onClick={() => onAddClick(false)}>
              Add as Optional
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default createFragmentContainer(AllowableProductsSearchContainer, {
  query: graphql`
    fragment AllowableProductsSearch_query on Query {
      allProducts(filter: {productState: {equalTo: PUBLISHED}}) {
        edges {
          node {
            id
            productName
          }
        }
      }
    }
  `
});
