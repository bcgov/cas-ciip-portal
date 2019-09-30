import React, {Component} from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import ProductRowItem from './ProductRowItem';

class ProductList extends Component {
  render() {
    const {query} = this.props;
    const {allProducts} = query || {};
    const {edges} = allProducts || {};
    if (!edges) return null;
    const archivedList = edges.filter(({node}) => (node.state === 'archived'));
    const productList = edges.filter(({node}) => (node.state !== 'deprecated' && node.state !== 'archived'));
    const products = [...productList, ...archivedList]
    console.log(products);
    if (!products.length) return null;
    return products.map(({node}) => (<ProductRowItem product={node}/>));
  }
}

export default createFragmentContainer(ProductList, {
  query: graphql`
    fragment ProductList_query on Query {
      allProducts {
        edges {
          node {
            state
            ...ProductRowItem_product
          }
        }
      }
    }
  `
});
