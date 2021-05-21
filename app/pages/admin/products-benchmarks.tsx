import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {Row, Col, Button} from 'react-bootstrap';
import {productsBenchmarksQueryResponse} from 'productsBenchmarksQuery.graphql';
import DefaultLayout from 'layouts/default-layout';
import ProductCreatorContainer from 'containers/Products/ProductCreatorContainer';
import ProductListContainer from 'containers/Products/ProductListContainer';
import {ADMIN_GROUP} from 'data/group-constants';
import {DEFAULT_PAGE_SIZE} from 'components/FilterableTable/FilterableTablePagination';

const ALLOWED_GROUPS = ADMIN_GROUP;

interface Props {
  query: productsBenchmarksQueryResponse['query'];
}

class ProductsBenchmarks extends Component<Props> {
  static allowedGroups = ALLOWED_GROUPS;
  static isAccessProtected = true;
  static query = graphql`
    query productsBenchmarksQuery(
      $product_name: String
      $current_benchmark: BigFloat
      $current_eligibility_threshold: BigFloat
      $requires_emission_allocation: Boolean
      $is_ciip_product: Boolean
      $product_state: CiipProductState
      $order_by: [ProductsOrderBy!]
      $pageSize: Int
      $offset: Int
    ) {
      query {
        ...ProductListContainer_query
          @arguments(
            product_name: $product_name
            current_benchmark: $current_benchmark
            current_eligibility_threshold: $current_eligibility_threshold
            requires_emission_allocation: $requires_emission_allocation
            is_ciip_product: $is_ciip_product
            product_state: $product_state
            order_by: $order_by
            pageSize: $pageSize
            offset: $offset
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
    expandCreateForm: false
  };

  static async getInitialProps() {
    return {
      variables: {
        order_by: 'PRODUCT_NAME_ASC',
        pageSize: DEFAULT_PAGE_SIZE,
        offset: 0
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

  formIdHandler = (formId, formJson) => {
    this.setState({formData: {formId, formJson}});
    console.log('form-builder.js > formIdHandler state', this.state);
  };

  /** ** END ProductRowItem Actions ** **/

  render() {
    const {query} = this.props;
    const newProductButton = (
      <Button onClick={this.toggleShowCreateForm}>New Product</Button>
    );

    return (
      <DefaultLayout
        session={query.session}
        title="Manage Products"
        titleControls={newProductButton}
      >
        <Row>
          <Col>
            {this.state.expandCreateForm && (
              <ProductCreatorContainer
                toggleShowCreateForm={this.toggleShowCreateForm}
              />
            )}
            <ProductListContainer query={query} />
          </Col>
        </Row>
      </DefaultLayout>
    );
  }
}

export default ProductsBenchmarks;
