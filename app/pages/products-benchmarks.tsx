import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {Row, Col, Button} from 'react-bootstrap';
import {productsBenchmarksQueryResponse} from 'productsBenchmarksQuery.graphql';
import DefaultLayout from '../layouts/default-layout';
import ProductCreatorContainer from '../containers/Products/ProductCreatorContainer';
import ProductListContainer from '../containers/Products/ProductListContainer';

interface Props {
  query: productsBenchmarksQueryResponse['query'];
}

class ProductsBenchmarks extends Component<Props> {
  static query = graphql`
    query productsBenchmarksQuery {
      query {
        ...ProductListContainer_query
        session {
          ...defaultLayout_session
        }
      }
    }
  `;

  state = {
    formData: {formId: '', formJson: ''},
    mode: 'view',
    confirmationModalOpen: false,
    expandCreateForm: false,
    createProductFormKey: Date.now()
  };

  resetCreateProductForm = () => {
    this.setState({createProductFormKey: Date.now()});
  };

  toggleShowCreateForm = () => {
    const expanded = this.state.expandCreateForm;
    this.resetCreateProductForm();
    this.setState({expandCreateForm: !expanded});
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

  /** ** END ProductRowItem Actions ** **/

  render() {
    const {query} = this.props;
    return (
      <DefaultLayout session={query.session} title="Manage Products">
        <div style={{textAlign: 'right'}}>
          <Button
            style={{marginTop: '-220px'}}
            onClick={this.toggleShowCreateForm}
          >
            Create a new Product +
          </Button>
        </div>
        <Row>
          <Col>
            <ProductCreatorContainer
              expanded={this.state.expandCreateForm}
              resetForm={this.resetCreateProductForm}
              createProductFormKey={this.state.createProductFormKey}
            />
            <br />
            <br />
            <br />
            <ProductListContainer
              productRowActions={{
                toggleProductMode: this.toggleProductMode,
                toggleBenchmarkMode: this.toggleBenchmarkMode,
                openConfirmationWindow: this.openConfirmationWindow,
                closeConfirmationWindow: this.closeConfirmationWindow
              }}
              query={query}
              mode={this.state.mode}
              confirmationModalOpen={this.state.confirmationModalOpen}
            />
          </Col>
        </Row>
      </DefaultLayout>
    );
  }
}

export default ProductsBenchmarks;

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
