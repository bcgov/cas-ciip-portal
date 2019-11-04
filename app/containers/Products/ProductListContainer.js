import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import LoadingSpinner from '../../components/LoadingSpinner';
import ProductRowItemContainer from './ProductRowItemContainer';

export const ProductList = props => {
  const {query} = props;
  if (
    query &&
    (query.active || query.archived) &&
    (query.active.edges || query.archived.edges)
  ) {
    const allProducts = [...query.active.edges, ...query.archived.edges];
    return allProducts.map(({node}) => (
      <ProductRowItemContainer
        key={node.id}
        product={node}
        mode={props.mode}
        confirmationModalOpen={props.confirmationModalOpen}
        productRowActions={props.productRowActions}
      />
    ));
  }

  return <LoadingSpinner />;
};

// @connection on the two edge-returning queries supports downstream mutations
// we need the first two billion edges to force graphql to return the right type
// @see https://relay.dev/docs/en/pagination-container#connection
// https://www.prisma.io/blog/relay-moderns-connection-directive-1ecd8322f5c8
export default createFragmentContainer(ProductList, {
  query: graphql`
    fragment ProductListContainer_query on Query {
      active: allProducts(first: 2147483647, condition: {state: "active"})
        @connection(
          key: "ProductListContainer_active"
          filters: ["condition"]
        ) {
        edges {
          node {
            id
            ...ProductRowItemContainer_product
          }
        }
      }
      archived: allProducts(first: 2147483647, condition: {state: "archived"})
        @connection(
          key: "ProductListContainer_archived"
          filters: ["condition"]
        ) {
        edges {
          node {
            id
            ...ProductRowItemContainer_product
          }
        }
      }
    }
  `
});
