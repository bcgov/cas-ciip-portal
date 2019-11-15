import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {productsQueryResponse} from 'productsQuery.graphql';
import ProductListContainer from '../containers/Products/ProductListContainer';
import DefaultLayout from '../layouts/default-layout';

interface Props {
  query: productsQueryResponse['query'];
}

// (Dylan) Why do we have this page? Is it for people that can't change the benchmarks/products to view them?
// If so is this a role management / authorization thing rather than it's own page?
export default class Products extends Component<Props> {
  static query = graphql`
    query productsQuery {
      query {
        session {
          ...defaultLayout_session
        }
        ...ProductListContainer_query
      }
    }
  `;

  render() {
    const {query} = this.props;
    return (
      <DefaultLayout title="Products" session={query.session}>
        <ProductListContainer query={query} />
      </DefaultLayout>
    );
  }
}
