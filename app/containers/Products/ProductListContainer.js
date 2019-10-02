import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import ProductRowItem from '../../components/Products/ProductRowItem';

const ProductListContainer = props => {
  if (props.query.active) {
    console.log(props);
    const {query} = props;
    const allProducts = [...query.active.edges, ...query.archived.edges] || {};
    return allProducts.map(({node}) => (
      <ProductRowItem key={node.__id} product={node} />
    ));
  }

  return <>...Loading</>;
};

export default createFragmentContainer(ProductListContainer, {
  query: graphql`
    fragment ProductListContainer_query on Query
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
