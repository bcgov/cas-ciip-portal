import React, {Component} from 'react';
import {graphql} from 'react-relay';
import ProductListContainer from '../containers/Products/ProductListContainer';

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
