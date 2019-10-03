import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import ProductRowItem from '../../components/Products/ProductRowItem';

// TODO(wenzowski): `key={node.id}`
const ProductListContainer = props => {
  if (props.query.active) {
    const {query} = props;
    const allProducts = [...query.active.edges, ...query.archived.edges] || {};
    return allProducts.map(({node}) => (
      <ProductRowItem
        key={node.id}
        product={node}
        mode={props.mode}
        confirmationModalOpen={props.confirmationModalOpen}
        productRowActions={props.productRowActions}
      />
    ));
  }

  return <>...Loading</>;
};

// TODO(wenzowski): this is totaly the right way to go!
// we still probably want an @connection on the two edge-returning queries to support downstream mutations
// remember we also need the first two billion edges to force graphql to return the right type
// @see https://relay.dev/docs/en/pagination-container#connection
// https://www.prisma.io/blog/relay-moderns-connection-directive-1ecd8322f5c8
export default createFragmentContainer(ProductListContainer, {
  query: graphql`
    fragment ProductListContainer_query on Query
      @argumentDefinitions(condition: {type: "ProductCondition"}) {
      active: allProducts(condition: {state: "active"}) {
        edges {
          node {
            id
            ...ProductRowItem_product
          }
        }
      }
      archived: allProducts(condition: {state: "archived"}) {
        edges {
          node {
            id
            ...ProductRowItem_product
          }
        }
      }
    }
  `
});
