import React, {Component} from 'react';
import ProductList from '../components/Products/ProductList';

class Products extends Component {
  render() {
    return (
      <>
        <h1>Products</h1>
        <ProductList />
      </>
    );
  }
}

export default Products;
