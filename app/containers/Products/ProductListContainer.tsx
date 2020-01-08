import React, {useEffect} from 'react';
import {graphql, createRefetchContainer} from 'react-relay';
import {ProductListContainer_query} from 'ProductListContainer_query.graphql';
import SearchTableLayout from 'components/SearchTableLayout';
import LoadingSpinner from 'components/LoadingSpinner';
import ProductRowItemContainer from './ProductRowItemContainer';

interface Props {
  query: ProductListContainer_query;
  orderByField?: string;
  orderByDisplay?: string;
  searchField?: string;
  searchValue?: string;
  direction?: string;

  handleEvent: (...args: any[]) => void;
  relay: any;
}

export const ProductList: React.FunctionComponent<Props> = ({
  query,
  relay,
  orderByField,
  searchField,
  searchValue,
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

  if (query && query.searchProducts && query.searchProducts.edges) {
    const allProducts = query.searchProducts.edges;

    const displayNameToColumnNameMap = {
      Product: 'name',
      Units: 'units',
      'Benchmark (tCO2e/product units)': 'benchmark',
      'Elig. Threshold (tCO2e/product units)': 'eligibility_threshold',
      'Incentive Multiplier': 'incentive_multiplier',
      Status: 'state'
    };
    const body = (
      <tbody>
        {allProducts.map(({node}) => (
          <ProductRowItemContainer key={node.id} product={node} query={query} />
        ))}
      </tbody>
    );
    return (
      <SearchTableLayout
        body={body}
        displayNameToColumnNameMap={displayNameToColumnNameMap}
        handleEvent={handleEvent}
      />
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
        ...ProductRowItemContainer_query
        searchProducts(
          first: 20
          searchField: $searchField
          searchValue: $searchValue
          orderByField: $orderByField
          direction: $direction
        ) @connection(key: "ProductListContainer_searchProducts") {
          edges {
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
