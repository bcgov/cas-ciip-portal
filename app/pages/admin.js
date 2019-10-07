import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {Container, Row, Col, Jumbotron} from 'react-bootstrap';
import Header from '../components/Header';
import ProductCreatorContainer from '../containers/Products/ProductCreatorContainer';
import ProductListContainer from '../containers/Products/ProductListContainer';

class Admin extends Component {
  state = {
    formData: {formId: '', formJson: ''},
    mode: 'view',
    confirmationModalOpen: false
  };

  /** **  ProductRowItem Actions ** **/

  // Toggle enabling of editing products
  toggleProductMode = () => {
    this.state.mode === 'view' || this.state.mode === 'benchmark'
      ? this.setState({mode: 'product'})
      : this.setState({mode: 'view'});
  };

  // Toggle enabling of editing benchmarks
  toggleBenchmarkMode = () => {
    this.state.mode === 'view' || this.state.mode === 'product'
      ? this.setState({mode: 'benchmark'})
      : this.setState({mode: 'view'});
  };

  openConfirmationWindow = () => {
    this.setState({confirmationModalOpen: true});
  };

  closeConfirmationWindow = () => {
    this.setState({confirmationModalOpen: false});
  };

  formIdHandler = (formId, formJson) => {
    this.setState({formData: {formId, formJson}});
    console.log('form-builder.js > formIdHandler state', this.state);
  };

  productRowActions = {
    toggleProductMode: this.toggleProductMode,
    toggleBenchmarkMode: this.toggleBenchmarkMode,
    openConfirmationWindow: this.openConfirmationWindow,
    closeConfirmationWindow: this.closeConfirmationWindow
  };
  /** ** END ProductRowItem Actions ** **/

  static query = graphql`
    query adminQuery {
      query {
        ...ProductListContainer_query
      }
    }
  `;

  render() {
    const {query} = this.props;
    return (
      <>
        <Header />
        <Container>
          <Row>
            <Col>
              <h3>Products and Benchmarks</h3>
              <br />
              <Jumbotron>
                <h4>Create a Product</h4>
                <br />
                <ProductCreatorContainer />
              </Jumbotron>
              <br />
              <br />
              <br />
              <ProductListContainer
                productRowActions={this.productRowActions}
                query={query}
                mode={this.state.mode}
                confirmationModalOpen={this.state.confirmationModalOpen}
              />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Admin;

/*

Product Creator:
1: Add table for product (name and description)
2: Add component for createproduct
3: Add add fields for create product in component: Product name and description
4: On save create object and push to createProduct mutation

List of products
1: create component for List of Products
2: use queryrenderer to loop through products
3: display products as a list

BM and ET
1: Create a component for BM and ET
2: Pass product object to the component
3: Component has prdouct name, description, BM and ET fields and a save button
4: on save create update BM/ET Values: Todo: Add history in the future
5: Update the components

 */
