import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {ProductsQueryResponse} from 'ProductsQuery.graphql';
import ProductListContainer from '../Products/ProductListContainer';

interface Props {
  query: ProductsQueryResponse['query'];
}

// (Dylan) Why do we have this page? Is it for people that can't change the benchmarks/products to view them?
// If so is this a role management / authorization thing rather than it's own page?
export default class Products extends Component<Props> {
  static query = graphql`
    query ProductsQuery {
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
