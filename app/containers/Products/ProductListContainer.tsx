import React, {useEffect} from 'react';
import {Table} from 'react-bootstrap';
import {graphql, createRefetchContainer} from 'react-relay';
import {ProductListContainer_query} from 'ProductListContainer_query.graphql';
// Import {RelayNetworkLayer} from 'react-relay-network-modern/node8';
import LoadingSpinner from '../../components/LoadingSpinner';
import ProductRowItemContainer from './ProductRowItemContainer';

interface Props {
  query: ProductListContainer_query;
  orderByField?: string;
  orderByDisplay?: string;
  searchField?: string;
  searchValue?: string;
  direction?: string;
  searchDisplay?: string;
  handleEvent: (...args: any[]) => void;
  relay: any;
}

export const ProductList: React.FunctionComponent<Props> = ({
  query,
  relay,
  orderByField,
  searchField,
  searchValue,
  // SearchDisplay,
  direction,
  handleEvent
}) => {
  useEffect(() => {
    const refetchVariables = {
      searchField,
      searchValue,
      orderByField,
      direction
    };
    relay.refetch(refetchVariables);
  });

  const sort = (event, column) => {
    // @ts-ignore
    event.target.id = 'sortApplications';
    handleEvent(event, column);
    // @ts-ignore
    event.target.id = 'toggleDirection';
    handleEvent(event);
  };

  if (query && query.searchProducts && query.searchProducts.edges) {
    const allProducts = query.searchProducts.edges;

    return (
      <>
        <Table striped hover>
          <thead style={{color: 'white', background: '#003366'}}>
            <tr>
              <th
                onClick={event => {
                  sort(event, 'name');
                }}
              >
                Product
              </th>
              <th
                onClick={event => {
                  sort(event, 'units');
                }}
              >
                Units
              </th>
              <th
                onClick={event => {
                  sort(event, 'units');
                }}
              >
                Benchmark
              </th>
              <th>Elig. Threshold</th>
              <th
                onClick={event => {
                  sort(event, 'state');
                }}
              >
                Status
              </th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map(({node}) => (
              <ProductRowItemContainer key={node.id} product={node} />
            ))}
          </tbody>
        </Table>
        {/* <Button onClick={loadMore}>Next</Button> */}
      </>
    );
  }

  return <LoadingSpinner />;
};

// @connection on the two edge-returning queries supports downstream mutations
// we need the first two billion edges to force graphql to return the right type
// @see https://relay.dev/docs/en/pagination-container#connection
// https://www.prisma.io/blog/relay-moderns-connection-directive-1ecd8322f5c8
export default createRefetchContainer(
  ProductList,
  {
    query: graphql`
      fragment ProductListContainer_query on Query
        @argumentDefinitions(
          searchField: {type: "String"}
          searchValue: {type: "String"}
          orderByField: {type: "String"}
          direction: {type: "String"}
        ) {
        searchProducts(
          first: 20
          searchField: $searchField
          searchValue: $searchValue
          orderByField: $orderByField
          direction: $direction
        ) @connection(key: "ProductListContainer_searchProducts") {
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
  graphql`
    query ProductListContainerRefetchQuery(
      $searchField: String
      $searchValue: String
      $orderByField: String
      $direction: String
    ) {
      query {
        ...ProductListContainer_query
          @arguments(
            searchField: $searchField
            searchValue: $searchValue
            orderByField: $orderByField
            direction: $direction
          )
      }
    }
  `
);
