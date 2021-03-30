import React, {useState} from 'react';
import {Button, Card, Col, Row} from 'react-bootstrap';
import {createFragmentContainer, graphql, RelayProp} from 'react-relay';
import {AllowableProductsSearch_query} from '__generated__/AllowableProductsSearch_query.graphql';
import SearchDropdownComponent from 'components/SearchDropdown';
import {createProductNaicsCodeMutationVariables} from '__generated__/createProductNaicsCodeMutation.graphql';
import createProductNaicsCodeMutation from 'mutations/product_naics_code/createProductNaicsCodeMutation';

interface Props {
  relay: RelayProp;
  query: AllowableProductsSearch_query;
  naicsCodeRowId: number;
  naicsCodeId: string;
}

export const AllowableProductsSearchContainer: React.FunctionComponent<Props> = (
  props
) => {
  const existingProductIds = props.query.naicsCode.productNaicsCodesByNaicsCodeId.edges.map(
    (e) => e.node.productId
  );
  const initialAllowableProducts = props.query?.allProducts?.edges
    .map((e) => {
      return {
        id: e.node.rowId,
        name: e.node.productName
      };
    })
    .filter((option) => !existingProductIds.includes(option.id));

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [allowableProducts, setAllowableProducts] = useState(
    initialAllowableProducts
  );

  const disableAddingProducts = selectedProducts.length === 0;

  const addAllowableProduct = async (productId: number, mandatory: boolean) => {
    const {environment} = props.relay;
    const variables: createProductNaicsCodeMutationVariables = {
      input: {
        isMandatoryInput: mandatory,
        naicsCodeIdInput: props.naicsCodeRowId,
        productIdInput: productId
      }
    };

    try {
      await createProductNaicsCodeMutation(
        environment,
        variables,
        props.naicsCodeId
      );
    } catch (e) {
      console.error(e);
    }
  };

  const onAddClick = (mandatory: boolean) => {
    if (!disableAddingProducts) {
      addAllowableProduct(selectedProducts[0].id, mandatory);
      setAllowableProducts(
        allowableProducts.filter(
          (allowableProduct) => allowableProduct.id !== selectedProducts[0].id
        )
      );
      setSelectedProducts([]);
    }
  };

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
              options={allowableProducts}
              onChange={(items) => {
                setSelectedProducts(items);
              }}
              selected={selectedProducts}
              placeholder="Search Products ..."
            />
          </Col>
          <Col md="auto">
            <Button
              disabled={disableAddingProducts}
              onClick={() => onAddClick(true)}
            >
              Add as Mandatory
            </Button>{' '}
            <Button
              disabled={disableAddingProducts}
              variant="secondary"
              onClick={() => onAddClick(false)}
            >
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
    fragment AllowableProductsSearch_query on Query
    @argumentDefinitions(naicsCodeId: {type: "ID!"}) {
      naicsCode(id: $naicsCodeId) {
        productNaicsCodesByNaicsCodeId(first: 2147483647) {
          edges {
            node {
              productId
            }
          }
        }
      }
      allProducts(filter: {productState: {equalTo: PUBLISHED}}) {
        edges {
          node {
            rowId
            productName
          }
        }
      }
    }
  `
});
