import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import {ProductListContainer_query} from 'ProductListContainer_query.graphql';
import SearchTableLayout from 'components/SearchTableLayout';
import LoadingSpinner from 'components/LoadingSpinner';
import ProductRowItemContainer from './ProductRowItemContainer';
import {ISearchOption} from 'components/Search/ISearchOption';
import {NoHeaderSearchOption} from 'components/Search/NoHeaderSearchOption';
import {TextSearchOption} from 'components/Search/TextSearchOption';

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

    const searchOptions: ISearchOption[] = [
      new TextSearchOption('Product', 'product_name'),
      {
        title: 'Settings',
        columnName: 'null',
        isSearchEnabled: false
      },
      {
        title: 'Modified (D/M/Y)',
        columnName: 'updated_at',
        isSearchEnabled: false
      },
      new TextSearchOption('Benchmark', 'benchmark'),
      new TextSearchOption('Eligibility Threshold', 'eligibility_threshold'),
      new TextSearchOption(
        'Allocation of Emissions',
        'requires_emission_allocation'
      ),
      new TextSearchOption('CIIP Benchmarked', 'is_ciip_product'),
      new TextSearchOption('Status', 'product_state'),
      NoHeaderSearchOption
    ];
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
        searchOptions={searchOptions}
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
