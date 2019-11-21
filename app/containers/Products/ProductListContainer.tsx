import React from 'react';
import {Table, Button} from 'react-bootstrap';
import {graphql, createPaginationContainer} from 'react-relay';
import {ProductListContainer_query} from 'ProductListContainer_query.graphql';
// Import {RelayNetworkLayer} from 'react-relay-network-modern/node8';
import LoadingSpinner from '../../components/LoadingSpinner';
import ProductRowItemContainer from './ProductRowItemContainer';

interface Props {
  query: ProductListContainer_query;
  relay: any;
}

export const ProductList: React.FunctionComponent<Props> = ({query, relay}) => {
  if (query && query.allProducts && query.allProducts.edges) {
    const allProducts = query.allProducts.edges;

    const loadMore = () => {
      if (!relay.hasMore() || relay.isLoading()) return;
      relay.loadMore(2);
    };

    const sort = column => {
      relay.refetchConnection(
        2,
        error => {
          console.log(error);
        },
        {orderBy: column}
      );
    };

    return (
      <>
        <Table striped hover>
          <thead style={{color: 'white', background: '#003366'}}>
            <tr>
              <th onClick={() => sort('NAME_DESC')}>Product</th>
              <th>Units</th>
              <th>Benchmark</th>
              <th>Elig. Threshold</th>
              <th>Status</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map(({node}) => (
              <ProductRowItemContainer key={node.id} product={node} />
            ))}
          </tbody>
        </Table>
        <Button onClick={loadMore}>Next</Button>
      </>
    );
  }

  return <LoadingSpinner />;
};

// @connection on the two edge-returning queries supports downstream mutations
// we need the first two billion edges to force graphql to return the right type
// @see https://relay.dev/docs/en/pagination-container#connection
// https://www.prisma.io/blog/relay-moderns-connection-directive-1ecd8322f5c8
export default createPaginationContainer(
  ProductList,
  {
    query: graphql`
      fragment ProductListContainer_query on Query
        @argumentDefinitions(
          count: {type: "Int", defaultValue: 20}
          cursor: {type: "Cursor"}
          orderBy: {type: "[ProductsOrderBy!]", defaultValue: [NAME_ASC]}
        ) {
        allProducts(first: $count, after: $cursor, orderBy: $orderBy)
          @connection(key: "ProductListContainer_allProducts") {
          edges {
            cursor
            node {
              id
              ...ProductRowItemContainer_product
            }
          }
        }
      }
    `
  },
  {
    direction: 'forward',
    getConnectionFromProps(props) {
      return props.query && props.query.allProducts;
    },
    // This is also the default implementation of `getFragmentVariables` if it isn't provided.
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount
      };
    },
    getVariables(props, {count, cursor}, fragmentVariables) {
      return {
        count,
        cursor,
        orderBy: fragmentVariables.orderBy
      };
    },
    query: graphql`
      # Pagination query to be fetched upon calling 'loadMore'.
      # Notice that we re-use our fragment, and the shape of this query matches our fragment spec.
      query ProductListContainerPaginationQuery(
        $count: Int!
        $cursor: Cursor!
        $orderBy: [ProductsOrderBy!]
      ) {
        query: query {
          ...ProductListContainer_query
            @arguments(count: $count, cursor: $cursor, orderBy: $orderBy)
        }
      }
    `
  }
);
