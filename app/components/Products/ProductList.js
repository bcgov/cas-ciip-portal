import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import ProductRowItem from './ProductRowItem';

const ProductList = props => {
  if (props.query.active) {
    const {query} = props;
    const allProducts = [...query.active.edges, ...query.archived.edges] || {};
    return allProducts.map(({node}) => (
      <ProductRowItem key={node.id} product={node} />
    ));
  }

  return <>...Loading</>;
};

export default createFragmentContainer(ProductList, {
  query: graphql`
    fragment ProductList_query on Query
      @argumentDefinitions(condition: {type: "ProductCondition"}) {
      active: allProducts(condition: {state: "active"}) {
        edges {
          node {
            ...ProductRowItem_product
          }
        }
      }
      archived: allProducts(condition: {state: "archived"}) {
        edges {
          node {
            ...ProductRowItem_product
          }
        }
      }
    }
  `
});
