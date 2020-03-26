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
  productCount: number;
  updateProductCount: any;
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
  handleEvent,
  productCount,
  updateProductCount
}) => {
  useEffect(() => {
    const refetchVariables = {
      searchField,
      searchValue,
      orderByField,
      direction,
      productCount
    };
    relay.refetch(refetchVariables);
  });

  if (query?.searchProducts?.edges) {
    const allProducts = query.searchProducts.edges;

    const displayNameToColumnNameMap = {
      Product: 'name',
      Description: 'description',
      Units: 'units',
      'Benchmark (tCO2e/product units)': 'benchmark',
      'Elig. Threshold (tCO2e/product units)': 'eligibility_threshold',
      Status: 'state'
    };
    const body = (
      <tbody>
        {allProducts.map(({node}) => (
          <ProductRowItemContainer
            key={node.id}
            product={node}
            query={query}
            updateProductCount={updateProductCount}
            productCount={query.allProducts.totalCount}
          />
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
          productCount: {type: "Int"}
        ) {
        ...ProductRowItemContainer_query
        searchProducts(
          first: 2147483647
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
        # TODO: This is here to trigger a refactor as updating the edge / running the query in the mutation is not triggering a refresh
        # Find a way to not pull the totalcount?
        allProducts(first: $productCount) {
          totalCount
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
      $productCount: Int
    ) {
      query {
        ...ProductListContainer_query
          @arguments(
            searchField: $searchField
            searchValue: $searchValue
            orderByField: $orderByField
            direction: $direction
            productCount: $productCount
          )
      }
    }
  `
);
