import React, {Component} from 'react';
import {graphql} from 'react-relay';
import ProductListContainer from '../containers/Products/ProductListContainer';

// (Dylan) Why do we have this page? Is it for people that can't change the benchmarks/products to view them?
// If so is this a role management / authorization thing rather than it's own page?
export default class Products extends Component {
  static query = graphql`
    query productsQuery {
      query {
        ...ProductListContainer_query
      }
    }
  `;

  render() {
    const {query} = this.props;
    return (
      <>
        <h1>Products</h1>
        <ProductListContainer query={query} />
      </>
    );
  }
}
