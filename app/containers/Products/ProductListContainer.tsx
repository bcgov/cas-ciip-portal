import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
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
  updateProductCount: (...args: any[]) => void;
  handleEvent: (...args: any[]) => void;
}

export const ProductList: React.FunctionComponent<Props> = ({
  query,
  handleEvent,
  productCount,
  updateProductCount
}) => {
  if (query?.searchProducts?.edges) {
    const allProducts = query.searchProducts.edges;

    const displayNameToColumnNameMap = {
      Product: 'product_name',
      Settings: null,
      'Modified (D/M/Y)': 'updated_at',
      Benchmark: 'benchmark',
      'Eligibility Threshold': 'eligibility_threshold',
      'Allocation of Emissions': 'requires_emission_allocation',
      'CIIP Benchmarked': 'is_ciip_product',
      Status: 'product_state'
    };
    const body = (
      <tbody>
        {allProducts.map(({node}) => (
          <ProductRowItemContainer
            key={node.id}
            product={node}
            query={query}
            updateProductCount={updateProductCount}
            productCount={productCount}
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
export default createFragmentContainer(ProductList, {
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
});
