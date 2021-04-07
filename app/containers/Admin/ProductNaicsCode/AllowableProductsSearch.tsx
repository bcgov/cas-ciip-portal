import React, {useMemo, useState} from 'react';
import {Button, Card, Col, Row} from 'react-bootstrap';
import {createFragmentContainer, graphql, RelayProp} from 'react-relay';
import {AllowableProductsSearch_query} from '__generated__/AllowableProductsSearch_query.graphql';
import SearchDropdownComponent from 'components/SearchDropdown';
import {createProductNaicsCodeMutationVariables} from '__generated__/createProductNaicsCodeMutation.graphql';
import createProductNaicsCodeMutation from 'mutations/product_naics_code/createProductNaicsCodeMutation';

interface Props {
  relay: RelayProp;
  query: AllowableProductsSearch_query;
}

export const AllowableProductsSearchContainer: React.FunctionComponent<Props> = ({
  relay,
  query
}) => {
  const allowableProducts = useMemo(() => {
    const existingProductIds = query.naicsCode.productNaicsCodesByNaicsCodeId.edges.map(
      (e) => e.node.productId
    );

    return query.allProducts.edges
      .map((e) => {
        return {
          id: e.node.rowId,
          name: e.node.productName
        };
      })
      .filter((option) => !existingProductIds.includes(option.id));
  }, [query]);

  const [selectedProduct, setSelectedProduct] = useState<{
    id: string | number;
    name: string;
  }>();

  const addAllowableProduct = async (productId: number, mandatory: boolean) => {
    const {environment} = relay;
    const variables: createProductNaicsCodeMutationVariables = {
      input: {
        isMandatoryInput: mandatory,
        naicsCodeIdInput: query.naicsCode.rowId,
        productIdInput: productId
      }
    };

    try {
      await createProductNaicsCodeMutation(
        environment,
        variables,
        query.naicsCode.id,
        'AllowableProducts_productNaicsCodesByNaicsCodeId'
      );
    } catch (e) {
      console.error(e);
    }
  };

  const onAddClick = (mandatory: boolean) => {
    if (selectedProduct) {
      addAllowableProduct(selectedProduct.id as number, mandatory);
      setSelectedProduct(undefined);
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
                setSelectedProduct(items[0]);
              }}
              selected={selectedProduct ? [selectedProduct] : []}
              placeholder="Search Products ..."
            />
          </Col>
          <Col md="auto">
            <Button
              disabled={!selectedProduct}
              onClick={() => onAddClick(true)}
            >
              Add as Mandatory
            </Button>{' '}
            <Button
              disabled={!selectedProduct}
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
        id
        rowId
        productNaicsCodesByNaicsCodeId(
          first: 2147483647
          filter: {deletedAt: {isNull: true}}
        )
          @connection(
            key: "AllowableProducts_productNaicsCodesByNaicsCodeId"
            filters: []
          ) {
          edges {
            node {
              id
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
