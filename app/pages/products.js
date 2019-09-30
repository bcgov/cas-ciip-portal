import React, {Component} from 'react';
import {graphql} from 'react-relay';
import ProductList from '../components/Products/ProductList';

export default class Products extends Component {
  static query = graphql`
    query productsQuery {
      query {
        ...ProductList_query
      }
    }
  `;

  render() {
    const {query} = this.props;
    return (
      <>
        <h1>Products</h1>
        <ProductList query={query} />
      </>
    );
  }
}
