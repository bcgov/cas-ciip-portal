import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {Row, Col, Button} from 'react-bootstrap';
import {productsBenchmarksQueryResponse} from 'productsBenchmarksQuery.graphql';
import DefaultLayout from 'layouts/default-layout';
import ProductCreatorContainer from 'containers/Products/ProductCreatorContainer';
import ProductListContainer from 'containers/Products/ProductListContainer';
import SearchTable from 'components/SearchTable';
import {ADMIN_GROUP} from 'data/group-constants';

const ALLOWED_GROUPS = ADMIN_GROUP;

interface Props {
  query: productsBenchmarksQueryResponse['query'];
}

class ProductsBenchmarks extends Component<Props> {
  static query = graphql`
    query productsBenchmarksQuery(
      $orderByField: String
      $direction: String
      $searchField: String
      $searchValue: String
    ) {
      query {
        ...ProductListContainer_query
          @arguments(
            orderByField: $orderByField
            direction: $direction
            searchField: $searchField
            searchValue: $searchValue
          )
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
    expandCreateForm: false
  };

  static async getInitialProps() {
    return {
      variables: {
        orderByField: 'name',
        direction: 'ASC'
      }
    };
  }

  toggleShowCreateForm = () => {
    const expanded = this.state.expandCreateForm;
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
      <DefaultLayout
        session={query.session}
        title="Manage Products"
        allowedGroups={ALLOWED_GROUPS}
      >
        <div style={{textAlign: 'right'}}>
          <Button
            style={{marginTop: '-220px'}}
            onClick={this.toggleShowCreateForm}
          >
            New Product
          </Button>
        </div>
        <Row>
          <Col>
            {this.state.expandCreateForm && <ProductCreatorContainer />}

            <SearchTable
              query={query}
              defaultOrderByField="name"
              defaultOrderByDisplay="Product"
            >
              {props => <ProductListContainer {...props} />}
            </SearchTable>
          </Col>
        </Row>
      </DefaultLayout>
    );
  }
}

export default ProductsBenchmarks;
